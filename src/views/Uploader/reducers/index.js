import { uploadActionTypes } from '../constants';
const initialState = {
    errorMessage:"",
    successMessage:"",
    authenticating:"",
};
let uploadReducers = (state = initialState, action) => {
    switch (action.type) {

         case uploadActionTypes.upload_files.REQUEST:
         
         return{
             ...state,
             authenticating :true,
         };

         case uploadActionTypes.upload_files.SUCCESS:
         return{
             
             ...state,
             authenticating: false,
             successMessage: "Logged in successfully",
             login: action.payload
            //  login: payload
         };

       
        default:
            return state;
    }
};

export default uploadReducers;