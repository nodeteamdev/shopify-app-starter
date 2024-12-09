import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Page,
  Card,
  Button,
  Select,
  BlockStack,
  Text,
  Grid,
  Thumbnail,
  Divider,
  Box,
  ButtonGroup,
} from '@shopify/polaris';
import { useAuthenticatedFetch } from '../hooks/index.js';

const DEFAULT_PAGINATION_LIMIT = 10;

const  RecommendationsList = () => {
  const fetch = useAuthenticatedFetch();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ skip: 0, limit: DEFAULT_PAGINATION_LIMIT });
  const [productFilter, setProductFilter] = useState('HOT');

  const shop = useSelector((state) => state.shop.shop);

  const fetchProducts = async (params = {}) => {
    try {
      const urlParams = new URLSearchParams({
        sortType: productFilter, skip: 0, limit: 10,
        ...params,
      });
      const url = `/api/v1/product/${shop}/products/recommendations?${urlParams.toString()}`;

      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        const { products } = await response.json();
  
        setProducts(products);
      } else {
        console.error("HTTP-Error: " + response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts({ sortType: productFilter, skip: 0, limit: DEFAULT_PAGINATION_LIMIT });
  }, [shop]);

  const handlePrevPage = () => {
    const skip = pagination.skip - DEFAULT_PAGINATION_LIMIT;
    const limit = DEFAULT_PAGINATION_LIMIT;
    
    fetchProducts({ sortType: productFilter, skip, limit });
    setPagination({ limit, skip });
};

  const handleNextPage = () => {
      const skip = pagination.skip + DEFAULT_PAGINATION_LIMIT;
      const limit = DEFAULT_PAGINATION_LIMIT;
      
      fetchProducts({ sortType: productFilter, skip, limit });
      setPagination({ limit, skip });
  };

  return (
    <Page
      title="Products in this Collection"
      primaryAction={<Button primary>Add Product</Button>}
      fullWidth
    >
      <Card sectioned>
        <BlockStack gap="4">
          <Box padding="4">
            <Select
              label="Sort Products By"
              options={[
                { label: 'Hot', value: 'HOT' },
                { label: 'Best Sellers', value: 'BEST_SELLERS' },
              ]}
              value={productFilter}
              onChange={(value) => setProductFilter(value)}
            />
          </Box>
  
          <Divider />
  
          <Box padding="4" style={{ marginTop: '20px' }}>
            <Grid columns={{ xs: 2, sm: 3, md: 4, lg: 4 }} gap="4">
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid.Cell key={product.id}>
                    <Card title={product.title} sectioned>
                      <BlockStack gap="3">
                        <Thumbnail
                          source={product.featuredImage?.url || ''}
                          alt={product.featuredImage?.altText || 'No Image Available'}
                          size="large"
                        />
                        <Text variant="headingMd">{product.title}</Text>
                        <Text variant="bodyMd">
                          {`${product.priceRangeV2.maxVariantPrice.amount} ${product.priceRangeV2.maxVariantPrice.currencyCode}`}
                        </Text>
                        <Button fullWidth>
                          Buy <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </Button>
                      </BlockStack>
                    </Card>
                  </Grid.Cell>
                ))
              ) : (
                <Text>No products available.</Text>
              )}
            </Grid>
          </Box>
  
          <Box style={{ marginTop: '20px' }} padding="4">
              <ButtonGroup fullWidth>
                <Button
                  disabled={pagination.skip === 0}
                  onClick={handlePrevPage}
                >
                  Previous
                </Button>
                <Button
                  disabled={pagination.skip + pagination.limit >= products}
                  onClick={handleNextPage}
                >
                  Next
                </Button>
              </ButtonGroup>
          </Box>
        </BlockStack>
      </Card>
    </Page>
  );  
};

export default RecommendationsList;
