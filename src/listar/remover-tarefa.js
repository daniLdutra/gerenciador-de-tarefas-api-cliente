import Proptypes from 'prop-types';
import { useState } from 'react';
import {
  Modal,
  Button,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function RemoverTarefa(props) {
  const [exibirModal, setExibirModal] = useState(false);
  const [exibirModalErro, setExibirModalErro] = useState(false);

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

  function handleRemoverTarefa(event) {
    event.preventDefault();
    const tarefasDb = localStorage['tarefas'];
    let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
    tarefas = tarefas.filter((tarefa) => tarefa.id !== props.tarefa.id);
    localStorage['tarefas'] = JSON.stringify(tarefas);
    setExibirModal(false);
    props.recarregarTarefas(true);
  }

  return (
    <span>
      <Button
        variant="danger"
        className="btn-sm"
        onClick={handleAbrirModal}
        data-testid="btn-abrir-modal"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
      <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
        <Modal.Header closeButton>
          <ModalTitle>Remover Tarefa</ModalTitle>
        </Modal.Header>
        <ModalBody>
          Deseja realmente remover a seguinte tarefa?
          <br />
          <strong>{props.tarefa.nome}</strong>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={handleRemoverTarefa}
            data-testid="btn-remover"
          >
            Sim
          </Button>
          <Button className="btn btn-dark" onClick={handleFecharModal}>
            Não
          </Button>
        </ModalFooter>
      </Modal>
      <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
        <Modal.Header closeButton>
          <ModalTitle>Erro</ModalTitle>
          <ModalBody>
            Erro ao remover tarefa, tente novamente em instantes.
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

RemoverTarefa.propTypes = {
  tarefa: Proptypes.object.isRequired,
  recarregarTarefa: Proptypes.func.isRequired,
};

export default RemoverTarefa;
