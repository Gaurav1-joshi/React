
// Form validation
const validate = (values) => {
    const error = {};
    if (!values.Email || values.Email.trim() === '') {
      error.Email = 'Please enter email address';
    }
    if (values.Email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
      error.Email = 'Please enter a valid email address';
    }
  
    if (!values.userName || values.userName.trim() === '') {
      error.userName = 'Please enter user name';
    }
   
  
    if (!values.password || values.password.trim() === '') {
      error.password = 'Please enter password';
    }
    if (values.password) {
      if (values.password.trim().length < 8) {
        error.password = 'Please enter minimum 8 characters';
      }
    }
    
  
    if (!values.businessName || values.businessName.trim() === '') {
      error.businessName = 'Please enter business name';
    }
   
  
    return error;
  };
  
  export default validate;