import express from 'express'

import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();


let authMiddleware = new AuthMiddleware();

router.get('/', (req,res) => {
    // #swagger.tags = ['Tabela FIPE']
    // #swagger.summary = "Endpoint para listar marcas de carros"
    ctrl.listarMarca(req,res);
});

export default router;
