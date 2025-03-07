import express from 'express'

// Rotas
// import testeRoute from './routes/testeRoute.js';
import clienteRoute from './routes/clienteRoute.js';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import swaggerUi from 'swagger-ui-express';
import { errorHandler, catchErrors } from './middlewares/exeptionMiddleware.js';

const app = express();
app.use(express.json());

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
// app.use('/teste', testeRoute);

app.use('/', catchErrors(clienteRoute));

app.use(errorHandler);

app.listen(5000, function() {
    console.log("backend em execução");
})

export default app;
