import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const MediaInsertContainer = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.INACTIVE_ICON_COLOR};
  border-radius: ${25 / 2}px;
  margin-right: 5px;
`;

export const EmojiContainer = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
  border-radius: ${25 / 2}px;
  margin: 0 10px;
  margin-left: 5px;
`;

export const SendContainer = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
  border-radius: ${25 / 2}px;
`;

export const MessageInput = styled.TextInput`
  flex: 1;
  height: 100%;
  padding: 0px 5px;
`;
