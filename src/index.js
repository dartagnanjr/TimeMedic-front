import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Autenticacao from './components/Autenticacao';
import Pessoa from './components/Pessoa'
import CadastrarMedicamento from './components/CadastrarMedicamento'
import ListarMedicamentos from './components/ListarMedicamentos';
import FormPrincipal from './components/FormPrincipal'
import CadastroPessoa from './components/CadastroPessoa';
import ResetarSenha from './components/ResetarSenha';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Autenticacao/>
  },
  {
    path: '/pessoas',
    element: <Pessoa/>
  },
  {
    path: '/cadastrar-medicamentos',
    element: <CadastrarMedicamento />
  },
  {
    path: '/registrar-diario',
    element: '<Pessoas/>'
  },
  {
    path: '/listar-medicamentos',
    element: <ListarMedicamentos/>
  }
  ,
  {
    path: '/cadastro-pessoa',
    element: <CadastroPessoa />
  }
  ,
  {
    path: '/resetar-senha',
    element: <ResetarSenha email="" />
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormPrincipal></FormPrincipal>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
