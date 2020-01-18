import{
    createRequestActionTypes
}from '../../../../actions/utilAction';
import {API_URL} from '../../../../actions/utilAction';
export const LOGIN_API = `${API_URL}/api/authentication`;
 export const loginActionTypes ={
     post_login:createRequestActionTypes('POST_LOGIN'),
     get_login_questions:createRequestActionTypes('GET_LOGIN_QUESTIONS'),

 };