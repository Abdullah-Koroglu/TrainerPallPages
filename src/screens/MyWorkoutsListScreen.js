import React , {useContext , useEffect, Component , useState} from 'react'
import {View , Text, StyleSheet,Button,FlatList , TouchableOpacity , Dimensions} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {Context as WorkoutContext} from '../context/WorkoutContext'

MyWorkoutsListScreen = (props) =>{
    const {state , fetchWorkout , addInstant} = useContext(WorkoutContext)
    useEffect(() => {
        fetchWorkout();
        console.log(state)
    }, [])
   
return(
    <View>
        <Button title="naber" onPress={()=>{
            addInstant("naber" , true),
            console.log(state)
        }}></Button>
        <FlatList
            data={state.list}
            keyExtractor={item => item._id}
            renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={()=>
                    props.navigation.navigate('MyWorkoutDetail' , {_id: item._id})
                    }>
                        <Text style = {{fontSize : 30}}>
                        {item.name} 
                    </Text>
                    </TouchableOpacity>
                )
            }}
        />
    </View>
    )
} 
export default MyWorkoutsListScreen


