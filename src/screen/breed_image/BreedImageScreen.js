import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, removeItem, selectItems} from '../../state/dogSlice';
import FastImage from 'react-native-fast-image';
import ActivityLoader from '../../common/ui/ActivityLoader';
import {BASE_URL} from '../../common/constants/urls';
import {colors} from '../../common/themes/Colors';

const BreedImageScreen = props => {
  const [images, setImages] = useState([]);
  const params = props.route.params;
  const breedItems = useSelector(selectItems);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [refreshLoader, setRefreshLoader] = useState(false);

  //getting 2 random breed images api
  const getImageApi = useCallback(() => {
    try {
      fetch(`${BASE_URL}${params.urlField}/images/random/2`)
        .then(res => res.json())
        .then(
          result => {
            if (result) {
              setLoading(false);
              setRefreshLoader(false);
              setImages(result.message);
              if (!breedItems[params.urlField]) {
                const hash = {};
                hash[params.urlField] = result.message;
                dispatch(addItem(hash)); //adding breed images with name as key in redux store
              }
            }
          },
          error => {
            setLoading(false);
            console.error(error);
          },
        );
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }, [breedItems, dispatch, params.urlField]);

  useEffect(() => {
    //call the api only if breed is not there in store
    if (!breedItems[params.urlField]) {
      setLoading(true);
      getImageApi();
    } else {
      setImages(breedItems[params.urlField]);
    }
  }, [breedItems, getImageApi, params.urlField]);

  //render a image item from flatlist.
  const renderImage = itemData => {
    return (
      <View style={styles.imageOuter}>
        <FastImage // Fastimage caches the images into memory
          style={styles.image}
          source={{
            uri: itemData.item,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
    );
  };

  //method is called on pull to refresh on screen
  const onRefresh = () => {
    setRefreshLoader(true);
    dispatch(removeItem(params.urlField)); // remove the old images from store
    setRefreshLoader(false);
  };

  return (
    <View style={styles.container}>
      <ActivityLoader visible={loading} />
      <FlatList
        data={images}
        keyExtractor={item => item}
        renderItem={renderImage}
        contentContainerStyle={styles.flatlistStyle}
        onRefresh={() => onRefresh()} //pull to refresh
        refreshing={refreshLoader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundColor,
  },
  imageOuter: {
    height: 300,
    marginBottom: 10,
    marginHorizontal: 50,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  flatlistStyle: {
    marginVertical: 20,
  },
});
export default BreedImageScreen;

export const BreedImageScreenOptions = navData => {
  return {
    headerTitle: navData.route.params.screenTitle
      ? navData.route.params.screenTitle.charAt(0).toUpperCase() +
        navData.route.params.screenTitle.slice(1)
      : '',
  };
};
