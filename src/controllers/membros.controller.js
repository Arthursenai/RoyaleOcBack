import { Membros } from "../models/membros/Membros.js";
import { MembrosList } from "../models/membros/MembrosList.js";
import { integrantes } from "../data/membros.js";

const listMembros = new MembrosList();
const membrosNew = integrantes.map(membro => {
const membros = new Membros(membro.nome, membro.idade, membro.cargo, membro.foto, membro.descricao)
listMembros.addMembro(membros);
});
//pegar todos os membros
export const getMembros = (req, res) => {
    const { nome, cargo } = req.query;

    //filtros
    const filtered = [];
    if (nome) {
        const membro = listMembros.getMembroByName(nome);
        if (membro) {
            filtered.push(membro);
        }
    }
    if (cargo) {
        const membro = listMembros.getMembroByCargo(cargo);
        if (membro) {
            filtered.push(membro);
        }
    }
    else {
        return res.status(200).send({ total: listMembros.getMembrosLength(), membros: listMembros.getAllMembros() });
    }
}


//pegar membro por id
export const getMembroByID = (req, res) => {
    const { id } = req.params;
    const membro = listMembros.getMembroByID(id);
    if (membro) {
        return res.status(200).send(membro);
    }
    else {
        return res.status(404).send({ message: `Membro ${id} não encontrado` });
    }
}

//criar membro + regras de negocio
export const createMembro = (req, res) => {
    let { nome, idade, cargo, foto, descricao } = req.body;

    const erros = [];
 

    if (!nome || !idade || !cargo || !foto || !descricao) {
        return res.status(400).send(
            { message: "Todos os campos são obrigatórios" });
    }

    if (nome.length > 30) {
        erros.push("O nome deve ter no máximo 30 caracteres");
    }

    if (idade < 15) {
        erros.push("A idade deve ser maior que 15");
    }
    if (cargo.length > 20) {
        erros.push("O cargo deve ter no máximo 20 caracteres");
    }
    if (descricao.length > 1000) {
        erros.push("A descrição deve ter no máximo 1000 caracteres");
    }

    if (erros.length) {
        return res.status(  ).send({ message: `Corrija, Voce tem ${erros.length} erro(s)`, erros });
    }


    const membro = new Membros(nome, idade, cargo, foto, descricao);


    listMembros.addMembro(membro);

    return res.status(201).send({ message: "Membro adicionado com sucesso! Bem-Vindo(a)!", membro });
}


//atualizar membro
export const atualizarMembro = (req, res) => {
    const { id } = req.params;


    let { nome, idade, cargo, foto, descricao } = req.body;

    const erros = [];

    if (!nome || !idade || !cargo || !foto || !descricao) {
        return res.status(400).send(
            { message: "Todos os campos são obrigatórios" });
    }
    if (nome.length > 30) {
        erros.push("O nome deve ter no máximo 30 caracteres");
    }
    if (idade < 15) {
        erros.push("A idade deve ser maior que 15");
    }
    if (cargo.length > 20) {
        erros.push("O cargo deve ter no máximo 20 caracteres");
    }
    if (descricao.length > 1000) {
        erros.push("A descrição deve ter no máximo 1000 caracteres");
    }

    if (erros.length > 0) {
        return res.status(400).send({ message: `Corrija, Voce tem ${erros.length} erro(s)`, erros });
       
    }else{
        const atualizarMembro = listMembros.updateMembro(nome, idade, cargo, foto, descricao, id);
        return res.status(200).send({ message: "membro atualizado com sucesso", atualizarMembro });
    }

}

//delete membro
export const deleteMembro = (req, res) => {
    const { id } = req.params;
    listMembros.removeMembro(id);
    return res.status(200).send({ message: "Membro removido com sucesso!" });
}


