import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"

const trackReducer = (state , action) =>{
    switch (action.type) {
        case 'add_curret_instant':
            return {...state , currentInstant:action.payload}
        case 'fetch_workout':
            return {...state , list:action.payload}
        case 'start_recording':
            return {...state , recording: true}
        case 'stop_recording':
            return {...state , recording: false}
        case 'change_name':
            return{...state , name:action.payload}
        case 'add_instant':
        return{...state , datas : [...state.datas , action.payload]}
        case 'reset':
            return {...state , name:'' , datas:[]}
        default:
            return state;
    }
}
fetchWorkout = dispatch => async() =>{
    let data
    await trackerApi
        .get('/workouts')
        .then(response => (data = response))
        .catch(error => {
            console.log(error);
          });
    dispatch({type:'fetch_workout' , payload:data.data})
}
createWorkout = dispatch => async (name , datas) =>{
    await trackerApi.post('/workouts',{name , datas})
    console.log("createWorkout")
}
startRecording =  dispatch => () =>{
    dispatch({type:'start_recording'});
} 
stopRecording =  dispatch => () =>{
    dispatch({type:'stop_recording'});
} 
changeName = dispatch => (name) =>{
    dispatch({type:'change_name' , payload:name})
} 
addInstant = dispatch => (instants , recording) =>{
    dispatch({type:'add_curret_instant' , payload:instants})
    if(recording){
        dispatch({type:'add_instant' , payload:instants})
    }
}
reset = dispatch =>()=>{
    dispatch({type:'reset'})
}

export const { Provider , Context } = createDataContext(
    trackReducer,
    { fetchWorkout , createWorkout , startRecording , changeName , addInstant , stopRecording} ,
    {recording : false , datas : [] , currentInstant : null ,  name : ""  , list: []}
)