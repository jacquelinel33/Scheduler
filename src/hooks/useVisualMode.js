import {useState} from 'react';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  //advance to any other mode
  //if replace, will remove last history (ex. if user is on error page and goes back, it does not return to error)
  function transition (newMode, replace) {
    setMode(newMode)
    if (replace) {
      setHistory((prev)=>[...prev.slice(0,-1), newMode])
    } else {
      setHistory((prev) =>[...prev, newMode])
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



