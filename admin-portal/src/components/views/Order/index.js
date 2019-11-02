import React, { useState, useEffect } from 'react';
import * as moment from 'moment';
import { useRouter } from 'useRouter';
import { getOrder, updateOrder } from 'api';
import { Spin, Button, Typography } from 'antd'
import { Input, TimePicker, DatePicker } from "antd";
const { Text, Title } = Typography;

const Section = ({ children, title }) => (
  <div>
    <span style={{ display: 'block', color: '#2D9CDB', fontSize: 15, marginBottom: 9 }}>{title}</span>
    <div style={{ padding: 24, backgroundColor: '#fff', borderRadius: 8, marginBottom: 24 }}>
      {children}
    </div>
  </div>
);

const LabelledInput = ({ children, label }) => (
  <div style={{ display: "inline-block", padding: 8 }}>
    <span style={{ display: 'block', paddingBottom: 2 }}>{label}</span>
    {children}
  </div>
)

export const Order = () => {
  const { match } = useRouter();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder(match.params.orderId).then(order => {
      setOrder(order);
      setLoading(false);
    })
  }, [match.params.orderId]);


  if (loading) {
    return <Spin />
  }

  const scheduledFor = moment(order.dt_scheduled);

  const updateLocation = (e) => {
    setOrder({ ...order, location: e.target.value });
  }

  const updateDate = (m) => {
    const dt_scheduled = m.toISOString().substr(0, 11) + scheduledFor.toISOString().substr(11, 25);
    setOrder({ ...order, dt_scheduled });
  }

  const updateTime = (m) => {
    const dt_scheduled = scheduledFor.toISOString().substr(0, 11) + m.toISOString().substr(11, 25);
    setOrder({ ...order, dt_scheduled });
  }

  const persistUpdates = () => {
    setLoading(true);
    const { id, ...rest } = order;
    const updates= Object.keys(rest).reduce((result, key) => {
      if (rest[key] && ['createdAt', 'updatedAt'].indexOf(key) === -1) {
        return { ...result, [key]: rest[key] };
      }
      return result;
    }, {});

    updateOrder(id, updates).then((newOrder) => {
      setOrder(newOrder);
      setLoading(false);
    })
  }
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
        <div>
          <Title>{order.name || `Order ${order.id}`}</Title>
        </div>
        <Button type="primary" size="large" style={{ marginBottom: 19 }} onClick={persistUpdates}>
          Update Order
        </Button>
      </div>
      <Section title="When should the food arrive?">
        <LabelledInput label="Date">
          <DatePicker name="date" placeholder="Date" value={scheduledFor} onChange={updateDate}/>
        </LabelledInput>
        <LabelledInput label="Time">
          <TimePicker name="time" placeholder="Time" value={scheduledFor} onChange={updateTime}/>
        </LabelledInput>
        <LabelledInput label="Location">
          <Input name="location" placeholder="Location" value={order.location} onChange={updateLocation} />
        </LabelledInput>
      </Section>
      <Section title="Who’s eating?" />
      <Section title="Whats on the menu?" />
      <Section title="Who might eat?" />
      <Section title="Order from" />
    </div>
  );
}
