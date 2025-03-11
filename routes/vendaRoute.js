import express from 'express';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import vendaController from '../controllers/vendaController.js';

const router = express.Router();

let ctrl = new vendaController();
let authMiddleware = new AuthMiddleware();

router.post('/vendas/cadastrar', (req, res) => {
    // #swagger.tags = ['Vendas']
    // #swagger.summary = "Endpoint para cadastrar vendas"
    /* 
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            produto_id: { type: "string" },
                            quantidade: { type: "string" },
                            preco: { type: "string" }
                        }
                    }
                }
            }
        }
    }
    */
    ctrl.cadastrarVenda(req, res);
});

export default router;