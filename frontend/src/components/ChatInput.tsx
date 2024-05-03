import { useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function ChatInput({ addChat }: { addChat: (text: string) => void }) {
  const textRef = useRef<TextFieldProps>(null!);
  const sendMessage = () => {
    if (textRef.current !== null) {
      const text = textRef.current.value;
      if (typeof text === 'string' && text.length > 0) {
        addChat(text);
        textRef.current.value = ''; // 入力欄クリア
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={e => e.preventDefault()}
      onKeyDown={e => {
        e.stopPropagation();
        if (e.keyCode === 13) { // Safariに対応する場合
        // if (!e.nativeEvent.isComposing && e.key === "Enter") { // Safari対応しない場合
          sendMessage();
        }
      }}
      noValidate
      autoComplete="off"
      sx={{ width: "100%" }}
    >
      <TextField
        sx={{ width: "100%" }}
        placeholder="入力してください"
        InputProps={{
          style: {
            borderRadius: "20px",
          },
          endAdornment: (
            <Button
              sx={{
                minWidth: "30px",
                padding: 0,
                borderRadius: "50px",
                color: "lightgray"
              }}
              onClick={() => sendMessage()}
            >
              <SendIcon />
            </Button>
          ),
        }}
        inputRef={textRef}
      />
    </Box>
  );
}
