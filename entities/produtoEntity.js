export default class produtoEntity {

    #id 
    #nome
    #preco
    #estoque

    constructor (id, nome, preco, estoque) {
        this.#id = id;
        this.#nome = nome;
        this.#preco = preco;
        this.#estoque = estoque;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get nome () {return this.#nome} set nome (value) {this.#nome = value}
    get preco () {return this.#preco} set preco (value) {this.#preco = value}
    get estoque () {return this.#estoque} set estoque (value) {this.#estoque = value}

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            preco: this.#preco,
            estoque: this.#estoque
        }
    }

}