import axios from 'axios'

axios.defaults.baseURL = 'https://api.need2feed.us'

export const fetchUserPreferences = token => (
  axios.get('/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.data)
)

export const sendLastOrderFeedback = (token, orderId, feedback) => (
  axios.patch(`/profile/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: { feedback }
  })
)

export const getOrders = () => {
  return axios.get('/orders').then(response => response.data);
}

export const getOrder = (orderId) => {
  return axios.get(`/orders/${orderId}`).then(response => response.data);
}

export const createOrder = (payload) => {
  return axios.post('/orders', payload).then(response => response.data);
}

export const updateOrder = (id, payload) => {
  return axios.patch(`/orders/${id}`, payload).then(response => response.data);
}
