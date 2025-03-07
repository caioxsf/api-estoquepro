import Database from "../db/database.js";
import clienteEntity from "../entities/clienteEntity.js";

export default class clienteRepository {

    #banco
    constructor() {
        this.#banco = new Database();
    }

    async cadastrar(entidade) {
        let sql = ` INSERT INTO clientes (cli_nome, cli_cpf, cli_telefone, cli_email, cli_cep, cli_rua, cli_bairro, cli_cidade, cli_estado, cli_numero_casa) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

        let parametros = [entidade.nome, entidade.cpf, entidade.telefone, entidade.email, entidade.cep, entidade.rua, entidade.bairro, entidade.cidade, entidade.estado, entidade.numero]
        let resultado = await this.#banco.ExecutaComando(sql, parametros);
        return resultado;
    }

    async listar() {
        let sql = `SELECT * FROM clientes`;

        let rows = await this.#banco.ExecutaComando(sql);

        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(
                new clienteEntity(
                    row["cli_id"],
                    row["cli_nome"],
                    row["cli_cpf"],
                    row["cli_telefone"],
                    row["cli_email"],
                    row["cli_cep"],
                    row["cli_rua"],
                    row["cli_bairro"],
                    row["cli_cidade"],
                    row["cli_estado"],
                    row["cli_numero_casa"]

                )
            );
        }

        return lista;
    }

    async obter(id) {
        let sql = `SELECT * FROM clientes WHERE cli_id = ?`;
        let parametros = [id];
        let rows = await this.#banco.ExecutaComando(sql, parametros);
        if (rows.length > 0) {
            let row = rows[0];
            return new clienteEntity(
                row["cli_id"],
                row["cli_nome"],
                row["cli_cpf"],
                row["cli_telefone"],
                row["cli_email"],
                row["cli_cep"],
                row["cli_rua"],
                row["cli_bairro"],
                row["cli_cidade"],
                row["cli_estado"],
                row["cli_numero_casa"]
            );
        }
        return null;
    }

    async excluir (id) {
        let sql = `DELETE FROM clientes WHERE cli_id = ?`;
        let parametros = [id];
        let resultado = await this.#banco.ExecutaComandoNonQuery(sql, parametros);
        return resultado;
    }
}
