import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0px 20px;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 60px;
`;

export const FormFields = styled.View`
  flex: 1;
  justify-content: center;
`;

export const FormControls = styled.View`
  flex: 0.6;
  width: 100%;
`;

// export const RememberMe = styled.Text`
//   font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
//   font-size: ${({ theme }) => theme.fonts.SMALL_SIZE + 2}px;
//   color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
//   text-transform: capitalize;
// `;

export const Conditions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Spinner = styled.View`
  position: absolute;
  align-self: center;
  top: 15px;
`;
