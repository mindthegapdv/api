import React, { useState, useEffect } from 'react';
import { useRouter } from 'useRouter';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { getOrders } from 'api'
import { Button, Typography } from 'antd';
import { Table } from 'antd';
import { CreateOrder } from 'components/modals/CreateOrder';

const { Title } = Typography;

const columns = [
  {
    title: 'When',
    dataIndex: 'dt_scheduled',
    key: 'dt_scheduled',
    render: (data) => {
      const parsed = moment(data);
      return parsed.format("ddd, hA");
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Link to={`/orders/${record.id}`}>Edit</Link>
    )
  }
];

export const Orders = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    getOrders().then((orders) => {
      setOrders(orders);
      setLoading(false);
    })
  }, []);


  return (
    <div>
      <CreateOrder isVisible={modalOpen} onOk={(result) => {
        router.history.push(`/orders/${result.id}`);
        setModalOpen(false);
      }} onCancel={() => setModalOpen(false)}/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
        <Title>Orders</Title>
        <Button type="primary" size="large" style={{ marginBottom: 19 }} onClick={() => setModalOpen(true)}>
          Add Order
        </Button>
      </div>
      <Table showHeader={true} loading={loading} dataSource={orders} columns={columns} pagination={false} />
    </div>
  )
}
