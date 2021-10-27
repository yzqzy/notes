import { v4 } from 'uuid';
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
import { mapArr, objToArr, readFile, writeFile, renameFile, deleteFile } from './shared/helper';

const path = window.require('path');
const { remote } = window.require('electron');

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

// 自定义磁盘存放地址
const savePath = remote.app.getPath('documents') + '/electron_mkdown';

function App() {
  const [files, setFiles] = useState(mapArr(filesData));
  const [activeId, setActiveId] = useState('');
  const [openIds, setOpenIds] = useState([]);
  const [unSaveIds, setUnSaveIds] = useState([]);
  const [searchFiles, setSearchFiles] = useState([]);

  // 已打开的所有文件信息
  const openFiles = openIds.map(openId => files[openId]);

  // 正在编辑的文件信息
  const activeFile = files[activeId];
  // 计算当前左侧列表需要展示的信息
  const fileList = (searchFiles.length > 0) ? searchFiles : objToArr(files);

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

    if (ids.length && activeId === id) {
      setActiveId(ids[ids.length - 1]);
    } else if (ids.length && activeId !== id) {
      setActiveId(activeId);
    } else {
      setActiveId('');
    }
  }

  // 修改文件内容
  const changeFile = (id, newVal) => {
    if (!unSaveIds.includes(id)) {
      setUnSaveIds([ ...unSaveIds, id ]);
    }

    const newFile = { ...files[id], body: newVal };

    setFiles({
      ...files,
      [id]: newFile
    });
  }

  // 删除文件项
  const deleteItem = (id) => {
    deleteFile(path.join(savePath, `${ files[id].title }.md`))
      .then(() => {
        delete files[id];
    
        setFiles(files);
        closeFile(id);
      })
  }

  // 根据关键字搜索文件
  const searchFile = (keyword) => {
    const nameFiles = objToArr(files).filter(file => file.title.includes(keyword));
    setSearchFiles(nameFiles);
  }

  // 保存数据
  const saveData = (id, newTitle, isNew) => {
    const file = objToArr(files).find(file => file.title === newTitle);

    if (file) {
      newTitle += '_copy';
    }

    const newFile = { ...files[id], title: newTitle, isNew: false };
    const newPath = path.join(savePath, `${ newTitle }.md`);

    if (isNew) {
      // 创建操作
      writeFile(newPath, files[id].body)
        .then(() => {
          setFiles({ ...files, [id]: newFile });
        });
    } else {
      // 更新操作
      renameFile(path.join(savePath, `${ files[id].title }.md`), newPath)
        .then(() => {
          setFiles({ ...files, [id]: newFile });
        });
    }
  }

  // 新建操作
  const createFile = () => {
    const newId = v4()

    const newFile = {
      id: newId,
      title: '',
      isNew: true,
      body: '## 初始化',
      createTime: new Date().getTime()
    };

    const flag = objToArr(files).find(file => file.isNew);

    if (!flag) {
      setFiles({
        ...files,
        [newId]: newFile
      });
    }
  }

  // 保存正在编辑的文件内容
  const saveCurrentFile = () => {
    writeFile(path.join(savePath, `${ activeFile.title }.md`), activeFile.body)
      .then(() => {
        setUnSaveIds(unSaveIds.filter(id => id !== activeFile.id));
      });
  }

  return (
    <div className="App container-fluid">
      <div className="row no-gutters">
        <LeftBoard>
          <SearchFile
            title="我的文档"
            onSearch={ searchFile }
          />
          <FileList
            files={ fileList }
            editFile={ openItem }
            deleteFile={ deleteItem }
            saveFile={ saveData }
          />
          <div className="btn_list">
            <ButtonItem
              title="新建"
              icon={ faPlus }
              btnClick={ createFile }
            />
            <ButtonItem
              title="导入"
              icon={ faFileImport }
            />
          </div>
        </LeftBoard>
        <RightBoard>
          <button onClick={ saveCurrentFile }>保存</button>
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
                  onChange={ val => changeFile(activeFile.id, val) }
                  value={ activeFile.body }
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
