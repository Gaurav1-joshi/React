import { loginActionTypes } from './../constants/ApiConstants';




const initialState = {
    errorMessage:"",
    successMessage:"",
    authenticating:"",
};
let setting = (state = initialState, action) => {
    switch (action.type) {

                 case loginActionTypes.post_login.REQUEST:
         console.log("state------",state)
         
         return{
             ...state,
             authenticating :true,
         };

         case loginActionTypes.post_login.SUCCESS:
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

export default setting;