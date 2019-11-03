import axios from 'axios'

axios.defaults.baseURL = 'https://api.need2feed.us'

const setHeaders = token => ({
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

export const fetchUserPreferences = token => (
  axios
    .get('/profile', setHeaders(token))
    .then(response => response.data)
)

export const updateDietaryRequirements = (token, dietaryRequirements) => {
  const data = { dietaryRequirements }
  return axios.patch('/profile', data, setHeaders(token))
}

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

export const getServiceProviders = () => {
  return axios.get('/service-providers').then(response => response.data);
}

export const getGroups = () => {
  return axios.get('/groups').then(response => response.data);
}

export const getParticipants = () => {
  return axios.get('/participants').then(response => response.data);
}

export const addParticipants = (orderId, participantIds) => {
  return axios.post(`/orders/${orderId}/participants`, {
    participants: participantIds
  }).then(response => response.data);
}
export const updateOrderStatus = (token, orderId, status) => {
  const data = { status }
  return axios.patch(`/profile/orders/${orderId}`, data, setHeaders(token))
}

export const updateOrderFeedback = (token, orderId, feedback) => {
  const data = { feedback }
  return axios.patch(`/profile/orders/${orderId}`, data, setHeaders(token))
}

export const getFit = (orderId) => {
  return axios.get(`http://need2feed-ai.herokuapp.com/fit/${orderId + 1000}`).then(response => response.data.fit);
}
