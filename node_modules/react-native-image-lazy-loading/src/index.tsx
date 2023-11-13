import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props extends ImageProps {
  loaderColor?: string;
  renderErrorComponent?: Element;
  renderLoaderComponent?: Element;
}
const ProgressiveImage = (props: Props) => {
  const {
    loaderColor = 'black',
    renderErrorComponent = (
      <View style={[props.style, styles.loaderStyle]}>
        <Text style={{ alignSelf: 'center' }}>Error on Loading</Text>
      </View>
    ),
    renderLoaderComponent = (
      <View style={[props.style, styles.loaderStyle]}>
        <ActivityIndicator size={'large'} color={loaderColor} />
      </View>
    ),
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const opacity = useRef(new Animated.Value(0));

  const onLoad = () => {
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setIsLoading(false);
  };
  const onError = () => {
    setIsLoading(false);
    setIsError(true);
  };
  const scale = () =>
    opacity.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0.85, 1],
    });
  return (
    <View>
      <Animated.Image
        {...props}
        onLoad={onLoad}
        onError={onError}
        style={[
          props.style,
          {
            opacity: opacity.current,
            transform: [{ scale: scale() }],
            backgroundColor: '#E7E5E7',
          },
        ]}
      />
      {isLoading ? renderLoaderComponent : null}
      {isError ? renderErrorComponent : null}
    </View>
  );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
  loaderStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
