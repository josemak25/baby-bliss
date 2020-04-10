import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 20px;
`;
