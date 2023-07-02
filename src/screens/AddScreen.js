import { StyleSheet, View, ScrollView } from 'react-native'
// import { TextInput, Button } from 'react-native-paper'
import { Input, Button, Box } from 'native-base'
import React from 'react'
import { useState, useRef } from 'react';
import { addNewTransaction } from '../logic/transaction';

const AddScreen = ({ navigation, route }) => {

  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const [positive, setPositive] = useState(true);
  const refLabel = useRef();

  return (
    <Box safeArea m="5" keyboardShouldPersistTaps='handled'>
    <ScrollView contentContainerStyle={styles.scroll}
    // This prop is needed to make the keyboard disappear when tapping outside of a text field.
    // keyboardShouldPersistTaps='handled'
    >
      {/* Text field to add an amount */}
      <Input
      variant={"unstyled"}
      placeholder="Amount"
      keyboardType="numeric"
      value={amount}
      onChangeText={setAmount}
      size={"xl"}
      returnKeyType={ "done" }
      onSubmitEditing={() => refLabel.current.focus()}

      />

      {/* A button to toggle between positive and negative */}
      <Button.Group m="2" isAttached size="lg">
        <Button onPress={() => setPositive(true)} variant={positive ? "solid" : "outline"}>+</Button>
        <Button onPress={() => setPositive(false)} variant={positive ? "outline" : "solid"}>-</Button>
      </Button.Group>
      
      {/* Text field to add a label */}
      <Input
      variant={"unstyled"}
      placeholder="Label"
      value={label}
      onChangeText={setLabel}
      ref={refLabel}
      size={"xl"}
      />

      {/* A button to submit */}
        <Button m="2" backgroundColor="#000000" onPress={() => {
        addNewTransaction({
        id : Math.random().toString(),
        timestamp : new Date().getTime(),
        amount : positive ? Number(amount) : Number(amount) * -1,
        label : label,
        })
        // Reset fields to defaults
        setAmount("");
        setLabel("");
        setPositive(true);
      }} variant="solid">
        Add
        </Button>
    </ScrollView>
    </Box>
  )
}

const styles = StyleSheet.create({
  scroll : {flexGrow: 1},
  plusminus : { flex: 0, flexDirection: 'row',alignItems: 'center', justifyContent: 'center' },
})

export default AddScreen