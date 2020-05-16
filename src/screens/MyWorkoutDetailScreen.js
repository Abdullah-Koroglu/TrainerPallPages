import React , { useContext }from 'react'
import {Text , View , StyleSheet , Button, TouchableHighlight} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { TouchableOpacity } from 'react-native-gesture-handler';

MyWorkoutDetailScreen = () =>{
    return(
    <SafeAreaView forceInset={{top:'always'}}>
        <TouchableOpacity >
            <Text style={styles.sigoutButton}>MyWorkoutDetailScreen</Text>
        </TouchableOpacity>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sigoutButton:{
        paddingTop:10,
        color:'#98ceb7',
        fontSize:28,
        alignSelf:'center'
    }

})

export default MyWorkoutDetailScreen