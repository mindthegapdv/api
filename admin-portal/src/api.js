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
  return axios.patch('/profile', { data }, setHeaders(token))
}

export const sendLastOrderFeedback = (token, orderId, feedback) => (
  console.log(token, orderId, feedback)
  // axios.patch(`/profile/orders/${orderId}`, {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   },
  //   data: { feedback }
  // })
)
