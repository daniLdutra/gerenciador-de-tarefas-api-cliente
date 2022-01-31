import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import ConcluirTarefa from './concluir-tarefa';
import Tarefa from '../models/tarefa.models';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Teste do componente de conclusão de tarefas', () => {
  const nomeTarefa = 'Tarefa de teste';
  const tarefa = new Tarefa(1, nomeTarefa, false);

  it('deve exibir abertura da modal', () => {
    const { getByTestId } = render(
      <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
  });

  it('deve concluir a tarefa', async () => {
    const { getByTestId, findByTestId } = render(
      <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    fireEvent.click(getByTestId('btn-concluir'));
    await findByTestId('modal');
    expect(axiosMock.put).toHaveBeenCalledTimes(1);
  });
});
