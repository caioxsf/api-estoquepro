export default class clienteEntity {

    #id
    #nome
    #cpf
    #telefone
    #email
    #cep 
    #rua 
    #bairro 
    #cidade
    #estado
    #numero

    constructor(id, nome, cpf, telefone, email, cep, rua, bairro, cidade, estado, numero) {
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#telefone = telefone;
        this.#email = email;
        this.#cep = cep;
        this.#rua = rua;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#numero = numero;
    }

    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get cpf() { return this.#cpf; }
    get telefone() { return this.#telefone; }
    get email() { return this.#email; }
    get cep() { return this.#cep; }
    get rua() { return this.#rua; }
    get bairro() { return this.#bairro; }
    get cidade() { return this.#cidade; }
    get estado() { return this.#estado; }
    get numero() { return this.#numero; }

    set id(id) { this.#id = id; }
    set nome(nome) { this.#nome = nome; }
    set cpf(cpf) { this.#cpf = cpf; }
    set telefone(telefone) { this.#telefone = telefone; }
    set email(email) { this.#email = email; }
    set cep(cep) { this.#cep = cep; }
    set rua(rua) { this.#rua = rua; }
    set bairro(bairro) { this.#bairro = bairro; }
    set cidade(cidade) { this.#cidade = cidade; }
    set estado(estado) { this.#estado = estado; }
    set numero(numero) { this.#numero = numero; }
    
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            cpf: this.#cpf,
            telefone: this.#telefone,
            email: this.#email,
            cep: this.#cep,
            rua: this.#rua,
            bairro: this.#bairro,
            cidade: this.#cidade,
            estado: this.#estado,
            numero: this.#numero
        };
    }

}