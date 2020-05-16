import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"

const trackReducer = (state , action) =>{
    switch (action.type) {
        case 'fetch_workout':
            return action.payload
        default:
            return state;
    }
}

fetchTemp = dispatch => async() =>{
    let data
    await trackerApi
        .get('/temps')
        .then(response => (data = response))
        .catch(error => {
            console.log(error);
          });
    dispatch({type:'fetch_workout' , payload:data.data})
}
createTemp = dispatch => async (name , datas) =>{
    await trackerApi.post('/temps',{name , datas})
}

export const { Provider , Context } = createDataContext(
    trackReducer,
    { fetchTemp , createTemp } ,
    {}
)