import React, { useState } from 'react';
import PageOne from './pageOne';
import PageTwo from './pageTwo';
import PageThree from './pageThree';
import PageFour from './pageFour';
import PageFive from './pageFive';
import PageSix from './pageSix';

import { SlideItem } from '.';

import {
  SlideQuestion,
  SlideContainer,
  SlideTitle,
  SlideQuestionContainer,
  SlideAnswersContainer
} from './styles';

type handleDataType = {
  data: string;
  key: string;
};

export default function QuestionScreenItem({
  item,
  questionRef,
  setProfile,
  profile,
  handleSubmit
}) {
  const { key, question, id }: SlideItem = item;

  const [navigation] = useState(questionRef);

  const handleNavigation = () => navigation.snapToNext();

  const handleChange = ({ data, key }: handleDataType) => {
    console.log(data, key);
    if (Array.isArray(data)) {
      setProfile(prev => ({
        ...prev,
        payload: { ...prev.payload, [key]: [...profile[key], ...data] }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        payload: { ...prev.payload, [key]: data }
      }));
    }
  };

  return (
    <SlideContainer key={key}>
      <SlideQuestionContainer>
        <SlideQuestion>{question}</SlideQuestion>
        <SlideTitle>profile setup</SlideTitle>
      </SlideQuestionContainer>
      <SlideAnswersContainer>
        {id === 1 ? (
          <PageOne
            handleNavigation={handleNavigation}
            handleChange={handleChange}
            profile={profile}
          />
        ) : null}
        {id === 2 ? (
          <PageTwo
            handleNavigation={handleNavigation}
            handleChange={handleChange}
            // profile={profile}
          />
        ) : null}
        {id === 3 ? (
          <PageThree
            handleNavigation={handleNavigation}
            handleChange={handleChange}
          />
        ) : null}
        {id === 4 ? (
          <PageFour
            handleNavigation={handleNavigation}
            handleChange={handleChange}
          />
        ) : null}
        {id === 5 ? (
          <PageFive
            handleNavigation={handleNavigation}
            handleChange={handleChange}
          />
        ) : null}
        {id === 6 ? (
          <PageSix
            handleNavigation={handleNavigation}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : null}
      </SlideAnswersContainer>
    </SlideContainer>
  );
}
