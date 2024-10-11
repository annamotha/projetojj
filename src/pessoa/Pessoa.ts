import { Credenciais } from '../autenticacao/Credenciais';
import { Endereco } from '../endereco/Endereco';
import { Papel } from './papel/Papel';

export class Pessoa {

    constructor(
        public readonly nome: string,
        public readonly nascimento: string,
        public readonly email: string,
        public readonly cpf: string,
        public readonly credenciais: Credenciais,
        public readonly endereco: Endereco,
        public readonly papel: Papel,
        public readonly cadastradoEm?: Date,
        public readonly atualizadoEm?: Date
    ) {
    }
}