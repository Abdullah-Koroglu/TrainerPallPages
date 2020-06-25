import React , { useContext , useState }from 'react'
import {Text , View , StyleSheet , Button, TouchableOpacity , TextInput , Alert} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { CommonActions } from '@react-navigation/native';

import { Context as WorkoutContext } from '../context/WorkoutContext'

SaveWorkoutScreen = ({navigation}) =>{
    const {state:{name , datas} , createWorkout,
    fetchWorkout , changeName , reset} = useContext(WorkoutContext)
    const [activityName, setactivityName] = useState('')
    const [alertFlag , setAlertFlag] = useState(false)

    if(alertFlag===true){Alert.alert(
        '',
        'Do you want to save this activity.',
        [
          {text: 'Cancel', onPress: () => setAlertFlag(false)},
          {text: 'Submit', onPress: () =>{
                createWorkout(name , datas), 
                setAlertFlag(false),
                reset(),
                navigation.dispatch(
                    CommonActions.navigate({
                      name: 'MyWorkoutsList',
                    })
                  ),
                fetchWorkout()
                },
                style: 'cancel'},
        ],
        {   cancelable:true,
            onDismiss: () => setAlertFlag(false)}
      )}

    return(
    <SafeAreaView forceInset={{top:'always'}}>
        <Text style = {styles.header}> Save the activity </Text>
        <TextInput 
            style = {styles.input}
            placeholder='Activity Name'
            value={activityName}
            onChangeText={setactivityName}
        ></TextInput>
        <TouchableOpacity onPress={()=>
            {changeName(activityName) ,
            setAlertFlag(true)
            }}> 
            <Text style = {styles.Button} >
                Save Activity
            </Text>
        </TouchableOpacity> 
    </SafeAreaView>)
}


const styles = StyleSheet.create({
    Button:{
        paddingTop:10,
        color:'#98ceb7',
        fontSize:28,
        alignSelf:'center'
    },
    header:{
        fontSize:38,
        padding:15
    },
    input:{
        margin:10,
        marginHorizontal:20,
        fontSize:24
    }

})

export default SaveWorkoutScreen
