import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabUl = styled.ul.attrs({
  className: 'nav nav-pills'
})`
  border-bottom: 1px solid #fff;

  li span {
    color: #fff;
    border-radius: 0px !important;
  }

  li span.active {
    background-color: #3e403f !important;
  }

  .unSaveMark .round-circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #b80233;
  }

  .unSaveMark .icon-close {
    display: none;
  }

  .unSaveMark:hover .icon-close {
    display: inline-block;
  }

  .unSaveMark:hover .round-circle {
    display: none;
  }
`;

const TabList = ({ files, activeItem, unSaveItems, clickItem, closeItem }) => {
  return (
    <TabUl>
      {
        files.map(file => {
          const unSaveMark = unSaveItems.includes(file.id);
          const finalClass = classNames({
            "nav-link": true,
            "active": activeItem === file.id,
            "unSaveMark": unSaveMark
          });

          return (
            <li
              className="nav-item"
              key={ file.id }
            >
              <span
                className={finalClass}
                onClick={(e) => {
                  e.preventDefault();
                  clickItem(file.id);
                }}
              >
                { file.title }
                <span
                  className="ml-2 icon-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeItem(file.id);
                  }}
                >
                  <FontAwesomeIcon icon={ faTimes } />
                </span>
                {
                  unSaveMark && <span className="ml-2 round-circle" />
                }
              </span>
            </li>
          )
        })
      }
    </TabUl>
  )
}

TabList.propTypes = {
  files: PropTypes.array,
  activeItem: PropTypes.string,
  unSaveItems: PropTypes.array,
  clickItem: PropTypes.func,
  closeItem: PropTypes.func
}

TabList.defaultProps = {
  unSaveItems: []
}

export default TabList;
