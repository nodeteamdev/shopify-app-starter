import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Page,
  Card,
  DataTable,
  Button,
  Thumbnail,
  TextField,
  Select,
  Pagination,
  BlockStack,
} from '@shopify/polaris';
import { useAuthenticatedFetch } from '../hooks/index.js';

const DEFAULT_PAGINATION_LIMIT = 10;

const  ProductList = () => {
  const fetch = useAuthenticatedFetch();
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ endCursor: null, hasNextPage: false });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [reverse, setReverse] = useState('');

  const shop = useSelector((state) => state.shop.shop);

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      const urlParams = new URLSearchParams({
        first: DEFAULT_PAGINATION_LIMIT,
        ...Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== null && v !== '')),
      });
      const url = `/api/v1/product/${shop}/products?${urlParams.toString()}`;
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

  // const getRecomandations = async (param = {}) => {
  //   console.log('getRecomendations');
  // } 

  useEffect(() => {
    fetchProducts();
  }, [shop]);

  const handleNextPage = () => {
    if (pageInfo.hasNextPage) {
      fetchProducts({ after: pageInfo.endCursor, query, sortKey, reverse });
    }
  };

  const handleSearch = () => {
    fetchProducts({ query, sortKey, reverse });
  };

  const rows = products.map(product => [
    product.title,
    product.type || 'N/A',
    <Thumbnail
      source={product.image.url || ''}
      alt={product.image.altText || 'No Image Available'}
    />,
    `${product.price.minVariantPrice.amount} ${product.price.minVariantPrice.currencyCode} - ${product.price.maxVariantPrice.amount} ${product.price.maxVariantPrice.currencyCode}`,
    product.status,
    <Button>Edit</Button>,
    <Button>Delete</Button>
  ]);

  return (
    <Page
      title="Products in this collection"
      primaryAction={<Button primary>Add product</Button>}
      fullWidth
    >
      <Card>
        <BlockStack>
          <TextField
            label="Search"
            value={query}
            onChange={setQuery}
            placeholder="Search products"
          />
          <Select
            label="Sort By"
            options={[
              { label: 'Created At', value: 'CREATED_AT' },
              { label: 'Title', value: 'TITLE' },
              // Add other sort options as needed
            ]}
            value={sortKey}
            onChange={setSortKey}
          />
          <Select
            label="Order"
            options={[
              { label: 'Ascending', value: false },
              { label: 'Descending', value: true },
            ]}
            value={reverse}
            onChange={setReverse}
          />
          <Button onClick={handleSearch}>Search</Button>
        </BlockStack>
        <DataTable
          columnContentTypes={[
            'text',
            'text',
            'text',
            'text',
            'text',
            'numeric',
            'numeric'
          ]}
          headings={[
            'Product',
            'Type',
            'Image',
            'Price',
            'Status',
            '',
            ''
          ]}
          rows={rows}
        />
        <Pagination
          hasNext={pageInfo.hasNextPage}
          onNext={() => handleNextPage()}
        />
      </Card>
    </Page>
  );
}

export default ProductList;
