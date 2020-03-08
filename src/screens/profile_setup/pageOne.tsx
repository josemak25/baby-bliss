import React, { useState } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import DatePicker from 'react-native-datepicker';
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

export default function PageOne({ handleNavigation, handleChange, profile }) {
  const { colors } = useThemeContext();

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

  const handleDate = (date: string) => {
    handleChange({ type: 'birthDueDate', data: date });
    setTimeout(handleNavigation, 500);
  };

  return (
    <PageOneContainer>
      <SelectQuestionButtonContainer>
        <SelectQuestionButton>
          <AnswerOption>a</AnswerOption>
          <AnswerOptionText>Select date</AnswerOptionText>
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
        <SelectQuestionButton style={{ backgroundColor: 'transparent' }}>
          <DatePicker
            style={{
              position: 'absolute',
              width: applyScale(373)
            }}
            mode="date"
            placeholder=" "
            format="DD-MM-YYYY"
            minDate={new Date()}
            maxDate="01-03-2060"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: { height: applyScale(60), borderWidth: 0 }
            }}
            onDateChange={handleDate}
            onOpenModal={() => startButtonAnimation('buttonWidthOne')}
            getDateStr={(date: Date) => new Date(date).toDateString()}
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
            {animation.selected === 'buttonWidthOne'
              ? profile.birthDueDate
              : null}
          </AnswerOptionText>
        </SelectQuestionButton>
      </SelectQuestionButtonContainer>
      <SelectQuestionButtonContainer>
        <SelectQuestionButton>
          <AnswerOption>b</AnswerOption>
          <AnswerOptionText>Continue</AnswerOptionText>
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
