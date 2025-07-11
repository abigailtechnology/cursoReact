import { BrowserRouter, Route, Routes as Switch, Navigate } from 'react-router-dom';
import { Dashboard, Login } from '../pages';

export const Rotas = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      </Switch>
    </BrowserRouter>
  );
}



















