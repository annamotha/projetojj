import { Pessoa } from "../pessoa/Pessoa";
import { Papel } from "./Papel";
import { TipoAcesso } from "./tipo-acesso";

export class Responsavel extends Papel {
    private dependente: Pessoa;
    
    constructor( ativo: boolean, dependente: Pessoa, criadoEm?: Date, criadoPor?: Pessoa ) {
        super(ativo, TipoAcesso.RESPONSAVEL, criadoEm, criadoPor);
        this.dependente = dependente;
        
    }

    acesso(): TipoAcesso {
        return TipoAcesso.RESPONSAVEL;
    }
}

