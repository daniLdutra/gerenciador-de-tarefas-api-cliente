import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import Proptypes from 'prop-types';

function Ordenacao(props) {
  function handleAscDesc() {
    return props.ordenarAsc || props.ordenarDesc ? 'hidden' : '';
  }

  function handleAsc() {
    return props.ordenarAsc ? '' : 'hidden';
  }

  function handleDesc() {
    return props.ordenarDesc ? '' : 'hidden';
  }

  return (
    <span>
      <FontAwesomeIcon
        icon={faSort}
        data-testid="faSort"
        className={handleAscDesc()}
      />
      <FontAwesomeIcon
        icon={faSortUp}
        data-testid="faSortUp"
        className={handleAsc()}
      />
      <FontAwesomeIcon
        icon={faSortDown}
        data-testid="faSortDown"
        className={handleDesc()}
      />
    </span>
  );
}

Ordenacao.propTypes = {
  ordenarAsc: Proptypes.bool.isRequired,
  ordenarDesc: Proptypes.bool.isRequired,
};

export default Ordenacao;
