import { useEffect, useState } from 'react';
import { Page, Layout, Card, ResourceList, Text } from '@shopify/polaris';
import { ResourcePicker, useAppBridge } from '@shopify/app-bridge-react';

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const app = useAppBridge();
  console.log('app', app);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const shop = new URLSearchParams(location.search).get("shop");
      console.log('================= >>>>> shop: ', shop);
      const response: any = await fetch(`/api/v1/product/${shop}/products`).then((res) => res).catch((error) => console.error('Error fetching products:', error));
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSelection = (resources) => {
    setOpen(false);
    console.log('Selected resources:', resources);
  };

  return (
    <Page
      title="Dashboard"
      primaryAction={{
        content: 'Select Products',
        onAction: () => setOpen(true),
      }}
    >
      <ResourcePicker
        resourceType="Product"
        open={open}
        onCancel={() => setOpen(false)}
        onSelection={(resources) => handleSelection(resources)}
      />
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'product', plural: 'products' }}
              items={products}
              renderItem={(item: any) => (
                <ResourceList.Item
                  id={item.id}
                  accessibilityLabel={`View details for ${item.title}`}
                  {...item}
                >
                  <h3>
                    <Text as="strong">{item.title}</Text>
                  </h3>
                  <div>{item.description}</div>
                </ResourceList.Item>
              )}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default DashboardPage;
