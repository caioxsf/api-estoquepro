import express from 'express'
import RelatorioController from '../controllers/relatorioController.js';

const router = express.Router();

let ctrl = new RelatorioController();
router.get('/relatorio/:inicio/:fim', (req,res) => {
    ctrl.RelatorioPeriodo(req,res);
})

export default router