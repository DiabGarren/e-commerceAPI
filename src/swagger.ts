const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'E-Commerce Final Project',
        description: 'API for final e-commerce project',
    },
    host: 'e-commerceapi-aeg4.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.ts'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);