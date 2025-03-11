import produtoController from "../controllers/produtoController.js";
import Database from "../db/database.js"
import produtoEntity from "../entities/produtoEntity.js";

export default class produtoRepository {

    #banco
    constructor () {
        this.#banco = new Database();
    }

    async cadastrar (entidade) {
        let sql = ` INSERT INTO produtos ( prod_nome, prod_preco, prod_estoque)
                    VALUES (?, ?, ?)`;
        let parametros = [entidade.nome, entidade.preco, entidade.estoque];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,parametros);
        return resultado;
    }

    async listar () {
        let sql = `SELECT * FROM produtos`;
        let rows = await this.#banco.ExecutaComando(sql);
        let lista = [];

        for (let i=0;i<rows.length;i++) {
            let row = rows[i];
            lista.push( new produtoEntity(
                row['prod_id'],
                row['prod_nome'],
                row['prod_preco'],
                row['prod_estoque']
            ));
        }

        return lista;
    }

    async obter (id) {
        let sql = `SELECT * FROM produtos WHERE prod_id = ?`;
        let parametros = [id];
        let rows = await this.#banco.ExecutaComando(sql,parametros);

        if(rows.length > 0) {
            let row = rows[0];
            return new produtoEntity(
                row['prod_id'],
                row['prod_nome'],
                row['prod_preco'],
                row['prod_estoque']
            );
        }
        return null;
    }

    async excluir (id) {
        let sql = `DELETE FROM produtos WHERE prod_id = ?`;
        let parametros = [id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, parametros);
        return resultado;
    }

    async alterar (entidade) {
        let sql = `UPDATE produtos SET prod_nome = ?, prod_preco = ?, prod_estoque = ? WHERE prod_id = ?`;
        let parametros = [
            entidade.nome,
            entidade.preco,
            entidade.estoque,
            entidade.id
        ];

        let resultado = await this.#banco.ExecutaComandoNonQuery(sql,parametros);
        return resultado;
    }

}