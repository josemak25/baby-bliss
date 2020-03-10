import styled from 'styled-components/native';
import applyScale from '../../utils/applyScale';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const QuestionHeader = styled.View`
  width: 100%;
  height: ${applyScale(100)}px;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

export const QuestionHeaderContent = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10px;
`;

export const QuestionContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.FLOATING_MESSAGE_COLOR};
`;

export const SlideContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
  border-radius: 3px;
`;

export const SlideNumberContainer = styled.View`
  width: 55%;
  height: 60%;
  height: 40px;
  flex-direction: row;
  align-items: center;
`;

export const SlideNumber = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 10}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
`;

export const SlideNumberLength = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  color: ${({ theme }) => theme.colors.INACTIVE_ICON_COLOR};
`;

export const SlideTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.INACTIVE_ICON_COLOR};
  text-transform: capitalize;
  height: 10%;
`;

export const SlideQuestionContainer = styled.View`
  width: 100%;
  height: 40%;
  justify-content: space-between;
  padding: 10px 15px;
`;

export const SlideQuestion = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE + 25}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
`;

export const GoBack = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ProgressBarContainer = styled.View`
  width: 90%;
  height: 9px;
  border-radius: 3px;
  justify-content: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const ProgressBar = styled.View`
  width: 100%;
  height: 9px;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
`;

export const SlideAnswersContainer = styled.View`
  width: 100%;
  height: 40%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.colors.FLOATING_MESSAGE_COLOR};
`;

export const PageOneContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const SelectQuestionButtonContainer = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

export const SelectQuestionButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.GRADIENT_COLOR_FROM};
  margin: 5px;
  position: absolute;
`;

export const AnswerOption = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
  flex: 0.3;
  text-align: center;
`;

export const AnswerOptionText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.LARGE_SIZE}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
  flex: 1;
`;

export const Spinner = styled.View`
  position: absolute;
  align-self: center;
  top: 105px;
`;
