import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 10px;
`;

export const LogoContainer = styled.View`
  width: 100px;
  height: 55%;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;

export const SearchContainer = styled.TouchableOpacity`
  width: 30px;
  height: 50%;
`;
