import Database from "../db/database.js"

export default class vendaRepository {

    #banco
    constructor () {
        this.#banco = new Database();
    }

    async gerarVenda() {
        let sql = `INSERT INTO vendas (ven_hora) VALUES (NOW())`;
        let valores = [];
        let resultado = await this.#banco.ExecutaComandoLastInserted(sql,valores);
        return resultado;
    }

    async deletarVendaGerada(id) {
        let sql = `DELETE FROM vendas WHERE ven_id = ?`;
        let parametros = [id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,parametros);
        return resultado;
    }

}