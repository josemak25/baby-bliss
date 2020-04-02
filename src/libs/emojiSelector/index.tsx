import React, { useState, useEffect, useRef } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { EMOJI_HISTORY_KEY } from '../../constants';
import emoji from 'emoji-datasource';
import {
  FlatList,
  Container,
  ToolBarView,
  SearchBarView,
  SearchBarContainer,
  SearchInput,
  SearchBarViewContent,
  SearchBarTitle,
  Loader,
  ToolBarContainer,
  ToolBarSymbol,
  EmojiCellContainer,
  EmojiText
} from './styles';

interface EmojiSelectorPropType {
  testID?: string;
  showHistory?: boolean;
  onEmojiSelected(selectedEmojiChar: string): void;
  columns?: number;
  category?: categoryKeysType;
  theme?: string;
  placeholder?: string;
  showSearchBar?: boolean;
  showSectionTitles?: boolean;
  showTabs?: boolean;
}

type categoryKeysType = {
  symbol: any;
  name: string;
};

type CategoriesType = {
  all: categoryKeysType;
  history: categoryKeysType;
  emotion: categoryKeysType;
  people: categoryKeysType;
  nature: categoryKeysType;
  food: categoryKeysType;
  activities: categoryKeysType;
  objects: categoryKeysType;
  places: categoryKeysType;
  symbols: categoryKeysType;
  flags: categoryKeysType;
};

export const Categories: CategoriesType = {
  all: {
    symbol: null,
    name: 'All'
  },
  history: {
    symbol: '🕘',
    name: 'Recently used'
  },
  emotion: {
    symbol: '😀',
    name: 'Smileys & Emotion'
  },
  people: {
    symbol: '🧑',
    name: 'People & Body'
  },
  nature: {
    symbol: '🦄',
    name: 'Animals & Nature'
  },
  food: {
    symbol: '🍔',
    name: 'Food & Drink'
  },
  activities: {
    symbol: '⚾️',
    name: 'Activities'
  },
  places: {
    symbol: '✈️',
    name: 'Travel & Places'
  },
  objects: {
    symbol: '💡',
    name: 'Objects'
  },
  symbols: {
    symbol: '🔣',
    name: 'Symbols'
  },
  flags: {
    symbol: '🏳️‍🌈',
    name: 'Flags'
  }
};

const charFromUtf16 = utf16 =>
  String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));

export const charFromEmojiObject = obj => charFromUtf16(obj.unified);

const filteredEmojis = emoji.filter(e => e.added_in >= '2.0');

const emojiByCategory = category =>
  filteredEmojis.filter(e => e.category === category);

const sortEmoji = list => list.sort((a, b) => a.sort_order - b.sort_order);

const categoryKeys = Object.keys(Categories);

const TabBar = ({ theme, activeCategory, onPress, width }) => {
  const tabSize = width / categoryKeys.length;

  return categoryKeys.map(c => {
    const category: categoryKeysType = Categories[c];
    if (c !== 'all') {
      return (
        <ToolBarView
          key={category.name}
          onPress={() => onPress(category)}
          style={{
            height: tabSize,
            borderColor: category === activeCategory ? theme : '#EEEEEE'
          }}
        >
          <ToolBarSymbol
            style={{
              fontSize: tabSize - 21
            }}
          >
            {category.symbol}
          </ToolBarSymbol>
        </ToolBarView>
      );
    }
  });
};

const EmojiCell = ({ emoji, colSize, ...other }) => (
  <EmojiCellContainer
    activeOpacity={0.5}
    style={{
      width: colSize,
      height: colSize
    }}
    {...other}
  >
    <EmojiText style={{ fontSize: colSize - 12 }}>
      {charFromEmojiObject(emoji)}
    </EmojiText>
  </EmojiCellContainer>
);

const EmojiSelector = (props: EmojiSelectorPropType) => {
  const [state, setState] = useState({
    searchQuery: '',
    category: Categories.all,
    isReady: false,
    history: [],
    emojiList: null,
    colSize: 0,
    width: 0
  });
  const ref = useRef({ scrollView: null });

  const {
    theme,
    columns,
    placeholder,
    showHistory,
    showSearchBar,
    showSectionTitles,
    showTabs,
    ...other
  } = props;

  const { category, colSize, isReady, searchQuery } = state;

  useEffect(() => {
    const { category, showHistory } = props;
    setState({ ...state, category });

    if (showHistory) {
      loadHistoryAsync();
    }
  }, [props.category, props.showHistory, state.isReady]);

  const handleTabSelect = (category: categoryKeysType) => {
    const { scrollView } = ref.current;
    if (state.isReady) {
      if (scrollView)
        scrollView.scrollToOffset({ x: 0, y: 0, animated: false });
      setState({ ...state, searchQuery: '', category });
    }
  };

  const handleEmojiSelect = emoji => {
    if (props.showHistory) {
      addToHistoryAsync(emoji);
    }
    props.onEmojiSelected(charFromEmojiObject(emoji));
  };

  const addToHistoryAsync = async emoji => {
    const history = await AsyncStorage.getItem(EMOJI_HISTORY_KEY);

    let value = [];
    if (!history) {
      // no history
      const record = Object.assign({}, emoji, { count: 1 });
      value.push(record);
    } else {
      let json = JSON.parse(history);
      if (json.filter(r => r.unified === emoji.unified).length > 0) {
        value = json;
      } else {
        let record = Object.assign({}, emoji, { count: 1 });
        value = [record, ...json];
      }
    }

    AsyncStorage.setItem(EMOJI_HISTORY_KEY, JSON.stringify(value));
    setState({ ...state, history: value });
  };

  const loadHistoryAsync = async () => {
    let result = await AsyncStorage.getItem(EMOJI_HISTORY_KEY);
    if (result) {
      let history = JSON.parse(result);
      setState({ ...state, history });
    }
  };

  const renderEmojiCell = ({ item }) => (
    <EmojiCell
      key={item.key}
      emoji={item.emoji}
      onPress={() => handleEmojiSelect(item.emoji)}
      colSize={state.colSize}
    />
  );

  const returnSectionData = () => {
    const { history, emojiList, searchQuery, category } = state;
    if (category === Categories.all && searchQuery === '') {
      //TODO: OPTIMIZE THIS
      let largeList = [];
      categoryKeys.forEach(c => {
        const name = Categories[c].name;
        const list =
          name === Categories.history.name ? history : emojiList[name];
        if (c !== 'all' && c !== 'history') largeList = largeList.concat(list);
      });

      return largeList.map(emoji => ({ key: emoji.unified, emoji }));
    } else {
      let list;
      const hasSearchQuery = searchQuery !== '';
      const name = category.name;
      if (hasSearchQuery) {
        const filtered = emoji.filter(e => {
          let display = false;
          e.short_names.forEach(name => {
            if (name.includes(searchQuery.toLowerCase()) && e.added_in >= '2.0')
              display = true;
          });
          return display;
        });
        list = sortEmoji(filtered);
      } else if (name === Categories.history.name) {
        list = history;
      } else {
        list = emojiList[name];
      }
      return list.map(emoji => ({ key: emoji.unified, emoji }));
    }
  };

  const handleLayout = ({ nativeEvent: { layout } }) => {
    // setState({ ...state, width: layout.width, isReady: true });
    let emojiList = {};
    categoryKeys.forEach(c => {
      let name = Categories[c].name;
      emojiList[name] = sortEmoji(emojiByCategory(name));
    });

    setState({
      ...state,
      emojiList,
      width: layout.width,
      colSize: Math.floor(layout.width / props.columns),
      isReady: true
    });
  };

  const handleSearch = (searchQuery: string) => {
    setState({ ...state, searchQuery });
  };

  const SearchBar = (
    <SearchBarContainer>
      <SearchInput
        placeholder={placeholder}
        clearButtonMode="always"
        returnKeyType="done"
        autoCorrect={false}
        underlineColorAndroid={theme}
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </SearchBarContainer>
  );

  const title = searchQuery !== '' ? 'Search Results' : category.name;

  return (
    <Container {...other} onLayout={handleLayout}>
      <ToolBarContainer>
        {showTabs && (
          //@ts-ignore
          <TabBar
            activeCategory={category}
            onPress={handleTabSelect}
            theme={theme}
            width={state.width}
          />
        )}
      </ToolBarContainer>
      <SearchBarView>
        {showSearchBar && SearchBar}
        {isReady ? (
          <SearchBarView>
            <SearchBarViewContent>
              {showSectionTitles && <SearchBarTitle>{title}</SearchBarTitle>}
              <FlatList
                contentContainerStyle={{ paddingBottom: colSize }}
                data={returnSectionData()}
                renderItem={renderEmojiCell}
                horizontal={false}
                numColumns={columns}
                keyboardShouldPersistTaps={'always'}
                ref={scrollViewRef => (ref.current.scrollView = scrollViewRef)}
                removeClippedSubviews
              />
            </SearchBarViewContent>
          </SearchBarView>
        ) : (
          <Loader {...other}>
            <ActivityIndicator size={'large'} color={theme} />
          </Loader>
        )}
      </SearchBarView>
    </Container>
  );
};

export default EmojiSelector;

EmojiSelector.defaultProps = {
  theme: '#007AFF',
  category: Categories.all,
  showTabs: true,
  showSearchBar: true,
  showHistory: true,
  showSectionTitles: true,
  columns: 8,
  placeholder: 'Search...'
};
