import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchFile from './components/SearchFile';
import FileList from './components/FileList';

import files from './shared/files';

const LeftBoard = styled.div.attrs({
  className: 'col-3 left-panel',
})`
  padding: 0;
  background-color: #7b8c7c;
  min-height: 100vh;
`;

const RightBoard = styled.div.attrs({
  className: 'col-9 left-panel'
})`
  padding: 0;
  background-color: #c9d8cd;
`;

function App() {
  return (
    <div className="App container-fluid">
      <div className="row no-gutters">
        <LeftBoard>
          <SearchFile
            title="我的文档"
            onSearch={(val) => console.log(val)}
          />
          <FileList
            files={files}
            editFile={(id) => {
              console.log(id)
            }}
            deleteFile={(id) => {
              console.log(id)
            }}
            saveFile={(id, value) => {
              console.log(id, value)
            }}
          />
        </LeftBoard>
        <RightBoard>右侧</RightBoard>
      </div>
    </div>
  );
}

export default App;
