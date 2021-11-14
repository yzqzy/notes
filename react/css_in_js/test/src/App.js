import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  width: 100px;
  height: 30px;
  background: orange;
  border: none;
`;

const Container = styled.div`
  width: 1000px;
  padding: 20px;
  margin: 0 auto;
  background: pink;
`;

function App () {
  return (
    <Container>
      <Button>按钮</Button>
      App works
    </Container>
  );
}

export default App;
