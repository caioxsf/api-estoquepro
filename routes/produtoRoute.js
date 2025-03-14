import express from 'express'

import AuthMiddleware from '../middlewares/authMiddleware.js';
import produtoController from '../controllers/produtoController.js';
const router = express.Router();

let ctrl = new produtoController();
let authMiddleware = new AuthMiddleware();

router.post('/produtos', (req,res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.summary = "Endpoint para cadastrar produtos"
    ctrl.cadastrar(req,res);
});

router.get('/produtos', (req,res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.summary = "Endpoint para listar produtos"
    ctrl.listar(req,res);
})

router.put('/produtos', (req,res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.summary = "Endpoint para atualizar produtos"
    ctrl.alterar(req,res);
})

router.get('/produtos/:id', (req,res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.summary = "Endpoint para obter as informações de um produto específico"
    ctrl.obter(req,res);
})

router.delete('/produtos/:id', (req,res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.summary = "Endpoint para excluir um produto específico"
    ctrl.excluir(req,res); 
})

export default router;
