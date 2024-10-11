import { TipoAcesso } from "./tipo-acesso";
import { Pessoa } from "../pessoa/Pessoa";

export abstract class Papel {
    ativo: boolean;
    tipoAcesso: TipoAcesso;
    criadoEm?: Date;
    criadoPor?: Pessoa;

    constructor(ativo: boolean, tipoAcesso: TipoAcesso, criadoEm?: Date, criadoPor?: Pessoa) {
        this.ativo = ativo;
        this.tipoAcesso = tipoAcesso;
        this.criadoEm = criadoEm;
        this.criadoPor = criadoPor;
    }

    abstract acesso(): TipoAcesso;
}