import {ADD_ITEM, REMOVE_PHOTO, REMOVE_ALL} from "../actions/types";

const query = (state = [], action )=>{
console.log(action.payload)
    switch (action.type){
        case ADD_ITEM:
            return [...state, action.payload];
        case REMOVE_PHOTO:
            return [...state.filter((item, i)=> i !== action.payload)];
        case REMOVE_ALL:
            return state=[];
        default:
            return state;
    }
}

export default query;