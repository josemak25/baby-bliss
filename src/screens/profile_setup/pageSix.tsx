import React, { useState } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';
import { useThemeContext } from '../../theme';
import applyScale from '../../utils/applyScale';
import { useStoreContext } from '../../store';
import Button from '../../components/button';
import { ActivityIndicator } from 'react-native';

import {
  PageOneContainer,
  SelectQuestionButtonContainer,
  AnswerOption,
  AnswerOptionText,
  SelectQuestionButton,
  Spinner
} from './styles';

const SelectQuestionButtonOverlay = Animated.createAnimatedComponent(
  SelectQuestionButton
);

export default function PageSix({
  handleNavigation,
  handleChange,
  handleSubmit
}) {
  const { colors, fonts } = useThemeContext();

  const [{ interestState, userState }] = useStoreContext();

  const [state, setState] = useState('');

  const [animation, setAnimation] = useState({
    buttonWidthOne: new Animated.Value(applyScale(5)),
    buttonWidthTwo: new Animated.Value(applyScale(5)),
    selected: ''
  });

  const startButtonAnimation = (buttonType: string) => {
    if (buttonType === animation.selected && buttonType === 'buttonWidthTwo') {
      return setTimeout(handleNavigation, 500);
    }

    setAnimation({ ...animation, selected: buttonType });

    if (animation.selected && buttonType !== animation.selected) {
      Animated.timing(animation[animation.selected], {
        toValue: applyScale(5),
        duration: 300,
        easing: Easing.elastic(0.7)
      }).start();
    }

    Animated.timing(animation[buttonType], {
      toValue: applyScale(373),
      duration: 500,
      easing: Easing.elastic(0.7)
    }).start(() => {
      if (buttonType === 'buttonWidthTwo') {
        setTimeout(handleNavigation, 500);
      }
    });
  };

  const handleState = () => {
    handleChange({ key: 'userInterest', data: state });
  };

  const handleRNPickerSelect = () => {
    startButtonAnimation('buttonWidthOne');
  };

  return (
    <PageOneContainer>
      <SelectQuestionButtonContainer>
        <SelectQuestionButton>
          <AnswerOption>a</AnswerOption>
          <AnswerOptionText>Select interest</AnswerOptionText>
        </SelectQuestionButton>
        <SelectQuestionButtonOverlay
          style={{
            width: animation.buttonWidthOne,
            backgroundColor: colors.BG_LIGHT_COLOR,
            alignSelf: 'flex-start',
            borderLeftWidth: 0,
            left: -5
          }}
        />

        {animation.selected === 'buttonWidthOne' ? (
          <AnswerOption
            style={{
              color: colors.POST_TIP_COLOR,
              position: 'absolute',
              left: 37
            }}
          >
            a
          </AnswerOption>
        ) : null}

        <SelectQuestionButton style={{ backgroundColor: 'transparent' }}>
          <RNPickerSelect
            onOpen={handleRNPickerSelect}
            onClose={() => setTimeout(handleNavigation, 1000)}
            placeholder={{
              label: `${
                animation.selected === 'buttonWidthOne'
                  ? 'Select an interest...'
                  : ''
              }`,
              value: 'Abia',
              color: 'red',
              key: 'Select an interest...'
            }}
            onValueChange={value => setState(value)}
            onDonePress={handleState}
            value={state}
            items={interestState.interests.map(({ title, id }) => ({
              label: title,
              value: title,
              key: id
            }))}
            textInputProps={{
              color:
                animation.selected === 'buttonWidthOne'
                  ? colors.POST_TIP_COLOR
                  : colors.BD_DARK_COLOR,
              width: applyScale(373),
              height: applyScale(63),
              paddingLeft: applyScale(85)
            }}
          />
          <AnswerOption
            style={{
              color:
                animation.selected === 'buttonWidthOne'
                  ? colors.POST_TIP_COLOR
                  : colors.BD_DARK_COLOR
            }}
          >
            a
          </AnswerOption>
          <AnswerOptionText
            style={{
              color:
                animation.selected === 'buttonWidthOne'
                  ? colors.FLOATING_MESSAGE_COLOR
                  : colors.BG_LIGHT_COLOR
            }}
          >
            Select interest
          </AnswerOptionText>
        </SelectQuestionButton>
      </SelectQuestionButtonContainer>

      <Button
        title={`${userState.isLoading ? '' : 'Submit'}`}
        disabled={userState.isLoading}
        buttonStyle={{
          backgroundColor: colors.POST_TIP_COLOR,
          marginTop: 20,
          width: '100%'
        }}
        textStyle={{
          color: colors.BG_LIGHT_COLOR,
          fontFamily: fonts.IBM_SANS_BOLD
        }}
        onPress={handleSubmit}
      />
      {userState.isLoading && (
        <Spinner>
          <ActivityIndicator size="small" color={colors.BG_LIGHT_COLOR} />
        </Spinner>
      )}
    </PageOneContainer>
  );
}
