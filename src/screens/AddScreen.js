import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddScreen = ({ navigation, route }) => {
  return (
    <View style={styles.basic}>
      <Text>Add Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  basic : { flex: 1, alignItems: 'center', justifyContent: 'center' }
})

export default AddScreen