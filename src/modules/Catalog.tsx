import { useEffect } from 'react'
import { Title, Container } from '@mantine/core'
import { ProductGrid } from '../components/ProductGrid'
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'
import { getProducts } from '../store/reducers/ProductSlice'

export const Catalog = () => {
  const dispatch = useTypedDispatch()
  const { products, loading } = useTypedSelector(state => state.productsReducer)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <Container size="xl" py="lg" style={{ backgroundColor: '#f4f6fa' }}>
      <Title order={2} mb="md">
        Catalog
      </Title>
      <ProductGrid products={products} isLoading={loading} />
    </Container>
  )
}
