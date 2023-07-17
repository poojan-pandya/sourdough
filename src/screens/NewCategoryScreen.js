import { StyleSheet, Text, TextInput, SafeAreaView, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import RoundedButton from '../components/RoundedButton';
import { baseStyles, colors } from '../styles/baseStyles';
import React from 'react'
import { addNewCategory, isDuplicateCategory } from '../logic/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';

const chooseRandomEmoji = () => {
    const emojis = [
        '😀', '😃', '😄', '😊', '😎', '😍', '🥳', '🎉', '🎈', '🚀',
        '🌈', '⭐️', '🌺', '🐶', '🐱', '🐼', '🐙', '🐸', '🌞', '🌝',
        '🌎', '🌍', '🌙', '⛅️', '🌤', '🌧', '❄️', '🔥', '🎸', '🎮',
        '📱', '🖥️', '💡', '🔒', '🚑', '🚓', '✈️', '🚢', '🚀', '🎨',
        '⌛', '💡', '🔨', '🔧', '🔩', '⚙️', '💻', '🔌', '🎥', '🔭',
        '🔬', '🧪', '💊', '💉', '🌡️', '🌻', '🌲', '🌳', '🌴', '🍂',
        '🌸', '🌼', '🍄', '🌐', '💾', '💿', '📷', '🎤', '📚', '✏️',
        '📝', '🎵', '🎶', '🎧', '🎁', '🔮', '💎', '💰', '🔧', '🔨',
        '🔩', '🧰', '🎈', '🎊', '🎎', '🎏', '🎀', '🎁', '📦', '📫',
        '📮', '🖍️', '🎭', '🎪', '🎬', '📺', '📻', '🔒', '🔑', '🗝️',
        '🌷', '🌹', '🌻', '🌼', '🍀', '🌾', '🌿', '🍁', '🍃', '🍄'
      ];
      return emojis[Math.floor(Math.random()*emojis.length)];
}

const NewCategoryScreen = ({ navigation, route }) => {
  const [budget, setBudget] = React.useState(0);
  const [emoji, setEmoji] = React.useState("🌮");
  const [category, setCategory] = React.useState('');

    const handleInputChange = (text) => {
        const filteredText = text.replace(/[^0-9.]/g, '')
        const isValid = /^\d+(\.\d{0,2})?$/.test(filteredText) || filteredText === '';
        if (isValid) {
            setBudget(parseFloat(filteredText));
        }
    }

    const handleEmojiChange = (text) => {
        const emojiRegex = /\p{Emoji}/u;
        const emojiMatch = text.match(emojiRegex);
        if (emojiMatch) {
            setEmoji(emojiMatch[0]);
        } else {
            setEmoji('');
        }
    };

    const handleEmojiBlur = () => {
        if (!emoji) {
            setEmoji(chooseRandomEmoji());
        }
    };
    
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
    <Text style={styles.h1}>Budget </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...baseStyles.h1, color: colors.blue}}>$</Text>
        <TextInput
            style={{...baseStyles.h1, color: colors.blue}}
            keyboardType='numeric'
            onChangeText={handleInputChange}
            value={budget ? budget.toString() : ""}
            placeholder='0.00'
        />
        </View>

        <Text style={styles.h1}>per month for</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <TextInput
            style={styles.h1}
            placeholder='Groceries'
            onChangeText={setCategory}
            value={category}
        />
        {/* Empty space */}
        <Text style={styles.h1}> </Text>
        <TextInput
            style={styles.h1}
            onChangeText={handleEmojiChange}
            onBlur={handleEmojiBlur}
            value={emoji}
        />
        </View>
        <RoundedButton enabled={category && emoji && budget} title="Save" backgroundColor={colors.blue} style={{marginBottom: 20}} onPress={async () =>  {
            if (await isDuplicateCategory(category, emoji)) {
                alert('Category or emoji already used!');
            } else {
                await addNewCategory(category, budget, emoji)
                navigation.goBack();
            }
        }}/>
        </SafeAreaView>
        </TouchableWithoutFeedback>
  )
}

export default NewCategoryScreen

const styles = StyleSheet.create({
    ...baseStyles
})