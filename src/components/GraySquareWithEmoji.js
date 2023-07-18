import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { baseStyles, colors } from '../styles/baseStyles';

const GraySquareWithEmoji = ({ emoji, label, date, amount, category }) => {
  return (
    <TouchableWithoutFeedback>
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.graySquare}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
    // paddingHorizontal: 16,
    // paddingVertical: 8,
  },
  leftContainer: {
    marginRight: 16,
  },
  graySquare: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: baseStyles.h1.fontSize,
  },
  middleContainer: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: colors.gray,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GraySquareWithEmoji;