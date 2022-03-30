import * as constantGeneral from '../../constants/General';

const initialState = {
    fetching: false,
    result:[],
    error: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case constantGeneral.GENERAL_GET_DATA_SUCCESS:
            return {
                ...state,
                fetching: false,
                result:action.payload,
                error: null,
            };
        case constantGeneral.GENERAL_GET_DATA_FAIL:
            return {
                ...state,
                fetching: false,
                result:[],
                error: action.payload,
            };
        default:
            return state;
    }
}