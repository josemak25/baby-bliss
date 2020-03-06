import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
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
  padding: 0 20px;
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE + 3}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
`;

export const ActionContainer = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  bottom: 15px;
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
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  align-self: flex-start;
`;

export const PostHeader = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 10px;
  z-index: 1;
`;

export const PostUserName = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 3}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
`;

export const PostTime = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 3}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
`;
