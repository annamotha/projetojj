import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class View {

    public mostrarMensagemCadastradoComSucesso(): void {
        Notify.success( 'Cadastrado com sucesso.' );
    }

    public mostrarErro( erro: Error ): void {
        Notify.failure( erro.message );
    }

}