import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import Comments from '../../../src/components/comments';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

const mountComponent = () => {
  const renderedProps = render(
    <Theme>
      <Comments testID="comment-container" />
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
