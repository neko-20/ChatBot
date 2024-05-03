import { useState } from 'react';
import Chat from './components/Chat';
import Score from './components/Score';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// 対話回数
const TURN_MAX = 10;

function App() {
  const [turn, setTurn] = useState(0);

  return (
    <>
      <CssBaseline />
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {turn < TURN_MAX ? (
          <>
            <Box
              component="div"
              sx={{
                marginTop: 2,
                textAlign: "center",
              }}
            >
              {TURN_MAX + '回対話'}
              {turn < TURN_MAX ? 'をしてください' : 'が終了しました'}
            </Box>
            <Chat turn_max={TURN_MAX} turn={turn} setTurn={setTurn} />
          </>
        ) : (
          <>
            <Box
              component="div"
              sx={{
                marginTop: 2,
                textAlign: "center",
              }}
            >
              評価をしてください
            </Box>
            <Score />
          </>
        )}
      </Box>
    </>
  );
}

export default App;
