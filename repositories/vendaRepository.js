import Database from "../db/database.js"

export default class vendaRepository {

    #banco
    constructor () {
        this.#banco = new Database();
    }

    async gerarPedido() {
        let sql = `INSERT INTO vendas (ven_hora) VALUES (NOW())`;
        let valores = [];
        let resultado = await this.#banco.ExecutaComandoLastInserted(sql,valores);
        return resultado;
    }

}