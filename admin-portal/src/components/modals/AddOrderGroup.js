import React, { useState, useEffect } from 'react';
import { Select, Modal, Button, Input, DatePicker, TimePicker } from 'antd';
import { addParticipants, getGroups } from 'api';
const { Option } = Select;

export const AddOrderGroup = ({orderId, isVisible, onOk, onCancel}) => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();

  useEffect(() => {
    setLoading(true);
    getGroups().then(groups => {
      setGroups(groups);
      setLoading(false);
    })
  }, []);

  const onAddOrderGroup = () => {
    if(!selectedGroup) {
      return
    }
    const group = groups.find(group => group.id === selectedGroup);
    if (!group) {
      return
    }
    const { participants } = group;
    addParticipants(orderId, participants.map(p => p.id)).then(() => {
      onOk();
    })
  }

  return (
    <Modal
      title="Add a group"
      visible={isVisible}
      footer={false}
      onCancel={onCancel}
      loading={loading}
    >
      <div style={{ marginBottom: 24 }}>
        {!loading &&
          (
            <Select style={{ display: 'block' }} onChange={(newValue) => setSelectedGroup(newValue)}>
                {groups.map(group => (
                  <Option value={group.id}>{group.name}</Option>
                )) }
              </Select>
            )
        }
      </div>
      <Button onClick={onAddOrderGroup}>Add</Button>
    </Modal>
  );
}
