import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import ConcluirTarefa from './concluir-tarefa';
import Tarefa from '../models/tarefa.models';
import '@testing-library/jest-dom/extend-expect';

describe.skip('Teste do componente de conclusão de tarefas', () => {
  const nomeTarefa = 'Tarefa de teste';
  const tarefa = new Tarefa(1, nomeTarefa, false);

  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve exibir abertura da modal', () => {
    const { getByTestId } = render(
      <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
  });

  it('deve concluir a tarefa', () => {
    localStorage['tarefas'] = JSON.stringify([tarefa]);
    const { getByTestId } = render(
      <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    fireEvent.click(getByTestId('btn-concluir'));
    const tarefasDb = JSON.parse(localStorage['tarefas']);
    expect(tarefasDb[0].concluida).toBeTruthy();
  });
});
