import itensVendaEntity from "../entities/itensVendaEntity.js";
import itensVendaRepository from "../repositories/itensVendaRepository.js";
import produtoRepository from "../repositories/produtoRepository.js";
import vendaRepository from "../repositories/vendaRepository.js"

export default class vendaController {

    #vendaRepo
    #itensVendaRepo
    #itensVendaEntity
    #produtoRepository
    constructor() {
        this.#vendaRepo = new vendaRepository();
        this.#itensVendaRepo = new itensVendaRepository();
        this.#itensVendaEntity = itensVendaEntity;
        this.#produtoRepository = new produtoRepository();
    }

   async cadastrarVenda(req, res) {

        // Gera a venda
        let vendaId = await this.#vendaRepo.gerarVenda();
        let cont = 0;

        for (let i = 0; i < req.body.length; i++) {
            const entidade = new this.#itensVendaEntity();
            let { quantidade, produto_id } = req.body[i];
            //
            // Verifica o código do produto pra ver se ele realmente existe
            entidade.produto_id = parseInt(produto_id);
            if (await this.#itensVendaRepo.verificarCodigoDoProduto(produto_id)) {
                // Busca o preço do produto pra fazer o subtotal direto no banco de dados
                let resultado = await this.#produtoRepository.buscarPrecoDoProduto(produto_id)
                let preco = resultado[0].prod_preco;

                entidade.venda_id = vendaId;
                entidade.quantidade = parseInt(quantidade);
                entidade.preco = parseFloat(preco);
                entidade.subtotal = entidade.quantidade * preco;
                // Verifica se o estoque do produto é maior que a quantidade desejada pelo cliente
                // Se o retorno for diferente de null ele atualiza o estoque e cadastra a venda
                if (await this.#produtoRepository.verificarEstoqueDoProduto(produto_id, quantidade)) {
                    await this.#itensVendaRepo.atualizarEstoque(entidade.quantidade, entidade.produto_id);
                    await this.#itensVendaRepo.cadastrarVenda(entidade);
                    cont++;
                } else {
                    return res.status(400).json({ msg: `Estoque do produto ${produto_id} insuficiente!` });
                }
            } else {
                // Deleta a ultima venda gerada caso o código do produto for inexistente
                await this.#vendaRepo.deletarVendaGerada(vendaId)
                return res.status(404).json({ msg: "Código do produto inexistente!" });
            }
        }
        if (cont > 0)
            return res.status(201).json({ msg: "Pedido cadastrado com sucesso!" })
        else {
            // Deleta a ultima venda gerada caso o código do produto for inexistente
            await this.#vendaRepo.deletarVendaGerada(vendaId)
            return res.status(400).json({ msg: "Erro ao cadastrar pedido" });
        }

    }

    // async alterarVenda(req,res) {
    //     let entidade = new itensVendaEntity();
    //     let {quantidade, preco, id} = req.body;
    //     if(quantidade && preco && id) {
    //         entidade.quantidade = parseInt(quantidade);;
    //         entidade.preco = parseFloat(preco);
    //         entidade.subtotal = entidade.quantidade * entidade.preco;
    //         entidade.id = id;
    //         if(await this.#itensVendaRepo.alterarVenda(entidade))
    //             return res.status(200).json({ msg: "Venda alterada com sucesso!" })
    //         else
    //             throw new Error("Erro ao alterar venda!");
    //     } else {
    //         return res.status(400).json({ msg: "Parametros inválidos!" });
    //     }
    // }

    async listarVendas(req, res) {
        let lista = await this.#itensVendaRepo.listarVendas();
        if (lista.length === 0)
            return res.status(404).json({ msg: "Nenhuma venda foi encontrada!" });
        return res.status(200).json(lista);
    }

    async excluirVendaUnica(req, res) {
        let { id } = req.params;
        if (await this.#itensVendaRepo.obterVendaUnica(id)) {
            let resultado = await this.#itensVendaRepo.excluirVendaUnica(id);
            if (resultado)
                return res.status(200).json({ msg: "Venda excluida com sucesso!" });
            else
                throw new Error("Erro ao excluir venda!");
        } else {
            return res.status(404).json({ msg: "Venda não encontrada!" });
        }
    }

    async obterVendaUnica(req, res) {
        let { id } = req.params;
        const lista = await this.#itensVendaRepo.obterVendaUnica(id) || [];
        if (lista.length === 0)
            return res.status(404).json({ msg: "Venda não encontrada!" });
        else
            return res.status(200).json(lista);
    }

    async obterVendaInteira(req, res) {
        let { id } = req.params;
        let lista = await this.#itensVendaRepo.obterVendaInteira(id) || [];
        if (lista.length === 0)
            return res.status(404).json({ msg: "Vendas não encontrada!" });
        else
            return res.status(200).json(lista);
    }

    async excluirVendaInteira(req, res) {
        let { id } = req.params;
        if (await this.#itensVendaRepo.obterVendaInteira(id)) {
            let resultado = await this.#itensVendaRepo.excluirVendaInteira(id);
            if (resultado)
                return res.status(200).json({ msg: "Vendas excluidas com sucesso!" });
            else
                throw new Error("Erro ao excluir vendas!");
        } else {
            return res.status(404).json({ msg: "Vendas não encontrada!" });
        }
    }



}


