import ReactDOM from 'react-dom';
import ItensListaTarefas from './itens-lista-tarefas';
import Tarefa from '../models/tarefa.models';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe.skip('Teste do componente que exibe um item da listagem de tarefas', () => {
  const nomeTarefa = 'Tarefa';
  const tarefa = Tarefa(1, nomeTarefa, false);
  const tarefaConcluida = Tarefa(2, nomeTarefa, true);

  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItensListaTarefas tarefas={[]} recarregarTarefas={() => false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve exibir a tarefa', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItensListaTarefas
            tarefas={[tarefa]}
            recarregarTarefas={() => false}
          />
        </tbody>
      </table>
    );
    expect(getByTestId('tarefa')).toHaveTextContent(nomeTarefa);
  });
  it('deve exibir uma tarefa concluida', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItensListaTarefas
            tarefas={[tarefaConcluida]}
            recarregarTarefas={() => false}
          />
        </tbody>
      </table>
    );
    expect(getByTestId('nome-tarefa')).toHaveStyle(
      'text-decoration: line-through'
    );
  });
});
