import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type Product } from '../types/product'

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: build => ({
    fetchAllProducts: build.query<Product[], void>({
      query: () => 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json',
    }),
  }),
})


