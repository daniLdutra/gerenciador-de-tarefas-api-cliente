import { Button, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';
import axios from 'axios';

function ListarTarefas() {
  const history = useHistory();

  const ITENS_POR_PAGINA = 3;
  const API_URL_LISTAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas';

  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [totalItens, setTotalItens] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOrdenarAsc] = useState(false);
  const [ordenarDesc, setOrdenarDesc] = useState(false);
  const [filtroTarefa, setFiltroTarefa] = useState('');

  useEffect(() => {
    async function obterTarefas() {
      //ordem
      let ordem = '';
      if (ordenarAsc) {
        ordem = 'ASC';
      } else if (ordenarDesc) {
        ordem = 'DESC';
      }
      const params = `?pag=${paginaAtual}&ordem=${ordem}&filtro-tarefa=${filtroTarefa}`;
      try {
        let { data } = await axios.get(API_URL_LISTAR_TAREFAS + params);
        setTotalItens(data.totalItens);
        setTarefas(data.tarefas);
      } catch (error) {
        setTarefas([]);
      }
    }

    if (carregarTarefas) {
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa]);

  function handleMudarPagina(pagina) {
    setPaginaAtual(pagina);
    setCarregarTarefas(true);
  }

  function handleOrdenar(event) {
    event.preventDefault();
    if (!ordenarAsc && !ordenarDesc) {
      setOrdenarAsc(true);
      setOrdenarDesc(false);
    } else if (ordenarAsc) {
      setOrdenarAsc(false);
      setOrdenarDesc(true);
    } else {
      setOrdenarAsc(false);
      setOrdenarDesc(false);
    }
    setCarregarTarefas(true);
  }

  function handleFiltar({ target }) {
    setFiltroTarefa(target.value);
    setCarregarTarefas(true);
  }
  return (
    <div className="text-center">
      <h3>Tarefas a fazer</h3>
      <Table striped bordered hover responsive data-testid="tabela">
        <thead>
          <tr>
            <th>
              <a href="/" onClick={handleOrdenar}>
                Tarefa &nbsp;
                <Ordenacao ordenarAsc={ordenarAsc} ordenarDesc={ordenarDesc} />
              </a>
            </th>
            <th>
              <Button
                onClick={() => history.push('/cadastrar')}
                className="btn btn-success btn-sm"
                data-testid="btn-nova-tarefa"
              >
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Nova Tarefa
              </Button>
            </th>
          </tr>
          <tr>
            <th>
              <FormControl
                type="text"
                value={filtroTarefa}
                onChange={handleFiltar}
                data-testid="txt-tarefa"
                className="filtro-tarefa"
              ></FormControl>
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <ItensListaTarefas
            tarefas={tarefas}
            recarregarTarefas={setCarregarTarefas}
          />
        </tbody>
      </Table>
      <Paginacao
        totalItens={totalItens}
        itensPorPagina={ITENS_POR_PAGINA}
        paginaAtual={paginaAtual}
        mudarPagina={handleMudarPagina}
      />
    </div>
  );
}

export default ListarTarefas;
