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

export default function PageFive({ handleNavigation, handleChange }) {
  const { colors } = useThemeContext();

  const [animation, setAnimation] = useState({
    buttonWidthOne: new Animated.Value(applyScale(5)),
    buttonWidthTwo: new Animated.Value(applyScale(5)),
    selected: ''
  });

  const startButtonAnimation = (buttonType: string, answer: boolean) => {
    if (buttonType === animation.selected) {
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
      handleChange({ key: 'hasHealthMaintenanceOrg', data: answer });
      setTimeout(handleNavigation, 500);
    });
  };

  return (
    <PageOneContainer>
      <SelectQuestionButtonContainer>
        <SelectQuestionButton>
          <AnswerOption>a</AnswerOption>
          <AnswerOptionText>Yes</AnswerOptionText>
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

        <SelectQuestionButton
          style={{ backgroundColor: 'transparent' }}
          onPress={() => startButtonAnimation('buttonWidthOne', true)}
        >
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
            Yes
          </AnswerOptionText>
        </SelectQuestionButton>
      </SelectQuestionButtonContainer>
      <SelectQuestionButtonContainer>
        <SelectQuestionButton>
          <AnswerOption>b</AnswerOption>
          <AnswerOptionText>No</AnswerOptionText>
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
          onPress={() => startButtonAnimation('buttonWidthTwo', false)}
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
            No
          </AnswerOptionText>
        </SelectQuestionButton>
      </SelectQuestionButtonContainer>
    </PageOneContainer>
  );
}
