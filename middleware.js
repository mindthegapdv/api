const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const requireAuth = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-d3vsj4pm.auth0.com/.well-known/jwks.json',
  }),
  // Validate the audience and the issuer.
  audience: 'YOUR_API_IDENTIFIER',
  issuer: 'https://dev-d3vsj4pm.auth0.com/',
  algorithms: ['RS256'],
});

module.exports = { requireAuth };
