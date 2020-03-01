import React, { useState, Fragment } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import applyScale from '../../utils/applyScale';

import { Image } from './styles';

const ProgressiveImage = Animated.createAnimatedComponent(Image);

type ResponsiveImageProps = {
  width?: number;
  height?: number;
  resizeMode?: string;
  style?: any;
  imageUrl: string;
  testID?: string;
  imageFadeDuration?: number;
  thumbnailSource?: object;
  thumbnailFadeDuration?: number;
  thumbnailBlurRadius?: number;
  onLoadStart?(T: void): void;
  onLoad?(T: void): void;
  onError?(T: void): void;
  onLoadEnd?(T: void): void;
};

export default function ResponsiveImage(props: ResponsiveImageProps) {
  const [animation] = useState({
    imageOpacity: new Animated.Value(0),
    thumbnailOpacity: new Animated.Value(0)
  });

  const width = applyScale(props.width) || 250;
  const height = applyScale(props.height) || 250;
  const resizeMode = props.resizeMode || 'cover';

  const thumbnailFadeDuration = props.thumbnailFadeDuration || 250;
  const imageFadeDuration = props.imageFadeDuration || 250;
  const thumbnailBlurRadius = props.thumbnailBlurRadius || 10;
  const thumbnailSource = props.thumbnailSource || props.imageUrl;

  const onLoadThumbnail = () => {
    Animated.timing(animation.thumbnailOpacity, {
      toValue: 1,
      duration: thumbnailFadeDuration,
      easing: Easing.ease
    }).start();
  };

  const onLoadImage = () => {
    Animated.timing(animation.imageOpacity, {
      toValue: 1,
      duration: imageFadeDuration,
      easing: Easing.ease
    }).start();
    if (props.onLoad) props.onLoad();
  };

  return (
    <Fragment>
      <ProgressiveImage
        style={[{ width, height, resizeMode }, props.style]}
        source={{ uri: thumbnailSource, cache: 'force-cache' }}
        onLoadStart={props.onLoadStart}
        onProgress={props.onLoadStart}
        onLoad={() => onLoadThumbnail}
        onError={props.onError}
        onLoadEnd={props.onLoadEnd}
        blurRadius={thumbnailBlurRadius}
        testID="image-thumbnail"
      />
      <ProgressiveImage
        style={[
          { width, height, resizeMode },
          { opacity: animation.imageOpacity },
          props.style
        ]}
        source={{ uri: props.imageUrl, cache: 'force-cache' }}
        onLoadStart={props.onLoadStart}
        onProgress={props.onLoadStart}
        onLoad={onLoadImage}
        onError={props.onError}
        onLoadEnd={props.onLoadEnd}
        testID="image-data"
      />
    </Fragment>
  );
}
