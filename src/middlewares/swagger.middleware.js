const swaggerUi = require('swagger-ui-express');
const doc = require('../docs/swagger.json');

module.exports = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(doc));
}