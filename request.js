const redux = require("redux")
const axios =  require("axios")
const createStore = redux.createStore
const thunk = require("redux-thunk").default
const logger = require("redux-logger").createLogger()
const applyMiddleware = redux.applyMiddleware
const initialState = {
    posts : []
}
const success = "Request success"
const loading = "Request loading"
const error_text = "Request error"
const getRequest = () =>{
    return {
        type : loading,
        payload : loading
    }
}

const getSuccess = (array)=>{
    return {
        type : success,
        payload :array
    }
}
const getError = (error) =>{
    return {
        type : error_text,
        payload : error
    }
}
const Reducer = (state=initialState,action) =>{
    switch(action.type){
        case loading: {
            return {
                ...state,
                posts : action.payload
            }
        }break;
        case success :{
            return {
                ...state,
                posts :action.payload
            }
        }break ;
        case error_text :{
            return {
                ...state,
                posts: action.payload
            }
        }break;
        default : return state
    }
}
const fetching = (dispatch) =>{
    dispatch(getRequest())
    return (
        axios.get("http://jsonplaceholder.typicode.com/users").then((response) => {
            let filter = response?.data?.map((item) => item.name)
            dispatch(getSuccess(filter))
        }).catch((error) => getError(error.message))
    )
}
const store = createStore(Reducer, applyMiddleware(thunk,logger))
store.subscribe(() => store.getState())
store.dispatch(fetching())