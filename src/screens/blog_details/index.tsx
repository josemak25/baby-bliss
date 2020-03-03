import React from 'react';
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/header';
import { NavigationInterface } from '../../constants';
import { useThemeContext } from '../../theme';

import Comment from '../../components/comments';
import MessageIcon from '../../../assets/icons/message';
import Eye from '../../../assets/icons/eye';
import LoveIcon from '../../../assets/icons/love';

import {
  Container,
  DetailsTip,
  DetailsTipContainer,
  HeaderImage,
  HeaderOverLay,
  HeaderContentContainer,
  DetailsTitle,
  HeaderTextContainer,
  GoBack,
  FloatingMessageButton,
  ActionContainer,
  NoOfViews,
  NoOfLikes,
  Description,
  CommentHeader,
  CommentsContainer
} from './styles';

import Message from '../../components/message';

interface BlogDetailsProp extends NavigationInterface {
  testID?: string;
}

export default function BlogDetails(props: BlogDetailsProp) {
  const { colors } = useThemeContext();

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        backgroundColor: colors.BD_DARK_COLOR
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.BD_DARK_COLOR
        }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          translucent
          backgroundColor={colors.POST_TIP_COLOR}
          barStyle="light-content"
        />
        <Header style={{ height: 400, paddingLeft: 0, paddingRight: 0 }}>
          <HeaderImage
            source={{ uri: 'https://bit.ly/38c0U3G' }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          >
            <HeaderOverLay />
            <HeaderContentContainer>
              <GoBack onPress={() => props.navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={25} color="white" />
              </GoBack>
              <HeaderTextContainer>
                <DetailsTipContainer>
                  <DetailsTip>Baby Tips</DetailsTip>
                </DetailsTipContainer>
                <DetailsTitle>
                  Always Look On The Bright Side Of Life Side Of Life
                </DetailsTitle>
              </HeaderTextContainer>
            </HeaderContentContainer>
          </HeaderImage>
        </Header>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container testID="blog-details">
            <FloatingMessageButton
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={[colors.GRADIENT_COLOR_FROM, colors.GRADIENT_COLOR_TO]}
            >
              <MessageIcon />
            </FloatingMessageButton>
            <ActionContainer>
              <Eye style={{ position: 'relative', right: 9 }} width="30%" />
              <NoOfViews>1.6k</NoOfViews>
              <LoveIcon
                style={{ position: 'relative', right: 10 }}
                width="30%"
                height="40%"
              />
              <NoOfLikes>2.1k</NoOfLikes>
            </ActionContainer>
            <Description>
              As conscious traveling Paupers we must always be concerned about
              our dear Mother Earth. If you think about it, you travel across
              her face, and She is the host to your journey without Her we could
              not find the unfolding adventures that attract and feed our souls.
              I have found some valuable resources for As conscious traveling
              Paupers we must always be concerned about our dear Mother Earth.
              If you think about it, you travel across her face, and She is the
              host to your journey without Her we could not find the unfolding
              adventures that attract and feed our souls. I have found some
              valuable resources for
            </Description>
            <CommentHeader>comment</CommentHeader>
            <CommentsContainer>
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <Comment key={i} />
                ))}
            </CommentsContainer>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Message />
    </KeyboardAvoidingView>
  );
}
