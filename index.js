const express = require('express');
const cors = require('cors');
const { asyncify } = require('./utils');
const { createServiceProviderRouter } = require('./routers/serviceproviders');
const { createGroupRouter } = require('./routers/groups');
const { createOrderRouter } = require('./routers/orders');
const { createProfileRouter } = require('./routers/profile');

const { createParticipantRouter } = require('./routers/participants');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/service-providers', createServiceProviderRouter());
app.use('/groups', createGroupRouter());
app.use('/orders', createOrderRouter());
app.use('/profile', createProfileRouter());
app.use('/participants', createParticipantRouter());

app.get('/', asyncify(async (req, res) => res.json({ ok: true })));
app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log('ERROR', error.message || (error.joi && error.joi.details));
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message || (error.joi && error.joi.details) });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
