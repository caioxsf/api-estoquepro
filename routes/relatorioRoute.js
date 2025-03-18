import express from 'express'
import RelatorioController from '../controllers/relatorioController.js';

const router = express.Router();

let ctrl = new RelatorioController();
router.get('/relatorio/:inicio/:fim', (req,res) => {
    ctrl.RelatorioPeriodo(req,res);
})
router.get('/relatorio/estoque-baixo', (req,res) => {
    ctrl.RelatorioProdutoEstoqueBaixo(req,res);
})
router.get('/relatorio/estoque-medio', (req,res) => {
    ctrl.RelatorioProdutoEstoqueMedio(req,res);
})
router.get('/relatorio/estoque-alto', (req,res) => {
    ctrl.RelatorioProdutoEstoqueAlto(req,res);
})

export default router