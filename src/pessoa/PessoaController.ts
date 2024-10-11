import { PessoaService } from "./PessoaService";
import { PessoaView } from "./PessoaView";


export class PessoaController {
    private pessoaService = new PessoaService();
    private pessoaView = new PessoaView();

    constructor() {
    }

    iniciar() {
        this.pessoaView.iniciar( this.cadastrarPessoa.bind( this ) );

        this.pessoaView.aoSairDoCep(
            this.pessoaService.consultarCep.bind( this.pessoaService )
        );
    }

    iniciarAlunos() {
        this.carregarAlunos();
    }

    cadastrarPessoa() {
        const pessoa = this.pessoaView.obterDadosCadastroPessoa();
        try {
            this.pessoaService.cadastrarPessoa( pessoa );
        } catch ( err ) {
            this.pessoaView.mostrarErro( err as Error );
            return;
        }

        this.pessoaView.mostrarMensagemCadastradoComSucesso();
    }

    async carregarAlunos(): Promise< void > {
        try {
            const alunos = await this.pessoaService.obterAlunos();
            // console.log( alunos );
            this.pessoaView.exibirAlunos(alunos);
        } catch (erro) {
            this.pessoaView.mostrarErro(erro as Error);
        }
    }

    async consultarCep( cep: string ): Promise< void >{
        try{
            const endereco = await this.pessoaService.consultarCep( cep );
            this.preencherCampoCidadeEstado( endereco, inputId );
        } catch{
            throw new Error( 'Erro na consulta ao CEP' );
        }
    }




}