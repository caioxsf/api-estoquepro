export default class produtoEntity {

    #id 
    #codigo
    #nome
    #preco
    #estoque

    constructor (id, codigo, nome, preco, estoque) {
        this.#id = id;
        this.#codigo = codigo;
        this.#nome = nome;
        this.#preco = preco;
        this.#estoque = estoque;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get codigo () {return this.#codigo} set codigo (value) {this.#codigo = value}
    get nome () {return this.#nome} set nome (value) {this.#nome = value}
    get preco () {return this.#preco} set preco (value) {this.#preco = value}
    get estoque () {return this.#estoque} set estoque (value) {this.#estoque = value}

    toJSON() {
        return {
            id: this.#id,
            codigo: this.#codigo,
            nome: this.#nome,
            preco: this.#preco,
            estoque: this.#estoque
        }
    }

}