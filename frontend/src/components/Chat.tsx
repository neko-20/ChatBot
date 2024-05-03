import { useState } from 'react';
import { TMessage } from './Message';
import { chatMessage } from './ChatAPI';
import ChatView from './ChatView';
import ChatInput from './ChatInput';
import Box from '@mui/material/Box';

type Props = {
  turn_max: number;
  turn: number;
  setTurn: (value: number) => void;
};

export default function Chat(props: Props) {
  const [chatLogs, setChatLogs] = useState<TMessage[]>([]);
  const [input, setInput] = useState(true);

  const addChat = async (text: string) => {
    setInput(false); // 入力不可

    // 右メッセージ追加
    setChatLogs(logs => [...logs, { message: text, isLeft: false }]);

    // 左メッセージ取得追加
    const message = (await chatMessage(text)) || '';
    setChatLogs(logs => [...logs, { message, isLeft: true }]);

    // 回数加算
    props.setTurn(props.turn + 1);

    setInput(true); // 入力可
  };

  return (
    <Box
      component="div"
      sx={{
        margin: 2,
        width: "70vw",
        height: "85vh",
        minWidth: "300px",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.8,
      }}
    >
      <ChatView chatLogs={chatLogs} />
      <Box
        component="div"
        sx={{
          width: "100%",
          visibility: (props.turn < props.turn_max && input) ? "visible" : "hidden",
        }}
      >
        <ChatInput addChat={addChat} />
      </Box>
      {props.turn < props.turn_max &&
        <div>
          {input ? 1 + props.turn + ' 回目' : '生成中です．．'}
        </div>
      }
    </Box>
  );
}
