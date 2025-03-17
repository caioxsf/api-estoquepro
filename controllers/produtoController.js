import produtoEntity from "../entities/produtoEntity.js";
import produtoRepository from "../repositories/produtoRepository.js";

export default class produtoController {

    #repo
    constructor() {
        this.#repo = new produtoRepository();
    }

    async cadastrar(req, res) {
        if (req.body) {
            let { nome, preco, estoque } = req.body;
            if (nome && preco && estoque) {
                let entidade = new produtoEntity(0, nome, preco, estoque);
                if (await this.#repo.cadastrar(entidade))
                    return res.status(201).json({ msg: "Produto cadastrado com sucesso!" });
                else
                    throw new Error("Erro ao inserir produto no banco de dados!");
            } else {
                res.status(400).json({ msg: "Parametros inválidos!" });
            }
        } else {
            res.status(400).json({ msg: "Dados inválidos!" });
        }
    }


    async listar(req, res) {
        let listaProdutos = await this.#repo.listar();
        if (listaProdutos.length === 0)
            res.status(404).json({ msg: "Nenhum produto encontrado!" });
        else
            res.status(200).json(listaProdutos);
    }

    async obter(req, res) {
        let { id } = req.params;
        const lista = await this.#repo.obter(id) || [];
        if (lista.length === 0)
            return res.status(404).json({ msg: "Produto não encontrado!" });
        else
            return res.status(200).json(lista);
    }

    async excluir(req, res) {
        let { id } = req.params;
        if (await this.#repo.obter(id)) {
            let resultado = await this.#repo.excluir(id);
            if (resultado)
                return res.status(200).json({ msg: "Produto excluído com sucesso!" });
            else
                throw new Error("Erro ao excluir produto!");
        } else {
            res.status(404).json({ msg: "Produto não encontrado!" });
        }
    }

    async alterar(req, res) {
        let entidade = new produtoEntity();
        let { id, nome, preco, estoque } = req.body;
        if (id  && nome && preco && estoque) {
            entidade.id = id;
            entidade.nome = nome;
            entidade.preco = preco;
            entidade.estoque = estoque;

            if (await this.#repo.alterar(entidade))
                return res.status(200).json({ msg: "Produto alterado com sucesso!" })
            else
                throw new Error("Erro ao alterar produto!");
        } else {
            return res.status(400).json({ msg: "Parametros inválidos!" });
        }
    }

}