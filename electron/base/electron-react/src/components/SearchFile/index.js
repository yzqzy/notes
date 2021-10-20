import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

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

  const closeSearch = () => {
    setSearchActive(false);
    setValue('');
  }

  useEffect(() => {
    const searchHandle = (e) => {
      const { keyCode } = e;

      if (keyCode === 13 && searchActive) {
        onSearch(value);
      }

      if (keyCode === 12 && searchActive) {
        closeSearch();
      }
    }

    document.addEventListener('keyup', searchHandle);

    return () => {
      document.removeEventListener('keyup', searchHandle);
    }
  });

  useEffect(() => {
    if (searchActive) {
      oInputRef.current.focus();
    }
  }, [ searchActive ]);

  return (
    <>
      {
        !searchActive && (
          <SearchDiv>
            <span>{ title }</span>
            <span onClick={() => { setSearchActive(true) }}>搜索</span>
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
            <span onClick={closeSearch}>关闭</span>
          </SearchDiv>
        )
      }
    </>
  )
}

export default SearchFile;