import React, { useState, Fragment, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator
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
import { useStoreContext } from '../../store';
import postCategoryActions from '../../store/category/actions';
import { CATEGORY_ACTION_TYPES } from '../../store/category/types';
import showSnackbar from '../../components/UI/snackbar';
import { createFormData } from '../utils';

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
  SelectedImageContainer,
  Spinner
} from './styles';

interface PostQuestionScreenProp extends NavigationInterface {
  testID?: string;
}

export default function PostQuestionScreen(props: PostQuestionScreenProp) {
  const { colors, fonts } = useThemeContext();
  const [{ userState, categoryState }, dispatch] = useStoreContext();

  const [state, setState] = useState({
    question: {
      topic: '',
      description: '',
      category: 'First Trimester',
      categoryId: '',
      image: null
    },
    hasSubmitted: false
  });

  useEffect(() => {
    if (categoryState.error && !categoryState.isLoading) {
      showSnackbar('#F42850', categoryState.error);
    }
    if (
      state.hasSubmitted &&
      !categoryState.error &&
      !categoryState.isLoading
    ) {
      showSnackbar(colors.POST_TIP_COLOR, 'Profile updated successfully!');
    }
  }, [categoryState.error, categoryState.isLoading, state.hasSubmitted]);

  const handleTextChange = (key: string, value: string, index: number) => {
    const categoryId = index
      ? postCategories[index]._id
      : state.question.categoryId;

    setState({
      ...state,
      question: { ...state.question, [key]: value, categoryId }
    });
  };

  const handleImage = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return alert('Permission to access camera roll is required!');
    }

    const response = await ImagePicker.launchImageLibraryAsync();

    if (response.cancelled === true) return;

    setState({ ...state, question: { ...state.question, image: response } });
  };

  const handleSubmit = () => {
    //validate the form  for empty fields before sending this form.
    for (let key in state.question) {
      if (!state.question[key]) {
        showSnackbar(
          colors.LIKE_POST_COLOR,
          'Please all entries are required!'
        );
        return;
      }
    }

    const userQuestion = {
      topic: state.question.topic,
      description: state.question.description,
      category: state.question.categoryId
    };
    const images = createFormData(state.question.image);

    postCategoryActions(CATEGORY_ACTION_TYPES.POST_QUESTION)(dispatch, {
      images,
      userQuestion,
      authToken: userState.token
    });

    setState({
      ...state,
      hasSubmitted: true
    });
  };

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
              <PostTitle>Topic</PostTitle>
              <PostTitleInput
                placeholder="When is it ok to give into food cravings during pregnancy?"
                multiline={true}
                onChangeText={text => handleTextChange('topic', text, null)}
              />
              <PostDescriptionTitle>description</PostDescriptionTitle>
              <PostDescriptionInput
                placeholder="Within the realms of food safety and common sense it is always ok to give in to your food cravings! You’ve had to give up..."
                multiline={true}
                onChangeText={text =>
                  handleTextChange('description', text, null)
                }
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
                  onValueChange={(value, key) =>
                    handleTextChange('category', value, key)
                  }
                  value={state.question.category}
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
              {state.question.image ? (
                <SelectedImageContainer>
                  <ResponsiveImage
                    imageUrl={state.question.image.uri}
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
                onPress={handleSubmit}
                title={`${categoryState.isLoading ? '' : 'create post'}`}
                disabled={categoryState.isLoading}
              />
              {categoryState.isLoading && (
                <Spinner>
                  <ActivityIndicator
                    size="small"
                    color={colors.BG_LIGHT_COLOR}
                  />
                </Spinner>
              )}
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
