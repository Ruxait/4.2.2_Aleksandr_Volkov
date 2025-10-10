import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../types/product' 

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const existing = state.items.find(i => i.product.id === action.payload.product.id)
      if (existing) {
        existing.quantity += action.payload.quantity
      } else {
        state.items.push({ product: action.payload.product, quantity: action.payload.quantity })
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    incrementItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.product.id === action.payload)
      if (item) item.quantity++
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.product.id === action.payload)
      if (item) {
        item.quantity--
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.product.id !== action.payload)
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.product.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('cart')
    },
  },
})

export default cartSlice.reducer
