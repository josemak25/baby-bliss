import styled from 'styled-components/native';
import applyScale from '../../utils/applyScale';

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
  margin-top: 20px;
  padding: 0px 20px;
  justify-content: space-evenly;
`;

export const PostTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE - 2}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  text-transform: uppercase;
`;

export const PostTitleInput = styled.TextInput`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  padding: 5px 10px;
  margin: 15px 0px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
  border-radius: 3px;
`;

export const PostDescriptionTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE - 2}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  text-transform: uppercase;
  margin-top: 15px;
`;

export const PostDescriptionInput = styled.TextInput`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  padding: 5px 10px;
  margin: 15px 0px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
  border-radius: 3px;
`;

export const PostCategoryTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE - 2}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  text-transform: uppercase;
  margin-top: 15px;
`;

export const PostCategoryContainer = styled.View`
  height: 30px;
  margin-top: 10px;
`;

export const SelectImageContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

export const SelectImageTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE - 2}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  text-transform: capitalize;
  margin-top: 10px;
`;

export const PostButtonContainer = styled.View`
  width: 100%;
  height: 120px;
  justify-content: center;
  align-items: center;
`;

export const SelectedImageContanier = styled.View`
  width: 100%;
  height: ${applyScale(200)}px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;
