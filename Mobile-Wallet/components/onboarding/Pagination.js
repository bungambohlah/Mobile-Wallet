import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import { themeColor } from "../../constants/themeColor";

const PaginationComp = ({ index, x, screenWidth }) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
      [10, 20, 10],
      "clamp",
    );

    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
      [0.5, 1, 0.5],
      "clamp",
    );

    return {
      width: widthAnimation,
      opacity: 1,
      backgroundColor:
        opacityAnimation > 0.9 ? themeColor.buttonPrimaryBackgroundColor : themeColor.textColor,
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

export function Pagination({ data, screenWidth, x }) {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <PaginationComp key={item.id} index={index} x={x} screenWidth={screenWidth} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: themeColor.buttonPrimaryBackgroundColor,
    marginHorizontal: 10,
  },
});
