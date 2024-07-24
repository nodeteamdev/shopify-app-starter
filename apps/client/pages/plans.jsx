import { useEffect, useState } from 'react';
import { 
  Page,
  Layout,
  Spinner,
  Text,
  Button,
  Banner,
  LegacyStack as Stack,
  LegacyCard as Card,
} from '@shopify/polaris';
import axios from 'axios';

export const getSubscriptionPlans = async () => {
  const url = '/api/v1/subscription-plan';

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch subscription plans', error);
  }
};

const createSubscription = async (planId, shop) => {
  const url = `/api/v1/app-subscription/${shop}/subscription-plan/${planId}`;

  try {
    const response = await axios.post(url);

    const { confirmationUrl } = response.data;

    if (confirmationUrl) {
      window.top.location.href = confirmationUrl;
    } else {
      throw new Error('No redirect URL found');
    }
  } catch (error) {
    console.error('Failed to create subscription:', error);
    alert('Failed to create subscription. Please try again.');
  }
};

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shop = new URLSearchParams(location.search).get('shop');

  const dashboardUrl = `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getSubscriptionPlans();
        setPlans(data);
      } catch (error) {
        setError('Failed to fetch subscription plans', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSkip = () => {
    window.top.location.href = dashboardUrl;
  };

  if (loading) return <Spinner accessibilityLabel="Loading" size="large" />;
  if (error) return <Banner status="critical">{error}</Banner>;

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Stack alignment="center" distribution="center">
            <Text
              variant="headingLg"
              as="h1"
              fontWeight='bold'
            >Subscription Plans</Text>
          </Stack>
          <div style={{ marginTop: '30px' }}></div>
        </Layout.Section>
        <Layout.Section>
          <Stack distribution="fillEvenly" spacing="loose">
            {plans.map(plan => (
              <Card key={plan.id} title={plan.name} sectioned>
                <Text as="p" variation="strong">${plan.amount} per month</Text>
                <div style={{ marginTop: '10px' }}></div>
                <Text as="p">{plan.description}</Text>
                <div style={{ marginTop: '30px' }}></div>
                <Button primary onClick={() => createSubscription(plan.id, shop)}>
                  Continue
                </Button>
              </Card>
            ))}
          </Stack>
        </Layout.Section>
        <Layout.Section>
          <div style={{ marginTop: '30px' }}></div>
          <Stack alignment="center" distribution="center">
            <Text>
              You can choose a plan later.{' '}
              <Button plain onClick={handleSkip}>
                Skip this page
              </Button>
            </Text>
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default SubscriptionPlans;
