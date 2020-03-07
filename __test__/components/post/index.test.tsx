import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import Post from '../../../src/components/post';
import post from '../../../src/libs/dummyPost.json';
import { createNavigationTestProps } from '../../../src/constants';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const mountComponent = () => {
  const props: any = createNavigationTestProps();
  const renderedProps = render(
    <Theme>
      <Post testID="post-container" {...post} postIndex={0} {...props} />
    </Theme>
  );
  return { props, ...renderedProps };
};

describe('TEST POST COMPONENT(<Post/>)', () => {
  test('It renders the post <Post/> component accurately', () => {
    const { getByTestId } = mountComponent();
    const postContainer = getByTestId('post-container');
    expect(postContainer).toBeTruthy();
  });

  test('It renders the post topic currently', () => {
    const { getByTestId } = mountComponent();
    const postTopic = getByTestId('post-topic');
    expect(postTopic.children[0]).toMatch(post.topic);
  });

  test('Like a post by clicking on the like button', () => {
    const { getByTestId } = mountComponent();
    const likePostContainer = getByTestId('like-post-container');
    expect(fireEvent.press(likePostContainer)).toBeTruthy();
  });
});
