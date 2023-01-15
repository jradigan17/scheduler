import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      history.push(newMode)
    }
    return setMode(newMode)
  }

  const back =() => {
    if (history.length <= 1) {
      // ----------------------------------------------
      // Can use either of the following:
      return setHistory(prev => ([...prev, mode]))
      // return
      // ----------------------------------------------
    } else {
      history.pop()
      return setMode(history[history.length-1])
    }
  }

  return { 
    mode,
    transition,
    back
  };

};