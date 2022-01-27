import { useState } from 'react';
import Proptypes from 'prop-types';
import {
  Modal,
  Button,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConcluirTarefa(props) {
  const [exibirModal, setExibirModal] = useState(false);
  const [exibirModalErro, setExibirModalErro] = useState(false);

  const API_URL_CONCLUIR_TAREFA =
    'http://localhost:3001/gerenciador-tarefas/:id/concluir';

  function handleAbrirModal(event) {
    event.preventDefault();
    setExibirModal(true);
  }

  function handleFecharModal() {
    setExibirModal(false);
  }

  function handleFecharModalErro() {
    setExibirModalErro(false);
  }

  async function handleConcluirTarefa(event) {
    event.preventDefault();

    try {
      await axios.put(API_URL_CONCLUIR_TAREFA.replace(':id', props.tarefa.id));
      setExibirModal(false);
      props.recarregarTarefas(true);
    } catch (error) {
      setExibirModal(false);
      setExibirModalErro(true);
    }
  }

  return (
    <span className={props.className}>
      <Button
        className="btn-sm"
        onClick={handleAbrirModal}
        data-testid="btn-abrir-modal"
      >
        <FontAwesomeIcon icon={faClipboardCheck} />
      </Button>
      <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
        <Modal.Header closeButton>
          <ModalTitle>Concluir Tarefa</ModalTitle>
        </Modal.Header>
        <ModalBody>
          Deseja realmente concluir a seguinte tarefa?
          <br />
          <strong>{props.tarefa.nome}</strong>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-primary"
            onClick={handleConcluirTarefa}
            data-testid="btn-concluir"
          >
            Sim
          </Button>
          <Button
            className="btn btn-dark"
            onClick={handleFecharModal}
            data-testid="btn-fechar-modal"
          >
            Não
          </Button>
        </ModalFooter>
      </Modal>
      <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
        <Modal.Header closeButton>
          <ModalTitle>Erro</ModalTitle>
          <ModalBody>
            Erro ao concluir a tarefa, tente novamente em instantes.
          </ModalBody>
          <ModalFooter>
            <Button variant="warning" onClick={handleFecharModalErro}>
              Fechar
            </Button>
          </ModalFooter>
        </Modal.Header>
      </Modal>
    </span>
  );
}

ConcluirTarefa.prototype = {
  tarefa: Proptypes.object.isRequired,
  recarregarTarefas: Proptypes.func.isRequired,
  className: Proptypes.string.isRequired,
};

export default ConcluirTarefa;
