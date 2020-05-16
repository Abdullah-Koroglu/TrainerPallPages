import React from 'react'
import {Text , View , StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-navigation'

TrackDetailScreen = ({navigation}) =>{
    const _id = navigation.getParam('_id')
    return(<SafeAreaView forceInset={{top:'always'}} >
                <Text>{_id}</Text>
    </SafeAreaView>)
}

TrackDetailScreen.navigationOptions = (props) =>{
    return {
        headerShown:false
    };
};

const styles = StyleSheet.create({

})

export default TrackDetailScreen