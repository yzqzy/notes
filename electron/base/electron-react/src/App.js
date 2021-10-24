import React, { useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css'
import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchFile from './components/SearchFile';
import FileList from './components/FileList';
import ButtonItem from './components/ButtonItem';
import TabList from './components/TabList';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import filesData from './shared/files';

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

  .init-page {
    color: #888;
    text-align: center;
    font: normal 28px/300px '微软雅黑';
  }
`;

function App() {
  const [files, setFiles] = useState(filesData);
  const [activeId, setActiveId] = useState('');
  const [openIds, setOpenIds] = useState([]);
  const [unSaveIds, setUnSaveIds] = useState([]);

  // 已打开的所有文件信息
  const openFiles = openIds.map(openId => (
    files.find(file => file.id === openId)
  ));

  // 正在编辑的文件信息
  const activeFile = files.find(file => file.id === activeId);

  // 编辑文件
  const openItem = (id) => {
    setActiveId(id);

    if (!openIds.includes(id)) {
      setOpenIds([ ...openIds, id]);
    }
  }

  // 改变激活状态
  const changeActive = (id) => {
    setActiveId(id);
  }

  // 关闭文件
  const closeFile = (id) => {
    const ids = openIds.filter(_id => _id !== id);

    setOpenIds(ids);

    if (ids.length) {
      setActiveId(ids[ids.length - 1]);
    } else {
      setActiveId('');
    }
  }

  // 修改文件内容
  const changeFile = (id, newVal) => {
    if (!unSaveIds.includes(id)) {
      setUnSaveIds([ ...unSaveIds, id ]);
    }

    const newFiles = files.map(file => {
      if (file.id === id) {
        file.body = newVal;
      }

      return file;
    });

    setFiles(newFiles);
  }

  return (
    <div className="App container-fluid">
      <div className="row no-gutters">
        <LeftBoard>
          <SearchFile
            title="我的文档"
            onSearch={(val) => console.log(val)}
          />
          <FileList
            files={ files }
            editFile={openItem}
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
          {
            activeFile ? (
              <>
                <TabList
                  files={ openFiles }
                  activeItem={ activeId }
                  unSaveItems={ unSaveIds }
                  clickItem={ changeActive }
                  closeItem={ closeFile }
                />
                <SimpleMDE
                  key={ activeFile && activeFile.id }
                  onChange={val => changeFile(activeFile.id, val)}
                  value={activeFile.body}
                  options={{
                    autofocus: true,
                    spellChecker: false,
                    minHeight: '446px'
                  }}
                />
              </>
            ) : (
              <div className="init-page">新建或者导入文档</div>
            )
          }
        </RightBoard>
      </div>
    </div>
  );
}

export default App;
