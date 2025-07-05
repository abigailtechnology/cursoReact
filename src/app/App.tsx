import { UsuarioLogadoProvider } from './shared/contexts';
import { Rotas } from './routes';

export const App = () =>  {
  return (
    <div className="App">
      <UsuarioLogadoProvider>
        <Rotas />
      </UsuarioLogadoProvider>
 
    </div>
  );
}


