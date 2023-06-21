import { StyleSheet, View, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import React from 'react'
import { useState } from 'react';
import { addNewTransaction } from '../components/transaction';

const AddScreen = ({ navigation, route }) => {

  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const [positive, setPositive] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.scroll}
    // This prop is needed to make the keyboard disappear when tapping outside of a text field.
    keyboardShouldPersistTaps='handled'
    >
      {/* Text field to add an amount */}
      <TextInput
        label="Amount"
        mode="outlined"
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
      />
      {/* Buttons to choose positive or negative transaction. Only one can be pressed. */}
      <View style={styles.plusminus}>
        <Button mode="outlined" disabled={positive} theme={{colors : {
          // This is the color when the button is pressed (disabled).
          surfaceDisabled : "#32a852",
          onSurfaceDisabled : "#32a852",
          // This is the color when the button is not pressed (enabled).
          outline : "#a1a1a1",
          primary : "#a1a1a1",        
          }}} onPress={() => setPositive(true)}>
          +
        </Button>
        <Button mode="outlined" disabled={!positive} theme={{colors : {
          // This is the color when the button is pressed (disabled).
          surfaceDisabled : "#c70404",
          onSurfaceDisabled : "#c70404",
          // This is the color when the button is not pressed (enabled).
          outline : "#a1a1a1",
          primary : "#a1a1a1",        
          }}} onPress={() => setPositive(false)}>
          -
        </Button>
      </View>
      {/* Text field to add a label */}
      <TextInput
        label="Label"
        mode="outlined"
        onChangeText={setLabel}
        value={label}
        keyboardType="default"
      />
      <Button mode="contained" onPress={() => addNewTransaction({
        id : Math.random().toString(),
        timestamp : new Date().getTime(),
        amount : positive ? Number(amount) : Number(amount) * -1,
        label : label,
        })}>
        Add
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll : {flexGrow: 1},
  plusminus : { flex: 0, flexDirection: 'row',alignItems: 'center', justifyContent: 'center' },
})

export default AddScreen