import Database from "../db/database.js";
import itensVendaEntity from "../entities/itensVendaEntity.js"

export default class RelatorioRepository {

    #banco
    constructor () {
        this.#banco = new Database();
    }

    async RelatorioPeriodo(inicio, fim) {

        let sql = ` SELECT prod_nome, item_qtd, item_preco, item_subtotal, ven_hora 
                    FROM itens_venda it INNER JOIN vendas v INNER JOIN produtos p ON
                    it.ven_id = v.ven_id AND it.prod_id = p.prod_id WHERE DATE(v.ven_hora)
                    BETWEEN '${inicio}' AND '${fim}'`
        let valores = [inicio,fim];
        let lista = [];
        let resultado = await this.#banco.ExecutaComando(sql,valores);
        for(let i=0;i<resultado.length;i++) {
            let row = resultado[i];
            lista.push(
                new itensVendaEntity(
                    row['prod_nome'],
                    row['item_qtd'],
                    row['item_preco'],
                    row['item_subtotal'],
                    row['ven_hora'],
                )
            )
        }
        return lista;
    }

}