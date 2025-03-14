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

    async cadastrarVenda(req, res) {
        
        let vendaId = await this.#vendaRepo.gerarVenda();
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
    
                await this.#itensVendaRepo.cadastrarVenda(entidade);
                cont++;
            } else 
                return res.status(404).json({msg: "Código do produto inexistente!"});
        }  
        if (cont > 0)
            return res.status(201).json({msg: "Pedido cadastrado com sucesso!"})
        else 
            return res.status(400).json({msg: "Erro ao cadastrar pedido"});
            
    }

    async listarVendas (req,res) {
        let lista = await this.#itensVendaRepo.listarVendas();
        if(lista.length === 0)
            return res.status(404).json({msg: "Nenhuma venda foi encontrada!"});
        return res.status(200).json(lista); 
    }

    async excluirVendaUnica(req,res) {
        let {id} = req.params;
        if(await this.#itensVendaRepo.obterVendaUnica(id)) {
            let resultado = await this.#itensVendaRepo.excluirVendaUnica(id);
            if(resultado)
                return res.status(200).json({msg: "Venda excluida com sucesso!"});
            else 
                throw new Error("Erro ao excluir venda!");
        } else {
            return res.status(404).json({msg: "Venda não encontrada!"});
        }
    }

    async obterVendaUnica(req,res) {
        let {id} = req.params;
        const lista = await this.#itensVendaRepo.obterVendaUnica(id) || [];
        if(lista.length === 0)
            return res.status(404).json({msg: "Venda não encontrada!"});
        else
            return res.status(200).json(lista);
    }

    async obterVendaInteira(req,res) {
        let {id} = req.params;
        let lista = await this.#itensVendaRepo.obterVendaInteira(id) || [];
        if(lista.length === 0)
            return res.status(404).json({msg: "Vendas não encontrada!"});
        else
            return res.status(200).json(lista);
    }

    async excluirVendaInteira(req,res) {
        let {id} = req.params;
        if(await this.#itensVendaRepo.obterVendaInteira(id)) {
            let resultado = await this.#itensVendaRepo.excluirVendaInteira(id);
            if(resultado)
                return res.status(200).json({msg: "Vendas excluidas com sucesso!"});
            else 
                throw new Error("Erro ao excluir vendas!");
        } else {
            return res.status(404).json({msg: "Vendas não encontrada!"});
        }
    }
    
}


