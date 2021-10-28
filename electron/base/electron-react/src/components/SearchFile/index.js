import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useKeyBoard from "../../hooks/useKeyBoard";
import useIpcRenderer from "../../hooks/useIpcRenderer";

const SearchDiv = styled.div.attrs({
  className: 'd-flex align-items-center justify-content-between'
})`
  border-bottom: 1px solid #fff;

  span {
    color: #fff;
    padding: 0 10px;
    font: normal 16px/40px '微软雅黑';
  }

  input {
    border: none;
    border-radius: 4px;
    margin-left: 14px;
  }
`

const SearchFile = ({ title, onSearch }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [value, setValue] = useState('');
  const oInputRef = useRef(null);
  const enterPressed = useKeyBoard(13);
  const escPressed = useKeyBoard(27);

  const closeSearch = () => {
    setSearchActive(false);
    setValue('');
    
    onSearch('');
  }

  useEffect(() => {
    if (enterPressed && searchActive) {
      onSearch(value);
    }
    if (escPressed && searchActive) {
      closeSearch();
    }
  });

  useEffect(() => {
    if (searchActive) {
      oInputRef.current.focus();
    }
  }, [ searchActive ]);

  useIpcRenderer({
    'execute-search-file': () => setSearchActive(true)
  });

  return (
    <>
      {
        !searchActive && (
          <SearchDiv>
            <span>{ title }</span>
            <span onClick={() => { setSearchActive(true) }}>
              <FontAwesomeIcon icon={ faSearch }></FontAwesomeIcon>
            </span>
          </SearchDiv>
        )
      }
      {
        searchActive && (
          <SearchDiv>
            <input
              value={ value }
              ref={ oInputRef }
              onChange={(e) => { setValue(e.target.value) }}
            />
            <span onClick={closeSearch}>
              <FontAwesomeIcon icon={ faTimes }></FontAwesomeIcon>
            </span>
          </SearchDiv>
        )
      }
    </>
  )
}

SearchFile.propTypes = {
  title: PropTypes.string,
  onSearch: PropTypes.func.isRequired
}

SearchFile.defaultProps = {
  title: '文档列表'
}

export default SearchFile;