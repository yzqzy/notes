import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const BtnP = styled.p.attrs({
  className: 'btn no-border'
})`
`;

const ButtonItem = ({ title, btnClick, icon }) => {
  return (
    <BtnP>
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{ title }</span>      
    </BtnP>
  )
}

export default ButtonItem;