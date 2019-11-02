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
