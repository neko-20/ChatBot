import { useRef, useEffect } from 'react';
import { TMessage, Message } from './Message';
import Box from '@mui/material/Box';

export default function ChatView({ chatLogs }: { chatLogs: TMessage[] }) {
  const divRef=useRef<HTMLDivElement>(null!);
  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight; // 1番下へスクロール
  }, [chatLogs.length]);

  return (
    <>
      <Box
        component="div"
        ref={divRef}
        sx={{
          width: "100%",
          height: "calc( 100% - 110px )",
          overflowY: "scroll",
        }}
      >
        {chatLogs.map((value, index) => (
          <Message {...value} key={index} />
        ))}
      </Box>
    </>
  );
}
