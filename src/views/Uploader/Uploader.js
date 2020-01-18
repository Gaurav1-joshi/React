


import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Col, Row, Table, Input, Button } from 'reactstrap';
import axios from 'axios';
// import './App.css';
import './../../App.css';
// import {
//   formValueSelector,
// } from 'redux-form';
import { connect } from 'react-redux';
//import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import swal from 'sweetalert';
//import { GET_FILETYPE_API } from './constants';
import { Spinner } from 'reactstrap';
import { API_URL } from '../../actions/utilAction';
//import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
//import RaisedButton from 'material-ui/RaisedButton';
// import {
//   BrowserRouter as Router, HashRouter, Route, Switch,
//   Redirect,
//   withRouter, Link
// } from 'react-router-dom';
import { CSVLink } from 'react-csv';
//import ReactToPrint from 'react-to-print';
//import { Messages } from 'primereact/messages';
//import { Message } from 'primereact/message';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
//import { fontSize } from '@material-ui/system';
// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 300,
//   },
//   dense: {
//     marginTop: 19,
//   }
// }));

class Basic extends Component {
  constructor() {
    super();
    this.onDrop = (files) => {

      var dropFiles = files.length;
      this.setState({ dropFiles: dropFiles })

      this.setState({
        uploaded: false
      })

      var newFiles = this.state.files;

      var extF = files[0] ? files[0].name.substr(files[0].name.lastIndexOf('.') + 1) : null;
      // var extS = this.state.files[1] ? this.state.files[1].name.substr(this.state.files[1].name.lastIndexOf('.') + 1) : null;

      if (extF === 'jpg' || extF === 'JPG') {
        let cc = [...files];
        for (var i in cc) {
          if (files.length && newFiles.length && newFiles.map(x => x.path).includes(files[0].name)) {
            files.splice(0, 1);
          }
        }
      }




      files = newFiles.concat(files);
      if (files.length > 20)
        files.splice(20, files.length - 20);
      this.setState({
        files
      });

      var ext0 = this.state.files[0] ? this.state.files[0].name.substr(this.state.files[0].name.lastIndexOf('.') + 1) : null;
      var ext1 = this.state.files[1] ? this.state.files[1].name.substr(this.state.files[1].name.lastIndexOf('.') + 1) : null;
      var ext2 = this.state.files[2] ? this.state.files[2].name.substr(this.state.files[2].name.lastIndexOf('.') + 1) : null;
      var ext3 = this.state.files[3] ? this.state.files[3].name.substr(this.state.files[3].name.lastIndexOf('.') + 1) : null;
      var ext4 = this.state.files[4] ? this.state.files[4].name.substr(this.state.files[4].name.lastIndexOf('.') + 1) : null;
      var ext5 = this.state.files[5] ? this.state.files[5].name.substr(this.state.files[5].name.lastIndexOf('.') + 1) : null;
      var ext6 = this.state.files[6] ? this.state.files[6].name.substr(this.state.files[6].name.lastIndexOf('.') + 1) : null;
      var ext7 = this.state.files[7] ? this.state.files[7].name.substr(this.state.files[7].name.lastIndexOf('.') + 1) : null;
      var ext8 = this.state.files[8] ? this.state.files[8].name.substr(this.state.files[8].name.lastIndexOf('.') + 1) : null;
      var ext9 = this.state.files[9] ? this.state.files[9].name.substr(this.state.files[9].name.lastIndexOf('.') + 1) : null;
      var ext10 = this.state.files[10] ? this.state.files[10].name.substr(this.state.files[10].name.lastIndexOf('.') + 1) : null;
      var ext11 = this.state.files[11] ? this.state.files[11].name.substr(this.state.files[11].name.lastIndexOf('.') + 1) : null;
      var ext12 = this.state.files[12] ? this.state.files[12].name.substr(this.state.files[12].name.lastIndexOf('.') + 1) : null;
      var ext13 = this.state.files[13] ? this.state.files[13].name.substr(this.state.files[13].name.lastIndexOf('.') + 1) : null;
      var ext14 = this.state.files[14] ? this.state.files[14].name.substr(this.state.files[14].name.lastIndexOf('.') + 1) : null;
      var ext15 = this.state.files[15] ? this.state.files[15].name.substr(this.state.files[15].name.lastIndexOf('.') + 1) : null;
      var ext16 = this.state.files[16] ? this.state.files[16].name.substr(this.state.files[16].name.lastIndexOf('.') + 1) : null;
      var ext17 = this.state.files[17] ? this.state.files[17].name.substr(this.state.files[17].name.lastIndexOf('.') + 1) : null;
      var ext18 = this.state.files[18] ? this.state.files[18].name.substr(this.state.files[18].name.lastIndexOf('.') + 1) : null;
      var ext19 = this.state.files[19] ? this.state.files[19].name.substr(this.state.files[19].name.lastIndexOf('.') + 1) : null;

      var categories = this.state.categories;

      if (ext0 === 'jpg' || ext0 === 'jpeg') {
        categories[0] = 'Image';
      }
      if (ext1 === 'jpg' || ext1 === 'jpeg') {
        categories[1] = 'Image';
      }
      if (ext2 === 'jpg' || ext2 === 'jpeg') {
        categories[2] = 'Image';
      }
      if (ext3 === 'jpg' || ext3 === 'jpeg') {
        categories[3] = 'Image';
      }
      if (ext4 === 'jpg' || ext4 === 'jpeg') {
        categories[4] = 'Image';
      }
      if (ext5 === 'jpg' || ext5 === 'jpeg') {
        categories[5] = 'Image';
      }
      if (ext6 === 'jpg' || ext6 === 'jpeg') {
        categories[6] = 'Image';
      }
      if (ext7 === 'jpg' || ext7 === 'jpeg') {
        categories[7] = 'Image';
      }
      if (ext8 === 'jpg' || ext8 === 'jpeg') {
        categories[8] = 'Image';
      }
      if (ext9 === 'jpg' || ext9 === 'jpeg') {
        categories[9] = 'Image';
      }
      if (ext10 === 'jpg' || ext10 === 'jpeg') {
        categories[10] = 'Image';
      }
      if (ext11 === 'jpg' || ext11 === 'jpeg') {
        categories[11] = 'Image';
      }
      if (ext12 === 'jpg' || ext12 === 'jpeg') {
        categories[12] = 'Image';
      }
      if (ext13 === 'jpg' || ext13 === 'jpeg') {
        categories[13] = 'Image';
      }
      if (ext14 === 'jpg' || ext14 === 'jpeg') {
        categories[14] = 'Image';
      }
      if (ext15 === 'jpg' || ext15 === 'jpeg') {
        categories[15] = 'Image';
      }
      if (ext11 === 'jpg' || ext11 === 'jpeg') {
        categories[11] = 'Image';
      }
      if (ext12 === 'jpg' || ext12 === 'jpeg') {
        categories[12] = 'Image';
      }
      if (ext13 === 'jpg' || ext13 === 'jpeg') {
        categories[13] = 'Image';
      }
      if (ext14 === 'jpg' || ext14 === 'jpeg') {
        categories[14] = 'Image';
      }
      if (ext15 === 'jpg' || ext15 === 'jpeg') {
        categories[15] = 'Image';
      }
      if (ext16 === 'jpg' || ext16 === 'jpeg') {
        categories[16] = 'Image';
      }
      if (ext17 === 'jpg' || ext17 === 'jpeg') {
        categories[17] = 'Image';
      }
      if (ext18 === 'jpg' || ext18 === 'jpeg') {
        categories[18] = 'Image';
      }
      if (ext19 === 'jpg' || ext19 === 'jpeg') {
        categories[19] = 'Image';
      }
      this.setState({
        categories: categories
      })

    };
    this.state = {
      files: [],
      filePath: '',
      posts: null,
      loading: false,
      categories: [],
      textData: [],
      msg: null,
      showResult: false,
      statusCode: null,
      msgArray: [],
      crossMessage: false,
      userId: null,
      fileNameWithRandomNumber: '',
      uploadMessage: null,
      fileNameWithRandomNumberArray: [],
      RequiredDescription: [],
      RequiredCategory: [],
      successFileArray: [],
      uploaded: false,
      exportData: [],
      savedData: [],
      savedArray: [],
      dropFiles: [],
      SavedArrayInDb: [],
      Comments: []
    };
  }

  componentWillMount() {
    this.setState({ userId: localStorage.getItem("userId") });
    if (this.props.userId == null || this.props.userId === '' || localStorage.getItem('token') == null) {
      this.props.history.push('/login');
    }
  }

  onUnload = (event) => { // the method that will be used for both add and remove event
    localStorage.setItem("userId", this.state.userId);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload)
    let userId = localStorage.getItem("userId");
    if (this.props.userId == null || this.props.userId === '') {
      this.props.history.push('/login');
    }
    // console.log("this.props.userId---", this.props.userId)

  }

  hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }

  handleChange = (e, index, fileExt) => {
    var categories = this.state.categories;
    var defaultCategory = '';

    if (fileExt === 'jpg' || fileExt == 'jpeg') {
      defaultCategory = 'Image';
    }
    else if (fileExt === 'pdf') {
      defaultCategory = 'Manuals';
    }
    else {
      defaultCategory = 'Drivers';
    }


    if (index === 0) {
      categories[0] = e.target.value || defaultCategory;
      var textData = this.state.textData;
      if (this.state.textData.length === 0) {
        textData[0] = null;
      }

      this.setState({
        textData: textData
      })
      if (categories[0] !== 'Manuals' && this.state.textData[0] == null) {
        var first = this.state.RequiredDescription;
        first[0] = categories[0];
        this.setState({
          RequiredDescription: first,
        })
      }
      else if (categories[0] !== 'Manuals' && this.state.textData[0] === '') {
        var textData = this.state.textData;
        textData[0] = null;
        var first1 = this.state.RequiredDescription;
        first1[0] = categories[0];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[0] === 'Manuals') {
        var textData = this.state.textData;
        textData[0] = '';
        var first1 = this.state.RequiredDescription;
        first1[0] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var textData = this.state.textData;
        //textData[0] = e.target.value;
        var first = this.state.RequiredDescription;
        first[0] = null;
        this.setState({
          RequiredDescription: first,
          textData: textData
        })
      }

    }
    if (index === 1) {
      var textData = this.state.textData;
      // textData[1] = null;
      if (!this.state.textData[1]) {
        textData[1] = null;
      }
      this.setState({
        textData: textData
      })
      categories[1] = e.target.value || defaultCategory;
      if (categories[1] !== 'Manuals' && this.state.textData[1] == null) {
        var second = this.state.RequiredDescription;
        second[1] = categories[1];
        this.setState({
          RequiredDescription: second
        })
      }
      else if (categories[1] !== 'Manuals' && this.state.textData[1] === '') {
        var textData = this.state.textData;
        textData[1] = null;
        var first1 = this.state.RequiredDescription;
        first1[1] = categories[1];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[1] === 'Manuals') {
        var textData = this.state.textData;
        textData[1] = '';
        var first1 = this.state.RequiredDescription;
        first1[1] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {


        var first = this.state.RequiredDescription;
        first[1] = null;
        var textData = this.state.textData;
        //textData[1] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData
        })
      }

    }
    if (index === 2) {
      var textData = this.state.textData;
      if (!this.state.textData[2]) {
        textData[2] = null;
      }
      this.setState({
        textData: textData
      })
      categories[2] = e.target.value || defaultCategory;
      if (categories[2] !== 'Manuals' && this.state.textData[2] == null) {
        var third = this.state.RequiredDescription;
        third[2] = categories[2];
        this.setState({
          RequiredDescription: third
        })
      }
      else if (categories[2] !== 'Manuals' && this.state.textData[2] === '') {

        var textData = this.state.textData;
        textData[2] = null;
        var first1 = this.state.RequiredDescription;
        first1[2] = categories[2];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[2] === 'Manuals') {
        var textData = this.state.textData;
        textData[2] = '';
        var first1 = this.state.RequiredDescription;
        first1[2] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[2] = null;
        var textData = this.state.textData;
        //textData[2] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }

    }
    if (index === 3) {
      var textData = this.state.textData;
      if (!this.state.textData[3]) {
        textData[3] = null;
      }
      this.setState({
        textData: textData
      })
      categories[3] = e.target.value || defaultCategory;
      if (categories[3] !== 'Manuals' && this.state.textData[3] == null) {
        var forth = this.state.RequiredDescription;
        forth[3] = categories[3];

        this.setState({
          RequiredDescription: forth,
        })
      }
      else if (categories[3] !== 'Manuals' && this.state.textData[3] === '') {

        var textData = this.state.textData;
        textData[3] = null;
        var first1 = this.state.RequiredDescription;
        first1[3] = categories[3];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[3] === 'Manuals') {
        var textData = this.state.textData;
        textData[3] = '';
        var first1 = this.state.RequiredDescription;
        first1[3] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[3] = null;
        var textData = this.state.textData;
        //textData[3] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }

    }
    if (index === 4) {
      var textData = this.state.textData;
      if (!this.state.textData[4]) {
        textData[4] = null;
      }
      this.setState({
        textData: textData
      })
      categories[4] = e.target.value || defaultCategory;
      if (categories[4] !== 'Manuals' && this.state.textData[4] == null) {
        var fifth = this.state.RequiredDescription;
        fifth[4] = categories[4];
        this.setState({
          RequiredDescription: fifth
        })
      }

      else if (categories[4] !== 'Manuals' && this.state.textData[4] === '') {
        var textData = this.state.textData;
        textData[4] = null;
        var first1 = this.state.RequiredDescription;
        first1[4] = categories[4];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[4] === 'Manuals') {
        var textData = this.state.textData;
        textData[4] = '';
        var first1 = this.state.RequiredDescription;
        first1[4] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }

      else {
        var first = this.state.RequiredDescription;
        first[4] = null;
        var textData = this.state.textData;
        //textData[4] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData
        })
      }

    }
    if (index === 5) {
      var textData = this.state.textData;
      if (!this.state.textData[5]) {
        textData[5] = null;
      }
      this.setState({
        textData: textData
      })
      categories[5] = e.target.value || defaultCategory;
      if (categories[5] !== 'Manuals' && this.state.textData[5] == null) {
        var sixth = this.state.RequiredDescription;
        sixth[5] = categories[5];
        this.setState({
          RequiredDescription: sixth
        })
      }
      else if (categories[5] !== 'Manuals' && this.state.textData[5] === '') {
        var textData = this.state.textData;
        textData[5] = null;
        var first1 = this.state.RequiredDescription;
        first1[5] = categories[5];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[5] === 'Manuals') {
        var textData = this.state.textData;
        textData[5] = '';
        var first1 = this.state.RequiredDescription;
        first1[5] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[5] = null;
        var textData = this.state.textData;
        //textData[5] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData
        })
      }

    }
    if (index === 6) {
      var textData = this.state.textData;
      if (!this.state.textData[6]) {
        textData[6] = null;
      }
      this.setState({
        textData: textData
      })
      categories[6] = e.target.value || defaultCategory;
      if (categories[6] !== 'Manuals' && this.state.textData[6] == null) {
        var seventh = this.state.RequiredDescription;
        seventh[6] = categories[6];
        this.setState({
          RequiredDescription: seventh
        })
      }
      else if (categories[6] !== 'Manuals' && this.state.textData[6] === '') {
        var textData = this.state.textData;
        textData[6] = null;
        var first1 = this.state.RequiredDescription;
        first1[6] = categories[6];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[6] === 'Manuals') {
        var textData = this.state.textData;
        textData[6] = '';
        var first1 = this.state.RequiredDescription;
        first1[6] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[6] = null;
        var textData = this.state.textData;
        //textData[6] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }

    }
    if (index === 7) {
      var textData = this.state.textData;
      if (!this.state.textData[7]) {
        textData[7] = null;
      }
      this.setState({
        textData: textData
      })
      categories[7] = e.target.value || defaultCategory;
      if (categories[7] !== 'Manuals' && this.state.textData[7] == null) {
        var eighth = this.state.RequiredDescription;
        eighth[7] = categories[7];

        this.setState({
          RequiredDescription: eighth,
        })
      }
      else if (categories[7] !== 'Manuals' && this.state.textData[7] === '') {
        var textData = this.state.textData;
        textData[7] = null;
        var first1 = this.state.RequiredDescription;
        first1[7] = categories[7];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[7] === 'Manuals') {
        var textData = this.state.textData;
        textData[7] = '';
        var first1 = this.state.RequiredDescription;
        first1[7] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[7] = null;
        var textData = this.state.textData;
        //textData[7] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }

    }
    if (index === 8) {
      var textData = this.state.textData;
      if (!this.state.textData[8]) {
        textData[8] = null;
      }
      this.setState({
        textData: textData
      })
      categories[8] = e.target.value || defaultCategory;
      if (categories[8] !== 'Manuals' && this.state.textData[8] == null) {
        var ninth = this.state.RequiredDescription;
        ninth[8] = categories[8];
        this.setState({
          RequiredDescription: ninth
        })
      }
      else if (categories[8] !== 'Manuals' && this.state.textData[8] === '') {
        var textData = this.state.textData;
        textData[8] = null;
        var first1 = this.state.RequiredDescription;
        first1[8] = categories[8];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[8] === 'Manuals') {
        var textData = this.state.textData;
        textData[8] = '';
        var first1 = this.state.RequiredDescription;
        first1[8] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[8] = null;
        var textData = this.state.textData;
        //textData[8] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData
        })
      }


    }
    if (index === 9) {
      var textData = this.state.textData;
      if (!this.state.textData[9]) {
        textData[9] = null;
      }
      this.setState({
        textData: textData
      })
      categories[9] = e.target.value || defaultCategory;
      if (categories[9] !== 'Manuals' && this.state.textData[9] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[9] = categories[9];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[9] !== 'Manuals' && this.state.textData[9] === '') {
        var textData = this.state.textData;
        textData[9] = null;
        var first1 = this.state.RequiredDescription;
        first1[9] = categories[9];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[9] === 'Manuals') {
        var textData = this.state.textData;
        textData[9] = '';
        var first1 = this.state.RequiredDescription;
        first1[9] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[9] = null;
        var textData = this.state.textData;
        //textData[9] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }


    }


    if (index === 10) {
      var textData = this.state.textData;
      if (!this.state.textData[10]) {
        textData[10] = null;
      }
      this.setState({
        textData: textData
      })
      categories[10] = e.target.value || defaultCategory;
      if (categories[10] !== 'Manuals' && this.state.textData[10] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[10] = categories[10];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[10] !== 'Manuals' && this.state.textData[10] === '') {
        var textData = this.state.textData;
        textData[10] = null;
        var first1 = this.state.RequiredDescription;
        first1[10] = categories[10];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[10] === 'Manuals') {
        var textData = this.state.textData;
        textData[10] = '';
        var first1 = this.state.RequiredDescription;
        first1[10] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[10] = null;
        var textData = this.state.textData;
        //textData[10] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }


    }

    if (index === 11) {
      var textData = this.state.textData;
      if (!this.state.textData[11]) {
        textData[11] = null;
      }
      this.setState({
        textData: textData
      })
      categories[11] = e.target.value || defaultCategory;
      if (categories[11] !== 'Manuals' && this.state.textData[11] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[11] = categories[11];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[11] !== 'Manuals' && this.state.textData[10] === '') {
        var textData = this.state.textData;
        textData[11] = null;
        var first1 = this.state.RequiredDescription;
        first1[11] = categories[11];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[11] === 'Manuals') {
        var textData = this.state.textData;
        textData[11] = '';
        var first1 = this.state.RequiredDescription;
        first1[11] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[11] = null;
        var textData = this.state.textData;
        //textData[11] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }
    }

    if (index === 12) {
      var textData = this.state.textData;
      if (!this.state.textData[12]) {
        textData[12] = null;
      }
      this.setState({
        textData: textData
      })
      categories[12] = e.target.value || defaultCategory;
      if (categories[12] !== 'Manuals' && this.state.textData[9] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[12] = categories[12];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[12] !== 'Manuals' && this.state.textData[12] == '') {
        var textData = this.state.textData;
        textData[12] = null;
        var first1 = this.state.RequiredDescription;
        first1[12] = categories[12];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[12] === 'Manuals') {
        var textData = this.state.textData;
        textData[12] = '';
        var first1 = this.state.RequiredDescription;
        first1[12] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[12] = null;
        var textData = this.state.textData;
        //textData[12] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }
    }

    if (index === 13) {
      var textData = this.state.textData;
      if (!this.state.textData[13]) {
        textData[13] = null;
      }
      this.setState({
        textData: textData
      })
      categories[13] = e.target.value || defaultCategory;
      if (categories[13] !== 'Manuals' && this.state.textData[9] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[13] = categories[13];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[13] !== 'Manuals' && this.state.textData[13] === '') {
        var textData = this.state.textData;
        textData[13] = null;
        var first1 = this.state.RequiredDescription;
        first1[13] = categories[13];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[13] === 'Manuals') {
        var textData = this.state.textData;
        textData[13] = '';
        var first1 = this.state.RequiredDescription;
        first1[13] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[13] = null;
        var textData = this.state.textData;
        //textData[13] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }


    }

    if (index === 14) {
      var textData = this.state.textData;
      if (!this.state.textData[14]) {
        textData[14] = null;
      }
      this.setState({
        textData: textData
      })
      categories[14] = e.target.value || defaultCategory;
      if (categories[14] !== 'Manuals' && this.state.textData[9] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[14] = categories[14];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[14] !== 'Manuals' && this.state.textData[14] === '') {
        var textData = this.state.textData;
        textData[14] = null;
        var first1 = this.state.RequiredDescription;
        first1[14] = categories[14];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[14] === 'Manuals') {
        var textData = this.state.textData;
        textData[14] = '';
        var first1 = this.state.RequiredDescription;
        first1[14] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[14] = null;
        var textData = this.state.textData;
        //textData[14] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }


    }

    if (index === 15) {
      var textData = this.state.textData;
      if (!this.state.textData[15]) {
        textData[15] = null;
      }
      this.setState({
        textData: textData
      })
      categories[15] = e.target.value || defaultCategory;
      if (categories[15] !== 'Manuals' && this.state.textData[9] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[15] = categories[15];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[15] !== 'Manuals' && this.state.textData[15] === '') {
        var textData = this.state.textData;
        textData[15] = null;
        var first1 = this.state.RequiredDescription;
        first1[15] = categories[15];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[15] === 'Manuals') {
        var textData = this.state.textData;
        textData[15] = '';
        var first1 = this.state.RequiredDescription;
        first1[15] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[15] = null;
        var textData = this.state.textData;
        //textData[15] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }


    }

    if (index === 16) {
      var textData = this.state.textData;
      if (!this.state.textData[16]) {
        textData[16] = null;
      }
      this.setState({
        textData: textData
      })
      categories[16] = e.target.value || defaultCategory;
      if (categories[16] !== 'Manuals' && this.state.textData[9] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[16] = categories[16];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[16] !== 'Manuals' && this.state.textData[16] === '') {
        var textData = this.state.textData;
        textData[16] = null;
        var first1 = this.state.RequiredDescription;
        first1[16] = categories[16];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[16] === 'Manuals') {
        var textData = this.state.textData;
        textData[16] = '';
        var first1 = this.state.RequiredDescription;
        first1[16] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[16] = null;
        var textData = this.state.textData;
        //textData[16] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }


    }

    if (index === 17) {
      var textData = this.state.textData;
      if (!this.state.textData[17]) {
        textData[17] = null;
      }
      this.setState({
        textData: textData
      })
      categories[17] = e.target.value || defaultCategory;
      if (categories[17] !== 'Manuals' && this.state.textData[9] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[17] = categories[17];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[17] !== 'Manuals' && this.state.textData[17] === '') {
        var textData = this.state.textData;
        textData[17] = null;
        var first1 = this.state.RequiredDescription;
        first1[17] = categories[17];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[17] === 'Manuals') {
        var textData = this.state.textData;
        textData[17] = '';
        var first1 = this.state.RequiredDescription;
        first1[17] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[17] = null;
        var textData = this.state.textData;
        //textData[17] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }


    }

    if (index === 18) {
      var textData = this.state.textData;
      if (!this.state.textData[18]) {
        textData[18] = null;
      }
      this.setState({
        textData: textData
      })
      categories[18] = e.target.value || defaultCategory;
      if (categories[18] !== 'Manuals' && this.state.textData[9] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[18] = categories[18];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[18] !== 'Manuals' && this.state.textData[18] === '') {
        var textData = this.state.textData;
        textData[18] = null;
        var first1 = this.state.RequiredDescription;
        first1[18] = categories[18];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[18] === 'Manuals') {
        var textData = this.state.textData;
        textData[18] = '';
        var first1 = this.state.RequiredDescription;
        first1[18] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[18] = null;
        var textData = this.state.textData;
        //textData[18] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }


    }

    if (index === 19) {
      var textData = this.state.textData;
      if (!this.state.textData[19]) {
        textData[19] = null;
      }
      this.setState({
        textData: textData
      })
      categories[19] = e.target.value || defaultCategory;
      if (categories[19] !== 'Manuals' && this.state.textData[9] == null) {
        var tenth = this.state.RequiredDescription;
        tenth[19] = categories[19];
        this.setState({
          RequiredDescription: tenth
        })
      }
      else if (categories[19] !== 'Manuals' && this.state.textData[19] === '') {
        var textData = this.state.textData;
        textData[19] = null;
        var first1 = this.state.RequiredDescription;
        first1[19] = categories[19];
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else if (categories[19] === 'Manuals') {
        var textData = this.state.textData;
        textData[19] = '';
        var first1 = this.state.RequiredDescription;
        first1[19] = null;
        this.setState({
          textData: textData,
          RequiredDescription: first1
        })
      }
      else {
        var first = this.state.RequiredDescription;
        first[19] = null;
        var textData = this.state.textData;
        //textData[19] = '';
        this.setState({
          RequiredDescription: first,
          textData: textData

        })
      }


    }



    this.setState({
      categories: categories
    })
  }

  textChange = (e, index) => {

    var textData = this.state.textData;
    if (index === 0) {
      textData[0] = e.target.value;

      var tenth = this.state.RequiredDescription;
      tenth[0] = null;
      if (textData[0] === '') {
        tenth[0] = '';
        textData[0] = null;
      }
      this.setState({
        textData: textData,
        RequiredDescription: tenth
      })
    }

    if (index === 1) {
      textData[1] = e.target.value;

      var tenth = this.state.RequiredDescription;
      tenth[1] = null;
      if (textData[1] === '') {
        tenth[1] = '';
        textData[1] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 2) {
      textData[2] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[2] = null;
      if (textData[2] === '') {
        tenth[2] = '';
        textData[2] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }
    if (index === 3) {
      textData[3] = e.target.value;

      var tenth = this.state.RequiredDescription;
      tenth[3] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[3] === '') {
        tenth[3] = '';
        textData[3] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 4) {
      textData[4] = e.target.value;

      var tenth = this.state.RequiredDescription;
      tenth[4] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[4] === '') {
        tenth[4] = '';
        textData[4] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 5) {
      textData[5] = e.target.value;

      var tenth = this.state.RequiredDescription;
      tenth[5] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[5] === '') {
        tenth[5] = '';
        textData[5] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 6) {
      textData[6] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[6] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[6] === '') {
        tenth[6] = '';
        textData[6] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 7) {
      textData[7] = e.target.value;

      var tenth = this.state.RequiredDescription;
      tenth[7] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[7] === '') {
        tenth[7] = '';
        textData[7] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 8) {
      textData[8] = e.target.value;

      var tenth = this.state.RequiredDescription;
      tenth[8] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[8] === '') {
        tenth[8] = '';
        textData[8] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 9) {
      textData[9] = e.target.value;

      var tenth = this.state.RequiredDescription;
      tenth[9] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[9] === '') {
        tenth[9] = '';
        textData[9] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 10) {
      textData[10] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[10] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[10] === '') {
        tenth[10] = '';
        textData[10] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 11) {
      textData[11] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[11] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[11] === '') {
        tenth[11] = '';
        textData[11] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 12) {
      textData[12] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[12] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[12] === '') {
        tenth[12] = '';
        textData[12] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 13) {
      textData[13] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[13] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[13] === '') {
        tenth[13] = '';
        textData[13] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 14) {
      textData[14] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[14] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[14] === '') {
        tenth[14] = '';
        textData[14] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 15) {
      textData[15] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[15] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[15] === '') {
        tenth[15] = '';
        textData[15] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 16) {
      textData[16] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[16] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[16] === '') {
        tenth[16] = '';
        textData[16] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 17) {
      textData[17] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[17] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[17] === '') {
        tenth[17] = '';
        textData[17] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 18) {
      textData[18] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[18] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[18] === '') {
        tenth[18] = '';
        textData[18] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    if (index === 19) {
      textData[19] = e.target.value;
      var tenth = this.state.RequiredDescription;
      tenth[19] = null;
      var tenth = this.state.RequiredDescription;
      if (textData[19] === '') {
        tenth[19] = '';
        textData[19] = null;
      }
      this.setState({
        RequiredDescription: tenth
      })
    }

    this.setState({
      textData: textData
    })

  }


  handleDeleteClick = (e, index) => {
    let x = index
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          var newCategories = this.state.files;

          var el = newCategories[x];
          if (this.state.files.length > -1) {
            newCategories.splice(x, 1);
          }

          var categories = this.state.categories;
          var categoriesLength = categories[x];
          if (this.state.categories.length > -1) {
            categories.splice(x, 1);
          }

          var descriptions = this.state.textData;
          if (this.state.textData.length > -1) {
            descriptions.splice(x, 1);
          }

          var msgArray = this.state.msgArray;
          if (this.state.msgArray > -1) {
            msgArray.splice(x, 1);
          }

          var fileNameWithRandomNumberArray = this.state.fileNameWithRandomNumberArray;
          if (this.state.fileNameWithRandomNumberArray > -1) {
            fileNameWithRandomNumberArray.splice(x, 1);
          }


          // newCategories[index] = '';
          // var textData = this.state.textData;
          /// textData[index] = null;
          this.setState({
            files: newCategories,
            categories: categories,
            textData: descriptions,
            fileNameWithRandomNumberArray: fileNameWithRandomNumberArray,
            msgArray: msgArray,
            uploadMessage: null
          })

       
        }
      });

  }

  comparer = (otherArray) => {
    return function (current) {
      return otherArray.filter(function (other) {
        return other.value === current.value && other.display === current.display
      }).length === 0;
    }
  }

  handleAlertClick = (event, index) => {
    var newCategories = this.state.files;
    newCategories[index] = '';
    this.setState({
      files: newCategories
    })
    
  }

  handleReset = () => {
    this.setState({
      files: [],
      msgArray: [],
      crossMessage: false,
      showResult: false,
      textData: [],
      RequiredDescription: [],
      uploadMessage: null,
      savedData: [],
      categories: [],
      fileNameWithRandomNumberArray: [],
      SavedArrayInDb: [],
      Comments: []
    })
  }

  handleUploadClick = (event) => {
    event.preventDefault();

    var arrayWithImages = this.state.categories.length ? this.state.categories.filter(word => word === 'Image' || word === 'Manuals') : [];
    var arrayCountWithImages = arrayWithImages.length;

    var validateDescriptionCount = this.state.categories.length - arrayCountWithImages



    var self = this;
    var apiBaseUrl = `${API_URL}/api/UploadFiles`;

    var descriptionCount = self.state.textData.length;

    if (this.state.files.length > 0 && this.state.dropFiles > 0) {
      var filesArray = [...this.state.files];
      for (var z in this.state.savedData) {
        filesArray.splice(0, 1);
      }
      let f = new FormData();
      // console.log("this.state.RequiredCategory before api call----", this.state.RequiredCategory)
      if (descriptionCount >= validateDescriptionCount && this.state.files.length === this.state.categories.length && !this.state.categories.includes(undefined) && !this.state.textData.includes(null)) {
        self.setState({
          uploadMessage: null
        })

        var savedDataLength = 0;
        if (this.state.savedData.length) {
          savedDataLength = this.state.savedData.length;
        }
        var i = savedDataLength

        for (i in filesArray) {
          self.setState({
            showResult: true
          });
          f = new FormData();
          f.filePath = this.state.filePath;
          f.append("body", filesArray[i])

          axios.post(apiBaseUrl, f, {
            headers: {
              'content-type': 'multipart/form-data',
              'authorization': `Bearer ${localStorage.getItem('token')}` 
            },
          })
            .then((response) => {
              var msgArray = this.state.msgArray;
              var fileNameWithRandomNumberArray = this.state.fileNameWithRandomNumberArray;
              if (this.state.dropFiles == 1) {
                msgArray.push(response.data.message);
                fileNameWithRandomNumberArray.push(response.data.data.fileNameWithRandomNumber)
              }
              else {
                var msgIndex = this.state.files.findIndex(x => x.name === response.data.data.fileName);
                msgArray[msgIndex] = response.data.message;
                fileNameWithRandomNumberArray[msgIndex] = response.data.data.fileNameWithRandomNumber
              }
              this.setState({
                msgArray: msgArray,
                fileNameWithRandomNumberArray: fileNameWithRandomNumberArray
              })

              // console.log("msgArray home----", msgArray)
              var responseData = response.data.data;
              var exportData = this.state.exportData;
              exportData.push(responseData);
              self.setState({
                exportData: exportData
              })




              // console.log("this.state.dropFiles----", this.state.dropFiles)



              f.fileNameWithRandomNumber = this.state.fileNameWithRandomNumber;
              f.fileCategory = this.state.categories[i];
              f.description = this.state.textData[i];
              f.name = filesArray[i].name;
              f.userId = this.state.userId;





              // console.log("self.state.fileNameWithRandomNumberArray home", self.state.fileNameWithRandomNumberArray)
              if (this.state.files.length == self.state.fileNameWithRandomNumberArray.length && !self.state.fileNameWithRandomNumberArray.includes(undefined)) {
                self.saveFileDetails(f, i);
                self.setState({ successFileArray: [], uploaded: true })
              }
            })
            .catch(function (error) {

              var msgArray = self.state.msgArray;
              msgArray.push('Invalid SKU')
              self.setState({
                showResult: false,
                statusCode: null,
                msgArray: msgArray,
              })
              console.log("error------", error);
            });
        };
      }
      else {
        self.setState({ uploadMessage: 'Please fill mandatory fields' })
      }




    }

    else {
      swal({
        text: "Please select files first!",
        icon: "warning",
        timer: 2000,
      });
    }
  }

  saveFileDetails = (formData, i) => {

    var self = this;
    var apiBaseUrl = `${API_URL}/api/UploadFiles/SaveFileResult`;
    let filesArray1 = [...this.state.files];

    var myArr = ["1"];
    let savedArray = [];
    let categories = [...this.state.categories];
    let textData = [...this.state.textData];
    let fileNameWithRandomNumberArray = [...this.state.fileNameWithRandomNumberArray];


    if (this.state.savedData && this.state.savedData.length) {
      let savedData = this.state.savedData;
      for (var i in savedData) {
        filesArray1.splice(0, 1);
        categories.splice(0, 1);
        textData.splice(0, 1);
        fileNameWithRandomNumberArray.splice(0, 1);
      }
    }

    for (var j in filesArray1) {

      let saveData = new FormData();
      saveData.name = filesArray1[j].name;
      saveData.fileCategory = categories.length && categories[j] ? categories[j] : null;
      saveData.description = textData.length && textData[j] ? textData[j] : null;
      saveData.userId = formData.userId;
      saveData.fileNameWithRandomNumber = fileNameWithRandomNumberArray.length && fileNameWithRandomNumberArray[j] ? fileNameWithRandomNumberArray[j] : filesArray1[j].name;
      savedArray.push(saveData);
    }



    // console.log("savedArray----", savedArray)
    axios.post(apiBaseUrl, JSON.stringify(savedArray), {
      //headers: { 'Content-Type': 'application/json' }
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}` 
      },
    })
      .then((response) => {
        // console.log("response 1212----", response)
        var SavedArrayInDb = this.state.SavedArrayInDb;
        var Comments = this.state.Comments;
        for (var d in savedArray) {
          SavedArrayInDb.push(response && response.data && response.data.data && response.data.data[d] && response.data.data[d].isUploaded ? response.data.data[d].isUploaded : false);
          Comments.push(response.data.data[d].description ? response.data.data[d].description : '')
        }

        // SavedArrayInDb[i] = response.data.data[i].isUploaded
        this.setState({
          SavedArrayInDb: SavedArrayInDb,
          Comments: Comments,
          dropFiles: null
        })

        this.setState({
          showResult: false

        })

        var responseData = response.data;
        var savedData = this.state.savedData;
        // console.log("savedData response 1----", savedData)
        //savedData.push(responseData.data)
        // console.log("savedData response 2----", savedData)
        savedData = savedData.concat(responseData.data);
        // savedData.push(responseData);
        self.setState({
          savedData: savedData,
        })
      })
  }

  uploadFile = (event) => {
    let file = event.target.files[0];

    if (file) {
      let data = new FormData();
      data.append('file', file);
      // axios.post('/files', data)...
    }
  }

  filesTest = (e) => {
  }

  onchange = (e) => {
  }

  instruction = (e) => {
    e.preventDefault();
  }

  resolveJavascript() {
    return '#';
  }

  //  componentRef = useRef();

  render() {

    // console.log("this.state.files in grid--", this.state.files)
    // console.log("this.state.categories in grid--", this.state.categories)
    // console.log("this.state.comments---", this.state.Comments)

    const files =
      this.state.files.map((File, index) => (
        <tr key={File.name}>
          <td >

            <span className="filename">

              {/* {console.log("aman files array--", this.state.SavedArrayInDb)} */}


              {this.state.showResult === true && this.state.SavedArrayInDb[index] == null ?
                <Spinner size="sm" color="success" className="spinner" />
                :
                (this.state.SavedArrayInDb[index] === true) ?
                  <i className="fa fa-check" aria-hidden="true"></i>
                  :
                  (this.state.SavedArrayInDb[index] === false) ?
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                    :
                    null
              }
              {File.name}
            </span>
          </td>
          <td>


            {this.state.files[index] && File && File.name && (File.name.split('.').pop() === "jpg" || File.name.split('.').pop() === "jpeg") ?

              <Input value={this.state.categories[index]} className={this.state.categories[index] != null ? "form-control" : "form-control textArea"} type="select" disabled={(this.state.Comments[index]) || this.state.showResult ? true : false} key={File.name} key={index} onChange={(e) => this.handleChange(e, index, File.name.split('.').pop())}>
                <option value="Image" selected="true" disabled="true"> Image</option>
              </Input>

              :
              this.state.files[index] && File && File.name && (File.name.split('.').pop() === "pdf" || File.name.split('.').pop() === "PDF") ?
                <Input value={this.state.categories[index]} className={this.state.categories[index] != null ? "form-control" : "form-control textArea"} type="select" disabled={(this.state.Comments[index]) || this.state.showResult ? true : false} key={File.name} key={index} onChange={(e) => this.handleChange(e, index, File.name.split('.').pop())}>
                  <option value="Select" selected={(this.state.categories.length == 0 || this.state.categories[index] == null) ? "true" : "false"} disabled="true">Select</option>
                  <option value="Manuals" >Manuals</option>
                  <option value="Other Documents">Other Documents</option>
                </Input>
                :
                this.state.files[index] && File && (File.name && File.name.split('.').pop() === "zip" || File.name.split('.').pop() === "ZIP") ?
                  <Input value={this.state.categories[index]} className={this.state.categories[index] != null ? "form-control" : "form-control textArea"} type="select" disabled={(this.state.Comments[index]) || this.state.showResult ? true : false} key={File.name} key={index} onChange={(e) => this.handleChange(e, index, File.name.split('.').pop())}>
                    <option value="Select" selected="true" disabled="true">Select</option>
                    <option value="Firmware">Firmware</option>
                    <option value="Drivers">Drivers</option>
                    <option value="Software">Software</option>
                  </Input>
                  :
                  null
            }

          </td>
          <td>


            <span className="descriptionField" title="Description should not be longer than 50 characters">
              {/* {console.log("this.state.categories----", this.state.categories)} */}
              <input maxLength="50" type="textarea" disabled={this.state.categories[index] === 'Manuals' || !this.state.categories[index] || this.state.savedData[index] || this.state.showResult ? true : false} className={this.state.RequiredDescription[index] == null ? "form-control" : "form-control textArea"}
                value={this.state.textData[index] == null ? '' : this.state.textData[index]}
                onChange={(e) => this.textChange(e, index)} inputProps={{ maxLength: 50 }}
                placeholder="Please enter description" />
            </span>

          </td>

          <td>
            {this.state.files[index] ?
              <span> <button disabled={this.state.files.length === this.state.msgArray.length || this.state.showResult == true || this.state.msgArray[index] != null ? true : false} onClick={(e) => this.handleDeleteClick(e, index)} type="button" title="Delete" className="btn btn-danger btn-action-icon"><i className="fa fa-trash" aria-hidden="true"></i></button> </span>
              : null}
          </td>
        </tr >
      ));

    let headers = [
      { label: 'SKU', key: 'sku' },
      { label: 'File Name', key: 'name' },
      { label: 'Type', key: 'fileCategory' },
      { label: 'Description', key: 'description' },
      { label: 'Is Uploaded', key: 'isUploaded' },
      { label: 'Comments', key: 'comments' }

    ];

    let data = [];

    if (this.state.savedData && this.state.savedData.length) {
      var exportData = this.state.exportData;
      for (var i in exportData) {
        exportData[i].category = this.state.categories[i];
        exportData[i].description = this.state.textData[i];
        var x = this.state.savedData;
      }
      // console.log("this.state.categories aman stage----", this.state.categories)
      let myArr = [];

      for (var i in this.state.files) {

        let myObj = {
          'sku':
            this.state.files[i].name.split('.').slice(0, -1).join('.').replace(/ *\([^)]*\) */g, ""),
          'name': this.state.files[i].name,
          'fileCategory': this.state.categories[i],
          'description': this.state.textData[i],
          'isUploaded': this.state.SavedArrayInDb[i] === true ? 'Yes' : 'No',
          'comments': this.state.Comments[i] ? this.state.Comments[i] : 'No action performed',
        }
        myArr.push(myObj);
        myArr.sort((a, b) => (a.sku > b.sku) ? 1 : ((b.sku > a.sku) ? -1 : 0));
      }
      // console.log("my array last--", myArr)
      data = myArr;
    }
    return (
      <div className="container-fluid">
        <div className="title">
          <h1>File Uploader</h1>
        </div>
        {/* card content */}
        <div className="card card-default">
          <div className="card-body">
            <div style={{ "textAlign": "center","fontSize":"14px" }} className="container">
              Click on the SOP instruction guide below for help using the file uploader.
              </div>
              <br></br>
            <div style={{ "textAlign": "center" ,"fontSize":"14px"}} className="container">
              <span><i className="fa fa-question-circle" aria-hidden="true"></i></span>
              <a style={{ "marginLeft": "6px", "color": "#428bca" }} target="_blank" href="https://sites.google.com/view/soundaround-sop/production-new-order-sops/data-upload-review-task-sop">SOP: How to use File Uploader</a>
            </div>
            <br></br>

            <div style={{ "textAlign": "center","fontSize":"14px"}} className="container">
              <span title="Upload maximum 20 files"><i className="fa fa-info-circle" aria-hidden="true"></i></span>
              <a style={{ "marginLeft": "6px", "color": "#428bca"}} target="_blank">Upload maximum 20 files</a>
            </div>

            <div className="tab-pane fade show active" id="listmodel" role="tabpanel" aria-labelledby="listmodel-tab">
              <div className="row field-row">
                <div className="col-md-12">
                  <Dropzone onDrop={this.onDrop} disabled={this.state.showResult ? true : false} minSize={0} maxSize={20971520} accept=".jpg,.zip,.pdf">
                    {({ getRootProps, getInputProps }) => (
                      <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <div className="drag">
                            <p className="text-center dragcontent" >Drop Files here and click to upload</p>
                          </div>
                        </div>
                        <div>
                          <br />
                        </div>
                        <aside>
                          {this.state.uploadMessage != null ? <div className="alert-danger">{this.state.uploadMessage} </div> : null}

                          {this.state.files && this.state.files.length > 0 ?
                            <Table ref={el => (this.componentRef = el)} className="table table-bordered table-default mb-0 table-text-left">
                              <thead>
                                <tr>
                                  <th width="30%">File</th>
                                  <th width="20%">Type</th>
                                  <th width="40%">Description</th>
                                  <th width="10px">Action</th>
                                </tr>
                              </thead>
                              <tbody>{files}</tbody>
                            </Table>
                            :
                            null
                          }

                        </aside>
                        <br></br>
                        <br></br>

                        <Row className="row field-row justify-content-center" >
                          <Col col="6" sm="4" md="3" className="mb-3 mb-xl-0">
                            <Button block color="primary" disabled={this.state.showResult ? true : false} onClick={this.handleUploadClick.bind(this)} title={this.state.msgArray.length == this.state.files.length ? 'Please select files first' : 'Click to upload files'}  > {this.state.msgArray.length > 0 ? 'Upload More' : 'Upload'}
                            <i className="fa fa-arrow-right"></i></Button>
                          </Col>
                          <Col col="6" sm="4" md="3" className="mb-3 mb-xl-0">
                            <Button disabled={this.state.showResult ? true : false} title="Click to reset file grid" block color="dark" onClick={this.handleReset.bind(this)}>Reset</Button>
                          </Col>
                          <Col col="6" sm="4" md="3" className="mb-3 mb-xl-0">

                            {this.state.savedData && this.state.savedData.length && !this.state.showResult ?
                              <CSVLink data={data} title="Export" aria-hidden="true" style={{ "color": "white" }} filename={'UploadedFiles.csv'}
                                target="_blank" headers={headers}>
                                <Button block color="success">
                                  Export
                        </Button>
                              </CSVLink>
                              :
                              <Button block color="success" disabled={true}> Export
                          </Button>
                            }
                          </Col>

                        </Row>

                      </section>
                    )}
                  </Dropzone>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

// const selector = formValueSelector('loginForm');
function mapStateToProps(state) {
  let initialData = {
    rememberme: true,
  };
  return {
    authenticating: state.login.authenticating,
    errorMessage: state.login.errorMessage,
    initialValues: initialData,
  };
}
export default connect(mapStateToProps, {})(Basic);
