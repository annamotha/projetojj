import { Cidade } from './Cidade';

export class Endereco {
    logradouro: string;
    complemento: string;
    cep: string;
    bairro: string;
    cidade: Cidade;

    constructor ( logradouro: string, complemento: string, cep: string, bairro: string, cidade: Cidade ) {
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.cep = cep;
        this.bairro = bairro;
        this.cidade = cidade;
    }

}