import createDataContext from './createDataContext'
import { createContext } from 'react';
import trackerApi from "../api/tracker"
import { AsyncStorage } from 'react-native';

const authReducer = (state,action) =>{
    switch (action.type) {
        case 'add_error':
            return {...state , errorMessage:action.payload}
        case 'signin':
            return{errorMessage:'', token : action.payload} 
        case 'clear_error':
            return{errorMessage:''}
        case 'signout':
            return {token : null , errorMessage: ''}
        default:
            state;
    }
}

loginViaStored = dispatch =>{
    return async() =>{
        const token = await AsyncStorage.getItem('token')
        if(token){
            dispatch({type:'signin' , payload:token})
        }
    }
} 

signup = dispatch => async ({email, password})=>{
        try{
            const response = await trackerApi.post('/signup',{email,password})
            await AsyncStorage.setItem('token',response.data.token)
            dispatch({type:'signin' , payload:response.data.token})
        }catch(err){
            dispatch({type:'add_error' , payload:'Something went wrong  with sign up'})
            console.log(err.message)  
        
    } 
}

signin = dispatch =>{
    return async ({email, password})=>{
        try{
            const response = await trackerApi.post('/signin',{email,password})
            await AsyncStorage.setItem('token',response.data.token)
            dispatch({type:'signin' , payload:response.data.token})
            console.log(response.data.token)
        }catch(err){
            dispatch({type:'add_error' , payload:'Something went wrong with sign in'})
            console.log(err.message)  
        }
    } 
}

signout = dispatch =>{
    return async() =>{
        await AsyncStorage.removeItem('token')
        dispatch({type : 'signout' })
    }
}

clearError = dispatch =>{
    return()=>{
        dispatch({type:'clear_error'})
    }
}

export const    { Provider , Context} = createDataContext(
    authReducer,
    {signin, signup, signout,clearError  , loginViaStored},
    {token : null, errorMessage:'' }
)
