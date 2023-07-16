import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { baseStyles, colors, padding } from '../styles/baseStyles'
import React from 'react'

const CategoryRow = ({ text, amount, limit, emoji, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between', height:60}}>
                    <Text style={styles.bold_p}>{text}</Text>
                    <Text style={{...styles.bold_p, color:colors.gray}}> <Text style={{...styles.bold_p, color:colors.blue}}>${amount}</Text> / ${limit}</Text>
                </View>
                <View style={{flexDirection: 'col', justifyContent: "center"}}>
                    <Text style={styles.h1}>{emoji}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default CategoryRow

const styles = StyleSheet.create({
    ...baseStyles,
    card: {
        backgroundColor: colors.lightGray,
        padding: padding.sm,
        borderRadius: 10,
        marginBottom: 10,
        height: 80
    }
})