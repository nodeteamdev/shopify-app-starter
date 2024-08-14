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
      title="Products in this collection"
      primaryAction={<Button primary>Add product</Button>}
      fullWidth
    >
      <Card roundedAbove="sm">
          <BlockStack gap="400">
            <Select
                options={[
                  { label: 'Hot', value: 'HOT' },
                  { label: 'Best sellers', value: 'BEST_SELLERS' },
                ]}
                value={productFilter}
                onChange={(value) => setProductFilter(value)}
              />
          </BlockStack>
          <BlockStack gap="400">

          <Grid columns={{xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
            {
              products.map((product) => (
                <Grid.Cell columns={{xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
                  <Card>
                    <Text as="h3">{product.title}</Text>
                    <Thumbnail
                      source={product.featuredImage.url || ''}
                      alt={product.featuredImage.altText || 'No Image Available'}
                    />,
                    <Text as="h5"><p>{`${product.priceRangeV2.maxVariantPrice.amount} ${product.priceRangeV2.minVariantPrice.currencyCode} - ${product.priceRangeV2.minVariantPrice.currencyCode}`}</p></Text>
                    <Button className="btn"> Buy <i className="fa fa-shopping-cart" aria-hidden="true"></i></Button>
                  </Card>
                </Grid.Cell>
              ))
            }
          </Grid>
          </BlockStack>

          <BlockStack>
            <Button onClick={() => handlePrevPage()}>Prev</Button>
            <Button onClick={() => handleNextPage()}>Next</Button>
          </BlockStack>
      </Card>
    </Page>
  );
}

export default RecommendationsList;
