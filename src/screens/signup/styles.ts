import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
  padding: 0px 20px;
`;

export const Logo = styled.Image`
  height: 85px;
  width: 180px;
  bottom: 300px;
  position: relative;
`;

export const FormFields = styled.View`
  flex: 1px;
  position: absolute;
  align-content: space-between;
`;

export const FormControls = styled.View`
  top: 50px;
  align-content: space-between;
`;
