import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import Message from '../../../src/components/message';

const mountComponent = () => {
  const messageProps = {
    dispatchMessage: jest.fn(),
    setNewMessage: jest.fn(),
    focus: false,
    message: 'hello world'
  };

  const renderedProps = render(
    <Theme>
      <Message testID="message-container" {...messageProps} />
    </Theme>
  );
  return { ...renderedProps };
};

describe('TEST POST MESSAGE COMPONENT(<Message/>)', () => {
  test('It renders the message <Message/> component accurately', () => {
    const { getByTestId } = mountComponent();
    const postContainer = getByTestId('message-container');
    expect(postContainer).toBeTruthy();
  });

  test('It renders the message input field currently', () => {
    const { getByPlaceholderText } = mountComponent();
    const messageInputField = getByPlaceholderText('Write comment here…');
    expect(messageInputField).toBeTruthy();
  });

  test('Click the send message icon to send post message', () => {
    const { getByTestId } = mountComponent();
    const sendPostMessageIcon = getByTestId('send-message');
    expect(fireEvent.press(sendPostMessageIcon)).toBeTruthy();
  });
});
