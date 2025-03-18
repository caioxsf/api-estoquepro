import express from 'express'
import cors from 'cors'
// Rotas
// import testeRoute from './routes/testeRoute.js';
import clienteRoute from './routes/clienteRoute.js';
import produtoRoute from './routes/produtoRoute.js'
import vendaRoute from './routes/vendaRoute.js'
import relatorioRoute from './routes/relatorioRoute.js';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import swaggerUi from 'swagger-ui-express';
import { errorHandler, catchErrors } from './middlewares/exeptionMiddleware.js';

const app = express();
app.use(cors());
app.use(express.json());

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
// app.use('/teste', testeRoute);

app.use('/', catchErrors(clienteRoute));
app.use('/', catchErrors(produtoRoute));
app.use('/', catchErrors(vendaRoute));
app.use('/', catchErrors(relatorioRoute))

app.use(errorHandler);

app.listen(5000, function() {
    console.log("backend em execução");
})

export default app;
