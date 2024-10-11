import { Papel } from "../papel/Papel";
import { TipoAcesso } from "../papel/tipo-acesso";
import { Pessoa } from "../pessoa/Pessoa";

export class Funcionario extends Papel {
    private administrador: boolean;
    
    constructor( ativo: boolean, administrador: boolean, criadoEm?: Date, criadoPor?: Pessoa ) {
        super(ativo, TipoAcesso.FUNCIONARIO, criadoEm, criadoPor);
        this.administrador = administrador;
    }

    acesso(): TipoAcesso {
        return TipoAcesso.FUNCIONARIO;
    }
}

