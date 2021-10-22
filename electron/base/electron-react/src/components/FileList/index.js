import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEdit, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useKeyBoard from "../../hooks/useKeyBoard";

const GroupUl = styled.ul.attrs({
  className: 'list-group list-group-flush',

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

  if (enterPressed && editItem) {
    saveFile(editItem, value);
    close();
  }
  if (escPressed && editItem) {
    close();
  }

  return (
    <GroupUl>
      {
        files.map(file => (
          <li
            className="list-group-item d-flex align-items-center"
            key={ file.id }
          > 
           {
             file.id !== editItem ? (
              <>
                <span className="mr-2">
                  <FontAwesomeIcon icon={ faFileAlt }></FontAwesomeIcon>
                </span>
                <span
                  className="col-8"
                  onClick={() => editFile(file.id)}
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
