import express from 'express'
import ClienteController from '../controllers/clienteController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

let ctrl = new ClienteController();
let authMiddleware = new AuthMiddleware();

router.get('/clientes/listar', (req,res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.summary = "Endpoint para listar todos os clientes"
    ctrl.listar(req,res);
})

router.post('/clientes/cadastrar', (req,res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.summary = "Endpoint para cadastrar um cliente"
    ctrl.cadastrar(req,res);
});

export default router;
