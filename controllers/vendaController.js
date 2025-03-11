import itensVendaEntity from "../entities/itensVendaEntity.js";
import produtoEntity from "../entities/produtoEntity.js";
import itensVendaRepository from "../repositories/itensVendaRepository.js";
import produtoRepository from "../repositories/produtoRepository.js";
import vendaRepository from "../repositories/vendaRepository.js"

export default class vendaController {

    #vendaRepo
    #itensVendaRepo
    #itensVendaEntity
    constructor() {
        this.#vendaRepo = new vendaRepository();
        this.#itensVendaRepo = new itensVendaRepository();
        this.#itensVendaEntity = itensVendaEntity;
    }

    async cadastrarPedido(req, res) {
        
        let vendaId = await this.#vendaRepo.gerarPedido();
        let cont = 0;

        for (let i=0;i<req.body.length;i++) {
            const entidade = new this.#itensVendaEntity();
            let {quantidade, preco, produto_id} = req.body[i];

            entidade.produto_id = parseInt(produto_id);
            if(await this.#itensVendaRepo.verificarCodigoDoProduto(produto_id)) {
                entidade.venda_id = vendaId;
                entidade.quantidade = parseInt(quantidade);
                entidade.preco = parseFloat(preco);
                entidade.subtotal = entidade.quantidade * entidade.preco;
    
                await this.#itensVendaRepo.cadastrarPedido(entidade);
                cont++;
            } else 
                return res.status(404).json({msg: "Código do produto inexistente!"});
        }  
        if (cont > 0)
            return res.status(201).json({msg: "Pedido cadastrado com sucesso!"})
        else 
            return res.status(400).json({msg: "Erro ao cadastrar pedido"});
            
    }
    
}


