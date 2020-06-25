import React , {useContext} from 'react'
import {View ,Text, StyleSheet,SafeAreaView,TouchableOpacity,Alert } from 'react-native'
import { Context } from '../context/AuthContext'

import AuthForm from '../components/AuthForm'

SigninScreen = ({navigation}) =>{
const {state , signin , clearError} = useContext(Context)

const errorAlert = () => Alert.alert(
    state.errorMessage,
    '',
    [{text: 'OK', onPress: () => clearError()}],
    { cancelable: false }
  )
  if(state.errorMessage !== '' ){errorAlert()} 

    return(<SafeAreaView style={styles.container}>
            <AuthForm 
                headerText='Trainer Pall' 
                submitButtonText='Sign In' 
                 onSubmit={({email,password}) =>signin({email,password})}
            >
            <TouchableOpacity  onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.gotoButton}>Haven't signed up yet? Sign Up.</Text>
            </TouchableOpacity>
            </AuthForm>
        </SafeAreaView>)
}

const styles = StyleSheet.create({
    container:{
        flex:0.8,
        justifyContent:'center',
        paddingHorizontal:10,
        marginTop:10
    },
    submitButton:{
        paddingTop:10,
        color:'#6E9EC9',
        fontSize:28,
        alignSelf:'center'
    },
    gotoButton:{
        marginTop:15,
        fontSize:18
    },
    headerText:{
        paddingBottom:13,
        fontWeight:'normal',
        fontSize:50
    }

})

export default SigninScreen
