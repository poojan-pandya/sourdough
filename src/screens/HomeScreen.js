import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.basic}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  basic : { flex: 1, alignItems: 'center', justifyContent: 'center' }
})

export default HomeScreen