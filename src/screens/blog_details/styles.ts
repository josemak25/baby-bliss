import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  flex: 1;
  padding: 0px 20px;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const HeaderImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const HeaderOverLay = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  opacity: 0.7;
  position: absolute;
`;

export const HeaderContentContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: 20px 10px;
  padding-top: 40px;
`;

export const HeaderTextContainer = styled.View`
  justify-content: space-between;
`;

export const DetailsTipContainer = styled.View`
  width: 150px;
  height: 50px;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.colors.POST_TIP_COLOR};
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

export const DetailsTip = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 5}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
  text-transform: capitalize;
`;

export const DetailsTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 8}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
  width: 80%;
  text-transform: capitalize;
`;

export const GoBack = styled.TouchableHighlight`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const FloatingMessageButton = styled(LinearGradient)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: ${({ theme }) => theme.colors.GRADIENT_COLOR_TO};
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -40px;
  right: 30px;
`;

export const ActionContainer = styled.View`
  width: 130px;
  height: 50px;
  flex-direction: row;
  align-items: center;
`;

export const NoOfViews = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.INACTIVE_ICON_COLOR};
  position: relative;
  right: 14px;
`;

export const NoOfLikes = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.INACTIVE_ICON_COLOR};
  position: relative;
  right: 14px;
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 2}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  margin: 20px 0px;
`;

export const CommentHeader = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 3}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
  letter-spacing: 1px;
  font-weight: ${({ theme }) => theme.fonts.FONT_WEIGHT_HEAVY};
`;

export const CommentsContainer = styled.View`
  margin-top: 30px;
`;

export const EmptyComment = styled.Text`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyCommentText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 2}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_MEDIUM};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  text-align: center;
`;
