import Database from "../db/database.js";
import itensVendaEntity from "../entities/itensVendaEntity.js"

export default class RelatorioRepository {

    #banco
    constructor () {
        this.#banco = new Database();
    }

    async RelatorioPeriodo(inicio, fim) {
        let sql = `SELECT it.item_id, p.prod_nome, it.item_qtd, it.item_preco, it.item_subtotal, v.ven_hora 
                   FROM itens_venda it 
                   INNER JOIN vendas v ON it.ven_id = v.ven_id 
                   INNER JOIN produtos p ON it.prod_id = p.prod_id 
                   WHERE DATE(v.ven_hora) BETWEEN ? AND ?`;
    
        let valores = [inicio, fim];
        let lista = [];
        
        let resultado = await this.#banco.ExecutaComando(sql, valores);
        
        for (let i = 0; i < resultado.length; i++) {
            let row = resultado[i];
            lista.push({
                id: row['item_id'],          
                venda_hora: row['ven_hora'],  
                produto_nome: row['prod_nome'], 
                quantidade: parseInt(row['item_qtd']), 
                preco: parseFloat(row['item_preco']),
                subtotal: parseFloat(row['item_subtotal'])  
            });
        }
        lista.unshift({quantidade: resultado.length})
        
        return lista;
    }
    

}