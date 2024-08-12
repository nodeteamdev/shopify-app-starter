import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Page,
  LegacyCard as Card,
  DataTable,
  Button,
  Pagination,
} from '@shopify/polaris';
import { useAuthenticatedFetch } from '../hooks/index.js';

const DEFAULT_PAGINATION_LIMIT = 10;

const OrderList = () => {
  const fetch = useAuthenticatedFetch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const shop = useSelector((state) => state.shop.shop);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const urlParams = new URLSearchParams({
        perPage: DEFAULT_PAGINATION_LIMIT,
        page,
      });
      const url = `/api/v1/order/${shop}?${urlParams.toString()}`;
      const response = await fetch(url, { method: 'GET' });

      if (response.ok) {
        const { data: ordersData, meta } = await response.json();

        setOrders(ordersData);
        setTotalPages(meta.totalPages);
      } else {
        console.error('HTTP-Error: ' + response.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [shop, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const rows = orders.map((order) => [
    order.id,
    order.createdAt,
    order.discountCodes.join(', ') || 'None',
    order.currencyCode,
    order.displayFinancialStatus,
    order.lineItems.length,
    <Button>View</Button>,
  ]);

  return (
    <Page title="Orders" fullWidth>
      <Card>
        <DataTable
          columnContentTypes={[
            'text',
            'text',
            'text',
            'text',
            'text',
            'numeric',
            'numeric',
          ]}
          headings={[
            'Order ID',
            'Created At',
            'Discount Codes',
            'Currency',
            'Financial Status',
            'Items Count',
            '',
          ]}
          rows={rows}
        />
        <Pagination
          hasNext={currentPage < totalPages}
          onNext={handleNextPage}
          hasPrevious={currentPage > 1}
          onPrevious={handlePreviousPage}
        />
      </Card>
    </Page>
  );
};

export default OrderList;
