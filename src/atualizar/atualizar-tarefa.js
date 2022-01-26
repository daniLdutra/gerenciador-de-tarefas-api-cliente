import Proptypes from 'prop-types';
import {
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Tarefa from '../models/tarefa.models';

function AtualizarTarefa(props) {
  const history = useHistory();

  const API_URL_TAREFAS = 'http://localhost:3001/gerenciador-tarefas/';

  const [tarefa, setTarefa] = useState('');
  const [exibirModal, setExibirModal] = useState(false);
  const [formValidado, setFormValiado] = useState(false);
  const [carregarTarefa, setCarregarTarefa] = useState(true);
  const [exibirModalErro, setExibirModalErro] = useState(false);

  useEffect(() => {
    async function obterTarefa() {
      const { id } = props.match.params;
      try {
        let { data } = await axios.get(API_URL_TAREFAS + id);
        setTarefa(data.nome);
      } catch (error) {
        setExibirModalErro(true);
      }
    }

    if (carregarTarefa) {
      obterTarefa();
      setCarregarTarefa(false);
    }
  }, [carregarTarefa, props]);

  function voltar(event) {
    event.preventDefault();
    history.push('/');
  }

  function handleFecharModal() {
    history.push('/');
  }

  function handleFecharModalErro() {
    setExibirModalErro(false);
  }

  async function atualizar(event) {
    event.preventDefault();
    const { id } = props.match.params;
    setFormValiado(true);
    if (event.currentTarget.checkValidity()) {
      try {
        const tarefaAtualizar = new Tarefa(null, tarefa, false);
        await axios.put(API_URL_TAREFAS + id, tarefaAtualizar);
        setExibirModal(true);
      } catch (error) {
        setExibirModalErro(true);
      }
    }
  }
  function handleTxtTarefa({ target }) {
    setTarefa(target.value);
  }

  return (
    <div>
      <h3 className="text-center">Atualizar</h3>
      <Container>
        <Form onSubmit={atualizar} noValidate validated={formValidado}>
          <FormGroup>
            <FormLabel>Tarefa</FormLabel>
            <FormControl
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              required
              data-testid="txt-tarefa"
              value={tarefa}
              onChange={handleTxtTarefa}
            ></FormControl>
            <FormControl.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres.
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="text-center">
            <Button
              className="btn btn-success"
              type="submit"
              data-testid="btn-atualizar"
            >
              Atualizar
            </Button>
            &nbsp;
            <Link to="/" className="btn btn-secondary" onClick={voltar}>
              Voltar
            </Link>
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
          <ModalBody>Tarefa atualizada com sucesso</ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={handleFecharModal}>
              Continuar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
          <Modal.Header closeButton>
            <ModalTitle>Erro</ModalTitle>
          </Modal.Header>
          <ModalBody>
            Erro ao atualizar tarefa, tente novamente em instantes.
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

AtualizarTarefa.propTypes = {
  props: Proptypes.object,
};
export default AtualizarTarefa;
