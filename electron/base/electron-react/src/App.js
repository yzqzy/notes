import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css'
import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchFile from './components/SearchFile';
import FileList from './components/FileList';
import ButtonItem from './components/ButtonItem';
import TabList from './components/TabList';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import files from './shared/files';

const LeftBoard = styled.div.attrs({
  className: 'col-3 left-panel',
})`
  position: relative;
  padding: 0;
  background-color: #7b8c7c;
  min-height: 100vh;

  .btn_list {
    left: 0;
    bottom: 0;
    width: 100%;
    position: absolute;

    p {
      border: 0;
      width: 50%;
      color: #fff;
      border-radius: 0;
      margin-bottom: 0 !important;
    }

    p:nth-of-type(1) {
      background-color: #8ba39e;
    }

    p:nth-of-type(2) {
      background-color: #98b4b3;
    }
  }
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
          <div className="btn_list">
            <ButtonItem
              title="新建"
              icon={ faPlus }
            />
            <ButtonItem
              title="导入"
              icon={ faFileImport }
            />
          </div>
        </LeftBoard>
        <RightBoard>
          <TabList
            files={files}
            activeItem="1"
            unSaveItems={['1', '2']}
            clickItem={(id) => console.log(id)}
            closeItem={(id) => console.log(id)}
          />
          <SimpleMDE
            onChange={val => console.log(val)}
            value={files[0].body}
            options={{
              autofocus: true,
              spellChecker: false,
              minHeight: '446px'
            }}
          />
        </RightBoard>
      </div>
    </div>
  );
}

export default App;
