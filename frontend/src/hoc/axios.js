import axios from 'axios'
import ModalDialogs from "../components/ModalDialogs/ModalDialogs";

const [errorModalDialogs] = ModalDialogs(['error']);

const instance = axios.create({
    baseURL: 'https://ltud-csdl-football-league.firebaseio.com/',
})

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.interceptors.request.use(request => {
    console.log('axios.interceptors____request____', request)

    //Edit request config
    return request
}, (error) => {
    console.log('axios.interceptors____request____error__', error)
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    console.log('axios.interceptors____response____', response)

    //Edit response config
    return response
}, (error) => {
    errorModalDialogs.show({
        title: 'Error',
        content: error.message,
        okText: 'See detail',
        error: error
    });
    console.log('axios.interceptors____response____error__', error)
    return Promise.reject(error)
})

export default instance