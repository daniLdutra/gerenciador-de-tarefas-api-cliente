import RemoverTarefa from './remover-tarefa';
import Tarefa from '../models/tarefa.models';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe.skip('Teste do componente de remocao de tarefas', () => {
  const nomeTarefa = 'Tarefa de teste';
  const tarefa = Tarefa(1, nomeTarefa, false);

  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <RemoverTarefa tarefa={tarefa} recarregarTarefas={() => false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve exibir a modal', () => {
    const { getByTestId } = render(
      <RemoverTarefa tarefa={tarefa} recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
  });

  it('deve remover uma tarefa', () => {
    localStorage['tarefas'] = JSON.stringify([tarefa]);
    const { getByTestId } = render(
      <RemoverTarefa tarefa={tarefa} recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    fireEvent.click(getByTestId('btn-remover'));
    const tarefasDb = JSON.parse(localStorage['tarefas']);
    expect(tarefasDb.length).toBe(0);
  });
});
