import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const Topic = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 2}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
  padding: 10px 20px;
`;

export const DescriptionContainer = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  padding: 0 30px;
  margin-top: 10px;
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE + 3}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
`;

export const ReadMore = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
  position: absolute;
  bottom: -10px;
  right: 30px;
`;

export const ActionContainer = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
`;

export const LikeContainer = styled.View`
  width: 60px;
  height: 60px;
  overflow: hidden;
`;

export const LikeCount = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  right: 5px;
`;

export const CommentCount = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
`;

export const PostDivider = styled.View`
  width: 100%;
  border: 0.5px ${({ theme }) => theme.colors.POST_TIP_COLOR} solid;
  margin: 15px;
`;

export const ContentLoaderContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
