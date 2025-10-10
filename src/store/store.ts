import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './reducers/CartSlice'
import productsReducer from './reducers/ProductSlice'

const rootReducer = combineReducers({
  cartReducer,
  productsReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof setupStore>
export type AppDispatch = AppState['dispatch']