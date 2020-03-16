import { WSnackBar } from 'react-native-smart-tip';

const showSnackbar = (
  bgColor: string,
  message: string,
  duration: boolean = false
) => {
  const snackBarOpts = {
    data: message,
    position: WSnackBar.position.TOP, // 1.TOP 2.CENTER 3.BOTTOM
    duration: duration
      ? WSnackBar.duration.INDEFINITE
      : WSnackBar.duration.SHORT, //1.SHORT 2.LONG 3.INDEFINITE
    textColor: 'white',
    backgroundColor: bgColor
  };

  WSnackBar.show(snackBarOpts);
};

export default showSnackbar;
