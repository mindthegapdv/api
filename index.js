const express = require('express');
const { asyncify } = require('./utils');
const { createServiceProviderRouter } = require('./routers/serviceproviders');

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/service-providers', createServiceProviderRouter());

app.get('/', asyncify(async (req, res) => res.json({ ok: true })));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
