import {createSlice} from '@reduxjs/toolkit';

//reducers

//add breed images into store
const addItemReducer = (state, action) => {
  const finalItems = Object.assign({}, state.items, action.payload);
  state.items = finalItems;
};

//adding breed lists into store
const addListReducer = (state, action) => {
  state.lists = action.payload;
};

//remove a breed image from store
const removeItemReducer = (state, action) => {
  let newItems = {...state.items};
  delete newItems[action.payload];
  state.items = newItems;
};

export const dogSlice = createSlice({
  name: 'dog',
  initialState: {
    lists: [],
    items: {},
  },
  reducers: {
    addList: addListReducer,
    addItem: addItemReducer,
    removeItem: removeItemReducer,
  },
});

// Action creators are generated for each case reducer function
const {addList, addItem, removeItem} = dogSlice.actions;

//SELECTOR
const selectList = dog => dog.lists;
const selectItems = dog => dog.items;

export {addList, addItem, removeItem, selectItems, selectList};

export default dogSlice.reducer;
