import { Estado } from "./Estado";

export class Cidade {
    nome: string;
    estado: Estado;

    constructor ( nome: string, estado: Estado ) {
        this.nome = nome;
        this.estado = estado;
    }
}