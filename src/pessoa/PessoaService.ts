import { BASE_API, BASE_API_CEP } from '../infra/api';
import { Pessoa } from '../pessoa/Pessoa';

// RESTful
//      POST /pessoas
//      PUT, DELETE /pessoas/a8enkjshe2e773ewe7w

export type EnderecoCEP = { uf: string, localidade: string };

export class PessoaService {

    async cadastrarPessoa( pessoa: Pessoa ): Promise< void > {
        let resposta: Response;
        console.log( pessoa );
        try {
            resposta = await fetch( `${BASE_API}/cadastro`, {
                method : 'POST',
                body: JSON.stringify( pessoa ),
                headers: {"Content-type": "application/json; charset=UTF-8"},
                signal: AbortSignal.timeout( 3000 )
            } );
            console.log( resposta );

        } catch( erro ){
            throw new Error( 'Não foi possivel realizar cadastro do pessoa.' );
        }

        if( ! resposta.ok ){
            throw new Error( 'Ocorreu um erro ao tentar salvar a pessoa.' );
        }
    }

    async obterAlunos(): Promise< Pessoa[] > {
        try {
            const resposta = await fetch(`${BASE_API}/alunos`, {
                method: 'GET',
                headers: { "Content-type": "application/json; charset=UTF-8" },
                signal: AbortSignal.timeout( 3000 )
            });
            if ( ! resposta.ok ) {
                throw new Error('Erro ao buscar alunos');
            }
            return await resposta.json();
        } catch (erro) {
            throw new Error('Não foi possível obter os alunos: ');
        }
    }

    // TODO: Tipar retorno
    async consultarCep( cep: string ): Promise< EnderecoCEP > {
        try{
            const resposta = await fetch( `${BASE_API_CEP}/${cep}/json/`, {
                method: 'GET',
                headers: { "content-type": "application/json; charset=UTF-8" }
            });
            if( ! resposta.ok ){
                throw new Error( 'Erro ao buscar CEP' );
            }
            return await resposta.json();
        } catch ( erro ) {
            throw new Error( 'Não foi possível buscar CEP!' );
        }
    }
}