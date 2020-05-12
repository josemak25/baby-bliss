import React, { useState, Fragment } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import DatePicker from '@react-native-community/datetimepicker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import Button from '../../components/button';
import { useThemeContext } from '../../theme';
import applyScale from '../../utils/applyScale';

import {
  PageOneContainer,
  SelectQuestionButtonContainer,
  AnswerOption,
  AnswerOptionText,
  SelectQuestionButton,
  DatePickerModalContainer,
  DatePickerModalHeader
} from './styles';

const SelectQuestionButtonOverlay = Animated.createAnimatedComponent(
  SelectQuestionButton
);

export default function PageOne({ handleNavigation, handleChange, profile }) {
  const { colors } = useThemeContext();
  let dueDate: Date | null = null;

  const [animation, setAnimation] = useState({
    buttonWidthOne: new Animated.Value(applyScale(5)),
    buttonWidthTwo: new Animated.Value(applyScale(5)),
    selected: '',
    showDateModal: false
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

    if (buttonType === 'buttonWidthOne') showDatePicker();

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

  const handleDate = (date: Date | null) => {
    setTimeout(handleNavigation, 500);
    showDatePicker();
    handleChange({ key: 'dueDateStart', data: date });
  };

  const showDatePicker = () => {
    setAnimation({ ...animation, showDateModal: !animation.showDateModal });
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
        <SelectQuestionButton
          style={{ backgroundColor: 'transparent' }}
          onPress={() => startButtonAnimation('buttonWidthOne')}
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
            {animation.selected === 'buttonWidthOne'
              ? profile.birthDueDate
                ? profile.birthDueDate
                : 'Select date'
              : 'Select date'}
          </AnswerOptionText>
        </SelectQuestionButton>
      </SelectQuestionButtonContainer>
      <SelectQuestionButtonContainer>
        <SelectQuestionButton>
          <AnswerOption>b</AnswerOption>
          <AnswerOptionText testID="amNotPregnantButton">
            Am Not Pregnant
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
            Am Not Pregnant
          </AnswerOptionText>
        </SelectQuestionButton>
      </SelectQuestionButtonContainer>
      {animation.showDateModal && (
        <Fragment>
          <TouchableWithoutFeedback
            style={{ alignItems: 'center' }}
            containerStyle={{
              flex: 1,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              alignItems: 'center',
              justifyContent: 'flex-end',
              position: 'absolute',
              backgroundColor: colors.FONT_DARK_COLOR,
              bottom: -20,
              opacity: 0.5
            }}
            onPress={() => handleDate(dueDate)}
          />
          <DatePickerModalContainer>
            <DatePickerModalHeader>
              <Button
                title="Cancel"
                buttonStyle={{ backgroundColor: 'transparent' }}
                onPress={showDatePicker}
              />
              <Button
                title="Confirm"
                buttonStyle={{ backgroundColor: 'transparent' }}
                textStyle={{ color: colors.FLOATING_MESSAGE_COLOR }}
                onPress={() => handleDate(dueDate)}
              />
            </DatePickerModalHeader>
            <DatePicker
              mode="date"
              display="default"
              value={new Date()}
              minimumDate={new Date()}
              style={{ width: '100%', marginTop: 40 }}
              onChange={(_, date) => (dueDate = date)}
            />
          </DatePickerModalContainer>
        </Fragment>
      )}
    </PageOneContainer>
  );
}
