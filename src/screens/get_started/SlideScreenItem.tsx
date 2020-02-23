import React from 'react';
import { SlideImage, SlideContent, SlideContainer, SlideTitle } from './styles';

export default function SlideScreenItem({ item }) {
    return (
        <SlideContainer key={item.title}>
            <SlideTitle>{item.title}</SlideTitle>
            <SlideImage source={item.image} style={{ resizeMode: 'contain' }} />
            <SlideContent>{item.text}</SlideContent>
        </SlideContainer>

    );
}
