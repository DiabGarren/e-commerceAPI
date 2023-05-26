const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'E-Commerce Final Project',
        description: 'API for final e-commerce project',
    },
    host: 'e-commerceapi-aeg4.onrender.com',
    schemes: ['https'],
    securityDefinitions: {
        Authorization: {
            type: 'oauth2',
            name: 'authorization',
            in: 'header',
            description: 'Authentication link',
            authorizationUrl: 'https://e-commerceapi-aeg4.onrender.com/login',
        }
    },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);