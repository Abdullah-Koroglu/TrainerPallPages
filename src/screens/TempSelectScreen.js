import React , {useContext , useEffect, Component , useState} from 'react'
import {View , Text, StyleSheet,Button,FlatList , TouchableOpacity , Dimensions} from 'react-native'
import {Context as TempContext} from '../context/TempContext'

TempSelectScreen = (props) =>{
    const {state , fetchTemp} = useContext(TempContext)
    useEffect(() => {
       fetchTemp();
    }, [])
   
return(
    <View>
        <FlatList
            data={state}
            keyExtractor={item => item._id}
            renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={()=>
                    props.navigation.navigate('Index' , {_id: item._id})
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


const styles = StyleSheet.create({
    blogName:{
        paddingTop:8,
        fontSize:25,
        alignSelf:'center'
    },
    row:{
        alignItems:'center',
        flexDirection:'row',
        margin:10,
        justifyContent:'space-around'
    },
    column:{
        alignItems:'center',
        flexDirection:'column',
        margin:10,
        justifyContent:'space-around'
    },
    tinyLogo:{
        fontSize:29
    },
    cycleButton:{
        width: 78,
        height: 78,
        borderRadius: 100/2,
        backgroundColor: '#b210ab',
        alignItems:'center',
        justifyContent:'center'
    },
    emptyCycleButton:{
        width: 78,
        height: 78,
        borderRadius: 100/2,
        borderColor: '#b210ab',
        borderWidth:2,
        alignItems:'center',
        justifyContent:'center'
    }



})
export default TempSelectScreen
