import RelatorioRepository from "../repositories/relatorioRepository.js";

export default class RelatorioController {

    #RelatorioRepo
    constructor () {
        this.#RelatorioRepo = new RelatorioRepository();
    }

    async RelatorioPeriodo (req,res) {
        let {inicio, fim} = req.params;
        if(inicio,fim) {
            let listaRelatorio = await this.#RelatorioRepo.RelatorioPeriodo(inicio,fim);
            if(listaRelatorio === null)
                return res.status(404).json({msg: "Nenhuma venda foi encontrada nesse periodo de tempo!"});
            return res.status(201).json(listaRelatorio);
        }
    }

    async RelatorioProdutoEstoqueBaixo(req,res) {
        let listaRelatorio = await this.#RelatorioRepo.RelatorioProdutoEstoqueBaixo();
        if(listaRelatorio.length === null || listaRelatorio.length == undefined || listaRelatorio.length === 0)
            return res.status(404).json({msg: "Nenhum produto com estoque baixo foi encontrado!"});
        else
            return res.status(201).json(listaRelatorio);
    }

    async RelatorioProdutoEstoqueMedio(req,res) {
        let listaRelatorio = await this.#RelatorioRepo.RelatorioProdutoEstoqueMedio();
        if(listaRelatorio.length === null || listaRelatorio.length == undefined || listaRelatorio.length === 0)
            return res.status(404).json({msg: "Nenhum produto com estoque medio foi encontrado!"});
        else
            return res.status(201).json(listaRelatorio);
    }

    async RelatorioProdutoEstoqueAlto(req,res) {
        let listaRelatorio = await this.#RelatorioRepo.RelatorioProdutoEstoqueAlto();
        if(listaRelatorio.length === null || listaRelatorio.length == undefined || listaRelatorio.length === 0)
            return res.status(404).json({msg: "Nenhum produto com estoque alto foi encontrado!"});
        else
            return res.status(201).json(listaRelatorio);
    }
}