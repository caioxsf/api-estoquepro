import Database from "../db/database.js"

export default class itensVendaRepository {

    #banco 
    constructor () {
        this.#banco = new Database();
    }

    async cadastrarPedido (entidade) {
        let sql = `INSERT INTO itens_venda (ven_id, prod_id, item_qtd, item_preco, item_subtotal) VALUES (?, ?, ?, ?, ?)`;
        let parametros = [entidade.venda_id, entidade.produto_id, entidade.quantidade, entidade.preco, entidade.subtotal];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,parametros);
        return resultado;
    }
}