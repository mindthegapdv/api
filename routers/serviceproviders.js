const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
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

  router.post('/', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      contactEmail: Joi.string().required(),
      noticePeriod: Joi.number(),
      costPerPerson: Joi.number().required(),
    }),
  }), asyncify(async (req, res) => {
    const provider = await ServiceProvider.build(req.body);
    const result = await provider.save();
    res.json(result);
  }));
  return router;
};

module.exports = { createServiceProviderRouter };
