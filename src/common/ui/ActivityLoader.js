import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../themes/Colors';

//This component loads a activity indicator when visible flag is true
const ActivityLoader = props => {
  return (
    <View style={styles.loaderContainer}>
      {props.visible && <ActivityIndicator size={30} color={colors.primary} />}
    </View>
  );
};
const styles = StyleSheet.create({});
export default ActivityLoader;
