import express from 'express'

import AuthMiddleware from '../middlewares/authMiddleware.js';
import produtoController from '../controllers/produtoController.js';
const router = express.Router();

let ctrl = new produtoController();
let authMiddleware = new AuthMiddleware();

router.post('/produtos/cadastrar', (req,res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.summary = "Endpoint para cadastrar produtos"
    ctrl.cadastrar(req,res);
});

router.get('/produtos/listar', (req,res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.summary = "Endpoint para listar produtos"
    ctrl.listar(req,res);
})

export default router;
