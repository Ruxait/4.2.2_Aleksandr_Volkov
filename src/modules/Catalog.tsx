import { Title, Container } from '@mantine/core'
import { ProductGrid } from '../components/ProductGrid'
import { productAPI } from '../services/ProductService'

export const Catalog = () => {
  const { data: products, isLoading } = productAPI.useFetchAllProductsQuery()

  return (
    <Container size="xl" py="lg" style={{ backgroundColor: '#f4f6fa' }}>
      <Title order={2} mb="md">
        Catalog
      </Title>
      {products && <ProductGrid products={products} isLoading={isLoading} />}
    </Container>
  )
}
