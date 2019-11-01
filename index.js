const express = require('express');
const Order = require('./models/order');

const PORT = process.env.PORT || 5000;

const app = express();

function asyncify(fn) {
  async function asyncifyWrap(req, res, next) {
    try {
      return await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  }
  return asyncifyWrap;
}

app.get('/', asyncify(async (req, res) => {
  console.log(Order);
  const results = await Order.findAll({ attributes: ['dt_scheduled'] });
  console.log(results);
  return res.send('Hi');
}));
app.post('/', (req, res) => res.send('Received a POST HTTP method'));
app.put('/', (req, res) => res.send('Received a PUT HTTP method'));
app.delete('/', (req, res) => res.send('Received a DELETE HTTP method'));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
