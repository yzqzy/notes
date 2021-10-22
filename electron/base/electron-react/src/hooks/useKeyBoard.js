import { useState, useEffect } from "react";

const useKeyBoard = (code) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === code) {
      setKeyPressed(true);
    }
  }

  const handleKeyUp = ({ keyCode }) => {
    if (keyCode === code) {
      setKeyPressed(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return keyPressed;
}

export default useKeyBoard;
