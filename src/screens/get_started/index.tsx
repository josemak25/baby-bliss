import React, { useState } from 'react';

import Button from '../../components/button';
import { Container, Welcome } from './styles';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';

const GetStarted = props => {
  const slides = [
    {
      key: 'getAnswer',
      title: 'GET ANSWERS',
      text:
        'Become a part of pregnancy and parenting tribe and have all your question answered by member and expect',
      image: require('../../../assets/images/get-answers.png'),
      backgroundColor: '#22bcb5'
    },
    {
      key: 'newsFeed',
      title: 'NEWS FEED',
      text: 'Get all Insight on everything Pregnancy and Motherhood',
      image: require('../../../assets/images/news.png'),
      backgroundColor: '#22bcb5'
    },
    {
      key: 'shop',
      title: 'SHOP',
      text: 'Easily Shop for everything you need for Your baby',
      image: require('../../../assets/images/shop.png'),
      backgroundColor: '#22bcb5'
    }
  ];
  const RenderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  const RenderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
          onPress={() => props.navigation.navigate('HomeScreen')}
        />
      </View>
    );
  };

  const renderSlideItem = ({ item }) => {
    return (
      <View key={item.title}>
        <Text style={{ textAlign: 'center' }}>{item.title}</Text>
        <View style={styles.image} >
          <Image source={item.image} />
          <Text>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <AppIntroSlider
        slides={slides}
        renderItem={renderSlideItem}
        renderDoneButton={RenderDoneButton}
        renderNextButton={RenderNextButton}
      />
      <View style={styles.buttonStyle}>
        <Button
          title="Get Started"
          onPress={() => props.navigation.navigate('HomeScreen')}
        />
      </View>
    </Container>
  );
};



const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%'
  },
  buttonStyle: {
    marginBottom: 50
  }
});
export default GetStarted;
