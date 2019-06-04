import axios from 'axios';
axios.defaults.withCredentials = true;
import { BASE_URL } from '../constant';
 
interface IUser{
    password: string,
    username: string
}
interface IStatus{
    roi_id: number,
    status: string
}
export function signInHttp(user: IUser){
// export function signInHttp(user: any){
    return axios({
        baseURL: BASE_URL,
        data: user,
        method: 'post',
        // url: '/signIn/'
        url: '/login/'
    })
}
export function getFileList(){
    return axios({
        baseURL: BASE_URL,
        method: 'get',
        url: '/getFileList/'
    })
}
export function getPicHttp(picId: number){
    return axios({
        baseURL: BASE_URL,
        method: 'get',
        url: `/getPicLabelInfo/${picId}`
    })
}
export function getSummaryHttp(){
    return axios({
        baseURL: BASE_URL,
        method: 'get',
        url: '/getSummaryData/'
    })
}
export function setRoiStatus(status: IStatus){
    return axios({
        baseURL: BASE_URL,
        data: status,
        method: 'post',
        url: '/setLabelInfo/'
    })
}