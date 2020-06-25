import React , {useState} from 'react'
import {View , StyleSheet,TouchableOpacity} from 'react-native'
import {Input , Text} from "react-native-elements"

AuthForm = ({headerText , submitButtonText , onSubmit, children}) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(<View style={styles.container}>
            <Text style={styles.headerText}>{headerText}</Text>
            <Input  
                label='Email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
            ></Input>
            <Input  
                label='Password'
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry
            ></Input>
            <TouchableOpacity  onPress={() => {console.log(email,password)
            ,onSubmit({email, password})}}>
    <Text style={styles.submitButton}>{submitButtonText}</Text>
            </TouchableOpacity>
            {children}
        </View>)
}

const styles = StyleSheet.create({
    container:{
        flex:0.8,
        justifyContent:'center',
        paddingBottom:200,
        paddingHorizontal:10,
        paddingTop:45
    },
    submitButton:{
        paddingTop:10,
        color:'#6E9EC9',
        fontSize:28,
        alignSelf:'center'
    },
    gotoButton:{
        marginTop:15,
        fontSize:18
    },
    headerText:{
        paddingBottom:13,
        fontWeight:'normal',
        fontSize:50,
        alignSelf:"center"
    }

})

export default AuthForm
