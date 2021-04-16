import {useState} from 'react';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  //advance to any other mode
  //if replace, will remove last history (ex. error page so if use goes back, it does not go back to error)
  function transition (newMode, replace) {
    setMode(newMode)
    if (replace) {
      setHistory([...history.slice(0,-1), newMode])
    } else {
      setHistory([...history, newMode])
    }
  }

  //return to previous mode
  function back () {
    if(history.length === 1 ) {
      setMode(initial);
    } else {
      setHistory(history.slice(0,-1));
      setMode(history[history.length - 2]);
    }
  }
  return { mode, transition, back };
}



