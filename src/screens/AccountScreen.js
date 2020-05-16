import React , { useContext }from 'react'
import {Text , View , StyleSheet , Button, TouchableHighlight} from 'react-native'
import { SafeAreaView } from "react-navigation";

import { Context } from '../context/AuthContext'
import { TouchableOpacity } from 'react-native-gesture-handler';

AccountScreen = () =>{
    const {state , signout} = useContext(Context)
    return(<SafeAreaView forceInset={{top:'always'}}>
        <TouchableOpacity onPress={signout}>
            <Text style={styles.sigoutButton}>signout</Text>
        </TouchableOpacity>
    </SafeAreaView>)
}


const styles = StyleSheet.create({
    sigoutButton:{
        paddingTop:10,
        color:'#98ceb7',
        fontSize:28,
        alignSelf:'center'
    }

})

export default AccountScreen
