import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SlideContainer = styled.View`
  flex: 0.9;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  align-self: center;
`;

export const SlideTitle = styled.Text`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 15}px;
  font-family: ${({ theme }) => theme.fonts.PACIFICO_REGULAR};
  color: ${({ theme }) => theme.colors.POST_TIP_COLOR};
  text-transform: capitalize;
  text-align: center;
`;

export const SlideImage = styled.Image`
  height: 50%;
  width: 100%;
`;

export const SlideContent = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE + 1}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
  text-align: center;
`;

export const SlideFooter = styled.View`
  width: 80%;
  height: 120px;
  justify-content: space-between;
  position: relative;
  margin-bottom: 40px;
`;

export const ReadMoreText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.SMALL_SIZE - 2}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_LIGHT_COLOR};
  position: absolute;
  top: -90px;
  align-self: center;
`;
