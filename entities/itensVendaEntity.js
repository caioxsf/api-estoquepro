export default class itensVendaEntity {

    #id 
    #venda_id
    #produto_id
    #quantidade
    #preco
    #subtotal

    constructor (id, venda_id, produto_id, quantidade, preco, subtotal) {
        this.#id = id;
        this.#venda_id = venda_id;
        this.#produto_id = produto_id;
        this.#quantidade = quantidade;
        this.#preco = preco;
        this.#subtotal = subtotal;
    }

    get id () {return this.#id} set id (value) {this.#id = value};
    get venda_id () {return this.#venda_id} set venda_id (value) {this.#venda_id = value};
    get produto_id () {return this.#produto_id} set produto_id (value) {this.#produto_id = value};
    get quantidade () {return this.#quantidade} set quantidade (value) {this.#quantidade = value};
    get preco () {return this.#preco} set preco (value) {this.#preco = value};
    get subtotal () {return this.#subtotal} set subtotal (value) {this.#subtotal = value};

    toJSON () {
        return {
            id: this.#id,
            venda_id: this.#venda_id,
            produto_id: this.#produto_id,
            quantidade: this.#quantidade,
            preco: this.#preco,
            subtotal: this.#subtotal
        }
    }

}