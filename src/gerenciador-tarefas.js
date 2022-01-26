import './gerenciador-tarefas.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListarTarefas from './listar/listar-tarefas';
import CadastrarTarefa from './cadastrar/cadastrar-tarefas';
import AtualizarTarefa from './atualizar/atualizar-tarefa';

function GerenciadorTarefas() {
  return (
    <>
      <Router>
        <Route path="/" exact component={ListarTarefas} />
        <Route path="/cadastrar" exact component={CadastrarTarefa} />
        <Route path="/atualizar/:id" exact component={AtualizarTarefa} />
      </Router>
    </>
  );
}

export default GerenciadorTarefas;
