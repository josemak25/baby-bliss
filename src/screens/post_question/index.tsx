import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import Button from '../../components/button';
import { NavigationInterface } from '../../constants';

import {
  Container,
  Title,
  HeaderTitle,
  QuestionContainer,
  PostTitle,
  PostTitleInput,
  PostDescription,
  PostDescriptionInput
} from './styles';
import { useThemeContext } from '../../theme';

interface PostQuestionScreenProp extends NavigationInterface {
  testID?: string;
}

export default function PostQuestionScreen(props: PostQuestionScreenProp) {
  const { colors } = useThemeContext();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container testID="PostQuestionScreen">
        <Title>ask question</Title>
        <QuestionContainer>
          <PostTitle>title</PostTitle>
          <PostTitleInput
            placeholder="When is it ok to give into food cravings during pregnancy?"
            multiline={true}
            placeholderTextColor={colors.FONT_DARK_COLOR}
          />
          <PostDescription>description</PostDescription>
          <PostDescriptionInput
            placeholder="Within the realms of food safety and common sense it is always ok to give in to your food cravings! You’ve had to give up..."
            multiline={true}
            placeholderTextColor={colors.FONT_DARK_COLOR}
          />
        </QuestionContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}

PostQuestionScreen.navigationOptions = ({ navigationOptions, navigation }) => {
  const { navigationBackButton } = navigation.state;

  return {
    ...navigationBackButton,
    ...navigationOptions,
    headerTitle: () => <HeaderTitle>post question</HeaderTitle>
  };
};
