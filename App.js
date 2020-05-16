import React , {useContext} from 'react'
import {TouchableOpacity} from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {NavigationContainer,DefaultTheme,DarkTheme,} from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { SimpleLineIcons , Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';


import {Provider as WorkoutProvider} from './src/context/WorkoutContext'
import {Provider as TempProvider , Context as TempContext} from './src/context/TempContext'
import {Provider as AuthProvider} from './src/context/AuthContext'

import IndexScreen from './src/screens/IndexScreen'
import TempSelectScreen from './src/screens/TempSelectScreen'
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen'
import MyWorkoutsListScreen from './src/screens/MyWorkoutsListScreen'
import MyWorkoutDetailScreen from './src/screens/MyWorkoutDetailScreen'
import CreateTempScreen from './src/screens/CreateTempScreen'
import AccountScreen from './src/screens/AccountScreen'
import SaveWorkoutScreen from './src/screens/SaveWorkoutScreen'


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const loginFlow =()=>{
  return (
  <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
      </Stack.Navigator>
      )
}

function tempFlow(props){
  return (
  <Stack.Navigator
  mode={"card"}
  screenOptions={{
    headerStyle:{
      backgroundColor:'#694fad',
    }
  }}
  >
    <Stack.Screen name="TempSelect" component={TempSelectScreen} 
    options={{
      headerTitleAlign:"center",
      headerTintColor:"white",
      headerRight:() => 
      <TouchableOpacity onPress={()=>props.navigation.navigate("CreateTemp")}>  
      <Ionicons name="md-add-circle-outline" size={30} color="#fff" style={{marginHorizontal:12}}/>
      </TouchableOpacity>
    }}/>
    <Stack.Screen name="Index" component={IndexScreen} 
    options={{
      headerTitleAlign:"center",
      headerTintColor:"white"
    }}/>
    <Stack.Screen name="CreateTemp" component={CreateTempScreen} 
    options={{
      headerTitleAlign:"center",
      headerTintColor:"white"
    }}/>
    <Stack.Screen name="SaveWorkout" component={SaveWorkoutScreen} 
    options={{
      headerTitleAlign:"center",
      headerTintColor:"white"
    }}/>
  </Stack.Navigator>
  )}

const workoutFlow =()=>{
  return (
  <Stack.Navigator 
  mode={"card"}
  screenOptions={{
    headerStyle:{
      backgroundColor:'#694fad',
    }
  }}
  > 
            <Stack.Screen name="MyWorkoutsList" component={MyWorkoutsListScreen} 
            options={{
              headerTitleAlign:"center",
              headerTintColor:"white"
            }}/>
            <Stack.Screen name="MyWorkoutDetail" component={MyWorkoutDetailScreen}
             options={{
              headerTitleAlign:"center",
              headerTintColor:"white"
            }}/>
      </Stack.Navigator>
  )}

function MyTabs() {
  return (
    <Tab.Navigator 
    initialRouteName="workoutFlow"
    activeColor="#f0edf6"
    inactiveColor="#3e2465"
    barStyle={{ backgroundColor: '#694fad' }}>
      <Tab.Screen name="workoutFlow" component={workoutFlow} options={{
          tabBarLabel: 'Bike',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bike" color={color} size={24} />
          ),
        }}/>
      <Tab.Screen name="tempFlow" component={tempFlow} options={{
          tabBarLabel: 'Burn',
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="fire" color={color} size={26} />
          ),
        }}/>
      <Tab.Screen name="Account" component={AccountScreen} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
          ),
        }}/>
    </Tab.Navigator>
  );
}



const App = function App() {
  const {token} = useContext(TempContext)
  return (
    <AppearanceProvider>
    <NavigationContainer >
      <Stack.Navigator headerMode={"none"}>
        {token !== null ? (
          <>
            <Stack.Screen name="Home" component={MyTabs}/>
          </>
        ) : (
          <Stack.Screen name="SignIn" component={loginFlow}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </AppearanceProvider>
  );
}

export default() => {
    return (
        <AuthProvider>
            <WorkoutProvider>
                <TempProvider>
                    <App  />
                </TempProvider>
            </WorkoutProvider>
        </AuthProvider>
    )
};



