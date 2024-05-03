import Box from '@mui/material/Box';

// メッセージの型定義
export type TMessage = {
  message: string;
  isLeft: boolean;
};

// メッセージの表示
export const Message = (props: TMessage) => {
  return (
    <Box
      component="div"
      sx={[
        { display: "flex" },
        props.isLeft ? { justifyContent: "flex-start" } : { justifyContent: "flex-end" }
      ]}
    >
      <Box 
        component="div"
        sx={[
          {
            position: "relative",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "10px",
            maxWidth: "60%",
            textAlign: "left",
            font: "400 .9em 'Open Sans', sans-serif",
            borderRadius: "20px",
          },
          props.isLeft ? {
            marginLeft: "10px",
            backgroundColor: "palegreen",
          } : {
            marginRight: "10px",
            backgroundColor: "lightblue",
          }
        ]}
      >
        <Box
          component="div"
          sx={{ overflowWrap: "break-word" }}
        >
          {props.message ? props.message : "..."}
        </Box>
      </Box>
    </Box>
  );
};
