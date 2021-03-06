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
import { useHistory } from 'react-router-dom';
import Tarefa from '../models/tarefa.models';
import axios from 'axios';

function CadastrarTarefa() {
  const history = useHistory();

  const API_URL_CADASTRAR_TAREFA = 'http://localhost:3001/gerenciador-tarefas';

  const [tarefa, setTarefa] = useState('');
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  const [exibirModalErro, setExibirModalErro] = useState(false);

  async function cadastrar(event) {
    event.preventDefault();
    setFormValidado(true);

    if (event.currentTarget.checkValidity() === true) {
      try {
        const novaTarefa = new Tarefa(null, tarefa, false);
        await axios.post(API_URL_CADASTRAR_TAREFA, novaTarefa);
        setExibirModal(true);
      } catch (error) {
        setExibirModalErro(true);
      }
    }
  }

  function handleTxtTarefa({ target }) {
    setTarefa(target.value);
  }

  function handleFecharModal() {
    history.push('/');
  }

  function handleFecharModalErro() {
    setExibirModalErro(false);
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

        <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
          <Modal.Header closeButton>
            <ModalTitle>Erro</ModalTitle>
          </Modal.Header>
          <ModalBody>
            Erro ao adicionar tarefa, tente novamente em instantes.
          </ModalBody>
          <ModalFooter>
            <Button variant="warning" onClick={handleFecharModalErro}>
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
}

export default CadastrarTarefa;
