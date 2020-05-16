import React , {useContext} from 'react'
import {Text , StyleSheet , FlatList ,TouchableOpacity } from 'react-native'
import {NavigationEvents , SafeAreaView } from 'react-navigation'

import { Context as TrackContext } from '../context/TrackContext' 

TrackListScreen = ({navigation}) =>{
    const {state , fetchTracks} = useContext(TrackContext)

        
    return(
    <SafeAreaView forceInset={{top:'always'}} >
        <NavigationEvents onWillFocus={fetchTracks} />
        <Text>TrackListScreen</Text>
         <FlatList 
            data={state}
            keyExtractor={item => item._id}
            renderItem={({item}) =>{
            return(
                <TouchableOpacity onPress={() =>navigation.navigate('TrackDetail' , {_id : item._id})}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
                )
            }}
        />
       
    </SafeAreaView>
    )
}

TrackListScreen.navigationOptions = (props) =>{
    return {
        headerShown:false
    };
};

const styles = StyleSheet.create({

})

export default TrackListScreen