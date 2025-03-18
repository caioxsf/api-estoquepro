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
}