import { Container } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import LogicGameGrid from './components/LogicGameGrid';
import { useReducer } from 'react'

function App() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 600px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 600px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  return <Container maxWidth="sm">
            <h1>2048 Clone</h1>
            <div>
              {matches && (<h1>(Big Screen)</h1>)}
              {!matches && (<h3>(Small Screen)</h3>)}
            </div>
            <LogicGameGrid width={4} height={4}/>
          </Container>;
}
export default App;
