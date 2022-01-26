import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
  Button,
  ModalTitle,
  Modal,
  ModalBody,
  ModalFooter,
} from 'react-bootstrap';
import React, { useState } from 'react';
// import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tarefa from '../models/tarefa.models';

function CadastrarTarefa() {
  const history = useHistory();

  const [tarefa, setTarefa] = useState('');
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);

  function cadastrar(event) {
    event.preventDefault();
    setFormValidado(true);
    if (event.currentTarget.checkValidity() === true) {
      const tarefasDb = localStorage['tarefas'];
      const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
      tarefas.push(Tarefa(new Date().getTime(), tarefa, false));
      localStorage['tarefas'] = JSON.stringify(tarefas);
      setExibirModal(true);
    }
  }

  function handleTxtTarefa({ target }) {
    setTarefa(target.value);
  }

  function handleFecharModal() {
    history.push('/');
  }

  return (
    <div>
      <h3 className="text-center">Cadastrar</h3>
      <Container>
        <Form validated={formValidado} noValidate onSubmit={cadastrar}>
          <FormGroup>
            <FormLabel>Tarefa</FormLabel>
            <FormControl
              className="form-control"
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              required
              value={tarefa}
              onChange={handleTxtTarefa}
              data-testid="txt-tarefa"
            />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup className="text-center">
            <Button type="submit" variant="success" data-testid="btn-cadastrar">
              Cadastrar
            </Button>
            &nbsp;
            <Button onClick={() => history.push('/')}>Voltar</Button>
          </FormGroup>
        </Form>
        <Modal
          show={exibirModal}
          onHide={handleFecharModal}
          data-testid="modal"
        >
          <Modal.Header closeButton>
            <ModalTitle>Sucesso</ModalTitle>
          </Modal.Header>
          <ModalBody>Tarefa adicionada com sucesso</ModalBody>
          <ModalFooter>
            <Button variant="success" onClick={handleFecharModal}>
              Continuar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
}

export default CadastrarTarefa;
