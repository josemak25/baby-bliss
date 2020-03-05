import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  margin: 10px 0px;
`;

export const ImageContainer = styled.View`
  width: 65px;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ImageOutlineBar = styled.View`
  flex: 1;
  width: 3px;
  background-color: ${({ theme }) => theme.colors.INACTIVE_ICON_COLOR};
  z-index: -1;
`;

export const CommentDetails = styled.View`
  flex: 1;
`;

export const CommentDetailsHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const CommenterName = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  font-weight: ${({ theme }) => theme.fonts.FONT_WEIGHT_HEAVY};
  width: 80%;
  letter-spacing: 1px;
  text-transform: capitalize;
`;

export const CommenterTime = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.INACTIVE_ICON_COLOR};
  font-weight: ${({ theme }) => theme.fonts.FONT_WEIGHT_HEAVY};
`;

export const UserComment = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  font-weight: ${({ theme }) => theme.fonts.FONT_WEIGHT_HEAVY};
  letter-spacing: 1px;
  width: 100%;
`;

export const ActionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LikeComment = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.INACTIVE_ICON_COLOR};
  text-transform: capitalize;
  right: 12px;
`;

export const ReplayComment = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.INACTIVE_ICON_COLOR};
  position: relative;
  text-transform: capitalize;
`;

export const LikeContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  right: 10px;
`;

export const ReplyContainer = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 40px;
`;
