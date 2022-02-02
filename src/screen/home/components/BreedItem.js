import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

//UI component for displaying each item of list
const BreedItem = props => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('BreedImage', {
          //navigating to breed image screen on each item click
          urlField: props.url,
          screenTitle: props.title,
        });
      }}>
      <View style={[styles.itemContainer, {backgroundColor: props.color}]}>
        <Text style={[styles.breedText, {marginLeft: props.left}]}>
          {props.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 60,
    justifyContent: 'center',
    marginBottom: 2,
  },
  breedText: {
    fontSize: 18,
    color: 'white',
    textTransform: 'capitalize',
  },
});
export default BreedItem;
