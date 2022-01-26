import { Pagination } from 'react-bootstrap';
import Proptypes from 'prop-types';

function Paginacao(props) {
  function gerarPrimeiroItem() {
    return (
      <Pagination.First
        key="pagFirst"
        onClick={() => props.mudarPagina(1)}
        disabled={props.paginaAtual === 1}
      />
    );
  }

  function gerarItemAnterior() {
    return (
      <Pagination.Prev
        key="pagPrev"
        onClick={() => props.mudarPagina(props.paginaAtual - 1)}
        disabled={props.paginaAtual === 1}
      />
    );
  }

  function gerarItemNumerico(pagina) {
    return (
      <Pagination.Item
        key={pagina}
        active={pagina === props.paginaAtual}
        onClick={() => props.mudarPagina(pagina)}
      >
        {pagina}
      </Pagination.Item>
    );
  }

  function gerarProximoItem(numPaginas) {
    return (
      <Pagination.Next
        key="pagNext"
        onClick={() => props.mudarPagina(props.paginaAtual + 1)}
        disabled={props.paginaAtual === numPaginas}
      />
    );
  }

  function gerarUltimoItem(numPaginas) {
    return (
      <Pagination.Last
        key="pagLast"
        onClick={() => props.mudarPagina(numPaginas)}
        disabled={props.paginaAtual === numPaginas}
      />
    );
  }

  function obterPaginacao() {
    const numPaginas = Math.ceil(props.totalItens / props.itensPorPagina);

    let itens = [];
    itens.push(gerarPrimeiroItem());
    itens.push(gerarItemAnterior());

    for (let pagina = 1; pagina <= numPaginas; pagina += 1) {
      itens.push(gerarItemNumerico(pagina));
    }
    itens.push(gerarProximoItem(numPaginas));
    itens.push(gerarUltimoItem(numPaginas));
    return itens;
  }

  return <Pagination data-testid="paginacao">{obterPaginacao()}</Pagination>;
}

Paginacao.propTypes = {
  totalItens: Proptypes.number.isRequired,
  itensPorPagina: Proptypes.number.isRequired,
  paginaAtual: Proptypes.number.isRequired,
  mudarPagina: Proptypes.func.isRequired,
};

export default Paginacao;
