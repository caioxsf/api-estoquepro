import express from 'express'
import ClienteController from '../controllers/clienteController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

let ctrl = new ClienteController();
let authMiddleware = new AuthMiddleware();

router.get('/clientes', (req,res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.summary = "Endpoint para listar todos os clientes"
    ctrl.listar(req,res);
});

router.post('/clientes', (req,res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.summary = "Endpoint para cadastrar um cliente"
    ctrl.cadastrar(req,res);
});

router.put('/clientes', (req,res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.summary = "Endpoint para alterar um cliente"
    ctrl.alterar(req,res);
});


router.get('/clientes/:id', (req,res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.summary = "Endpoint para obter um cliente"
    ctrl.obter(req,res);
});

router.delete('/clientes/:id', (req,res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.summary = "Endpoint para excluir um cliente"
    ctrl.excluir(req,res);
});


export default router;
