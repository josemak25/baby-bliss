import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 10}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
`;

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
`;

export const QuestionContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 30px;
  padding: 0px 20px;
  border: 1px;
`;

export const PostTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE - 2}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  text-transform: uppercase;
`;

export const PostTitleInput = styled.TextInput`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const PostDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE - 2}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  text-transform: uppercase;
  margin-top: 20px;
  border: 1px;
`;

export const PostDescriptionInput = styled.TextInput`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  padding-top: 10px;
  padding-bottom: 10px;
`;
