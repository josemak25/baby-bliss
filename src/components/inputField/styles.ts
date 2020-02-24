import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 75px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
`;

export const InputContainer = styled.View`
  width: 80%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Placeholder = styled.Text`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.TEXT_INPUT_BORDER_COLOR};
  text-transform: capitalize;
  padding-top: 10px;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  height: 50%;
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
`;

export const IconContainer = styled.View`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
