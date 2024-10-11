import { Papel } from "../papel/Papel";
import { TipoAcesso } from "../papel/tipo-acesso";

export class Professor extends Papel {
    private administrador: boolean;
    // constructor(ativo: boolean, criadoEm: Date, criadoPor: Pessoa) {
    //     super(ativo, criadoEm, criadoPor);
    // }

    
    constructor(ativo: boolean, administrador: boolean) {
        super( ativo, TipoAcesso.PROFESSOR );
        this.administrador = administrador;
    }

    acesso(): TipoAcesso {
        return TipoAcesso.PROFESSOR;
    }
}

