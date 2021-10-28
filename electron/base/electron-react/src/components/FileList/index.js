import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEdit, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useKeyBoard from "../../hooks/useKeyBoard";
import useContextMenu from "../../hooks/useContextMenu";
import { getParentNode } from "../../shared/helper";

const GroupUl = styled.ul.attrs({
  className: 'list-group list-group-flush menu-board',
})`
  li {
    color: #fff;
    background: none;
  }
`;

const FileList = ({ files, editFile, saveFile, deleteFile }) => {
  const [editItem, setEditItem] = useState(false);
  const [value, setValue] = useState('');
  const enterPressed = useKeyBoard(13);
  const escPressed = useKeyBoard(27);

  const close = () => {
    setEditItem(false);
    setValue('');
  }

  // 自定义右键菜单
  const contextMenuTemplate = [
    {
      label: '重命名',
      click () {
        const retNode = getParentNode(currentElement.current, 'menu-item');

        setEditItem(retNode.dataset.id);
      }
    },
    {
      label: '删除',
      click () {
        const retNode = getParentNode(currentElement.current, 'menu-item');

        deleteFile(retNode.dataset.id);
      }
    }
  ];

  const currentElement = useContextMenu(contextMenuTemplate, '.menu-board');

  useEffect(() => {
    const newFile = files.find(file => file.isNew);

    if (newFile && editItem !== newFile.id) {
      // 新建文件过程中，点击其他文件项
      deleteFile(newFile.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ editItem ]);

  useEffect(() => {
    const newFile = files.find(file => file.isNew);

    if (newFile) {
      setEditItem(newFile.id);
      setValue(newFile.title);
    }
  }, [ files ]);

  useEffect(() => {
    if (enterPressed && editItem && value.trim() !== '') {
      const file = files.find(file => file.id === editItem);
      saveFile(editItem, value, file.isNew);
      close();
    }
    if (escPressed && editItem) {
      close();
    }
  });
  
  return (
    <GroupUl>
      {
        files.map(file => (
          <li
            className="list-group-item d-flex align-items-center menu-item"
            key={ file.id }
            data-id={ file.id }
            data-title={ file.title }
          > 
           {
             file.id !== editItem && !file.isNew ? (
              <>
                <span className="mr-2">
                  <FontAwesomeIcon icon={ faFileAlt }></FontAwesomeIcon>
                </span>
                <span
                  className="col-8"
                  onClick={() => {
                    close();
                    editFile(file.id);
                  }}
                >{ file.title }</span>
                <span
                  className="col-1"
                  onClick={() => setEditItem(file.id)}
                >
                  <FontAwesomeIcon icon={ faEdit }></FontAwesomeIcon>
                </span>
                <span
                  className="col-1"
                  onClick={() => deleteFile(file.id)}
                >
                  <FontAwesomeIcon icon={ faTrashAlt }></FontAwesomeIcon>
                </span>
              </>
             ) : ( 
              <>
                <input
                  className="col-9"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <span
                  className="col-3"
                  onClick={close}
                >
                  <FontAwesomeIcon icon={ faTimes }></FontAwesomeIcon>
                </span>
              </>
             )
           }
          </li>
        ))
      }
    </GroupUl>
  )
}

FileList.propTypes = {
  files: PropTypes.array,
  editFile: PropTypes.func,
  saveFile: PropTypes.func,
  deleteFile: PropTypes.func
}

export default FileList;
