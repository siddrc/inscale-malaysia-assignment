import {CreateSession} from './create-session.service'
import {PollSessionResultsService} from './poll-session-results.service'
export type RequestConfig = {
    url:string,
    method:string,
    params?:any,
    headers?:any,
    formData?:any,
    body?:any
}
export type ResponseConfig = {
    payload?:any,
    status:number,
    headers:any,
    Status?:string,
}
export interface Service{
    getDataFromService(requestConfig:RequestConfig):Promise<any>
}
export const CREATE_SESSION_REQUEST_CONFIG:RequestConfig = {
    url:"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
    method:"POST",
    headers:{
        "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "608cd2896fmsh719689d925a0930p1a7030jsn89d506cd4d5b",
        "Content-Type": "application/x-www-form-urlencoded"
    }
}
export function getFlightSearchServiceURL(token:string):string{
    return `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${token}?pageIndex=0&pageSize=10&sortType=price&sortOrder=asc`
}
export function getFlightSearchServiceHeaders(){
    return {
        "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "608cd2896fmsh719689d925a0930p1a7030jsn89d506cd4d5b"
       }
}
export {CreateSession,PollSessionResultsService}