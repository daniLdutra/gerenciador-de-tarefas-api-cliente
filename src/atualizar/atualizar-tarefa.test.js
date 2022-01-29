import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefa';

describe.skip('Teste de componente de atualização de tarefas', () => {
  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AtualizarTarefa />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
