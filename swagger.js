const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipes Api',
    description: 'Recipes Api',
  },
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this generates swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
