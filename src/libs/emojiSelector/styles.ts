import styled from 'styled-components/native';

export const FlatList = styled.FlatList`
  flex: 1px;
`;

export const Container = styled.View`
  flex: 1px;
  width: 100%;
`;

export const ToolBarView = styled.TouchableOpacity`
  flex: 1px;
  border-bottom-width: 2px;
  align-items: center;
  justify-content: center;
`;
export const ToolBarContainer = styled.View`
  flex-direction: row;
`;

export const SearchBarView = styled.View`
  flex: 1px;
`;

export const ToolBarSymbol = styled.Text`
  text-align: center;
  padding-bottom: 8px;
`;

export const SearchBarContainer = styled.View`
  width: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.75);
`;

export const SearchInput = styled.TextInput`
  margin: 8px;
  height: 36px;
  padding-left: 8px;
  border-radius: 10px;
  background-color: #e5e8e9;
`;

export const Loader = styled.View`
  flex: 1px;
  align-items: center;
  justify-content: center;
`;
export const SearchBarViewContent = styled.View`
  flex: 1px;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
`;

export const SearchBarTitle = styled.Text`
  margin: 8px;
  font-size: 17px;
  width: 100%;
  color: #8f8f8f;
`;

export const EmojiCellContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const EmojiText = styled.Text`
  color: #ffffff;
`;
