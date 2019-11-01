const { Router } = require('express');
const { asyncify } = require('../utils');
// const { requireAuth } = require('../middleware');
const ServiceProvider = require('../models/serviceproviders');

const createServiceProviderRouter = () => {
  const router = Router();
  // router.use(requireAuth);
  router.get('/', asyncify(async (req, res) => {
    const providers = await ServiceProvider.findAll();
    return res.json(providers);
  }));
  return router;
};

module.exports = { createServiceProviderRouter };
