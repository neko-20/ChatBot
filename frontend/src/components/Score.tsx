import { useState, useEffect } from 'react';
import ScoreInput from './ScoreInput';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';

// データの型定義
type Data = {
  id: number;
  utterance: string;
  response: string;
  listen: number;
  continuation: number;
};

// データの行数
const DATA_NUM = 10;

export default function Score() {
  const [data, setData] = useState<Data[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const init = new Array<string>(DATA_NUM).fill('');
  const [listen, setListen] = useState(init);
  const [continuation, setContinuation] = useState(init);
  const [all, setAll] = useState<string[]>(['']);
  const options0 = ['0', '1', '2', '3', '4', '5'];
  const options1 = ['1', '2', '3', '4', '5'];
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 読み込み
    (async() => {
      const response = await axios.get('/api/score');
      setData(response.data);
      setLoading(false);
    })();
  }, []);

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>対話データがありません</p>

  const saveData = async () => {
    // チェック
    let flag = false;
    for (let i = 0; i < data.length && !flag; i++) {
      if (!listen[i] || !continuation[i]) {
        flag = true;
      }
    }
    if (!flag && !all[0]) {
      flag = true;
    }
    if (flag) {
      setMessage('未評価項目があります');
      return;
    }
    // 保存
    setMessage('保存中です．．');
    const temp = [...data];
    for (let i = 0; i < temp.length; i++) {
      temp[i].listen = Number(listen[i]);
      temp[i].continuation = Number(continuation[i]);
    }
    setData(temp);
    const num = Number(all[0]);
    try {
      await axios.post('/api/score', {
        data: data,
        all: num,
      });
      setMessage('保存しました');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        margin: 2,
        width: "90vw",
      }}
    >
      {data.map((item, index) => (
        <Box
          component="div"
          sx={[
            {
              padding: 2,
              border: "1px solid",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            },
            index ? { borderTop: "none" } : {},
          ]}
          key={index}
        >
          <div>{1 + item.id + ' 回'}</div>
          <div>{item.utterance}</div>
          <div>{item.response}</div>
          <Box
            component="div"
            sx={{
              my: 1,
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            {'評価  '}
            <ScoreInput
              label="傾聴性"
              options={options0}
              index={index}
              values={listen}
              setValues={setListen}
            />
            <ScoreInput
              label="継続性"
              options={options1}
              index={index}
              values={continuation}
              setValues={setContinuation}
            />
          </Box>
        </Box>
      ))}
      <Box
        component="div"
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          component="div"
          sx={{
            my: 1,
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          {'全体評価'}
          <ScoreInput
            label="全体評価"
            options={options1}
            index={0}
            values={all}
            setValues={setAll}
          />
        </Box>
        <Box
          component="div"
          sx={{
            my: 3,
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Button
            sx={{
              width: 120,
              borderRadius: "20px",
            }}
            variant="outlined"
            onClick={() => saveData()}
          >
            評価を保存
          </Button>
          <Box
            component="div"
            sx={{
              marginTop: 1,
            }}
          >
            {message}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
