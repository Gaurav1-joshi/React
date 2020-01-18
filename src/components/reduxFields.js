/**
 * @desc: Generic components for the inputs.
 */
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from 'material-ui/DatePicker';
// import MaterialSelectField from 'material-ui-selectfield';
import React from 'react';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';

export const renderToggleButton = ({
  input,
  name,
  label,
  fullWidth,
  defaultToggled,
  className,
  toggled,
  meta: { touched, error },
  onChange,
  thumbStyle,
  trackStyle,
  thumbSwitchedStyle,
  trackSwitchedStyle,
}) => {
  return (
    <Toggle
      name={name}
      label={label}
      className={className}
      thumbStyle={thumbStyle}
      trackStyle={trackStyle}
      thumbSwitchedStyle={thumbSwitchedStyle}
      trackSwitchedStyle={trackSwitchedStyle}
      defaultToggled={defaultToggled}
      toggled = {toggled}
      onToggle={(value) => input.onChange(value)}
      labelPosition="right"
    />
  );
};


export const renderTextField = ({
  input,
  label,
  id,
  multiLine,
  rowsMax,
  fullWidth,
  disabled,
  hintText,
  defaultValue,
  onChange,
  maxLength,
  loader,
  meta: { touched, error },
  customError,
  autoFocus,
  floatingLabelFixed,
  ...custom
}) => {
  return (
    <TextField
      id = {id}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
      floatingLabelText={label}
      floatingLabelFixed = {floatingLabelFixed}
      errorText={touched && (error || customError) }
      multiLine={multiLine}
      hintText = {hintText}
      rowsMax={rowsMax}
      disabled={disabled}
      fullWidth={true}
      className="valuefont"
      autoComplete='new-type'
      onChange={(event) => onChange}
      maxLength = {maxLength}
      floatingLabelStyle={{ top: '30px', color: '#7a7a7a' }}
      floatingLabelFocusStyle={{ color: '#01B9C1' }}
      style={{ height: '62px ' }}
      inputStyle={{ marginTop: '10px' }}
      {...input}
      {...custom}
    />

  );
};
// New Generic autocomplete with materialUI
// export const renderAutocompleteMUI = ({
//   input,
//   label,
//   name,
//   value,
//   disabled,
//   fullWidth,
//   hintText,
//   defaultValue,
//   onChange,
//   maxLength,
//   searchTextValue,
//   dataSource,
//   handleUpdateInput,
//   handleFilter,
//   onNewRequest,
//   floatingLabelFixed,
//   meta: { touched, error },
//   ...custom
// }) => {
//   return (
//     <AutoComplete
//       searchText={searchTextValue || ''}
//       floatingLabelText={label}
//       dataSource={dataSource || []}
//       filter={(searchText, key) => searchText !== '' && (key || '').toLowerCase().indexOf((searchText).toLowerCase()) !== -1}
//       onUpdateInput={handleUpdateInput}
//       maxSearchResults={3}
//       fullWidth={true}
//       onNewRequest={onNewRequest}
//       className="autocom-field"
//       floatingLabelStyle={{ top: '30px', color: '#7a7a7a' }}
//       floatingLabelFocusStyle={{ color: '#01B9C1' }}
//       inputStyle={{ marginTop: '10px' }}
//       {...input}
//       {...custom}
//     />
//   );
// };
export const renderTextArea = ({
  input,
  label,
  fullWidth,
  disabled,
  autoHeight,
  rows,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      floatingLabelText={label}
      errorText={touched && error}
      multiLine={true}
      rows={rows || 3}
      rowsMax={autoHeight ? null : 3}
      disabled={disabled}
      fullWidth={true}
      className="valuefont"
      autoComplete='new-type'
      floatingLabelFocusStyle={{ color: '#01B9C1' }}
      floatingLabelStyle={{ color: '#7a7a7a' }}
      {...input}
      {...custom} />
  );
};

const stylesRadio = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const renderRadioOptions = (options) => {
  //   // .log('options---', options);
  return options.map(function(obj, index) {
    return <RadioButton
      key={index}
      value={obj.id}
      disabled={obj.disabled ? true : false}
      label={obj.value}
      style={stylesRadio.radioButton}/>;
  });

};

export const renderRadioButtons = ({
  input,
  name,
  label,
  options,
  onChange,
  disabled,
  meta: { touched, error },
  children,
  selectedValue,
  ...custom
}) => {
  return (
    <RadioButtonGroup name={name ? name : ''}onChange={(event, value) => onChange}defaultSelected={selectedValue} {...input}>
      {renderRadioOptions(options, disabled)}
    </RadioButtonGroup>
  );
};

export const renderRadioButtonsForPrograms = ({
  input,
  name,
  label,
  options,
  onChange,
  meta: { touched, error },
  children,
  selectedValue,
  disabledValues,
  disabled,
  ...custom
}) => {
  //   // .log('disabledValues ----', disabledValues);
  return (

    <RadioButtonGroup name={name ? name : ''}onChange={(event, value) => onChange} valueSelected={selectedValue} {...input} disabled = {disabled}>
      {renderRadioOptions(options)}
    </RadioButtonGroup>
  );
};
export const renderRadioButton = ({
  input,
  name,
  value,
  label,
  checked,
  className,
  meta: { touched, error, warning },
}) => {
  return (
    <RadioButton {...input}
      name={name}
      value={value}
      label={label}
      className={className}
      checked={input.value ? true : false}
      onCheck={input.onChange}
      style={stylesRadio.radioButton}/>
  );
};

const stylesCheckbox = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};
export const renderCheckBox = ({ input, defaultChecked, value, name, label, checked, onChange, className, disabled }) => {
  return <Checkbox {...input}
    name={input.name}
    id={input.name}
    type="checkbox"
    // value={input.name}
    defaultChecked= {defaultChecked}
    className={className ? className : 'custm_check'}
    label={label}
    checked={input.value || checked ? true : false}
    onCheck={(event, value) => input.onChange(event, value)}
    style={stylesCheckbox.checkbox}
    disabled={disabled ? disabled : false}
  />;
};
export const renderCheckBoxes = ({ input, onChange, className, options }) => {
  return <span>{options.length > 0 ? options.map(function(obj) {
    return <Checkbox {...input}
      key={obj.id}
      name={obj.id}
      type="checkbox"
      className={className ? className : 'custm_check'}
      label={obj.value}
      checked={input.value ? true : false}
      onCheck={input.onChange}
      style={stylesCheckbox.checkbox}/>;
  }) : ''}</span>;
};


// Single Select No Async.
// export const renderAutoCompleteSingleSelect = ({
//   input,
//   label,
//   value,
//   meta: { touched, error },
//   handleUpdateInput,
//   handleNewRequest,
//   options,
//   hintText,
//   disabled,
//   floatingLabelFixed,
//   openOnFocus, customError,
//   ...custom
// }) => {

//   let sourceArr = [];
//   if (options && options.length) {
//     options.map((obj) => {
//       sourceArr[obj.id] = obj.value;
//       return sourceArr;
//     });
//   }

//   let optionsList = [];
//   if (options && options.length) {

//     if (label === 'Default Location') {
//       optionsList = options.map(({ id, locationName }) => (
//         <div key={id} value={id} label={locationName}>
//           {locationName}
//         </div>
//       ));

//     } else {
//       optionsList = options.map(({ id, value }) => (
//         <div key={id} value={id} label={value}>
//           {value}
//         </div>
//       ));
//     }
//   }
//   let selectedObj = null;
//   if (typeof input === 'object') {
//     if (options && options.length) {
//       if (label === 'Discipline' && options.length === 1) {
//         selectedObj = { 'value': '', 'label': '' };
//         selectedObj['value'] = options[0].id;
//         selectedObj['label'] = options[0].value;
//       } else {
//         options.map((i) => {
//           if (i.id === input.value) {
//             selectedObj = { 'value': '', 'label': '' };
//             selectedObj['value'] = i.id;
//             selectedObj['label'] = label === 'Default Location' ? i.locationName.slice(0) : i.value;
//           }
//           return selectedObj;
//         });
//       }
//     }
//   }
// //   const changeSelectedObj = (selectedValue) => {
// //     if (selectedValue === null) { //  Remove selection
// //       selectedObj = { 'value': null, 'label': '' };
// //       handleNewRequest(input, selectedObj);
// //     } else { // Apply Selection
// //       selectedObj = selectedValue ;
// //       handleNewRequest(input, selectedValue);
// //     }
// //   };

// //   return (
// //     <MaterialSelectField
// //       disabled={disabled ? disabled : false}
// //       showAutocompleteThreshold={1}
// //       errorText={touched && (error || customError)}
// //       floatingLabel={label}
// //       floatingLabelFixed={floatingLabelFixed || disabled}
// //       hintText = {hintText}
// //       value={selectedObj}
// //       nb2show={7}
// //       openOnFocus = {openOnFocus}
// //       autocompleteUnderlineFocusStyle={{ display: 'none' }}
// //       anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
// //       required={true}
// //       onChange={(e) => changeSelectedObj(e)}
// //       hoverColor='rgba(3, 169, 244, 0.15)'
// //       floatingLabelStyle={{ top: '-5px', color: '#7a7a7a' }}
// //       floatingLabelFocusStyle={{ color: '#01B9C1' }}
// //       inputStyle={{ marginTop: '10px' }}
// //     >
// //       {optionsList}
// //     </MaterialSelectField>
// //   );
// };
// export const renderAutoCompleteSingleSelectLoc = ({
//   input,
//   label,
//   value,
//   meta: { touched, error },
//   handleUpdateInput,
//   handleNewRequest,
//   options,
//   hintText,
//   disabled,
//   openOnFocus, customError,
//   ...custom
// }) => {

//   let sourceArr = [];
//   if (options && options.length) {
//     options.map((obj) => {
//       sourceArr[obj.id] = obj.value;
//       return sourceArr;
//     });
//   }

//   let optionsList = [];
//   if (options && options.length) {

//     if (label === 'Default Location') {
//       optionsList = options.map(({ id, locationName }) => (
//         <div key={id} value={id} label={locationName}>
//           {locationName}
//         </div>
//       ));

//     } else {
//       optionsList = options.map(({ id, value }) => (
//         <div key={id} value={id} label={value}>
//           {value}
//         </div>
//       ));
//     }
//   }
//   let selectedObj = null;
//   if (typeof input === 'object') {
//     if (options && options.length) {
//       if (label === 'Discipline' && options.length === 1) {
//         selectedObj = { 'value': '', 'label': '' };
//         selectedObj['value'] = options[0].id;
//         selectedObj['label'] = options[0].value;
//       } else {
//         options.map((i) => {
//           if (i.id === input.value) {
//             selectedObj = { 'value': '', 'label': '' };
//             selectedObj['value'] = i.id;
//             selectedObj['label'] = label === 'Default Location' ? i.locationName.slice(0) : i.value;
//           }
//           return selectedObj;
//         });
//       }
//     }
//   }
//   const changeSelectedObj = (selectedValue) => {
//     if (selectedValue === null) { //  Remove selection
//       selectedObj = { 'value': '', 'label': '' };
//       handleNewRequest(input, selectedObj);
//     } else { // Apply Selection
//       selectedObj = selectedValue ;
//       handleNewRequest(input, selectedValue);
//     }
//   };

//   return (
//     <MaterialSelectField
//       disabled={disabled ? disabled : false}
//       showAutocompleteThreshold={1}
//       errorText={touched && (error || customError)}
//       floatingLabel={label}
//       hintText = {hintText}
//       value={selectedObj}
//       nb2show={7}
//       openOnFocus = {openOnFocus}
//       autocompleteUnderlineFocusStyle={{ display: 'none' }}
//       anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//       required={true}
//       onChange={(e) => changeSelectedObj(e)}
//       hoverColor='rgba(3, 169, 244, 0.15)'
//       floatingLabelStyle={{ top: '-5px', color: '#7a7a7a' }}
//       floatingLabelFocusStyle={{ color: '#01B9C1' }}
//       inputStyle={{ marginTop: '10px' }}
//     >
//       {optionsList}
//     </MaterialSelectField>
//   );
// };
// export const renderAutoCompleteSingleSelectForCustomFields = ({
//   input,
//   label,
//   value,
//   meta: { touched, error },
//   handleUpdateInput,
//   handleNewRequest,
//   options,
//   name,
//   hintText,
//   disabled,
//   openOnFocus, customError,
//   ...custom
// }) => {
//   let optionsList = [];
//   if (options && options.length) {

//     optionsList = options.map(({ value, label }) => (
//       <div key={value} value={value} label={label}>
//         {label}
//       </div>
//     ));

//   }
//   let selectedObj = null;
//   if (typeof input === 'object') {
//     if (options && options.length) {
//       options.map((i) => {
//         if (i.value === input.value) {
//           selectedObj = { 'value': '', 'label': '' };
//           selectedObj['value'] = i.value;
//           selectedObj['label'] = i.label;
//         }
//         return selectedObj;
//       });

//     }
//   }
//   const changeSelectedObj = (selectedValue) => {
//     if (selectedValue === null) { //  Remove selection
//       selectedObj = { 'value': '', 'label': '' };
//       handleNewRequest(input, selectedObj);
//     } else { // Apply Selection
//       selectedObj = selectedValue ;
//       handleNewRequest(input, selectedValue);
//     }
//   };

//   return (
//     <MaterialSelectField
//       disabled={disabled ? disabled : false}
//       showAutocompleteThreshold={1}
//       errorText={touched && (error || customError)}
//       floatingLabel={label}
//       hintText = {hintText}
//       value={selectedObj}
//       nb2show={7}
//       name = {name}
//       openOnFocus = {openOnFocus}
//       autocompleteUnderlineFocusStyle={{ display: 'none' }}
//       anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//       required={true}
//       onChange={(e) => changeSelectedObj(e)}
//       hoverColor='rgba(3, 169, 244, 0.15)'
//       floatingLabelStyle={{ top: '-5px', color: '#7a7a7a' }}
//       floatingLabelFocusStyle={{ color: '#01B9C1' }}
//       inputStyle={{ marginTop: '10px' }}
//     >
//       {optionsList}
//     </MaterialSelectField>
//   );
// };


// Single Autocomplete Select Asynchronous (searching...).
// export const renderAutoCompleteSingleSelectAsync = ({
//   input,
//   label,
//   value,
//   meta: { touched, error },
//   handleUpdateInput,
//   handleNewRequest,
//   options,
//   disabled,
//   ...custom
// }) => {

//   let optionsList = [];
//   if (options && options.length) {
//     optionsList = options.map(({ id, value }) => (
//       <div key={id} value={id} label={value}>
//         {value}
//       </div>
//     ));
//   }

//   let selectedObj = null;
//   if (typeof input === 'object') {
//     if (options && options.length) {
//       options.map((i) => {
//         if (i.id === input.value) {
//           selectedObj = { 'value': '', 'label': '' };
//           selectedObj['value'] = i.id;
//           selectedObj['label'] = i.value;
//         }
//         return selectedObj;
//       });
//     }
//   }

//   const changeSelectedObj = (selectedValue) => {
//     if (selectedValue === null) { //  Remove selection
//       selectedObj = { 'value': '', 'label': '' };
//       handleNewRequest(input, selectedObj);
//     } else { // Apply Selection
//       selectedObj = selectedValue ;
//       handleNewRequest(input, selectedValue);
//     }
//   };

//   const makeApicall = (searchText) => {
//     handleUpdateInput(searchText, selectedObj);
//   };

//   return (
//     <MaterialSelectField
//       disabled={disabled ? disabled : false}
//       showAutocompleteThreshold={0}
//       errorText={touched && error}
//       floatingLabel={label}
//       floatingLabelStyle={{ color: 'rgb(122, 122, 122)' }}
//       value={selectedObj}
//       nb2show={7}
//       onAutoCompleteTyping={makeApicall}
//       anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//       required={true}
//       onChange={(e) => changeSelectedObj(e)}
//       hoverColor='rgba(3, 169, 244, 0.15)'
//     >
//       {optionsList}
//     </MaterialSelectField>
//   );
// };

// Single Select Location for header No Async
// export const renderAutoCompleteSingleSelectHeader = ({
//   input,
//   label,
//   value,
//   meta: { touched, error },
//   handleUpdateInput,
//   handleNewRequest,
//   options,
//   disabled,
//   ...custom
// }) => {
//   let sourceArr = [];
//   if (options && options.length) {
//     options.map((obj) => {
//       sourceArr[obj.id] = obj.value;
//       return sourceArr;
//     });
//   }

//   let optionsList;
//   if (options && options.length) {
//     if (label === 'Location') {
//       optionsList = options.map(({ id, locationName }) => (
//         <div key={id} value={id} label={locationName}>
//           {locationName}
//         </div>
//       ));
//     } else {
//       optionsList = options.map(({ id, value }) => (
//         <div key={id} value={id} label={value}>
//           {value}
//         </div>
//       ));
//     }
//   }
//   let selectedObj = { value: '', label: '' };
//   if (typeof input === 'object') {
//     if (options && options.length) {
//       options.map((i) => {
//         if (i.id === input.value) {
//           selectedObj['value'] = i.id;
//           selectedObj['label'] = label === 'Location' ? i.locationName : i.value;
//         }
//         return selectedObj;
//       });
//     }
//   }
//   const changeSelectedObj = (selectedValue) => {
//     if (!selectedValue) {
//       selectedValue = selectedObj;
//       handleNewRequest(input, selectedValue);
//     } else {
//       selectedObj = selectedValue;
//       handleNewRequest(input, selectedValue);
//     }
//   };
//   return (
//     <MaterialSelectField
//       disabled={disabled ? disabled : false}
//       showAutocompleteThreshold={1}
//       errorText={touched && error}
//       hintText={label}
//       nb2show={4}
//       value={selectedObj}
//       autocompleteUnderlineFocusStyle={{ display: 'none' }}
//       floatingLabelStyle={{ color: '#7a7a7a' }}
//       floatingLabelFocusStyle={{ color: '#01B9C1' }}
//       anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//       required={true}
//       onChange={(e) => changeSelectedObj(e)}
//       hoverColor='rgba(3, 169, 244, 0.15)'
//       menuCloseButton={<FlatButton label='close' />}
//     >
//       {optionsList}
//     </MaterialSelectField>
//   );
// };
// export const renderAutoCompleteSingleSelectLocation = ({
//   input,
//   label,
//   value,
//   meta: { touched, error },
//   handleUpdateInput,
//   openOnFocus,
//   handleNewRequest,
//   options,
//   disabled,
//   ...custom
// }) => {
//   let sourceArr = [];
//   if (options && options.length) {
//     options.map((obj) => {
//       sourceArr[obj.id] = obj.value;
//       return sourceArr;
//     });
//   }

//   let optionsList;
//   if (label === 'Location' || label === 'Office Location') {
//     optionsList = options && options.length ? options.map(({ id, locationName }) => (
//       <div key={id} value={id} label={locationName}>
//         {locationName}
//       </div>
//     )) : '';
//   } else {
//     optionsList = options && options.length ? options.map(({ id, value }) => (
//       <div key={id} value={id} label={value}>
//         {value}
//       </div>
//     )) : '';
//   }
//   let selectedObj = null;
//   if (typeof input === 'object') {
//     if (options && options.length) {
//       options.map((i) => {
//         if (i.id === input.value) {
//           selectedObj = { 'value': '', 'label': '' };
//           selectedObj['value'] = i.id;
//           selectedObj['label'] = label === 'Location' || label === 'Office Location' ? i.locationName : i.value;
//         }
//         return selectedObj;
//       });
//     }
//   }
//   const changeSelectedObj = (selectedValue) => {
//     if (!selectedValue) {
//       selectedValue = selectedObj;
//       handleNewRequest(input, selectedValue);
//     } else {
//       selectedObj = selectedValue;
//       handleNewRequest(input, selectedValue);
//     }
//   };
//   return (
//     <MaterialSelectField
//       disabled={disabled ? disabled : false}
//       showAutocompleteThreshold={1}
//       errorText={touched && error}
//       floatingLabel={label}
//       // hintText = {hintText}
//       floatingLabelStyle={{ color: 'rgb(122, 122, 122)' }}
//       value={selectedObj}
//       nb2show={4}
//       openOnFocus = {openOnFocus}
//       autocompleteUnderlineFocusStyle={{ display: 'none' }}
//       anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//       required={true}
//       onChange={(e) => changeSelectedObj(e)}
//       hoverColor='rgba(3, 169, 244, 0.15)'
//     >
//       {optionsList}
//     </MaterialSelectField>
//   );
// };


// // render MultiSelection Fields for multiple items ...
// export const renderAutoCompleteMultipleSelection = ({
//   input,
//   label,
//   meta: { touched, error },
//   handleUpdateInput,
//   handleNewRequest,
//   options,
//   className,
//   disabled,
//   customError,
//   ...custom
// }) => {

//   let optionsList = [];
//   let defaultSelected = [];


//   if (options && options.length) {
//     if (label === 'Location') {
//       optionsList = options.map(({ id, locationName }) => {
//         if (input.value.length) {
//           input.value.map((selected) => {
//             if (selected === id) {
//               defaultSelected.push({
//                 label: locationName,
//                 value: id,
//               });
//             }
//             return defaultSelected;
//           });
//         }
//         return (<div key={id} value={id} label={locationName}>
//           {locationName}
//         </div>
//         );
//       });
//     } else {
//       optionsList = options.map(({ id, value }) => {
//         if (input.value.length) {
//           input.value.map((selected) => {
//             if (selected === id) {
//               defaultSelected.push({
//                 label: value,
//                 value: id,
//               });
//             }
//             return defaultSelected;
//           });
//         }
//         return (
//           <div key={id} value={id} label={value}>
//             {value}
//           </div>
//         );
//       });
//     }
//   }

//   // let selectedArr = [];

//   const handleOnChange = (selectedValue, name, val) => {
//     let selectedData = [];
//     let values = [];
//     selectedValue.map((allValues, i) => {
//       values.push(allValues.value);
//       return values;
//     });
//     options.filter((op) => {
//       selectedValue.map((selected) => {
//         if (selected.value === op.id) {
//           selectedData.push(op);
//         }
//         return selectedData;
//       });
//       return selectedData;
//     });
//     handleNewRequest ? handleNewRequest(input, values, '', label, selectedData) : input.onChange(values);
//   };

//   const handleCustomDisplaySelections = (items) => {
//     return (
//       <div>
//         <div>
//           {items.length ?
//           items.length === 1 ?
//             displayCommaSeperatedList(items) :
//             items.length === options.length ?
//               <div> All Selected</div> :
//               <div> {items.length} {label} Selected </div>
//             :
//             <div>Select {label}</div>
//           }
//         </div>
//       </div>
//     );
//   };

//   const makeApicall = (searchData) => {
//     // handleNewRequest(input, defaultSelected, searchData, label);
//   };
//   return (
//     <MaterialSelectField
//       showAutocompleteThreshold={1}
//       disabled={disabled ? disabled : false}
//       floatingLabel={label}
//       multiple={true}
//       checkPosition="left"
//       errorText={touched && (error || customError)}
//       value={defaultSelected}
//       autocompleteUnderlineFocusStyle={{ display: 'none' }}
//       onAutoCompleteTyping={makeApicall}
//       nb2show={7}
//       floatingLabelStyle={{ color: 'rgb(122, 122, 122)' }}
//       onChange={(selected, name, val) => handleOnChange(selected, name, val)}
//       required={true}
//       selectionsRenderer={handleCustomDisplaySelections}
//       menuCloseButton={<FlatButton label='close' />}
//     >
//       {optionsList}
//     </MaterialSelectField>
//   );
// };



// Scheduling MultiSelection Fields
// export const renderAutoCompleteScheduling = ({
//   input,
//   label,
//   value,
//   meta: { touched, error },
//   handleUpdateInput,
//   handleNewRequest,
//   options,
//   className,
//   disabled,
//   selected,
//   selectedTab,
//   ...custom
//   }) => {
  // let sourceArr = [];
  // if (options && options.length) {
  // options.map((obj) => {
  // sourceArr[obj.id] = obj.value;
  // return sourceArr;
  // });
  // }
//   let optionsList = [];
//   let defaultSelected = [];
//   if (options && options.length) {
//     optionsList = options.map(({ id, value }) => {
//       (input.value || []).map((selected) => {
//         if (selected === id) {
//           defaultSelected.push({
//             label: value,
//             value: id,
//           });
//         }
//         return defaultSelected;
//       });
//       return (<div key={id} value={id} label={value}>
//   {value}
//   </div>);
//     });
//   }
//   const handleOnChange = (selectedValue, name, val) => {
//     let selectedPatientData = [];
//     let values = [];
//     selectedValue.map((allValues, i) => {
//       values.push(allValues.value);
//       return values;
//     });
//     options.filter((op) => {
//       selectedValue.map((selected) => {
//         if (selected.value === op.id) {
//           selectedPatientData.push(op);
//         }
//         return selectedPatientData;
//       });
//       return selectedPatientData;
//     });
//     handleNewRequest(input, values, null, label, selectedPatientData);
//   };
  
  
//   const handleCustomDisplaySelections = (items) => {
//     return (
//       <div>
//         <div>
//           {items.length ?
//           items.length === 1 ?
//             displayCommaSeperatedList(items) :
//             items.length === options.length ?
//               <div> All Selected</div> :
//               <div> {items.length} {label} Selected </div>
//             :
//             <div>Select {label}</div>
//           }
//         </div>
//       </div>
//     );
//   };
  
//   return (
//   <MaterialSelectField
//   showAutocompleteThreshold={1}
//   disabled={disabled ? disabled : false}
//   hintText=''
//   multiple={true}
//   checkPosition="left"
//   errorText={touched && error}
//   value={defaultSelected}
//   // elementHeight={(label === 'Location') ? 60 : 40}
//   autocompleteUnderlineFocusStyle={{ display: 'none' }}
//   // onAutoCompleteTyping={makeApicall}
//   nb2show={7}
//   onChange={(selected, name, val) => handleOnChange(selected, name, val)}
//   required={true}
//   selectionsRenderer={handleCustomDisplaySelections}
//   menuCloseButton={<i className="material-icons selectclose">cancel</i>}
//   >
//   {optionsList}
//   </MaterialSelectField>
//   );
//};

// export const renderAutoCompleteMultiSelect = ({ //  Only MultiSelect No Async.
//   input,
//   label,
//   value,
//   meta: { touched, error },
//   handleUpdateInput,
//   handleNewRequest,
//   options,
//   className,
//   disabled,
//   ...custom
// }) => {
//   let sourceArr = [];
//   if (options && options.length) {
//     options.map((obj) => {
//       sourceArr[obj.id] = obj.value;
//       return sourceArr;
//     });
//   }

//   let optionsList = [];

//   if (options && options.length) {
//     if (label === 'Location') {
//       optionsList = options.map(({ id, address }) => (
//         <div key={id} value={id} label={address}>
//           {address}
//         </div>
//       ));
//     } else {
//       optionsList = options.map(({ id, value }) => (
//         <div key={id} value={id} label={value}>
//           {value}
//         </div>
//       ));
//     }
//   }

//   var selectedArr = [];
//   const handleOnChange = (selectedValue, name, val) => {
//     let selectedPatientData = [];
//     let values = [];
//     selectedValue.map((allValues, i) => {
//       values.push(allValues.value);
//       return values;
//     });
//     options.filter((op) => {
//       selectedValue.find((selected) => {
//         if (selected.value === op.id) {
//           selectedPatientData.push(op);
//         }
//         return selectedPatientData;
//       });
//       return selectedPatientData;
//     });
//     handleNewRequest(input, values, null, label, selectedPatientData);
//   };

//   const makeApicall = (searchData) => {
//     let values = [];
//     if (selectedArr.length) {
//       selectedArr.map((allValues, i) => {
//         values.push(allValues.value);
//         return values;
//       });
//     }
//     handleNewRequest(input, selectedArr, searchData, label);
//   };
//   return (
//     <MaterialSelectField
//       showAutocompleteThreshold={1}
//       hintText=''
//       multiple={true}
//       checkPosition="left"
//       errorText={touched && error}
//       floatingLabel={label}
//       autocompleteUnderlineFocusStyle={{ display: 'none' }}
//       value={selectedArr}
//       children={selectedArr}
//       onAutoCompleteTyping={makeApicall}
//       nb2show={7}
//       onChange={(selected, name, val) => handleOnChange(selected, name, val)}
//       required={true}
//       floatingLabelStyle={{ color: '#7a7a7a' }}
//       floatingLabelFocusStyle={{ color: '#01B9C1' }}
//     >
//       {optionsList}
//     </MaterialSelectField>
//   );
// };

export const renderDateField = ({ input, disabled, minDate, openToYearSelection, maxDate, showYearFlag, locale, label, onDateChange, selected, classes, placeholder, minDateVal, maxDateVal, showMonthFlag, meta: { touched, error, warning }, shouldDisableDate }) => {
  return (

    <DatePicker
      floatingLabelText={placeholder}
      container="inline"
      locale={locale ? locale : 'en-US'}
      disabled={disabled}
      autoComplete={'off'}
      fullWidth={true}
      minDate={minDate ? minDate : new Date(1900, 1, 1)}
      maxDate={maxDate ? maxDate : new Date(2120, 9, 11)}
      errorText={touched && error}
      {...input}
      shouldDisableDate = {shouldDisableDate}
      value={selected ? new Date(selected) : {}}
      autoOk={true}
      floatingLabelStyle={{ top: '30px', color: '#7a7a7a' }}
      floatingLabelFocusStyle={{ color: '#01B9C1' }}
      inputStyle={{ marginTop: '10px' }}
      className="select_hgt"
      onChange={(event, value) => onDateChange(input, value)}
    />
  );
};

export const renderTimePickerForStaffAvailbility = ({ input, name, hintText, onDateChange, format, selected, fullWidth, disabled, placeholder, meta: { touched, error, warning } }) => {
  return (
    <TimePicker
      format={format ? format : 'ampm'}
      floatingLabelText={placeholder}
      hintText={hintText}
      errorText={touched && error}
      // {...input}
      autoOk ={true}
      value={selected ? new Date(selected) : null}
      onChange={(event, value) => onDateChange(input, value)}
      minutesStep={1}
      fullWidth={fullWidth}
      disabled={disabled}
      floatingLabelStyle={{ color: '#7a7a7a' }}
      floatingLabelFocusStyle={{ color: '#09A7DC' }}
    />
  );
};

export const renderServersideAutocomplete = ({
  input,
  label,
  multiLine,
  rowsMax,
  fullWidth,
  disabled,
  onChangeHandler,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <div>
      <TextField
        errorText={touched && error}
        multiLine={multiLine}
        rowsMax={rowsMax}
        disabled={disabled}
        fullWidth={true}
        className="test"
        autoComplete='new-type'
        {...input}
        {...custom} />
    </div>
  );
};

export const renderTimePicker = ({ input, name, dialogBodyStyle, dialogStyle, hintText, onDismiss, onShow, onDateChange, format, selected, fullWidth, disabled, placeholder, meta: { touched, error, warning } }) => {
  return (
    <TimePicker
      format={format ? format : 'ampm'}
      floatingLabelText={placeholder}
      hintText= {hintText}
      errorText={touched && error}
      {...input}
      autoOk ={true}
      value={selected !== null ? new Date(selected) : {}}
      onChange={(event, value) => onDateChange(input, value)}
      minutesStep={1}
      onShow ={onShow}
      onDismiss={onDismiss}
      fullWidth={fullWidth ? fullWidth : true}
      disabled={disabled}
      floatingLabelStyle={{ top: '30px', color: '#7a7a7a' }}
      floatingLabelFocusStyle={{ color: '#01B9C1' }}
      inputStyle={{ marginTop: '10px' }}
      className="timepick"
      dialogBodyStyle = {dialogBodyStyle}
      dialogStyle = {dialogStyle}
    />
  );
};

export const renderUploadField = ({ input, label, type, multiple, style, fieldValue, value, meta: { touched, error, warning } }) => (
  <input {...input} type={type} multiple={multiple} value={value} style={style}/>
);


// Patient Info Tags

export const normalizeRate = (value, previousValue) => {

  if (!value) {
    return value;
  }
  if (parseFloat(value) === 0) {
    return '';
  }
  const onlyNums = value.replace(/[^\d]/g, '');

  if (!previousValue || value.length > previousValue.length) {
    // typing forward 12345-1234
    if (onlyNums.length > 0) {
      if (onlyNums.length === 2) {
        if (value.indexOf('.') === onlyNums.length - 1) {
          return '00.' + onlyNums.slice(1) + '0';
        }
        return onlyNums + '.00';
      } else if (onlyNums.length === 1) {
        return '00.0' + onlyNums;
      } else if (onlyNums.length === 3) {
        if (previousValue.length > value.length) {
          return onlyNums.slice(0, 2) + '.' + onlyNums.slice(2);
        } else if (onlyNums[onlyNums.length - 1] === '0') {
          return '00.' + onlyNums.slice(0, 2);
        }
        return '0' + onlyNums.slice(0, onlyNums.length - 2) + '.' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length === 4) {
        return onlyNums.slice(0, onlyNums.length - 2) + '.' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length === 5) {
        if (onlyNums[0] === '0') {
          return onlyNums.slice(1, onlyNums.length - 2) + '.' + onlyNums.slice(onlyNums.length - 2);
        } else
          return onlyNums.slice(0, onlyNums.length - 2) + '.' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length > 5) {
        return onlyNums.slice(0, onlyNums.length - 2) + '.' + onlyNums.slice(onlyNums.length - 2);
      }

    } else {
      return null;
    }
  } else {
    // tabbing backspace

    if (onlyNums.length > 0) {

      if (onlyNums.length === 2) {
        if (value.indexOf('.') === onlyNums.length - 1) {
          return '00.' + onlyNums.slice(1) + '0';
        }
        if (value.indexOf('.') === onlyNums.length) {
          return '00.' + onlyNums;
        }
        return onlyNums + '.00';
      } else if (onlyNums.length === 1) {
        return '0' + onlyNums + '.00';
      } else if (onlyNums.length === 3) {
        if (value.indexOf('.') === onlyNums.length - 1) {
          if (previousValue.length > value.length) {
            return onlyNums.slice(0, 2) + '.' + onlyNums.slice(2);
          } else if (onlyNums[onlyNums.length - 1] === '0') {
            return '00.' + onlyNums.slice(0, 2);
          } else {
            return onlyNums.slice(0, 2) + '.' + onlyNums.slice(2) + '0';
          }
        } else
          return '0' + onlyNums.slice(0, onlyNums.length - 2) + '.' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length === 4) {
        if (value.indexOf('.') === -1) {
          return onlyNums + '.00';
        }
        return onlyNums.slice(0, onlyNums.length - 2) + '.' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length > 4) {
        if (value.indexOf('.') !== -1) {

          if (value.indexOf('.') === onlyNums.length - 1) {
            if (previousValue.length > value.length) {
              return onlyNums.slice(0, value.indexOf('.') - 1) + '.' + onlyNums.slice(value.indexOf('.') - 1);
            } else
              return onlyNums.slice(0, value.indexOf('.')) + '.' + onlyNums.slice(value.indexOf('.')) + '0';
          } else
            return onlyNums.slice(0, value.indexOf('.')) + '.' + onlyNums.slice(value.indexOf('.'));
        } else {
          return onlyNums + '.00';
        }
      }

    } else {
      return null;
    }
  }

  // return onlyNums.slice(0, 5) + '-' + onlyNums.slice(5);
};


export const normalizeTime = (value, previousValue) => {

  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');

  if (!previousValue || value.length > previousValue.length) {
    // typing forward 12345-1234
    if (onlyNums.length > 0) {

      if (onlyNums.length === 2) {
        if (value.indexOf(':') === onlyNums.length - 1) {
          return '00:' + onlyNums.slice(1) + '0';
        }
        return onlyNums + ':00';
      } else if (onlyNums.length === 1) {
        return '00:0' + onlyNums;
      } else if (onlyNums.length === 3) {
        if (previousValue.length > value.length) {
          return onlyNums.slice(0, 2) + ':' + onlyNums.slice(2);
        } else if (onlyNums[onlyNums.length - 1] === '0') {

          return '00:' + onlyNums.slice(0, 2);
        }
        return '0' + onlyNums.slice(0, onlyNums.length - 2) + ':' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length === 4) {
        return onlyNums.slice(0, onlyNums.length - 2) + ':' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length === 5) {
        if (onlyNums[0] === '0') {
          return onlyNums.slice(1, onlyNums.length - 2) + ':' + onlyNums.slice(onlyNums.length - 2);
        } else
          return onlyNums.slice(0, onlyNums.length - 2) + ':' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length > 5) {
        return onlyNums.slice(0, onlyNums.length - 2) + ':' + onlyNums.slice(onlyNums.length - 2);
      }

    } else {
      return null;
    }
  } else {
    // tabbing backspace

    if (onlyNums.length > 0) {

      if (onlyNums.length === 2) {
        if (value.indexOf(':') === onlyNums.length - 1) {
          return '00:' + onlyNums.slice(1) + '0';
        }
        if (value.indexOf(':') === onlyNums.length) {
          return '00:' + onlyNums;
        }
        return onlyNums + ':00';
      } else if (onlyNums.length === 1) {
        return '0' + onlyNums + ':00';
      } else if (onlyNums.length === 3) {
        if (value.indexOf(':') === onlyNums.length - 1) {
          if (previousValue.length > value.length) {
            return onlyNums.slice(0, 2) + ':' + onlyNums.slice(2);
          } else if (onlyNums[onlyNums.length - 1] === '0') {
            return '00:' + onlyNums.slice(0, 2);
          } else {
            return onlyNums.slice(0, 2) + ':' + onlyNums.slice(2) + '0';
          }
        } else
          return '0' + onlyNums.slice(0, onlyNums.length - 2) + ':' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length === 4) {
        if (value.indexOf(':') === -1) {
          return onlyNums + ':00';
        }
        return onlyNums.slice(0, onlyNums.length - 2) + ':' + onlyNums.slice(onlyNums.length - 2);
      } else if (onlyNums.length > 4) {
        if (value.indexOf(':') !== -1) {

          if (value.indexOf(':') === onlyNums.length - 1) {
            if (previousValue.length > value.length) {
              return onlyNums.slice(0, value.indexOf(':') - 1) + ':' + onlyNums.slice(value.indexOf(':') - 1);
            } else
              return onlyNums.slice(0, value.indexOf(':')) + ':' + onlyNums.slice(value.indexOf(':')) + '0';
          } else
            return onlyNums.slice(0, value.indexOf(':')) + ':' + onlyNums.slice(value.indexOf(':'));
        } else {
          return onlyNums + ':00';
        }
      }

    } else {
      return null;
    }
  }
};

export const normalizeEIN = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 2) {
      return onlyNums + '-';
    }
    if (onlyNums.length > 2 && onlyNums.length < 8) {
      return onlyNums.slice(0, 2) + '-' + onlyNums ;
    }
    // if (onlyNums.length === 9  ) {
    //   return onlyNums.slice(0, 2) + '-' + onlyNums.slice(3, 9) ;
    // }
  }
  if (onlyNums.length <= 2) {
    return onlyNums;
  }
  if (onlyNums.length <= 3) {
    return onlyNums.slice(0, 2) + '-';
  }
  return onlyNums.slice(0, 2) + '-' + onlyNums.slice(2, 9);
};

export const normalizeSSN = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-';
    }
    if (onlyNums.length === 5) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-';
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 5) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3);
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 5) + '-' + onlyNums.slice(5, 9);
};

export const normalizeNPI = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-';
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-';
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3);
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10);
};

export const normalizeCardIssueDate = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-';
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-';
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3);
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 5) + '-' + onlyNums.slice(5, 9);
};

export const normalizeMobile = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + ' ';
    }
    if (onlyNums.length === 6) {
      return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3) + '-';
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3);
  }
  return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10);
};
export const normalizeCreditCard = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length < 4) {
      return onlyNums;
    }
    if (onlyNums.length === 4) {
      return onlyNums + '-';
    }
    if (onlyNums.length > 4 && onlyNums.length < 8) {
      return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4);
    }
    if (onlyNums.length >= 8 && onlyNums.length < 12) {
      return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8);
    }
    if (onlyNums.length >= 12 && onlyNums.length <= 16) {
      return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8, 12) + '-' + onlyNums.slice(12);
    }
  }
  if (onlyNums.length < 4) {
    return onlyNums;
  }
  if (onlyNums.length === 4) {
    return onlyNums;
  }
  if (onlyNums.length > 4 && onlyNums.length < 8) {
    return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4);
  }
  if (onlyNums.length === 8) {
    return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8);
  }
  if (onlyNums.length >= 8 && onlyNums.length < 12) {
    return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8);
  }
  if (onlyNums.length === 12) {
    return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8, 12);
  }
  if (onlyNums.length > 12 && onlyNums.length <= 16) {
    return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8, 12) + '-' + onlyNums.slice(12);
  }
};
export const normalizeFax = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + ' ';
    }
    if (onlyNums.length === 6) {
      return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3) + '-';
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3);
  }
  return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 13);
};

export const isValidFileType = (fName, fType) => {
  // Create an object for all extension lists
  let extentionLists = {};
  let isValidType = false;
  extentionLists.video = ['m4v', 'avi', 'mpg', 'mp4'];
  extentionLists.image = ['jpg', 'jpeg', 'bmp', 'png'];
  extentionLists.diagnosis = ['jpg', 'jpeg', 'bmp', 'png', 'doc', 'xls', 'txt', 'pdf'];
  extentionLists.authorization = ['pdf'];
  extentionLists.pdf = ['pdf'];
  extentionLists.excel = ['excel'];
  extentionLists.xml = ['xml'];
  // get the extension of the selected file.
  let fileExtension = fName.split('.').pop().toLowerCase();

  isValidType = extentionLists[fType].indexOf(fileExtension) > -1;
  return isValidType;
};

export const isInteger = (value) => {

  let onlyNums = value.replace(/[^\d]/g, '');

  if (!value) {
    return value;
  }
  return onlyNums;
};
export const isValidName = (value) => {
  let onlyAlphaNumerics = value.replace(/[^a-zA-Z0-9@._-]/g, '');
  if (!value) {
    return value;
  }
  return onlyAlphaNumerics;
};

export const isValidNameWithSpace = (value) => {
  let onlyAlphaNumerics = value.replace(/[^a-z0-9]/gi, '');
  if (!value) {
    return value;
  }
  return onlyAlphaNumerics && onlyAlphaNumerics[0].toUpperCase() + onlyAlphaNumerics.slice(1);
};

export const isFloat = (value) => {

  const onlyNums = value.replace(/[^.\d]/g, '');
  // value.match(/^((\.\d+)|(\d+(\.\d+)?))$/, '');

  if (!value) {
    return value;
  }
  return onlyNums;
};
export const capitalize = (value, previousValue) => {
  if (!previousValue || value.length > previousValue.length) {
  // typing forward
    if (!value) {
      return value;
    } else if (value && value.trim() !== '') {
      if (value.length === 1) {
        return value.charAt(0).toUpperCase();
      } else
        return value.charAt(0).toUpperCase() + value.slice(1);
    } else
      return null;
  }
  if (!value) {
    return value;
  } else if (value && value.trim() !== '') {
    if (value.length === 1) {
      return value.charAt(0).toUpperCase();
    } else
      return value.charAt(0).toUpperCase() + value.slice(1);
  } else
    return null;
}
;

// auto complete with custom functionality ....
// export const renderAutocompleteForCustomData = ({ input, label, name, value, disabled, searchTextValue, dataSource, handleUpdateInput, handleFilter, onNewRequest, meta: { touched, error }, ...custom }) => {
//   const dataSourceConfig = { text: 'value', value: 'id' };
//   const filterSearch = (searchText, key) => {
//     return searchText !== '' && (key || '').toLowerCase().indexOf((searchText).toLowerCase()) !== -1;
//   };
//   return (
//     <AutoComplete searchText={searchTextValue || ''}
//       floatingLabelText={label}
//       dataSource={dataSource || []}
//       dataSourceConfig={dataSourceConfig}
//       filter={(searchText, key) => filterSearch(searchText, key)}
//       onUpdateInput={handleUpdateInput}
//       maxSearchResults={3}
//       fullWidth={true}
//       onNewRequest={onNewRequest}
//       {...input}
//       {...custom} />);
// };