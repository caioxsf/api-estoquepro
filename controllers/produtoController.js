import produtoEntity from "../entities/produtoEntity.js";
import produtoRepository from "../repositories/produtoRepository.js";

export default class produtoController {

    #repo 
    constructor () {
        this.#repo = new produtoRepository();
    }

    async cadastrar (req, res) {
        if(req.body) {
            let {codigo, nome, preco, estoque} = req.body;
            if(codigo && nome && preco && estoque) {
                let entidade = new produtoEntity(0, codigo, nome, preco, estoque);
                if(await this.#repo.verificarCodigoExistenteDoProduto(entidade))
                    res.status(400).json({msg: "Código do produto existente!"})
                else {
                    if(await this.#repo.cadastrar(entidade))
                        return res.status(201).json({msg: "Produto cadastrado com sucesso!"});
                    else 
                        throw new Error("Erro ao inserir produto no banco de dados!");
                }
            } else {
                res.status(400).json({msg: "Dados inválidos!"});
            }
        } else {
            res.status(400).json({msg: "Parametros inválidos!"});
        }
    }

    async listar (req,res) {
        let listaProdutos = await this.#repo.listar();
        if(listaProdutos.length === 0)
            res.status(404).json({msg: "Nenhum produto encontrado!"});
        else
            res.status(200).json(listaProdutos);  
    }



}