import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  min-height: 300px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;
