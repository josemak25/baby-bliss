import React, { useState, Fragment } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { useThemeContext } from '../../theme';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Button from '../../components/button';
import { NavigationInterface } from '../../constants';
import boxShadow from '../../utils/boxShadows';
import ResponsiveImage from '../../libs/responsiveImage';
import { category as postCategories } from '../../libs/postCategories.json';

import {
  Container,
  Title,
  HeaderTitle,
  QuestionContainer,
  PostTitle,
  PostTitleInput,
  PostDescriptionTitle,
  PostDescriptionInput,
  PostCategoryTitle,
  PostCategoryContainer,
  SelectImageContainer,
  SelectImageTitle,
  PostButtonContainer,
  SelectedImageContainer
} from './styles';

interface PostQuestionScreenProp extends NavigationInterface {
  testID?: string;
}

export default function PostQuestionScreen(props: PostQuestionScreenProp) {
  const { colors, fonts } = useThemeContext();

  const [question, setQuestion] = useState({
    title: '',
    description: '',
    category: 'First Trimester',
    image: '',
    isModalVisible: false
  });

  const handleCategory = (category: string) => {
    setQuestion({ ...question, category });
  };

  const handleImage = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return alert('Permission to access camera roll is required!');
    }

    const response = await ImagePicker.launchImageLibraryAsync();

    if (response.cancelled === true) return;

    setQuestion({ ...question, image: response.uri });
  };

  const handleSubmit = () => {};

  return (
    <ScrollView
      style={{ flexGrow: 1, backgroundColor: colors.BD_DARK_COLOR }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Container testID="PostQuestionScreen">
            <Title>ask question</Title>
            <QuestionContainer>
              <PostTitle>title</PostTitle>
              <PostTitleInput
                placeholder="When is it ok to give into food cravings during pregnancy?"
                multiline={true}
              />
              <PostDescriptionTitle>description</PostDescriptionTitle>
              <PostDescriptionInput
                placeholder="Within the realms of food safety and common sense it is always ok to give in to your food cravings! You’ve had to give up..."
                multiline={true}
              />
              <PostCategoryTitle>category</PostCategoryTitle>
              <PostCategoryContainer>
                <RNPickerSelect
                  placeholder={{
                    label: 'Select a category...',
                    value: null,
                    color: 'red',
                    key: 'Select a category...'
                  }}
                  onValueChange={handleCategory}
                  value={question.category}
                  items={postCategories.map(({ title, id }) => ({
                    label: title,
                    value: title,
                    key: id
                  }))}
                  Icon={() => (
                    <FontAwesome
                      name="angle-down"
                      size={22}
                      color={colors.INACTIVE_ICON_COLOR}
                    />
                  )}
                  textInputProps={{
                    fontSize: fonts.LARGE_SIZE,
                    color: colors.FONT_LIGHT_COLOR,
                    textTransform: 'capitalize'
                  }}
                  doneText="Close"
                />
              </PostCategoryContainer>
              <PostCategoryTitle>attach image</PostCategoryTitle>
              <SelectImageContainer onPress={handleImage}>
                <Fragment>
                  <SelectImageTitle>Click to attach image</SelectImageTitle>
                  <Entypo
                    name="attachment"
                    size={20}
                    color={colors.INACTIVE_ICON_COLOR}
                  />
                </Fragment>
              </SelectImageContainer>
              {question.image ? (
                <SelectedImageContainer>
                  <ResponsiveImage
                    imageUrl={question.image}
                    width={350}
                    height={200}
                    style={{ borderRadius: 5 }}
                  />
                </SelectedImageContainer>
              ) : null}
            </QuestionContainer>
            <PostButtonContainer>
              <Button
                testID="create-post-button"
                buttonStyle={[
                  {
                    width: '90%',
                    backgroundColor: colors.POST_TIP_COLOR,
                    borderRadius: 2
                  },
                  boxShadow({
                    elevation: 2,
                    color: 'rgba(175, 163, 180, 1)',
                    opacity: 0.3,
                    radius: 1,
                    height: 2.5
                  })
                ]}
                textStyle={{
                  color: colors.BG_LIGHT_COLOR,
                  textTransform: 'capitalize',
                  fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
                  fontSize: fonts.MEDIUM_SIZE + 2
                }}
                title="create post"
                onPress={handleSubmit}
              />
            </PostButtonContainer>
          </Container>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
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
