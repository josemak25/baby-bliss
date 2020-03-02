import { Dimensions, Platform } from 'react-native';
const DEVICE = Dimensions.get('window');

type CardItem = {
  cardSize: number;
  numOfColumn: number;
};

const CARD_ITEM: CardItem = { cardSize: 320, numOfColumn: 1 };

switch (Platform.OS) {
  case 'android':
    if (DEVICE.width <= 414) {
      //Android smartphones
      CARD_ITEM.cardSize = DEVICE.width;
    } else CARD_ITEM.cardSize = DEVICE.width;
    break;

  case 'ios':
    switch (DEVICE.width) {
      //iPhone4/4S and iPhone5/5S
      case 320:
        CARD_ITEM.cardSize = DEVICE.width;
        break;
      //iPhone6/6S
      case 375:
        CARD_ITEM.cardSize = 414;
        break;
      //iPhone6plus/6Splus
      case 414:
        CARD_ITEM.cardSize = DEVICE.width;
        break;
      //iPad
      default:
        CARD_ITEM.cardSize = DEVICE.width / 2;
        CARD_ITEM.numOfColumn = Math.floor(DEVICE.width / CARD_ITEM.cardSize);
        CARD_ITEM.cardSize =
          CARD_ITEM.numOfColumn >= 2 ? 400 : CARD_ITEM.cardSize;
    }
    break;
  default:
    CARD_ITEM;
}

export default CARD_ITEM;
