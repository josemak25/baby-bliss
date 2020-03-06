import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const LogoContainer = styled.View`
  width: 100px;
  height: 90%;
  padding-left: 15px;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;

export const AskQuestion = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
`;
