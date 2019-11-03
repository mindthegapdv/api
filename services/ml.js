const axios = require('axios');
const moment = require('moment');

const createOrder = (number, timestamp) => {
  const dt = moment(timestamp);
  const date = dt.format('YYYY-MM-DD');
  const time = dt.format('HH:mm');
  return axios.get(`http://need2feed-ai.herokuapp.com/create-order/${number + 1000}/${date}/${time}`).then(() => axios.get(`http://need2feed-ai.herokuapp.com/add-cuisine/${number + 1000}/Italian`));
};

const addParticipant = (number, email) => axios.get(`http://need2feed-ai.herokuapp.com/add-participant/${number + 1000}/${email}`);
const likeOrder = (number, email) => axios.get(`http://need2feed-ai.herokuapp.com/like/${number + 1000}/${email}`);
const dislikeOrder = (number, email) => axios.get(`http://need2feed-ai.herokuapp.com/dislike/${number + 1000}/${email}`);


module.exports = {
  createOrder, addParticipant, likeOrder, dislikeOrder,
};
