export default class vendaEntity {

    #id
    #hora

    constructor(id, hora, total) {
        this.#id = id;
        this.#hora = hora;
    }

    get id() { return this.#id }
    set id (value) { this.#id = value }

    get hora() { return this.#hora }
    set hora(value) { this.#hora = value }

    toJSON () {
        return {
            id: this.#id,
            hora: this.#hora
        }
    }

}