import React, {useContext, useEffect, Component, useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ToastAndroid,
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {LineChart, BarChart} from 'react-native-chart-kit'
import {Context as TempContext} from '../context/TempContext'
import {Context as WorkoutContext} from '../context/WorkoutContext'


IndexScreen = (props) => { // const instants = [];
    const _id = props.route.params._id
    const [deger, setdeger] = useState([0])
    const [deger1, setdeger1] = useState([0])
    const [label, setlabel] = useState([0])
    const [HRs, setHRs] = useState([])
    let tutmac = []
    let tutmac1 = []
    const myHRs = []
    const [clientHRs, setclientHRs] = useState([0])
    const [maxHR, setmaxHR] = useState(0)
    const [minHR, setminHR] = useState(0)
    let HR = 120;
    let rpm = 120;
    const [heartAttack, setheartAttack] = useState(false)
    const [detrain, setdetrain] = useState(false)
    const [session, setsession] = useState(1)
    const [timer, settimer] = useState(0)
    let sayac = 0;
    let time = 0;
    let maxHeartRate;
    let minHeartRate
    var interval;
    const [durations, setdurations] = useState([0])

    const {state} = useContext(TempContext)
    const {
        state: {
            recording,
            datas
        },
        stopRecording,
        startRecording,
        addInstant,
        createWorkout
    } = useContext(WorkoutContext)
    const tempDatas = state.find(t => t._id === _id)

    useEffect(() => {
        datalarial()
    }, [])

    datalarial = () => {
        for (let a of tempDatas.datas) {
            durations.push(a.instants.duration / 1000)
            tutukmax = a.instants.maxHR
            tutukmin = a.instants.minHR
            HRs.push({tutukmax, tutukmin})
            for (let i = 0; i < a.instants.duration / 1000; i++) {
                tutmac.push(a.instants.maxHR)
                tutmac1.push(a.instants.minHR)
            }
        }
        setdeger(tutmac)
        setdeger1(tutmac1)
    }

    startWorkout = () => {
        startRecording();
        time = timer
        let endofworkot = durations.lastItem
        durations.pop()

        interval = setInterval(() => {
            var instants = {
                HR,
                rpm,
                time
            }
            addInstant({
                instants: instants
            }, true)
            console.log(durations)
            if (endofworkot === time) {
                console.log("naber")
                ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
            }

            if (durations.includes(time)) {
                sayac++;
                setsession(sayac)
                setmaxHR(HRs[sayac - 1].tutukmax)
                maxHeartRate = HRs[sayac - 1].tutukmax
                setminHR(HRs[sayac - 1].tutukmin)
                minHeartRate = HRs[sayac - 1].tutukmin
            }

            maxHeartRate < HR ? setheartAttack(true) : setheartAttack(false)

            minHeartRate > HR ? setdetrain(true) : setdetrain(false)

            if (time % 10 == 0) {
                myHRs.push(HR)
                setclientHRs(myHRs)
            }
            time++;
            settimer(time)
        }, 1000);

        stopWorkout = () => {
            stopRecording()
            clearInterval(interval)
            console.log(interval)
        }
    }


    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.blogName}>Tur sayısı 1/4</Text>
                <Text style={styles.blogName}>85 RPM</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.blogName}>
                        Max H.R. : {maxHR} </Text>
                    <Feather name='heart'style={styles.tinyLogo}></Feather>
                    <Text style={styles.blogName}>
                        Min H.R. : {minHR} </Text>
                </View>
                <View>{heartAttack === true ? 
                    <Text style={styles.blogName}>
                        decrease
                    </Text> : null
                }
                    <Text style={styles.blogName}>
                        Your Heart Rate {HR} </Text>
                    {detrain === true ? 
                    <Text style={styles.blogName}>
                        increase
                    </Text> : null}
                </View>
            </View>
            {recording ? 
                <View style={styles.row}>
                <TouchableOpacity onPress={() => {stopWorkout()}}>
                    <View style={styles.cycleButton}>
                        <Feather name='pause'size={36} color='white'/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                    // createWorkout("nabüyün" , datas)
                    props.navigation.navigate('SaveWorkout')
                }>
                    <View style={styles.emptyCycleButton}>
                        <Text style={{color: '#b210ab'}}>
                            SAVE
                        </Text>
                    </View>
                </TouchableOpacity>
            </View> : <View style={styles.row}>
                <TouchableOpacity onPress={() => (startWorkout())}>
                    <View style={styles.cycleButton}>
                        <Feather name='play' size={36} color='white'
                            style={styles.playButton}/>
                    </View>
                </TouchableOpacity>
                    </View>}
            <View style={styles.row}>
                <Text style={{fontSize: 20}}></Text>
                <Text style={styles.blogName}>
                    Duration    20 : 43
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.blogName}>
                    Session : {session} </Text>
                <Text style={styles.blogName}>
                    sayac : {timer} </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    blogName: {
        paddingTop: 8,
        fontSize: 25,
        alignSelf: 'center'
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-around'
    },
    column: {
        alignItems: 'center',
        flexDirection: 'column',
        margin: 10,
        justifyContent: 'space-around'
    },
    tinyLogo: {
        fontSize: 29
    },
    cycleButton: {
        width: 78,
        height: 78,
        borderRadius: 100 / 2,
        backgroundColor: '#b210ab',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyCycleButton: {
        width: 78,
        height: 78,
        borderRadius: 100 / 2,
        borderColor: '#b210ab',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    absolute: {
        position: 'absolute',
        top: 80,
        left: -10
    },
    playButton: {
        marginLeft: 6
    }


})
export default IndexScreen
