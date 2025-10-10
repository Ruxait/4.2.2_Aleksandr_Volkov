import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import ky from 'ky'
import { type Product } from '../../types/product'

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
}

export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
  try {
    const data = await ky
      .get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
      .json<Product[]>()
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to fetch products')
  }
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload
        state.loading = false
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default productsSlice.reducer
