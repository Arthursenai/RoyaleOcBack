

export class Contatos {
    constructor(id, nome, email, telefone) {
        this.id =this.generateId();
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
    generateId() {
        return Math.floor(Math.random()*100020);
    }
}