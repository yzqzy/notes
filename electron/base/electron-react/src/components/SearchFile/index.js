import React, { useState } from "react";
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

  return (
    <>
      {
        searchActive && (
          <SearchDiv>
            <span>{ title }</span>
            <span onClick={() => { setSearchActive(false) }}>搜索</span>
          </SearchDiv>
        )
      }
      {
        !searchActive && (
          <SearchDiv>
            <input
              value={ value }
              onChange={(e) => { setValue(e.target.value) }}
            />
            <span onClick={() => { setSearchActive(true) }}>关闭</span>
          </SearchDiv>
        )
      }
    </>
  )
}

export default SearchFile;