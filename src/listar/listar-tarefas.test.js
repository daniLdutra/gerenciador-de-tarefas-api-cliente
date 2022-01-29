import ReactDOM from 'react-dom';
import ListarTarefas from './listar-tarefas';
import Tarefa from '../models/tarefa.models';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('teste de componente de listagem de tarefas', () => {
  const nomePrimeiraTarefa = 'Primeira tarefa';
  const nomeSegundaTarefa = 'Segunda tarefa';
  const nomeTerceiraTarefa = 'Terceira tarefa';

  const listarTarefas = {
    totalItens: 3,
    tarefas: [
      new Tarefa(1, nomePrimeiraTarefa, false),
      new Tarefa(2, nomeSegundaTarefa, false),
      new Tarefa(3, nomeTerceiraTarefa, false),
    ],
    pagina: 1,
  };

  it('deve exibir uma tabela contendo 3 tarefas', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: listarTarefas,
    });

    const { findByTestId } = render(<ListarTarefas />);
    const tabela = await findByTestId('tabela');
    expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
    expect(tabela).toHaveTextContent(nomeSegundaTarefa);
    expect(tabela).toHaveTextContent(nomeTerceiraTarefa);
  });

  it.skip('deve filtrar os dados da tabela de tarefas', () => {
    const { getByTestId } = render(<ListarTarefas />);
    fireEvent.change(getByTestId('txt-tarefa'), {
      target: { value: nomePrimeiraTarefa },
    });
    const tabela = getByTestId('tabela');
    expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
    expect(tabela).not.toHaveTextContent(nomeSegundaTarefa);
    expect(tabela).not.toHaveTextContent(nomeTerceiraTarefa);
  });
});
