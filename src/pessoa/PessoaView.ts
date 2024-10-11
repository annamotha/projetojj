import { Credenciais } from '../autenticacao/Credenciais';
import { Cidade } from '../endereco/Cidade';
import { Endereco } from '../endereco/Endereco';
import { Estado } from '../endereco/Estado';
import { View } from '../infra/view/View';
import { Aluno } from './papel/Aluno';
import { Funcionario } from './papel/Funcionario';
import { Papel } from './papel/Papel';
import { Professor } from './papel/Professor';
import { Responsavel } from './papel/Responsavel';
import { Pessoa } from './Pessoa';
import { EnderecoCEP } from './PessoaService';

export class PessoaView extends View {

    constructor() {
        super();
        // Expondo a função ao escopo global (window) para uso no HTML
        (window as any).showFields = this.showFields.bind(this);
    }

    iniciar(cadastrarPessoa: () => void) {
        const botaoCadastrarPessoa = document.getElementById('botaoCadastrarPessoa');
        botaoCadastrarPessoa?.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (this.validarCampos())
                cadastrarPessoa();
        })
    }

    aoSairDoCep( funcao: ( cep: string ) => Promise< EnderecoCEP > ): void {

        const f = async ( event: FocusEvent ) => {
            event.preventDefault();

            const inputCep: HTMLInputElement = ( event.target as HTMLInputElement );
            const cep: string = inputCep.value;

            let endereco: EnderecoCEP;
            try {
                endereco = await funcao( cep );
            } catch ( err ) {
                this.mostrarErro( err as Error );
                return;
            }

            const idCampoCidade = 'cidade' + ( inputCep.id.includes( 'Responsavel' ) ? 'Responsavel' : '' );
            const campoCidade = document.getElementById( idCampoCidade ) as HTMLInputElement;

            const idCampoEstado = 'estado' + ( inputCep.id.includes( 'Responsavel' ) ? 'Responsavel' : '' );
            const campoEstado = document.getElementById( idCampoEstado ) as HTMLInputElement;

            // Desenha
            campoCidade.value = endereco.localidade; // Preenche o campo de cidade
            const nomeEstado = estados[endereco.uf] || 'Estado não encontrado';
            campoEstado.value = nomeEstado; // Preenche o campo de estado com o nome completo
            campoCidade.disabled = true; // Desabilita o campo de cidade
            campoEstado.disabled = true; // Desabilita o campo de estado
        };

        document.getElementById( 'cep' )!.addEventListener( 'blur', f );
        document.getElementById( 'cepResponsavel' )!.addEventListener( 'blur', f );
    }


    obterDadosCadastroPessoa(): Pessoa {

        const campoNome = document.getElementById('nome') as HTMLInputElement;
        const campoDataNascimento = document.getElementById('dataNascimento') as HTMLInputElement;
        const campoCPF = document.getElementById('cpf') as HTMLInputElement;
        const campoLogradouro = document.getElementById('logradouro') as HTMLInputElement;
        const campoCEP = document.getElementById('cep') as HTMLInputElement;
        const campoComplemento = document.getElementById('complemento') as HTMLInputElement;
        const campoCidade = document.getElementById('cidade') as HTMLInputElement;
        const campoEstado = document.getElementById('estado') as HTMLInputElement;
        const campoBairro = document.getElementById('bairro') as HTMLInputElement;
        const campoEmail = document.getElementById('email') as HTMLInputElement;
        const campoSenha = document.getElementById('senha') as HTMLInputElement;
        const tipoUsuario = document.getElementById('tipoUsuario') as HTMLSelectElement;
        const administrador = document.getElementById('admin') as HTMLSelectElement;

        const maioridade = document.getElementById("maioridade") as HTMLSelectElement;

        const estado = new Estado(
            campoEstado.value
        )

        const cidade = new Cidade(
            campoCidade.value,
            estado

        )

        const endereco = new Endereco(
            campoLogradouro.value,
            campoComplemento.value,
            campoCEP.value,
            campoBairro.value,
            cidade
        )

        const credenciais = new Credenciais(
            campoEmail.value,
            campoSenha.value
        )

        let papel: Papel;
        switch (tipoUsuario.value) {
            case "funcionario":
                papel = new Funcionario(true, administrador.value === "true");
                break;
            case "aluno":
                papel = new Aluno(true);
                break;
            case "professor":
                papel = new Professor(true, administrador.value === "true");
                break;
            default:
                throw new Error("Tipo de usuário inválido");
        }

        const pessoa = new Pessoa(
            campoNome.value,
            campoDataNascimento.value,
            campoEmail.value,
            campoCPF.value,
            credenciais,
            endereco,
            papel
        );

        if (maioridade.value === "false") {
            const pessoaResponsavel = this.obterDadosCadastroResponsavel(pessoa);
            return pessoaResponsavel;
        }

        return pessoa;
    }

    obterDadosCadastroResponsavel(dependente: Pessoa): Pessoa {
        const campoNomeResponsavel = document.getElementById('nomeResponsavel') as HTMLInputElement;
        const campoDataNascimentoResponsavel = document.getElementById('dataNascimentoResponsavel') as HTMLInputElement;
        const campoCPFResponsavel = document.getElementById('cpfResponsavel') as HTMLInputElement;
        const campoLogradouroResponsavel = document.getElementById('logradouroResponsavel') as HTMLInputElement;
        const campoCEPResponsavel = document.getElementById('cepResponsavel') as HTMLInputElement;
        const campoComplementoResponsavel = document.getElementById('complementoResponsavel') as HTMLInputElement;
        const campoCidadeResponsavel = document.getElementById('cidadeResponsavel') as HTMLInputElement;
        const campoEstadoResponsavel = document.getElementById('estadoResponsavel') as HTMLInputElement;
        const campoBairroResponsavel = document.getElementById('bairroResponsavel') as HTMLInputElement;
        const campoEmailResponsavel = document.getElementById('emailResponsavel') as HTMLInputElement;
        const campoSenhaResponsavel = document.getElementById('senhaResponsavel') as HTMLInputElement;

        const estadoResponsavel = new Estado(
            campoEstadoResponsavel.value
        )

        const cidadeResponsavel = new Cidade(
            campoCidadeResponsavel.value,
            estadoResponsavel
        )

        const enderecoResponsavel = new Endereco(
            campoLogradouroResponsavel.value,
            campoComplementoResponsavel.value,
            campoCEPResponsavel.value,
            campoBairroResponsavel.value,
            cidadeResponsavel
        )

        const credenciaisResponsavel = new Credenciais(
            campoEmailResponsavel.value,
            campoSenhaResponsavel.value
        )

        const papel = new Responsavel(true, dependente)

        return new Pessoa(
            campoNomeResponsavel.value,
            campoDataNascimentoResponsavel.value,
            campoEmailResponsavel.value,
            campoCPFResponsavel.value,
            credenciaisResponsavel,
            enderecoResponsavel,
            papel
        )
    }

    validarCPF(cpf: string): boolean {
        // Remove qualquer caractere não numérico
        cpf = cpf.replace(/[^\d]/g, '');

        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let primeiroDigitoVerificador = 11 - (soma % 11);
        if (primeiroDigitoVerificador >= 10) {
            primeiroDigitoVerificador = 0;
        }

        // Calcula o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let segundoDigitoVerificador = 11 - (soma % 11);
        if (segundoDigitoVerificador >= 10) {
            segundoDigitoVerificador = 0;
        }

        // Verifica se os dígitos verificadores estão corretos
        return (
            primeiroDigitoVerificador === parseInt(cpf.charAt(9)) &&
            segundoDigitoVerificador === parseInt(cpf.charAt(10))
        );
    }

    validarCampos(): boolean {
        const campos = [
            'nome',
            'dataNascimento',
            'cpf',
            'logradouro',
            'cep',
            'complemento',
            'cidade',
            'estado',
            'bairro',
            'email',
            'senha'
        ];

        let camposValidos = true;

        for (let campo of campos) {
            const input = document.getElementById(campo) as HTMLInputElement | null;
            const div = document.getElementById(`div-${campo}`) as HTMLDivElement | null;

            if (input && div) {
                // Remove existing span
                const existingSpan = div.querySelector('span');
                if (existingSpan) {
                    div.removeChild(existingSpan);
                }

                let errorMessage = '';

                // Check for empty fields
                if (input.value.trim() === '') {
                    errorMessage = 'Campo deve ser preenchido.';
                    camposValidos = false;
                }

                // Special validation for CPF
                if (campo === 'cpf' && input.value.trim() !== '' && !this.validarCPF(input.value)) {
                    errorMessage = 'CPF inválido.';
                    camposValidos = false;
                }

                // Add error message if needed
                if (errorMessage !== '') {
                    const span = document.createElement('span');
                    span.style.color = 'red';
                    span.textContent = errorMessage;
                    div.appendChild(span);
                }

                // Add event listener to remove span when input is filled
                input.addEventListener('input', () => {
                    const existingSpan = div.querySelector('span');
                    if (existingSpan && input.value.trim() !== '') {
                        div.removeChild(existingSpan);
                    }
                });
            }
        }

        // Campos específicos de responsável legal
        const tipoUsuario = (document.getElementById("tipoUsuario") as HTMLSelectElement | null)?.value;
        const maioridade = (document.getElementById("maioridade") as HTMLSelectElement | null)?.value;
        if (tipoUsuario === "aluno" && maioridade === "false") {
            const camposResponsavel = [
                'nomeResponsavel',
                'dataNascimentoResponsavel',
                'cpfResponsavel',
                'logradouroResponsavel',
                'cepResponsavel',
                'complementoResponsavel',
                'cidadeResponsavel',
                'estadoResponsavel',
                'bairroResponsavel',
                'emailResponsavel',
                'senhaResponsavel'
            ];

            for (let campo of camposResponsavel) {
                const inputResponsavel = document.getElementById(campo) as HTMLInputElement | null;
                const divResponsavel = document.getElementById(`div-${campo}`) as HTMLDivElement | null;

                if (inputResponsavel && divResponsavel) {
                    // Remove existing span
                    const existingSpan = divResponsavel.querySelector('span');
                    if (existingSpan) {
                        divResponsavel.removeChild(existingSpan);
                    }

                    let errorMessage = '';

                    // Check for empty fields
                    if (inputResponsavel.value.trim() === '') {
                        errorMessage = `Campo deve ser preenchido.`;
                        camposValidos = false;
                    }

                    // Special validation for CPF do Responsável
                    if (campo === 'cpfResponsavel' && inputResponsavel.value.trim() !== '' && !this.validarCPF(inputResponsavel.value)) {
                        errorMessage = 'CPF do Responsável inválido.';
                        camposValidos = false;
                    }

                    // Add error message if needed
                    if (errorMessage !== '') {
                        const span = document.createElement('span');
                        span.style.color = 'red';
                        span.textContent = errorMessage;
                        divResponsavel.appendChild(span);
                    }

                    // Add event listener to remove span when input is filled
                    inputResponsavel.addEventListener('input', () => {
                        const existingSpan = divResponsavel.querySelector('span');
                        if (existingSpan && inputResponsavel.value.trim() !== '') {
                            divResponsavel.removeChild(existingSpan);
                        }
                    });
                }
            }
        }

        return camposValidos;
    }

    exibirAlunos(pessoas: Pessoa[]): void {
        const tableBody = document.getElementById('alunosTable')?.querySelector('tbody');
        if (tableBody) {
            tableBody.innerHTML = ''; // Limpar o conteúdo existente
            pessoas.forEach( p => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ p.nome}</td>
                    <td>${ p.nascimento}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    }

    consultarCep( inputId:string ): string {
        const campoCEP = document.getElementById('cep'+inputId) as HTMLInputElement;
        const cep = campoCEP.value;

        // Verifica se o valor do campo é uma string de 8 dígitos
        if (!/^\d{8}$/.test(cep)) {
            throw new Error('CEP inválido. O CEP deve conter exatamente 8 dígitos.');
        }

        return cep;
    }


    showFields() {
        // Obtenha os elementos do DOM com segurança
        const tipoUsuarioElement = document.getElementById("tipoUsuario") as HTMLSelectElement | null;
        const adminFields = document.getElementById("adminFields");
        const ageFields = document.getElementById("ageFields");
        const legalFields = document.getElementById("responsavelLegal");
        const maioridadeElement = document.getElementById("maioridade") as HTMLSelectElement | null;

        // Verifique se todos os elementos foram encontrados
        if (tipoUsuarioElement && adminFields && ageFields && legalFields && maioridadeElement) {
            const tipoUsuario = tipoUsuarioElement.value;
            const maioridade = maioridadeElement.value;

            // Defina a exibição dos campos com base no valor de tipoUsuario
            adminFields.style.display = (tipoUsuario === "professor" || tipoUsuario === "funcionario") ? "block" : "none";
            ageFields.style.display = tipoUsuario === "aluno" ? "block" : "none";
            legalFields.style.display = (tipoUsuario === "aluno" && maioridade === "false") ? "block" : "none";
        } else {
            console.error("Um ou mais elementos não foram encontrados no DOM.");
        }
    }


}

const estados: { [key: string]: string } = {
    'AC': 'Acre',
    'AL': 'Alagoas',
    'AP': 'Amapá',
    'AM': 'Amazonas',
    'BA': 'Bahia',
    'CE': 'Ceará',
    'DF': 'Distrito Federal',
    'ES': 'Espírito Santo',
    'GO': 'Goiás',
    'MA': 'Maranhão',
    'MT': 'Mato Grosso',
    'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais',
    'PA': 'Pará',
    'PB': 'Paraíba',
    'PR': 'Paraná',
    'PE': 'Pernambuco',
    'PI': 'Piauí',
    'RJ': 'Rio de Janeiro',
    'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia',
    'RR': 'Roraima',
    'SC': 'Santa Catarina',
    'SP': 'São Paulo',
    'SE': 'Sergipe',
    'TO': 'Tocantins'
};
