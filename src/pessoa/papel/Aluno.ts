import { Papel } from "./Papel";
import { TipoAcesso } from "./tipo-acesso";
import { Pessoa } from "../pessoa/Pessoa";

export class Aluno extends Papel {
    constructor( ativo: boolean, criadoEm?: Date, criadoPor?: Pessoa ) {
        super(ativo, TipoAcesso.ALUNO, criadoEm, criadoPor);
    }

    acesso(): TipoAcesso {
        return TipoAcesso.ALUNO;
    }
}

