import Reactotron from 'reactotron-react-native';

import { BABY_BLISS_BASE_URI } from 'react-native-dotenv';

if (__DEV__) {
  //connect to tron debugger
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  //clean tron memory for possible memory leeks
  tron.clear();

  //attach tron debugger to global
  console.tron = tron;
}

declare global {
  interface Console {
    tron: any;
  }
}

export default { BABY_BLISS_BASE_URI };
