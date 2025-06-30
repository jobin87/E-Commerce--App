import { Box, BoxProps, Portal } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


type Props = BoxProps & {
  portal?: boolean;
   notloading?: boolean;
};

export function SplashScreen({ portal = true, notloading=false, sx, ...other }: Props) {
  if(notloading){
    console.log("notloading")
  }

  const content = (
    <Box sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          right: 0,
          width: 1,
          bottom: 0,
          height: 1,
          zIndex: 9998,
          display: 'flex',
          position: 'fixed',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          ...sx,
        }}
        {...other}
      >
        <CircularProgress />
      </Box>
    </Box>
  );

  return portal ? <Portal>{content}</Portal> : content;
}
