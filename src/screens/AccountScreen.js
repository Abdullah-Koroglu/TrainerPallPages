import React , { useContext }from 'react'
import {Text , View , StyleSheet , Button, TouchableHighlight} from 'react-native'
import { SafeAreaView } from "react-navigation";

import { Context } from '../context/AuthContext'
import { TouchableOpacity } from 'react-native-gesture-handler';

AccountScreen = (props) =>{
    const {state , signout} = useContext(Context)

    const navigate = () =>{
        if(state.token === null){
            props.navigation.navigate("Signin")
            console.log(state.token)
        }
    } 
    return(<View style={styles.container}>
            <SafeAreaView forceInset={{top:'always'}}>
                <TouchableOpacity onPress={()=>{signout()}}>
                    <Text style={styles.sigoutButton}>signout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>)
}




const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        justifyContent:"center",
        //alignContent:"center",
        //backgroundColor:"black",
        alignSelf:"center"
    },
    sigoutButton:{
        paddingTop:10,
        color:'#98ceb7',
        fontSize:28,
        //alignSelf:'center'
    }

})

export default AccountScreen
