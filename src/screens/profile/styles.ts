import styled from 'styled-components/native';
import Constants from 'expo-constants';
import applyScale from '../../utils/applyScale';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BD_DARK_COLOR};
  padding: 20px;
`;

export const StatusBar = styled.View`
  height: ${Constants.statusBarHeight}px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
`;

export const HeaderContainer = styled.View`
  width: 100%;
  height: ${applyScale(300)}px;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
`;

export const ProfileImageContainer = styled.TouchableOpacity`
  height: ${applyScale(120)}px;
  width: ${applyScale(120)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${120 / 2}px;
`;

export const IconContainer = styled.TouchableOpacity`
  height: ${applyScale(40)}px;
  width: ${applyScale(40)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.GRADIENT_COLOR_FROM};
`;

export const ProfileDetailsContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  bottom: 25px;
`;

export const ProfileRecordsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 5px;
`;

export const ProfileResultsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const RecordsTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE + 2}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_REGULAR};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
  opacity: 0.3;
`;

export const RecordsResult = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE + 5}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  opacity: 0.8;
`;

export const UserName = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE + 5}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
`;

export const UserEmail = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE + 3}px;
  font-family: ${({ theme }) => theme.fonts.MONTSERRAT_SEMI_BOLD};
  opacity: 0.3;
  padding: 5px;
`;

export const ScrollViewContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const AccountSettingTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE + 5}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  opacity: 0.2;
  text-transform: uppercase;
`;

export const AccountSettingContainer = styled.View`
  margin-top: 15px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_COLOR};
`;

export const OptionContainer = styled.View`
  height: ${applyScale(150)}px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
`;

export const OptionTitle = styled.Text`
  flex: 1;
  font-size: ${({ theme }) => theme.fonts.MEDIUM_SIZE + 3}px;
  font-family: ${({ theme }) => theme.fonts.IBM_SANS_BOLD};
  color: ${({ theme }) => theme.colors.FONT_DARK_COLOR};
  text-transform: capitalize;
  opacity: 0.4;
  margin-left: 20px;
`;

export const OptionContainerHeader = styled.TouchableOpacity`
  height: ${applyScale(70)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const OptionContainerFooter = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Spinner = styled.View`
  position: absolute;
  align-self: center;
  bottom: 15px;
`;
