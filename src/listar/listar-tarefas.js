import { Button, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';

function ListarTarefas() {
  const history = useHistory();

  const ITENS_POR_PAGINA = 3;

  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [totalItens, setTotalItens] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOrdenarAsc] = useState(false);
  const [ordenarDesc, setOrdenarDesc] = useState(false);
  const [filtroTarefa, setFiltroTarefa] = useState('');

  useEffect(() => {
    function obterTarefas() {
      const tarefasDb = localStorage['tarefas'];
      let listarTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

      //fitrar
      listarTarefas = listarTarefas.filter(
        (t) => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
      );

      //ordenar
      if (ordenarAsc) {
        listarTarefas.sort((t1, t2) =>
          t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1
        );
      } else if (ordenarDesc) {
        listarTarefas.sort((t1, t2) =>
          t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1
        );
      }

      //paginar
      setTotalItens(listarTarefas.length);
      setTarefas(
        listarTarefas.splice(
          (paginaAtual - 1) * ITENS_POR_PAGINA,
          ITENS_POR_PAGINA
        )
      );
      // console.log(listarTarefas);
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
