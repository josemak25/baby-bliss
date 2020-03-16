import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import Comments from '../../../src/components/comments';
import post from '../../../src/libs/dummyPost.json';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

const user = {
  avatar: 'wqretrethyr',
  _id: '13243567534656843',
  name: 'james timothy',
  username: 'timothy13',
  id: '13243567534656843'
};

const replyTo = {
  _id: '214532463574687986756452',
  content: 'hello world',
  user
};

const comment = {
  likes: [],
  replyTo,
  isDeleted: false,
  isFlagged: false,
  _id: '8978517647831574631',
  content: 'this is a test content',
  user,
  post: 'this is a post',
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  __v: 8978517647831574631,
  id: 8978517647831574631,
  isLiked: false
};

const mountComponent = () => {
  const commentProps = {
    handleOnFocusRequest: jest.fn(),
    handleLikeComment: jest.fn(),
    commentIndex: 10,
    avatar: 1,
    comment
  };

  const renderedProps = render(
    <Theme>
      //@ts-ignore
      <Comments testID="comment-container" {...post} {...commentProps} />
    </Theme>
  );
  return { ...renderedProps };
};

describe('TEST POST COMMENT COMPONENT(<Comments/>)', () => {
  test('It renders the comment <Comments/> component accurately', () => {
    const { getByTestId } = mountComponent();
    const postCommentContainer = getByTestId('comment-container');
    expect(postCommentContainer).toBeTruthy();
  });

  test('It renders the like comment action container currently', () => {
    const { getByTestId } = mountComponent();
    const likeComment = getByTestId('like-comment-container');
    expect(likeComment).toBeTruthy();
    expect(fireEvent.press(likeComment)).toBeTruthy();
  });
});
