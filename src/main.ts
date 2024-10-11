import './style.css'

import page from 'page';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const app = document.getElementById( 'main' )!;

// page( '/', () => carregarPagina( '/home.html', 'home' ) );
// page( '/home', () => carregarPagina( '/home.html', 'home' ) );
// page( '/login', () => carregarPagina( '/login.html', 'login' ) );
page( '/users-profile', () => carregarPagina( '/html/users-profile.html', 'users-profile' ) );
page( '/alunos', () => carregarPagina( '/html/alunos.html', 'alunos' ) );
page( '/cadastro', () => carregarPagina ('/html/cadastro.html', 'cadastro-aluno'));
page( '/cadastroAula', () => carregarPagina( '/html/cadastroAula.html', 'cadastroAula' ) );
page( '*', () => carregarPagina( '/404.html' ) );
page();

async function carregarPagina( pagina: string, js?: string ): Promise< void > {

  // Remove elementos
  while ( app.lastChild ) {
    app.removeChild( app.lastChild );
  }

  try {
    app.innerHTML = await ( await fetch( pagina ) ).text();
    if ( js ) {

      // /**
      //  * @see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      //  */
      // await import( `./modules/${js}.ts` );

      const arquivo = `src/modules/${js}.ts?`;
      const idJs = gerarId( arquivo );
      if ( ! document.getElementById( arquivo ) ) {
        const script = document.createElement( 'script' );
        script.src =  arquivo + Math.trunc( Math.random() * 100_000 ); // Evita cache, para rodar JS sempre
        script.type = 'module';
        script.id = idJs;
        app.appendChild( script );
      }

    }
  } catch ( ex ) {
    /**
     * @see https://notiflix.github.io/notify
     */
    Notify.failure( ( ex as Error ).message );
  }
}

function gerarId( texto: string ): string {
  return texto.replace( '.', '_' ).replace( '/', '_' );
}

