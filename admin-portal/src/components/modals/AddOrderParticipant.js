import React, { useState, useEffect } from 'react';
import { Select, Modal, Button, Input, DatePicker, TimePicker } from 'antd';
import { addParticipants, getParticipants } from 'api';
const { Option } = Select;

export const AddOrderParticipant = ({orderId, isVisible, onOk, onCancel}) => {
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState();

  useEffect(() => {
    setLoading(true);
    getParticipants().then(ps => {
      setParticipants(ps);
      setLoading(false);
    })
  }, []);

  const onAddParticipant = () => {
    if(!selectedParticipant) {
      return
    }
    addParticipants(orderId, [selectedParticipant.id]).then(() => {
      onOk();
    })
  }

  return (
    <Modal
      title="Add a participant"
      visible={isVisible}
      footer={false}
      onCancel={onCancel}
      loading={loading}
    >
      <div style={{ marginBottom: 24 }}>
        {!loading &&
          (
            <Select style={{ display: 'block' }} onChange={(newValue) => setSelectedParticipant(newValue)}>
                {participants.map(p => (
                  <Option value={p.id}>{p.email}</Option>
                )) }
              </Select>
            )
        }
      </div>
      <Button onClick={onAddParticipant}>Add</Button>
    </Modal>
  );
}
