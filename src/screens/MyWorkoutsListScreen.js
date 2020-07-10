import React , {useContext , useEffect, Component , useState} from 'react'
import {View ,ScrollView, Text, StyleSheet,Button,FlatList , TouchableOpacity , Dimensions, RefreshControl} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {Context as WorkoutContext} from '../context/WorkoutContext'
import { CommonActions } from '@react-navigation/native';
import navigate from '../navigationRef'

MyWorkoutsListScreen = (props) =>{
    const {state , fetchWorkout , startRecording} = useContext(WorkoutContext)
    const [refreshing, setrefreshing] = useState(false)
    useEffect(() => {
        fetchWorkout();
    }, [])

    function wait(timeout){
        return new Promise(resolve=>{
            setTimeout(resolve,timeout)
        })
    }
   const onRefresh = React.useCallback(()=>{
       setrefreshing(true)

       wait(2000).then(()=>{
           setrefreshing(false);
           fetchWorkout()
       })
   }, [refreshing])

  const deneme = React.useCallback(()=>{
      startRecording()
  }
  //, console.log(state.recording) 
  , [state.recording])
return(
    <View>
        {/* <Button title={"naber"} onPress={()=>deneme()} ></Button> */}
        <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}/>
            }
        >
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
        /></ScrollView>
    </View>
    )
} 

const styles = StyleSheet.create({
    scrollView:{

    },
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default MyWorkoutsListScreen


