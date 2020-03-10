import React, { useState, Fragment, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import ContentLoader from 'react-native-skeleton-content';
import Animated, { Easing } from 'react-native-reanimated';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationInterface } from '../../constants';
import { useThemeContext } from '../../theme';

import Button from '../../components/button';
import applyScale from '../../utils/applyScale';
import ResponsiveImage from '../../libs/responsiveImage';
import boxShadow from '../../utils/boxShadows';
import InputFiled from '../../components/inputField';
import MailIcon from '../../../assets/icons/mail';
import PhoneIcon from '../../../assets/icons/phone';
import { useStoreContext } from '../../store';
import { USER_TYPES, USER_ACTION_TYPES } from '../../store/user/types';
import userActions from '../../store/user/actions';
import showSnackbar from '../../components/UI/snackbar';

import {
  StatusBar,
  Container,
  HeaderContainer,
  ProfileImageContainer,
  IconContainer,
  ProfileDetailsContainer,
  UserName,
  UserEmail,
  ScrollViewContainer,
  AccountSettingTitle,
  AccountSettingContainer,
  OptionContainer,
  OptionTitle,
  OptionContainerHeader,
  OptionContainerFooter,
  ProfileRecordsContainer,
  ProfileResultsContainer,
  RecordsTitle,
  RecordsResult,
  Spinner
} from './styles';

const AnimatedOptionContainer = Animated.createAnimatedComponent(
  OptionContainer
);

const AnimatedOptionContainerFooter = Animated.createAnimatedComponent(
  OptionContainerFooter
);

interface ProfileScreenProp extends NavigationInterface {
  testID?: string;
}

const SCALED_WIDTH = applyScale(120);

export default function ProfileScreen(props: ProfileScreenProp) {
  const { colors, fonts } = useThemeContext();
  const [{ userState }, dispatch] = useStoreContext();
  const { user } = userState;

  const [state, setState] = useState({
    animateContentHeightOne: new Animated.Value(applyScale(70)),
    animateContentHeightTwo: new Animated.Value(applyScale(70)),
    animateContentHeightThree: new Animated.Value(applyScale(70)),
    animateInputsOne: {
      value: new Animated.Value(0),
      showInputsModal: true
    },
    animateInputsTwo: {
      value: new Animated.Value(0),
      showInputsModal: true
    },
    animateInputsThree: {
      value: new Animated.Value(0),
      showInputsModal: true
    },
    hideContentLoader: true,
    selected: '',
    userProfile: {
      address: user ? user.address : '',
      phone: user ? user.mobileNumber : ''
    },
    hasSubmitted: false
  });

  useEffect(() => {
    (async () => {
      //update user profile in async storage  after user has finish updating profile
      storeUserProfile();
      if (!userState.token) {
        //remove this user profile from the async storage if the user has logged out of the app
        await AsyncStorage.removeItem('@USER_PROFILE_TESTS_');
        props.navigation.replace('SignInScreen');
      }
    })();
  }, [userState.token, user]);

  const onHandleChange = (field: string) => (value: string) => {
    setState({
      ...state,
      userProfile: { ...state.userProfile, [field]: value }
    });
  };

  const storeUserProfile = async () => {
    const { token, user } = userState;
    await AsyncStorage.setItem(
      '@USER_PROFILE_TESTS_',
      JSON.stringify({ token, payload: user })
    );
    if (state.hasSubmitted) {
      showSnackbar(colors.POST_TIP_COLOR, 'Profile Updated Successfully!');
    }
  };

  const handleSubmit = () => {
    // dispatch action to submit form
    //make sure we don't submit completely empty form
    for (const key in state.userProfile) {
      if (!state.userProfile[key]) {
        showSnackbar(colors.LIKE_POST_COLOR, 'Please all fields are required!');
        return;
      }
    }
    //submit our form
    const { phone, ...rest } = state.userProfile;
    userActions(USER_ACTION_TYPES.UPDATE_PROFILE)(dispatch, {
      payload: {
        mobileNumber: phone,
        ...rest
      },
      token: userState.token,
      id: user.id
    });
    setState({
      ...state,
      hasSubmitted: true
    });
  };

  const handleImageLoading = (error: any) => {
    if (!error) {
      setState({ ...state, hideContentLoader: false });
    }
  };

  const handleLogout = async () => {
    dispatch({ type: USER_TYPES.LOGOUT });
  };

  const startEditAnimation = (buttonType: string) => {
    setState({ ...state, selected: buttonType });

    let animateInputs = 'animateInputsOne';

    switch (buttonType) {
      case 'animateContentHeightOne':
        animateInputs = animateInputs;
        break;
      case 'animateContentHeightTwo':
        animateInputs = 'animateInputsTwo';
        break;
      case 'animateContentHeightThree':
        animateInputs = 'animateInputsThree';
        break;
      case 'animateContentHeightThree':
        animateInputs = 'animateInputsThree';
        break;
      default:
        break;
    }

    const { showInputsModal } = state[animateInputs];

    if (showInputsModal) {
      return showInputModal(animateInputs, buttonType);
    }
    closeInputModal(animateInputs, buttonType);
  };

  const closeInputModal = (animateInputs: string, buttonType: string) => {
    const animationProps = state[animateInputs];

    Animated.timing(animationProps.value, {
      toValue: 0,
      duration: 50,
      easing: Easing.elastic(0.7)
    }).start(() => {
      Animated.timing(state[buttonType], {
        toValue: 70,
        duration: 500,
        easing: Easing.elastic(0.7)
      }).start(() => {
        setState({
          ...state,
          [animateInputs]: { ...animationProps, showInputsModal: true }
        });
      });
    });
  };

  const showInputModal = (animateInputs: string, buttonType: string) => {
    const animationProps = state[animateInputs];

    Animated.timing(state[buttonType], {
      toValue: buttonType === 'animateContentHeightThree' ? 220 : 150,
      duration: 500,
      easing: Easing.elastic(0.7)
    }).start(() => {
      Animated.timing(animationProps.value, {
        toValue: 1,
        duration: 50,
        easing: Easing.elastic(0.4)
      }).start(() => {
        setState({
          ...state,
          [animateInputs]: { ...animationProps, showInputsModal: false }
        });
      });
    });
  };

  return (
    <Fragment>
      <StatusBar />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: colors.BD_DARK_COLOR }}
        >
          <HeaderContainer
            style={[
              boxShadow({
                width: 0,
                height: 2,
                color: colors.ACTIVE_TAB_COLOR,
                opacity: 0.08,
                radius: 1,
                elevation: 3
              })
            ]}
          >
            <Button
              title="logout"
              buttonStyle={{
                backgroundColor: 'transparent',
                position: 'absolute',
                right: 10,
                top: 10
              }}
              textStyle={{
                color: colors.FLOATING_MESSAGE_COLOR,
                fontFamily: fonts.IBM_SANS_BOLD
              }}
              onPress={handleLogout}
            />
            <ProfileImageContainer>
              <ContentLoader
                isLoading={state.hideContentLoader}
                containerStyle={{
                  width: SCALED_WIDTH,
                  height: SCALED_WIDTH
                }}
                layout={[
                  {
                    width: SCALED_WIDTH,
                    height: SCALED_WIDTH,
                    borderRadius: 120 / 2
                  }
                ]}
              />
              <ResponsiveImage
                imageUrl={user && user.avatar ? user.avatar : 'url'}
                height={SCALED_WIDTH}
                width={SCALED_WIDTH}
                onLoad={handleImageLoading}
                style={{ borderRadius: 120 / 2 }}
              />
              <IconContainer
                activeOpacity={1}
                style={{
                  borderRadius: 40 / 2,
                  position: 'absolute',
                  bottom: 0,
                  right: 0
                }}
              >
                <Entypo name="camera" size={20} color={colors.BD_DARK_COLOR} />
              </IconContainer>
            </ProfileImageContainer>
            <ProfileDetailsContainer>
              <UserName>{user ? user.name : ''}</UserName>
              <UserEmail>{user ? user.email : ''}</UserEmail>
            </ProfileDetailsContainer>
            <ProfileRecordsContainer>
              <ProfileResultsContainer>
                <RecordsResult>12</RecordsResult>
                <RecordsTitle>posts</RecordsTitle>
              </ProfileResultsContainer>
              <ProfileResultsContainer>
                <RecordsResult>63</RecordsResult>
                <RecordsTitle>comments</RecordsTitle>
              </ProfileResultsContainer>
            </ProfileRecordsContainer>
          </HeaderContainer>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" enabled>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 60 }}
              showsVerticalScrollIndicator={false}
            >
              <Container testID={props.testID}>
                <ScrollViewContainer>
                  <AccountSettingTitle>account setting</AccountSettingTitle>
                  <AccountSettingContainer
                    style={[
                      boxShadow({
                        width: 0,
                        height: 2,
                        color: colors.INACTIVE_ICON_COLOR,
                        opacity: 0.25,
                        radius: 3.84,
                        elevation: 5
                      })
                    ]}
                  >
                    <AnimatedOptionContainer
                      activeOpacity={0.8}
                      style={{ height: state.animateContentHeightOne }}
                      onPress={() =>
                        startEditAnimation('animateContentHeightOne')
                      }
                    >
                      <OptionContainerHeader
                        activeOpacity={0.8}
                        onPress={() =>
                          startEditAnimation('animateContentHeightOne')
                        }
                      >
                        <IconContainer
                          activeOpacity={1}
                          disabled
                          style={{
                            height: applyScale(35),
                            width: applyScale(35),
                            borderRadius: 3,
                            backgroundColor: colors.LIKE_POST_COLOR
                          }}
                        >
                          <MaterialCommunityIcons
                            name="email"
                            size={20}
                            color={colors.BG_LIGHT_COLOR}
                          />
                        </IconContainer>
                        <OptionTitle>update email address</OptionTitle>
                        <Ionicons
                          name="ios-arrow-down"
                          size={20}
                          color={colors.INACTIVE_ICON_COLOR}
                        />
                      </OptionContainerHeader>
                      <AnimatedOptionContainerFooter
                        style={{
                          opacity: state.animateInputsOne.value,
                          display: !state.animateInputsOne.showInputsModal
                            ? 'flex'
                            : 'none'
                        }}
                      >
                        <InputFiled
                          placeholder={user ? user.email : ''}
                          testID="email"
                          onChangeText={onHandleChange('email')}
                          defaultValue=""
                          textContentType="emailAddress"
                          keyboardType="email-address"
                          disable={true}
                          style={{ borderRadius: 5 }}
                        >
                          <MailIcon />
                        </InputFiled>
                      </AnimatedOptionContainerFooter>
                    </AnimatedOptionContainer>
                    <AnimatedOptionContainer
                      style={{ height: state.animateContentHeightThree }}
                    >
                      <OptionContainerHeader
                        activeOpacity={0.8}
                        onPress={() =>
                          startEditAnimation('animateContentHeightThree')
                        }
                      >
                        <IconContainer
                          activeOpacity={1}
                          disabled
                          style={{
                            height: applyScale(35),
                            width: applyScale(35),
                            borderRadius: 3
                          }}
                        >
                          <MaterialCommunityIcons
                            name="account-card-details"
                            size={20}
                            color={colors.BG_LIGHT_COLOR}
                          />
                        </IconContainer>
                        <OptionTitle>update my details</OptionTitle>
                        <Ionicons
                          name="ios-arrow-down"
                          size={20}
                          color={colors.INACTIVE_ICON_COLOR}
                        />
                      </OptionContainerHeader>
                      <AnimatedOptionContainerFooter
                        style={{
                          opacity: state.animateInputsThree.value,
                          display: !state.animateInputsThree.showInputsModal
                            ? 'flex'
                            : 'none'
                        }}
                      >
                        <InputFiled
                          placeholder="Phone"
                          testID="phone"
                          onChangeText={onHandleChange('phone')}
                          defaultValue={state.userProfile.phone}
                          returnKeyType="done"
                          activeColor={colors.BG_LIGHT_COLOR}
                          style={{ borderRadius: 5 }}
                          ignoreValidation={true}
                        >
                          <PhoneIcon />
                        </InputFiled>
                        <InputFiled
                          placeholder="Address"
                          testID="address"
                          onChangeText={onHandleChange('address')}
                          defaultValue={state.userProfile.address}
                          returnKeyType="done"
                          activeColor={colors.BG_LIGHT_COLOR}
                          style={{ borderRadius: 5 }}
                          ignoreValidation={true}
                        >
                          <Entypo name="address" size={20} />
                        </InputFiled>
                      </AnimatedOptionContainerFooter>
                    </AnimatedOptionContainer>
                  </AccountSettingContainer>
                  <Button
                    title={`${userState.isLoading ? '' : 'update'}`}
                    disabled={userState.isLoading}
                    buttonStyle={{
                      backgroundColor: colors.FLOATING_MESSAGE_COLOR,
                      marginTop: 20
                    }}
                    textStyle={{
                      color: colors.BG_LIGHT_COLOR,
                      fontFamily: fonts.IBM_SANS_BOLD
                    }}
                    onPress={handleSubmit}
                  />
                  {userState.isLoading && (
                    <Spinner>
                      <ActivityIndicator
                        size="small"
                        color={colors.BG_LIGHT_COLOR}
                      />
                    </Spinner>
                  )}
                </ScrollViewContainer>
              </Container>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Fragment>
  );
}

ProfileScreen.navigationOptions = ({ navigationOptions, navigation }) => {
  const { navigationBackButton } = navigation.state;

  return {
    ...navigationBackButton,
    ...navigationOptions,
    headerTitle: () => null,
    headerLeft: () => null,
    headerStyle: { backgroundColor: '#F4F8FB' }
  };
};
