import React from 'react';
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/header';
import { NavigationInterface } from '../../constants';
import { useThemeContext } from '../../theme';

import Comment from '../../components/comments';
import Eye from '../../../assets/icons/eye';
import LoveIcon from '../../../assets/icons/love';

import {
  Container,
  DetailsTip,
  DetailsTipContainer,
  HeaderContentContainer,
  DetailsTitle,
  HeaderTextContainer,
  GoBack,
  ActionContainer,
  NoOfViews,
  NoOfLikes,
  Description,
  CommentHeader,
  CommentsContainer,
  PostImage
} from './styles';

import Message from '../../components/message';

interface BlogDetailsProp extends NavigationInterface {
  testID?: string;
}

const { width: DEVICE_WIDTH } = Dimensions.get('window');

export default function UserBlogDetails(props: BlogDetailsProp) {
  const { colors } = useThemeContext();

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        backgroundColor: colors.BD_DARK_COLOR
      }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.BD_DARK_COLOR
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header style={{ height: 350, paddingLeft: 0, paddingRight: 0 }}>
          <HeaderContentContainer>
            <GoBack onPress={() => props.navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back"
                size={25}
                color={colors.FONT_LIGHT_COLOR}
              />
            </GoBack>
            <HeaderTextContainer>
              <DetailsTipContainer>
                <DetailsTip>Baby Tips</DetailsTip>
              </DetailsTipContainer>
              <DetailsTitle>
                Always Look On The Bright Side Of Life
              </DetailsTitle>
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
            </HeaderTextContainer>
          </HeaderContentContainer>
        </Header>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{
            flex: 1,
            backgroundColor: colors.BD_DARK_COLOR
          }}
        >
          <Container testID="blog-details">
            <PostImage
              source={{ uri: 'https://bit.ly/2THZ4SC' }}
              style={{
                height: DEVICE_WIDTH > 414 ? 400 : 250,
                borderRadius: 2
              }}
              resizeMode="cover"
            />
            <Description>
              As conscious traveling Paupers we must always be concerned about
              our dear Mother Earth. If you think about it, you travel across
              her face, and She is the host to your journey without Her we could
              not find the unfolding adventures that attract and feed our souls.
              I have found some valuable resources for As conscious traveling
              Paupers we must always be concerned about our dear Mother Earth.
              If you think about it, you travel across her face, and She is the
              host to your journey without
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

UserBlogDetails.navigationOptions = { headerShown: false };
