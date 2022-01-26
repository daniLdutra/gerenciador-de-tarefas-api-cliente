import PropTypes, { func } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../index.css';
import ConcluirTarefa from './concluir-tarefa';
import RemoverTarefa from './remover-tarefa';
function ItensListaTarefas(props) {
  const history = useHistory();

  return props.tarefas.map((tarefa) => (
    <tr key={tarefa.id} data-testid="tarefa">
      <td
        width="75%"
        data-testid="nome-tarefa"
        style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}
      >
        {tarefa.nome}
      </td>
      <td className="text-right">
        <ConcluirTarefa
          tarefa={tarefa}
          recarregarTarefas={props.recarregarTarefas}
          className={tarefa.concluida ? 'hidden' : null}
        />
        &nbsp;
        {!tarefa.concluida && (
          <Button
            onClick={() => history.push('/atualizar/' + tarefa.id)}
            className="btn btn-warning btn-sm"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        )}
        &nbsp;
        <RemoverTarefa
          tarefa={tarefa}
          recarregarTarefas={props.recarregarTarefas}
        />
      </td>
    </tr>
  ));
}

ItensListaTarefas.propTypes = {
  tarefas: PropTypes.array.isRequired,
  recarregarTarefas: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ItensListaTarefas;
