import { SlideItem } from "../screens/get_started";
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState
} from 'react-navigation';
// App header custom style
export const customHeaderStyle = {
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0
};

export interface GetStartedProp {
  slides: SlideItem[];
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}