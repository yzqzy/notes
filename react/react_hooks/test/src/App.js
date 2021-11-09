import React, { useState } from 'react';

const useUpdateInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: event => setValue(event.target.value)
  }
}

function App () {
  const usenameInput = useUpdateInput('');
  const passwordInput = useUpdateInput('');

  const submitForm = (e) => {
    e.preventDefault();
    console.log(usenameInput.value, passwordInput.value);
  }

  return (
    <form onSubmit={ submitForm }>
      <input type="text" name="username" { ...usenameInput } />
      <input type="text" name="password" { ...passwordInput } />
      <button type="submit">提交</button>
    </form>
  );
}

export default App;
