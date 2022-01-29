import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import CadastrarTarefa from './cadastrar-tarefas';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('teste de componente de cadastro de tarefas', () => {
  it('deve cadastrar uma nova tarefa', async () => {
    const { getByTestId, findByTestId } = render(<CadastrarTarefa />);

    fireEvent.change(getByTestId('txt-tarefa'), {
      target: { value: 'Testar componente' },
    });
    fireEvent.click(getByTestId('btn-cadastrar'));
    const modal = await findByTestId('modal');
    expect(modal).toHaveTextContent('Sucesso');
    expect(modal).toHaveTextContent('Tarefa adicionada com sucesso');
  });
});
