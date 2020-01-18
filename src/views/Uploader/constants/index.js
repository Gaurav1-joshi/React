import{
    createRequestActionTypes
}from '../../../actions/utilAction';
import {API_URL} from '../../../actions/utilAction';

export const UPLOAD_API = `${API_URL}/api/UploadFiles`;
export const GET_FILETYPE_API = `${API_URL}/api/UploadFiles/getFileType`;

 export const uploadActionTypes ={
    upload_files:createRequestActionTypes('UPLOAD_FILES'),

 };