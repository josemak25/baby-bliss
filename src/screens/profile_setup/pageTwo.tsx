import React, { useState } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';
import { useThemeContext } from '../../theme';
import applyScale from '../../utils/applyScale';

import {
  PageOneContainer,
  SelectQuestionButtonContainer,
  AnswerOption,
  AnswerOptionText,
  SelectQuestionButton
} from './styles';

const SelectQuestionButtonOverlay = Animated.createAnimatedComponent(
  SelectQuestionButton
);

export default function PageTwo({ handleNavigation, handleChange }) {
  const { colors } = useThemeContext();
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
    handleChange({ key: 'state', data: state });
  };

  const handleRNPickerSelect = () => {
    startButtonAnimation('buttonWidthOne');
  };

  return (
    <PageOneContainer>
      <SelectQuestionButtonContainer>
        <SelectQuestionButton>
          <AnswerOption>a</AnswerOption>
          <AnswerOptionText>Select state</AnswerOptionText>
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
                  ? 'Select a state...'
                  : ''
              }`,
              value: 'Select a state...',
              color: 'red',
              key: 'Select a state...'
            }}
            onValueChange={value => {
              setState(value);
            }}
            value={state}
            items={allStates.map((title: string, index: number) => ({
              label: title,
              value: title,
              key: index
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
            onDonePress={handleState}
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
            Select state
          </AnswerOptionText>
        </SelectQuestionButton>
      </SelectQuestionButtonContainer>
      <SelectQuestionButtonContainer>
        <SelectQuestionButton>
          <AnswerOption>b</AnswerOption>
          <AnswerOptionText testID="pageTwoContinueButton">
            Continue
          </AnswerOptionText>
        </SelectQuestionButton>
        <SelectQuestionButtonOverlay
          style={{
            width: animation.buttonWidthTwo,
            backgroundColor: colors.BG_LIGHT_COLOR,
            alignSelf: 'flex-start',
            borderLeftWidth: 0,
            left: -5
          }}
        />
        <SelectQuestionButton
          style={{ backgroundColor: 'transparent' }}
          onPress={() => startButtonAnimation('buttonWidthTwo')}
        >
          <AnswerOption
            style={{
              color:
                animation.selected === 'buttonWidthTwo'
                  ? colors.POST_TIP_COLOR
                  : colors.BD_DARK_COLOR
            }}
          >
            b
          </AnswerOption>
          <AnswerOptionText
            style={{
              color:
                animation.selected === 'buttonWidthTwo'
                  ? colors.FLOATING_MESSAGE_COLOR
                  : colors.BG_LIGHT_COLOR,
              zIndex: 999
            }}
          >
            Continue
          </AnswerOptionText>
        </SelectQuestionButton>
      </SelectQuestionButtonContainer>
    </PageOneContainer>
  );
}

const allStates = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT - Abuja',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara'
];
