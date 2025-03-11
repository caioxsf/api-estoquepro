import Database from "../db/database.js"
import itensVendaEntity from "../entities/itensVendaEntity.js";

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

    async verificarCodigoDoProduto(id) {
        let sql = `SELECT * FROM produtos WHERE prod_id = ?`;
        let parametros = [id];
        let rows = await this.#banco.ExecutaComando(sql,parametros);
        if(rows.length > 0) {
            let row = rows[0];
            return new itensVendaEntity(
                row['id'],
                row['venda_id'],
                row['produto_id'],
                row['quantidade'],
                row['preco'],
                row['subtotal']
            )
        }
        return null
    }
}