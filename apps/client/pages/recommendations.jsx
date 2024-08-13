import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Page,
  Card,
  Button,
  Select,
  Pagination,
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
  const [pageInfo, setPageInfo] = useState({ endCursor: null, hasNextPage: false });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [reverse, setReverse] = useState('');
  const [productFilter, setProductFilter] = useState('HOT');

  const shop = useSelector((state) => state.shop.shop);

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      const urlParams = new URLSearchParams({
        first: DEFAULT_PAGINATION_LIMIT,
        ...Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== null && v !== '')),
      });
      const url = `/api/v1/product/${shop}/products/recommendations?${urlParams.toString()}`;
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        const { products: productsData, pageInfo: pageInfoData } = await response.json();
        setProducts(productsData);
        setPageInfo(pageInfoData);
      } else {
        console.error("HTTP-Error: " + response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [shop]);

  const handleNextPage = () => {
    if (pageInfo.hasNextPage) {
      fetchProducts({ sortType: productFilter, skip: 0, limit: 10 });
    }
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
                  { label: 'Most viewed', value: 'MOST_VIEWED' },
                  { label: 'Most ordered', value: 'MOST_ORDERED' },
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
                      source={product.image.url || ''}
                      alt={product.image.altText || 'No Image Available'}
                    />,
                    <Text as="h5"><p>{`${product.price.minVariantPrice.amount} ${product.price.minVariantPrice.currencyCode} - ${product.price.maxVariantPrice.amount} ${product.price.maxVariantPrice.currencyCode}`}</p></Text>
                    <Button className="btn"> Buy <i className="fa fa-shopping-cart" aria-hidden="true"></i></Button>
                  </Card>
                </Grid.Cell>
              ))
            }
          </Grid>
          </BlockStack>

          <BlockStack gap="400">
            <Pagination
              hasNext={pageInfo.hasNextPage}
              onNext={() => handleNextPage()}
            />
          </BlockStack>
      </Card>
    </Page>
  );
}

export default RecommendationsList;
