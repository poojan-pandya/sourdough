import { ScrollView } from 'react-native'
import { Input, Button, Box, Heading } from 'native-base'
import React from 'react'
import { useState, useRef } from 'react';
import { addNewTransaction } from '../logic/transaction';

const AddScreen = () => {
  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const [positive, setPositive] = useState(true);
  const refAmount = useRef();
  const refLabel = useRef();

  return (
    <Box safeArea m="5">
      <Heading pb={"5"} size="2xl">Add Transaction</Heading>
    <ScrollView
    // This prop is needed to make the keyboard disappear when tapping outside of a text field.
    keyboardShouldPersistTaps='handled'
    >

      {/* A button to toggle between positive and negative */}
      <Button.Group m="2" py="5" size="lg" justifyContent={"center"}>
        <Button width="50%" onPress={() => setPositive(true)} colorScheme="green"  variant={positive ? "solid" : "disabled"}>+</Button>
        <Button width="50%" onPress={() => setPositive(false)} colorScheme="red" variant={positive ? "disabled" : "solid"}>-</Button>
      </Button.Group>

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
      ref={refAmount}
      />
      
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
        <Button backgroundColor="#000000" onPress={() => {
          if (!amount || !label) {
            return;
          }
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
          refAmount.current.focus();
        }} variant="solid">
        Add
        </Button>
    </ScrollView>
    </Box>
  )
}

export default AddScreen