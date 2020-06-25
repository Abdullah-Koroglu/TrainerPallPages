import React , {useContext , useEffect} from 'react'
import {Context as authContext} from '../context/AuthContext'
import { Text,View , StyleSheet,TouchableOpacity , Alert , ActivityIndicator , SafeAreaView}  from 'react-native'

import AuthForm from '../components/AuthForm'

SignupScreen = ({navigation}) =>{
    const {state,signup , clearError } = useContext(authContext)
    

    const errorAlert = () => Alert.alert(
        state.errorMessage,
        '',
        [{text: 'OK', onPress: () => clearError()}],
        { cancelable: false }
      )
      if(state.errorMessage !== '' ){errorAlert()}

        useEffect(() => {
            // loginViaStored()
        }, [])
        
        return(<SafeAreaView style={styles.container}>
            <AuthForm 
                headerText='Trainer Pall' 
                submitButtonText='Sign Up' 
                 onSubmit={signup}
            ><TouchableOpacity  onPress={() => navigation.navigate('Signin')}>
                <Text style={styles.gotoButton}>Already have an account? Sign in.</Text>
            </TouchableOpacity>
            </AuthForm>
        </SafeAreaView>)
}

const styles = StyleSheet.create({
    container:{
        flex:0.8,
        justifyContent:'center',
        paddingHorizontal:10,
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

export default SignupScreen
