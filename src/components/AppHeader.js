import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppHeader = ({ scene }) => {
  const hasPreviousScreen = scene.navigation.canGoBack();

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
      {hasPreviousScreen && (
        <TouchableOpacity onPress={handleBackButtonPress}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>My App</Text>
    </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default AppHeader;