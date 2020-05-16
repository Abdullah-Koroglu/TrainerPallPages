import React , {useContext , useEffect, Component , useState} from 'react'
import {SafeAreaView , View ,StyleSheet,Animated,Dimensions, Button} from 'react-native'
import Svg, { Path } from 'react-native-svg';
import * as shape from 'd3-shape';
import * as path from 'svg-path-properties'
import {scaleTime, scaleLinear } from 'd3-scale'
import { Context as TempContext } from "../context/TempContext";

    const height= 210;
    const {width} = Dimensions.get('window').width
export default TestScreen =(props)=>{
    const [datas , setdatas ]  =  useState([])
    datalarial = () =>{
        for(let a of tempDatas.datas){
		datas.push({  x : a.instants.maxHR , y : a.instants.duration})
              
        }
    }
    
    const d3 = {shape};
    const {state , fetchTemp} = useContext(TempContext)
    const _id = props.navigation.getParam("_id")
    const tempDatas = state.find(t=> t._id === _id)

   var line 
	const [gulu , setgulu ] = useState()

    useEffect(() => {
        fetchTemp()
datalarial()
const scaleX = scaleLinear().domain([datas[0].x,datas[2].x]).range([0,505])
const scaleY = scaleLinear().domain([datas[0].y,datas[3].y]).range([200 , 10])

line = d3.shape.line()
    .x(d => scaleX(d.x))
    .y(d => scaleY(d.y))
    .curve(d3.shape.curveBasis)(datas)
    setgulu(line)
        console.log(datas[2].x)
    }, [])

    
        return(
    <SafeAreaView>
        <View style={styles.container}>
        <Svg {...{width , height}}>
        <Path
    d={gulu}
    fill="none"
    stroke="#b210ab"
  />
  <View style={styles.cursor}></View>
        </Svg>
        <Animated.ScrollView style={StyleSheet.absoluteFill}></Animated.ScrollView>
        </View>
    </SafeAreaView>
    )}

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
    },
    container:{
        height,
        width,
        paddingTop:60
    },
    cursor:{
        height:16,
        width:16,
        borderRadius:8,
        backgroundColor:"white",
        borderWidth:2
    }
})
