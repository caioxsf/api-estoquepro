import Database from "../db/database.js"
import itensVendaEntity from "../entities/itensVendaEntity.js";

export default class itensVendaRepository {

    #banco 
    constructor () {
        this.#banco = new Database();
    }

    async cadastrarVenda (entidade) {
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

    async listarVendas () {
        let sql = `SELECT * FROM itens_venda`;
        let rows = await this.#banco.ExecutaComando(sql);
        let lista = [];

        for (let i=0;i<rows.length;i++) {
            let row = rows[i];
            lista.push(new itensVendaEntity(
                row['item_id'],
                row['ven_id'],
                row['prod_id'],
                row['item_qtd'],
                row['item_preco'],
                row['item_subtotal']
            ))
        }
        return lista;
    }

    async obterVendaUnica(id) {
        let sql = `SELECT * FROM itens_venda WHERE item_id = ?`;
        let parametros = [id];
        let row = await this.#banco.ExecutaComando(sql,parametros);
        if(row.length > 0) {
            let rows = row[0];
            return new itensVendaEntity(
                rows['item_id'],
                rows['ven_id'],
                rows['prod_id'],
                rows['item_qtd'],
                rows['item_preco'],
                rows['item_subtotal']
            )
        }
        return null;
    }

    async excluirVendaUnica(id) {
        let sql = `DELETE FROM itens_venda WHERE item_id = ?`;
        let parametros = [id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,parametros);
        return resultado;
    }

    async obterVendaInteira(id) {
        let sql = `SELECT * FROM itens_venda WHERE ven_id = ?`;
        let parametros = [id];
        let rows = await this.#banco.ExecutaComando(sql,parametros);
        let lista = [];
        for (let i=0;i<rows.length;i++) {
            let row = rows[i];
            lista.push(new itensVendaEntity(
                row['item_id'],
                row['ven_id'],
                row['prod_id'],
                row['item_qtd'],
                row['item_preco'],
                row['item_subtotal']
            ))
        }
        return lista;
    }

}