import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {breedListApi} from '../../common/constants/urls';
import {colors} from '../../common/themes/Colors';
import ActivityLoader from '../../common/ui/ActivityLoader';
import {addList, selectList} from '../../state/dogSlice';
import BreedItem from './components/BreedItem';

const HomeScreen = props => {
  const [breeds, setBreeds] = useState([]);
  const dispatch = useDispatch();
  const breedLists = useSelector(selectList);
  const [loading, setLoading] = useState(true);
  const [filteredNotes, setFilteredLists] = useState([]);
  const [sortFlag, setSortFlag] = useState(true);

  //getting breeds data from api
  const getBreedsApi = useCallback(() => {
    try {
      if (!breedLists.length > 0) {
        setLoading(true);
        fetch(breedListApi)
          .then(res => res.json())
          .then(
            result => {
              setLoading(false);
              if (result) {
                setBreeds(result.message);
                setFilteredLists(result.message);
                dispatch(addList(result.message)); //adding breed lists to redux store
              }
            },
            error => {
              setLoading(false);
              console.error(error);
            },
          );
      }
    } catch (err) {
      console.error(err);
    }
  }, [breedLists.length, dispatch]);

  useEffect(() => {
    getBreedsApi();
  }, [getBreedsApi]);

  //filtering the data based on text entered
  const filterData = text => {
    if (text === '' || text.length === 0) {
      setFilteredLists(breeds);
      return;
    } else {
      //filtering the breeds object by comparing key with text entered
      const resultList = Object.fromEntries(
        Object.entries(breeds).filter(([key, value]) =>
          key.toLowerCase().match(text.toLowerCase()),
        ),
      );
      if (resultList.length === 0) {
        setFilteredLists(breeds);
      } else {
        setFilteredLists(resultList);
      }
    }
  };

  //rendering a breed items from flatlist
  const renderBreedItems = ({item}) => {
    return (
      <View style={styles.breedView}>
        <BreedItem
          name={item}
          title={item}
          color={colors.titleColor}
          left={10}
          url={item}
        />
        {breeds[item].map(val => {
          return (
            <BreedItem
              key={val}
              title={val}
              name={val}
              color={colors.subtitleColor}
              left={30}
              url={`${item}/${val}`}
            />
          );
        })}
      </View>
    );
  };

  //sorting or reversing breed items on click based on sortflag state
  const sortItems = () => {
    let sortedObject = {};
    if (sortFlag) {
      sortedObject = Object.keys(filteredNotes)
        .sort()
        .reduce(function (Obj, key) {
          Obj[key] = filteredNotes[key];
          return Obj;
        }, {});
      setSortFlag(false);
    } else {
      sortedObject = Object.keys(filteredNotes)
        .sort()
        .reverse()
        .reduce(function (Obj, key) {
          Obj[key] = filteredNotes[key];
          return Obj;
        }, {});
      setSortFlag(true);
    }
    setFilteredLists(sortedObject);
  };

  return (
    <View style={styles.container}>
      <ActivityLoader visible={loading} />
      <View style={styles.textinputOuter}>
        <TextInput
          placeholder="Filter Breeds"
          style={styles.textInput}
          onChangeText={filterData}
        />
        <TouchableOpacity onPress={sortItems}>
          <Image
            source={require('../../assets/images/sort.png')} //added a sort icon
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={Object.keys(filteredNotes)}
        keyExtractor={index => index.toString()}
        renderItem={renderBreedItems}
        contentContainerStyle={styles.flatlistStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  textinputOuter: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '95%',
    height: 50,
    borderColor: colors.borderColor,
    borderWidth: 2,
  },
  iconImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginLeft: 5,
  },
});

export default HomeScreen;

export const HomeScreenOptions = () => {
  return {
    headerTitle: 'Doggy McDogface',
  };
};
