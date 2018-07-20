import {combineReducers} from 'redux';
import {STORE_PATIENT_DEMPOGRAPHICS} from "../actions/actions"

const initialState = {
    demographics: null
}

function demographicsReducer(state = initialState, action){
    switch(action.type){
        case STORE_PATIENT_DEMPOGRAPHICS:
            return Object.assign({}, state, {demographics:action.demographics});
        default:
            return state;
    }
}

const Reducers = combineReducers({
    demographicsReducer
})

export default Reducers