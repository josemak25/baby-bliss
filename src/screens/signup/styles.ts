import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 20px;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 60px;
  bottom: 20px;
`;

export const FormFields = styled.View`
  align-content: space-between;
`;

export const FormControls = styled.View`
  width: 100%;
  height: 110px;
  justify-content: space-between;
`;

export const TermsLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  font-size: ${({ theme }) => theme.fonts.SMALL_SIZE}px;
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
`;

export const TermsLink = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_REGULAR};
  font-size: ${({ theme }) => theme.fonts.SMALL_SIZE}px;
  color: ${({ theme }) => theme.colors.POST_TIP_COLOR};
`;

export const TermsAndCondition = styled.View`
  width: 100%;
  height: 5%;
  justify-content: space-between;
  align-items: center;
`;
