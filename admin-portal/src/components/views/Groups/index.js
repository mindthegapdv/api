import React, { useState, useEffect } from 'react';
import { useRouter } from 'useRouter';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { getGroups } from 'api'
import { Button, Typography } from 'antd';
import { Table } from 'antd';

const { Title } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Cost Code',
    dataIndex: 'costCode',
    key: 'costCode'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Link to={`/groups/${record.id}`}>Edit</Link>
    )
  }
];

export const Groups = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups().then((groups) => {
      setGroups(groups);
      setLoading(false);
    })
  }, []);

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Dietary Requirements',
        dataIndex: 'dietaryRequirements',
        key: 'dietaryRequirements'
      },
    ];
    return <Table columns={columns} dataSource={record.participants} pagination={false} />;
  }


  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
        <Title>Groups</Title>
        <Button type="primary" size="large" style={{ marginBottom: 19 }} onClick={() => {}}>
          Add Group
        </Button>
      </div>
      <Table showHeader={true} loading={loading} dataSource={groups} columns={columns} pagination={false} expandedRowRender={expandedRowRender} />
    </div>
  )
}
