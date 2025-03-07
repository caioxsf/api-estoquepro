import clienteEntity from "../entities/clienteEntity.js";
import clienteRepository from "../repositories/clienteRepository.js";

export default class clienteController {

    #repo 

    constructor () {
        this.#repo = new clienteRepository();
    }

    async cadastrar (req, res) {
        if(req.body) {
            let {nome, cpf, telefone, email, cep, rua, bairro, cidade, estado, numero} = req.body;

            if(nome && cpf && telefone && email && cep && rua && bairro && cidade && estado && numero) {
                let entidade = new clienteEntity(0, nome, cpf, telefone, email, cep, rua, bairro, cidade, estado, numero);
                if(await this.#repo.cadastrar(entidade))
                    return res.status(201).json({msg: "Cliente cadastrado com sucesso!"});
                else
                    throw new Error("Erro ao inserir cliente no banco de dados!");
            } else {
                res.status(400).json({msg: "Dados inválidos!"});
            }
        } else {
            res.status(400).json({msg: "Parametros inválidos!"});
        }
    }

    async listar (req,res) {
        let listaClientes = await this.#repo.listar();
        res.status(200).json(listaClientes);
    }

    async obter (req, res) {
        let {id} = req.params;
        const lista = await this.#repo.obter(id) || [];
        if(lista.length === 0)
            return res.status(404).json({msg: "Cliente não encontrado!"});
        return res.status(200).json(lista);
    }

}