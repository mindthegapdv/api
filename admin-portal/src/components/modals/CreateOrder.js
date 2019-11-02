import React, { useState } from 'react';
import { Modal, Button, Input, DatePicker, TimePicker } from 'antd';
import { createOrder } from 'api';

export const CreateOrder = ({isVisible, onOk, onCancel}) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const onCreateOrder = () => {
    if (!date || !time || !name) {
      return
    }

    const dt_scheduled = date.toISOString().substr(0, 11) + time.toISOString().substr(11, 25);
    const payload = {
      name,
      dt_scheduled,
    }
    createOrder(payload).then((result) => {
      onOk(result);
    });
  }

  return (
    <Modal
      title="Create an order"
      visible={isVisible}
      footer={false}
      onCancel={onCancel}
    >
      <div>
        <span>Order Name</span>
        <Input placeholder="Order name" value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: 24 }}/>
      </div>
      <div>
        <span style={{ display: 'block' }}>Date</span>
        <DatePicker placeholder="Date" value={date} onChange={e => setDate(e)} style={{ marginBottom: 24, display: 'block' }}/>
      </div>
      <div>
        <span style={{ display: 'block' }}>Time</span>
        <TimePicker placeholder="Time" value={time} onChange={e => setTime(e)} style={{ marginBottom: 24, display: 'block' }}/>
      </div>
      <Button onClick={onCreateOrder}>Create</Button>
    </Modal>
  );
}
