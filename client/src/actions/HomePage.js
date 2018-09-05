import {ADD_ITEM, REMOVE_PHOTO} from '../actions/types';
import {REMOVE_ALL} from "./types";

export function addQuery (item){
        return{
            type: ADD_ITEM,
            payload: item
        }
}

export function removePhoto (i) {
    return {
        type: REMOVE_PHOTO,
        payload: i
    }
}

export function removeAll (items) {
    console.log(items)
    return {
        type: REMOVE_ALL,
        payload: items
    }
}