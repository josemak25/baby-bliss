import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
`;

export const ImageContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const TitleContainer = styled.View`
  flex: 0.5;
  width: 100%;
  align-items: center;
`;

export const Title = styled.Text`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 20}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_MEDIUM};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
  text-align: center;
`;

export const TitleContent = styled.Text`
  width: 80%;
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_MEDIUM};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  text-align: center;
  padding: 5px 10px;
`;

export const FormField = styled.View`
  flex: 1;
  padding: 0 20px;
`;
