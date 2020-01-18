import React, { Component } from 'react'

import { Row, Col, Input, FormGroup, Label, Form, Tooltip, Table, Button, Card, CardHeader, CardBody, Spinner } from 'reactstrap';
import './Shipping.css';
import { AutoComplete } from 'primereact/autocomplete';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import swal from 'sweetalert';
import { CSVLink } from "react-csv";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import CSVReader from 'react-csv-reader'
import SimpleReactValidator from 'simple-react-validator';
import { API_URL } from '../../../actions/utilAction';
import { Growl } from 'primereact/growl';
import axios from 'axios';
import index from 'popper.js';
import { transcode } from 'buffer';
import ReactExport from 'react-data-export';

const headers = [
  { label: "Item Number", key: "Item Number" },
]
const tableHeader = [
  { label: "Name", key: "Name" },
  { label: "Length", key: "Length" },
  { label: "Width", key: "Width" },
  { label: "Height", key: "Height" },
  { label: "Weight", key: "Weight" },
]
// const handleForce = data => {
//   console.log(data);
// };
const CSVData = [];
export default class Colors extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: message => <div className="text-danger"  >{message}</div>
    });
    this.state = {
      Single: true,
      ListOfModelNumber: false,
      importCsv: false,
      importManualDims: false,
      showResult: true,
      textData: false,
      tooltipOpen: false,
      emailField: false,
      rows: [],
      tabledData: false,
      modelNumber: '',
      selectZone: '90280',
      email: '',
      file: '',
      ZoneModelNumber: [],
      data: [],
      selectedZone: [],
      ExportGridResponse: [],
      modelsLoading: false,
      // zoneValues: [],
      fileData: null,
      Name: [],
      Length: [],
      Width: [],
      Height: [],
      Weight: [],
      NameCsv: [],
      LengthCsv: [],
      WidthCsv: [],
      HeightCsv: [],
      WeightCsv: [],
      savedArray: [],
      savedCsvArray: [],
      Checked: true,
      dimensionsArray: [],

    };
  }
  handleForce = (data) => {
    this.setState({
      data: data
    })
  };

  //radio button 1

  componentDidMount = () => {
    debugger
    const zoneValuesApi = `${API_URL}/api/ShippingQuotes/GetZoneValues`;
    axios.get(zoneValuesApi)
      .then(res => {
        let zoneValues = this.state.zoneValues;
        let lengthObj = res.data.data.length;
        res.data.data.splice(lengthObj - 1, 1);
        // res.data.data.forEach(element => {
        //   ExportGridResponse.push(element.model);
        // });

        this.setState({
          zoneValues: res.data.data,
        });


        console.log(this.state.zoneValues, "single button api data")
      })
  }

  hideShow = () => {
    this.validator.hideMessages();
    this.forceUpdate();
    this.setState({
      showResult: true,
      emailField: false,
      textData: false,
      importCsv: false,
      email: null,
      modelNumber: null,
      Single: true,
      ListOfModelNumber: false,
      importCsv: false,
      importManualDims: false,
      ExportGridResponse: false,
      data: [],
      rows: [],
      file: null,
      Checked: true,
      fileData: null,
      dimensionsArray: [],
      savedArray: [],
      Name: [],
      Length: [],
      Width: [],
      Height: [],
      Weight: [],
      NameCsv: [],
      LengthCsv: [],
      WidthCsv: [],
      HeightCsv: [],
      WeightCsv: [],

    });
  }
  //radio button 2

  textHideShow = () => {
    this.validator.hideMessages();
    this.forceUpdate();
    this.setState({
      textData: true,
      showResult: false,
      emailField: false,
      importCsv: false,
      selectedZone: null,
      email: null,
      Single: false,
      ListOfModelNumber: true,
      importCsv: false,
      importManualDims: false,
      ExportGridResponse: false,
      data: [],
      rows: [],
      selectedZone: [],
      file: null,
      fileData: null,
      Checked: false,
      dimensionsArray: [],
      savedArray: [],
      Name: [],
      Length: [],
      Width: [],
      Height: [],
      Weight: [],
      NameCsv: [],
      LengthCsv: [],
      WidthCsv: [],
      HeightCsv: [],
      WeightCsv: [],

    });
  }

  //radio button 3

  emailHideShow = (event) => {
    this.validator.hideMessages();
    this.forceUpdate();
    this.setState({
      emailField: true,
      showResult: false,
      textData: false,
      selectedZone: null,
      modelNumber: null,
      Single: false,
      ListOfModelNumber: false,
      importCsv: true,
      importManualDims: false,
      data: [],
      rows: [],
      selectedZone: [],
      Checked: false,
      dimensionsArray: [],
      savedArray: [],
      Name: [],
      Length: [],
      Width: [],
      Height: [],
      Weight: [],
      NameCsv: [],
      LengthCsv: [],
      WidthCsv: [],
      HeightCsv: [],
      WeightCsv: [],

    });
  }
  //radio button 4
  tableShow = () => {
    this.validator.hideMessages();
    this.forceUpdate();
    this.setState({
      tabledData: true,
      emailField: false,
      showResult: false,
      textData: false,
      selectedZone: null,
      modelNumber: null,
      Single: false,
      ListOfModelNumber: false,
      importCsv: false,
      importManualDims: true,
      ExportGridResponse: [],
      selectedZone: [],
      file: null,
      fileData: null,
      Checked: false,
      dimensionsArray: [],
      savedArray: [],
      Name: [],
      Length: [],
      Width: [],
      Height: [],
      Weight: [],
      NameCsv: [],
      LengthCsv: [],
      WidthCsv: [],
      HeightCsv: [],
      WeightCsv: [],

    });
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }
  // function to add a new row 

  addRow = (event) => {
    event.preventDefault();
    var rows = this.state.rows
    rows.push('')
    this.setState({
      rows: rows,
    });
  }

  // function for validation

  formValidation = (e) => {
    console.log("this.state.Name----", this.state.Name)

    if (this.state.Single || this.state.importManualDims || this.state.ListOfModelNumber) {
      this.validator.fields.email = true;
      this.validator.fields.file = true;
    }
    else {
      this.validator.fields.email = this.state.email ? true : false;
      this.validator.fields.file = this.state.file ? true : false;

    }

    //  if(!this.state.selectZone || this.state.selectZone === ) {
    //   this.setState({
    //     selectZone: '90280'
    //   })
    //  }

    debugger
    e.preventDefault()
    if (this.validator.allValid()) {
      let authData =
        {
          // selectZone: this.state.selectZone,
          email: this.state.email
        }
      console.log(this.state.selectedZone, "hhjfgbdjhfg")



      console.log(modelNumbers, "models")

      var apiBaseUrl = `${API_URL}/api/ShippingQuotes/SaveShippingData`;
      var singleBaseApiUrl = `${API_URL}/api/ShippingQuotes/GetNegotiatedRates?modelNumbers=${modelNumbers}&shipToZipCode=${this.state.selectZone}`;
      var CsvImportApiUrl = `${API_URL}/api/ShippingQuotes/UploadShippingFiles`;
      let formData = new FormData();
      formData.shippingZone = this.state.selectZone;
      formData.email = this.state.email;
      // formData.fileName = this.state.file;

      console.log(formData);


      //Api call to click on third radio button 
      if (this.state.importCsv === true) {
        debugger
        this.setState({
          modelsLoading: true
        })
        axios.post(apiBaseUrl, JSON.stringify(formData), {
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(response => {
            console.log("response", response)
            if (response.data.statusCode == 200) {
              let formData1 = new FormData();

              formData1.append("body", this.state.fileData)
              axios.post(CsvImportApiUrl, formData1, {
                headers: {
                  'content-type': 'multipart/form-data'
                }
              })
                .then(response => {
                  if (response.data.statusCode == 200) {
                    this.setState({
                      modelsLoading: false,
                      email: null,
                      file: null
                    })
                    this.growl.show({ severity: 'success', summary: response.data.message });

                  }
                  else {
                    this.growl.show({ severity: 'error', summary: 'Error Message' });
                  }
                })
            }
          })
          .catch(error => {
            console.log(error);
          })
      }

      // api call to click on first radio button 
      else if (this.state.Single || this.state.ListOfModelNumber) {
        debugger
        // if(this.state.selectedZone.length == 0) {
        //   let x = this.state.selectedZone;
        //   x.push(this.state)
        // }
        var modelNumbers = this.state.Single ? this.state.selectedZone.toString() : this.state.modelNumber.toUpperCase();
        modelNumbers = `,${modelNumbers},`
        modelNumbers = modelNumbers.split('\n')
        var singleBaseApiUrl = `${API_URL}/api/ShippingQuotes/GetNegotiatedRates?modelNumbers=${modelNumbers}&shipToZipCode=${this.state.selectZone}`;

        this.setState({
          modelsLoading: true
        })
        axios.get(singleBaseApiUrl)
          .then(res => {
            let ExportGridResponse = this.state.ExportGridResponse;
            // res.data.data.forEach(element => {
            //   ExportGridResponse.push(element.model);
            // });
            console.log(res, "response")

            this.setState({
              ExportGridResponse: res.data.data.listUPSAPICustomResponseViewModel,
              modelsLoading: false
            });
            console.log(this.state.ZoneModelNumber, "ZoneModelNumber");
            console.log(this.state.ExportGridResponse, "single button api data")
          })
      }

      else if (this.state.importManualDims) {
        debugger
        // this.setState({
        //   savedArray: []
        // })
        var importDimApiUrl = `${API_URL}/api/ShippingQuotes/FetchRatesForManaulDims?shipToZipCode=${this.state.selectZone}`;
        var savedArray = [];
        for (var i in this.state.rows) {
          var saveObj = {
            'name': this.state.Name[i],
            'length': this.state.Length[i],
            'width': this.state.Width[i],
            'height': this.state.Height[i],
            'weight': this.state.Weight[i]
          }
          savedArray.push(saveObj);
        }

        let savedCsvArray = [...this.state.data];
        savedCsvArray.splice(0, 1);
        let csvDataLength = savedCsvArray.length;
        savedCsvArray.splice(csvDataLength - 1, 1);

        let myData = [];
        for (var i in savedCsvArray) {
          var saveCsvObj = {
            'name': savedCsvArray[i][0],
            'length': savedCsvArray[i][1],
            'width': savedCsvArray[i][2],
            'height': savedCsvArray[i][3],
            'weight': savedCsvArray[i][4]
          }
          myData.push(saveCsvObj);
        }

        this.setState({
          savedArray: savedArray,
          savedCsvArray: savedCsvArray
        })

        var dimensionsArray = myData.concat(savedArray);

        for (var i = 0; i < dimensionsArray.length; i++) {
          if (dimensionsArray[i].name === undefined) {
            dimensionsArray.splice(i, 1);
            i--;
          }
        }

        let formData = new FormData();
        formData.manualDimsJSON = dimensionsArray;
        // formData.shipToZipCode = this.state.selectZone;


        console.log("formData----", JSON.stringify(formData))



        if (dimensionsArray.length > 0) {
          debugger
          this.setState({
            modelsLoading: true,
            dimensionsArray: dimensionsArray
          })

          axios.post(importDimApiUrl, JSON.stringify(dimensionsArray), {
            headers: {
              'content-type': 'application/json',
            },
          })
            .then(response => {
              console.log("fourth tab response", response)

              if (response.data.statusCode == 200) {
                console.log(response, "aman")

                this.setState({
                  ExportGridResponse: response.data.data.listUPSAPICustomResponseViewModel,
                  modelsLoading: false,
                  // Name:null,
                  // Length:null,
                  // Width:null,
                  // Height:null,
                  // Weight:null,
                })

              }
            })
            .catch(error => {
              console.log(error);
            })
        }
        else if (this.state.data.length === 0 || this.state.rows.length === 0) {
          this.growl.show({ severity: 'error', summary: 'Please enter data' });

        }


      }





      // console.log(authData);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }

  }

  // get the modelnumber from state and set into State
  handleChange = (event) => {

    var modelsNumber = event.target.value
    // modelsNumber.push(event.target.value);
    this.setState({
      modelNumber: modelsNumber
    });
    console.log(modelsNumber);
  }
  //get the zone from dropdown
  shippingZoneChange = (event) => {
    this.setState({
      selectZone: event.target.value
    });
  }
  // get the email using state
  handleEmailChange = (event) => {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
    }
    this.setState({
      email: event.target.value
    })
  }
  //get the file 
  handleFileChange = (event) => {
    debugger
    var filePath = event.target.value;
    var fileData = event.target.files[0];
    var fileName = filePath.replace(/^.*[\\\/]/, '');
    this.setState({
      file: fileName,
      fileData: fileData
    })
  }

  //api call to getting model number 
  handleModelNumberChange = (e) => {
    console.log(e, "value at fun");
    axios.get(`${API_URL}/api/ShippingQuotes/GetModelNumbers?modelNumber=${e.query}`)
      .then(res => {
        let ZoneModelNumber = [];
        res.data.data.forEach(element => {
          ZoneModelNumber.push(element.model);
        });

        this.setState({
          ZoneModelNumber: ZoneModelNumber
        });
        console.log(this.state.ZoneModelNumber, "ZoneModelNumber");
      })

  }
  //function  delete the row 
  handleRowDelete = (e, index) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          let newCategories = this.state.rows;
          // let el = newCategories[index];

          console.log(newCategories, index, this.state.Name, "index +++");
          if (this.state.rows.length > -1) {
            this.state.Weight.splice(index, 1);
            this.state.Width.splice(index, 1);
            this.state.Height.splice(index, 1);
            this.state.Length.splice(index, 1);
            this.state.Name.splice(index, 1);
            newCategories.splice(index, 1);
          }
          this.setState({
            Name: this.state.Name,
            Length: this.state.Length,
            Width: this.state.Width,
            Height: this.state.Height,
            Weight: this.state.Weight,
            rows: newCategories,
          }, () => {
            console.log(
              this.state, "fffff"
            );
          })
          // let datas=this.state.rows.filter((e,i)=>i !==index);
          // this.setState({
          //   rows:datas
          // });
        }
      });
  }
  handleSelect = (e) => {
    console.log(e.target.value, "ee");
    // this.state.selectedZone.push(e.value);
    const sZone = e.value;
    // sZone.push(e.value);
    this.setState({
      selectedZone: e.value
    }, () => {
      console.log(this.state.selectedZone, "ssssssssssssss")
    })
  }

  handleRowDeleteInfo = (e, event) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          var newCategories = this.state.data;

          // var el = newCategories[event];
          console.log(newCategories, event, "event");
          if (this.state.data.length > 0) {
            newCategories.splice(event, 1);
          }

          this.setState({
            data: newCategories
          })
        }
      });
  }
  //Fourth radio button onChange functions
  handleNameChange = (e, i) => {
    e.preventDefault();
    var Names = this.state.Name;
    Names[i] = e.target.value;
    this.setState({
      Name: Names
    })
  }

  handleLengthChange = (e, i) => {
    debugger
    const re = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
    if (re.test(e.target.value)) {
      var Lengths = this.state.Length;
      // console.log(this.state.Length, "lenghtsssssss");
      Lengths[i] = e.target.value;
      this.setState({
        Length: Lengths
      })
    }

  }

  handleWidthChange = (e, i) => {
    const re = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
    if (re.test(e.target.value)) {
      var width = this.state.Width;
      width[i] = e.target.value;
      this.setState({
        Width: width
      })
    }
  }

  handleHeightChange = (e, i) => {
    const re = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
    if (re.test(e.target.value)) {
      var height = this.state.Height;
      height[i] = e.target.value;
      this.setState({
        Height: height
      })
    }

  }

  handleWeightChange = (e, i) => {
    const re = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
    if (re.test(e.target.value)) {
      var weight = this.state.Weight;
      weight[i] = e.target.value;
      this.setState({
        Weight: weight
      })
    }

  }



  handleNameCsvChange = (e, i) => {
    e.preventDefault();
    debugger
    var NameCsv = this.state.NameCsv;
    NameCsv[i] = e.target.value;
    var data = this.state.data;
    data[i][0] = e.target.value;
    this.setState({
      NameCsv: NameCsv,
      data: data
    })
    console.log("this.state.NameCsv----", this.state.NameCsv)
  }

  handleLengthCsvChange = (e, i) => {
    // if(e.target.value === '') {
    //   e.target.value = 0
    // }
    const re = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
    if (re.test(e.target.value)) {
      var LengthCsv = this.state.LengthCsv;
      var data = this.state.data;
      data[i][1] = e.target.value;
      this.setState({
        LengthCsv: LengthCsv,
        data: data
      })

    }


  }

  handleWidthCsvChange = (e, i) => {
    const re = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
    if (re.test(e.target.value)) {
      var WidthCsv = this.state.WidthCsv;
      WidthCsv[i] = e.target.value;
      var data = this.state.data;
      data[i][2] = e.target.value;
      this.setState({
        WidthCsv: WidthCsv,
        data: data
      })
    }

  }

  handleHeightCsvChange = (e, i) => {
    const re = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
    if (re.test(e.target.value)) {
      var HeightCsv = this.state.HeightCsv;
      HeightCsv[i] = e.target.value;
      var data = this.state.data;
      data[i][3] = e.target.value;
      this.setState({
        HeightCsv: HeightCsv,
        data: data
      })
    }

  }

  handleWeightCsvChange = (e, i) => {
    const re = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
    if (re.test(e.target.value)) {
      var WeightCsv = this.state.WeightCsv;
      WeightCsv[i] = e.target.value;
      var data = this.state.data;
      data[i][4] = e.target.value;
      this.setState({
        WeightCsv: WeightCsv,
        data: data
      })
    }

  }


  render() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

    let headers = [
      { label: 'MODEL', key: 'model' },
      { label: 'UPS GROUND', key: 'upsGround' },
      { label: 'UPS SUREPOST', key: 'upsSurePost' },
      { label: 'USPS FC', key: 'uspsFirstClass' },
      { label: 'USPS PRIORITY', key: 'uspsPriority' },
      { label: 'LENGTH', key: 'length' },
      { label: 'WIDTH', key: 'width' },
      { label: 'HEIGHT', key: 'height' },
      { label: 'WEIGHT', key: 'weight' },
      { label: 'LAND', key: 'land' },
      { label: 'CASE', key: 'case' },
      { label: 'COMMENTS', key: 'comments' },
    ];
    let data = this.state.ExportGridResponse;


    let exportCustomData = [];
    for (var i in this.state.ExportGridResponse) {

      exportCustomData.push([]);
    }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    debugger

    for (var x in exportCustomData) {
      debugger
      console.log("data----", data)
      let smallest = Math.min(data[x].upsGround, data[x].upsSurePost, data[x].uspsFirstClass, data[x].uspsPriority);
      let smallestExcludingNA = Math.min(data[x].upsGround, data[x].upsSurePost, data[x].uspsPriority);

      var myObj = {
        value: data[x].model,
      }
      var myObj2 = {
        value: formatter.format(data[x].upsGround), style: {
          fill: {
            patternType: "solid", numFmt: "$ #,##0.00", fgColor: {
              rgb:
              (data[x].weight > 1 && data[x].upsGround == smallestExcludingNA && data[x].upsGround != 0) || (data[x].weight < 1 && data[x].upsGround == smallest && data[x].upsGround != 0) ?
                "5cb85c" : "FFFFFF"
            }
          }
        },
      }
      var myObj3 = {
        value: data[x].upsSurePost, style: {
          fill: {
            patternType: "solid", fgColor: {
              rgb:
              (data[x].weight > 1 && data[x].upsSurePost == smallestExcludingNA && data[x].upsSurePost != 0) || (data[x].weight < 1 && data[x].upsSurePost == smallest && data[x].upsSurePost != 0) ?
                "5cb85c" : "FFFFFF"
            }
          }
        },
      }
      var myObj4 = {
        value: data[x].uspsFirstClass, style: {
          fill: {
            patternType: "solid", fgColor: {
              rgb:
              (data[x].weight > 1 && data[x].uspsFirstClass == smallestExcludingNA && data[x].uspsFirstClass != 0) || (data[x].weight < 1 && data[x].uspsFirstClass == smallest && data[x].uspsFirstClass != 0)
                ? "5cb85c" : "FFFFFF"
            }
          }
        },
      }
      var myObj5 = {
        value: data[x].uspsPriority, style: {
          fill: {
            patternType: "solid", fgColor: {
              rgb:
              (data[x].weight > 1 && data[x].uspsPriority == smallestExcludingNA && data[x].uspsPriority != 0) || (data[x].weight < 1 && data[x].uspsPriority == smallest && data[x].uspsPriority != 0)
                ? "5cb85c" : "FFFFFF"
            }
          }
        },
      }
      var myObj6 = {
        value: data[x].length,
      }
      var myObj7 = {
        value: data[x].width,
      }
      var myObj8 = {
        value: data[x].height,
      }
      var myObj9 = {
        value: data[x].weight, style: {
          fill: {
            patternType: "solid", fgColor: {
              rgb:
              (data[x].weight < 1)
                ? "ADD8E6" : "FFFFFF"
            }
          }
        }
      }
      var myObj10 = {
        value: data[x].land,
      }
      var myObj11 = {
        value: data[x].case,
      }
      var myObj12 = {
        value: data[x].comments,
      }
      exportCustomData[x].push(myObj)
      exportCustomData[x].push(myObj2);
      exportCustomData[x].push(myObj3)
      exportCustomData[x].push(myObj4)
      exportCustomData[x].push(myObj5)
      exportCustomData[x].push(myObj6)
      exportCustomData[x].push(myObj7)
      exportCustomData[x].push(myObj8)
      exportCustomData[x].push(myObj9)
      exportCustomData[x].push(myObj10)
      exportCustomData[x].push(myObj11)
      exportCustomData[x].push(myObj12)
    }

    console.log("exportCustomData----", exportCustomData)


    // const multiDataSet = [
    //   {
    //     columns: [
    //       {title: "Headings", width: {wpx: 80}},//pixels width 
    //       {title: "Text Style", width: {wch: 40}},//char width 
    //       {title: "Colors", width: {wpx: 90}},
    //   ],
    //   data: exportCustomData

    //   }
    // ]

    const multiDataSet = [
      {
        columns: [
          { title: "MODEL", width: { wpx: 80 } },//pixels width 
          { title: "UPS GROUND", width: { wpx: 80 } },//char width 
          { title: "UPS SUREPOST", width: { wpx: 90 } },
          { title: "USPS FC", width: { wpx: 90 } },
          { title: "USPS PRIORITY", width: { wpx: 90 } },
          { title: "LENGTH", width: { wpx: 90 } },
          { title: "WIDTH", width: { wpx: 90 } },
          { title: "HEIGHT", width: { wpx: 90 } },
          { title: "WEIGHT", width: { wpx: 90 } },
          { title: "LAND", width: { wpx: 90 } },
          { title: "CASE", width: { wpx: 90 } },
          { title: "COMMENTS", width: { wpx: 90 } },
        ],
        data:

        exportCustomData

      }
    ];

    return (
      <div className="animated fadeIn">
        <Growl style={{ marginTop: "95px" }} ref={(el) => this.growl = el} />
        <div className="card">
          <div className="card-header">
            <h3>Shipping Quote</h3>
          </div>
          <div className="card-body">
            <Row>
              <Col sm={2}></Col>
              <Col sm={8}>
                <Form>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" onClick={this.hideShow.bind(this)} checked={this.state.Checked} />
                    <Label className="form-check-label" check htmlFor="inline-radio1" ><strong>Single</strong></Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" onClick={this.textHideShow.bind(this)} />
                    <Label className="form-check-label" check htmlFor="inline-radio2"><strong>List of Model No.</strong></Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3" onClick={this.emailHideShow.bind(this)} />
                    <Label className="form-check-label" check htmlFor="inline-radio3"><strong>Import CSV</strong></Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3" onClick={this.tableShow.bind(this)} />
                    <Label className="form-check-label" check htmlFor="inline-radio3"><strong>Input/Import Manual Dims</strong></Label>
                  </FormGroup>
                  <FormGroup row className="Select-ship ">
                    <Label for="exampleSelect" sm={4} className="font-color ">Select Ship-To Zone</Label>
                    <Col sm={6}>
                      <Input type="select" name="select" value={this.state.selectZone} onChange={this.shippingZoneChange.bind(this)} >
                        <option value="90280" selected >Zone 8</option>

                        {this.state.zoneValues && this.state.zoneValues.length ?
                          this.state.zoneValues.map((obj, index) => {


                            console.log("obj-----", obj)
                            return (
                              <option key={index} value={obj.value}>
                                {obj.key}
                              </option>
                            )

                          })

                          : null
                        }



                      </Input>
                      <div className="textSet">{this.validator.message('select', this.state.selectZone, 'required')}</div>
                    </Col>
                  </FormGroup>
                  {
                    this.state.textData == true ?
                      <div>
                        <FormGroup row>
                          <Label for="exampleText" sm={4} className="font-color" >Model Number</Label>
                          <Col sm={6}>
                            <Input type="textarea" name="text" id="exampleText" value={this.state.modelNumber} onChange={this.handleChange.bind(this)}
                              disabled={this.state.modelsLoading === true} />
                            <span title="Please input of maximum 50 Model Numbers!" >
                              <i className="fa fa-info-circle" id="TooltipExample" aria-hidden="true"></i>
                            </span>
                          </Col>
                        </FormGroup>
                      </div> :
                      this.state.emailField == true ?
                        <div>
                          <FormGroup row>
                            <Label for="exampleEmail" sm={4} className="font-color">Email Address</Label>
                            <Col sm={6}>
                              <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email please"
                                value={this.state.email}
                                onChange={this.handleEmailChange.bind(this)}
                              />
                              <div className="textSet">   {this.validator.message('email', this.state.email, 'required|email')}</div>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="exampleFile" sm={4} className="font-color">Upload File To Get Rates</Label>
                            <Col sm={6}>
                              <Input type="file" name="file" id="exampleFile" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={this.handleFileChange} />
                              <div className="textSet">   {this.validator.message('file', this.state.file, 'required|file')}</div>

                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col sm={4}></Col>
                            <Col sm={6}>
                              <CSVLink data={CSVData} headers={headers} filename="ImportItemsTemplate.csv">
                                <strong>Sample CSV Template</strong>
                              </CSVLink>
                            </Col>
                          </FormGroup>
                        </div> :
                        this.state.showResult == true ?
                          <div>
                            <FormGroup row>
                              <Label for="exampleSelect" sm={4} className="font-color">Model Number</Label>
                              <Col sm={6}>

                                {/* this.setState({ ZoneModelNumber: e.value }) */}

                                <AutoComplete
                                  onChange={(e) => this.handleSelect(e)}
                                  value={this.state.selectedZone}
                                  size={30}
                                  minLength={1}
                                  required={true}
                                  className="p-autocomplete"
                                  suggestions={this.state.ZoneModelNumber}
                                  multiple={true}
                                  completeMethod={(e) => this.handleModelNumberChange(e)}
                                />
                              </Col>

                            </FormGroup>
                          </div>
                          : this.state.tabledData == true ?
                            <div>
                              <FormGroup row>
                                <Label for="exampleFile" sm={4} className="font-color">Upload File To Get Rates</Label>
                                <Col sm={6}>
                                  <CSVReader
                                    cssClass="react-csv-input"
                                    onFileLoaded={this.handleForce}
                                  />
                                  {/* <Input type="file" name="file" id="exampleFile" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={this.handleFileChange} />
                                  <div className="textSet">   {this.validator.message('file', this.state.file, 'required|file')}</div> */}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col sm={4}></Col>
                                <Col sm={6}>
                                  <CSVLink data={CSVData} headers={tableHeader} filename="ImportCustomDimsTemplate.csv">
                                    <strong>Sample CSV Template</strong>
                                  </CSVLink>
                                </Col>
                              </FormGroup>
                              <Row  >
                                <Col col="4" sm="4" md="3" className="mb-3 mb-xl-0">
                                  < Button block onClick={this.addRow} color="primary"><strong>Add new row</strong></Button>
                                </Col >
                              </Row>
                              <Table responsive bordered size="sm">
                                <thead>
                                  <tr>
                                    <th width="20%">Name</th>
                                    <th width="15%">Length</th>
                                    <th width="15%">Width</th>
                                    <th width="15%">Height</th>
                                    <th width="15%">Weight</th>
                                    <th width="20%">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {console.log("this.state.data----", this.state.data)}
                                  {this.state.data.map((data, index) => {
                                    debugger
                                    var x = this.state.data.length;
                                    x = x - 1;
                                    console.log("x----", x)
                                    if (index > 0 && index != x) {
                                      return (
                                        <tr key={index}>
                                          <td width="20%">{<input maxLength="30" type="text" value={data[0]} className="form-control text-width" onChange={(e) => this.handleNameCsvChange(e, index)}></input>}</td>
                                          <td width="15%">{<input title="Please enter numbers only" maxLength="6" type="text" pattern="[0-9]*" value={data[1]} className="form-control text-width" onChange={(e) => this.handleLengthCsvChange(e, index)}></input>}</td>
                                          <td width="15%">{<input title="Please enter numbers only" maxLength="6" type="text" pattern="[0-9]*" value={data[2]} className="form-control text-width" onChange={(e) => this.handleWidthCsvChange(e, index)}></input>}</td>
                                          <td width="15%">{<input title="Please enter numbers only" maxLength="6" type="text" pattern="[0-9]*" value={data[3]} className="form-control text-width" onChange={(e) => this.handleHeightCsvChange(e, index)}></input>}</td>
                                          <td width="15%">{<input title="Please enter numbers only" maxLength="6" type="text" pattern="[0-9]*" value={data[4]} className="form-control text-width" onChange={(e) => this.handleWeightCsvChange(e, index)}></input>}</td>

                                          <td width="20%">
                                            < button size="sm" type="button" className="btn-Delete" onClick={(e) => this.handleRowDeleteInfo(e, index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                          </td>
                                        </tr>
                                      )
                                    }

                                  })}
                                  {console.log(this.state.Length, "lenghtsssssss")}

                                  {this.state.rows.map((r, index) => (
                                    <tr key={r.index}>
                                      <td width="20%">{r}{<input maxLength="30" value={this.state.Name[index]} type="text" className="form-control text-width" onChange={(e) => this.handleNameChange(e, index)}></input>}</td>
                                      <td width="15%">{r}{<input title="Please enter numbers only" maxLength="6" pattern="[0-9]*" value={this.state.Length.length ? this.state.Length[index] : ''} type="text" className="form-control text-width" onChange={(e) => this.handleLengthChange(e, index)}></input>}</td>
                                      <td width="15%">{r}{<input title="Please enter numbers only" maxLength="6" pattern="[0-9]*" value={this.state.Width.length ? this.state.Width[index] : ''} type="text" className="form-control text-width" onChange={(e) => this.handleWidthChange(e, index)} ></input>}</td>
                                      <td width="15%">{r}{<input title="Please enter numbers only" maxLength="6" pattern="[0-9]*" value={this.state.Width.length ? this.state.Height[index] : ''} type="text" className="form-control text-width" onChange={(e) => this.handleHeightChange(e, index)}></input>}</td>
                                      <td width="15%">{r}{<input title="Please enter numbers only" maxLength="6" pattern="[0-9]*" value={this.state.Weight.length ? this.state.Weight[index] : ''} type="text" className="form-control text-width" onChange={(e) => this.handleWeightChange(e, index)}></input>}</td>
                                      <td width="20%">
                                        < button size="sm" type="button" className="btn-Delete" onClick={(e) => this.handleRowDelete(e, index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div> : null
                  }
                  <div>
                    {this.state.importCsv === true ?


                      <Row className="align-items-center justify-content-center" >
                        <Col col="6" sm="4" md="2" className="mb-3 mb-xl-0">
                          < Button block type="submit" onClick={this.formValidation.bind(this)} color="success"><strong>Submit </strong></Button>
                        </Col >
                      </Row> :
                      <Row className="align-items-center justify-content-center">
                        <Col col="4" sm="4" md="4" className="mb-3 mb-xl-0">
                          <Button block type="button" onClick={this.formValidation.bind(this)} color="primary"
                            disabled={(this.state.selectedZone && this.state.selectedZone.length === 0 && this.state.Single) || (this.state.ListOfModelNumber && !this.state.modelNumber)}><strong>Get Shipping Rate</strong></Button>
                        </Col>
                      </Row>

                    }
                  </div>
                </Form>
              </Col>
            </Row>

            {this.state.modelsLoading === true ?
              <Row className="align-items-center justify-content-center">
                <Col col="" sm="4" md="1" className="mb-3 mb-xl-0">
                  <Spinner type="grow" color="primary" />
                </Col>
              </Row>
              : null
            }


            {this.state.ExportGridResponse && this.state.ExportGridResponse.length && (this.state.Single || this.state.ListOfModelNumber || this.state.importManualDims) ?
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      Export of Negotiated Rates
                    </CardHeader>
                    <CardBody>
                      <Row  >
                        <Col col="3" sm="3" md="2" >
                          <ExcelFile element={<button>Export</button>}>
                            <ExcelSheet dataSet={multiDataSet} name="Organization" />
                          </ExcelFile>
                          {/* < Button block color="success"><CSVLink data={data} title="Export" aria-hidden="true" style={{ "color": "white" }} filename={'UploadedFiles.csv'}
                            target="_blank" headers={headers}> Export
                            </CSVLink></Button> */}
                        </Col >
                      </Row>
                      <Table bordered striped responsive size="sm">
                        <thead>
                          <tr>
                            <th>Model</th>
                            <th>UPS Ground</th>
                            <th>UPS SurePost</th>
                            <th>USPS FC</th>
                            <th>USPS Priority</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Land</th>
                            <th>Case</th>
                            <th>Comments</th>
                          </tr>
                        </thead>
                        {/* <tbody>
                          {this.state.ExportGridResponse.map((data, index) => (
                            <tr key={index}>
                              <td>{data.model}</td>
                              <td className={data.upsGround < data.upsSurePost && data.upsGround < data.uspsFirstClass && data.upsGround < data.uspsPriority ? "customColor" : ""}>${data.upsGround || 'N/A'}</td>
                              <td className={data.upsSurePost < data.upsGround && data.upsSurePost < data.uspsPriority && data.upsSurePost < data.uspsFirstClass ? "customColor" : ""}>${data.upsSurePost || 'N/A'}</td>
                              <td className={data.uspsFirstClass < data.upsGround && data.uspsFirstClass < data.upsSurePost && data.uspsFirstClass < data.uspsPriority ? "customColor" : ""}>{data.uspsFirstClass || 'N/A'}</td>
                              <td className={data.uspsPriority < data.upsGround && data.uspsPriority < data.upsSurePost && data.uspsPriority < data.uspsFirstClass ? "customColor" : ""}>${data.uspsPriority || 'N/A'}</td>
                              <td>{data.length}</td>
                              <td>{data.width}</td>
                              <td>{data.height}</td>
                              <td>{data.weight}</td>
                              <td>${data.land || 'N/A'}</td>
                              <td>{data.case}</td>
                              <td>{data.comments}</td>
                            </tr>
                          ))}
                        </tbody> */}

                        <tbody>
                          {this.state.ExportGridResponse.map((data, index) => {
                            let smallest = Math.min(data.upsGround, data.upsSurePost, data.uspsFirstClass, data.uspsPriority);
                            let smallestExcludingNA = Math.min(data.upsGround, data.upsSurePost, data.uspsPriority);
                            //console.log(smallest, "smalllest number");

                            return (
                              <tr key={index}>
                                <td>{data.model}</td>
                                <td className={(data.weight > 1 && data.upsGround == smallestExcludingNA && data.upsGround != 0) || (data.weight < 1 && data.upsGround == smallest && data.upsGround != 0) ? "customColor" : ""}>${data.upsGround || 'N/A'}</td>
                                <td className={(data.weight > 1 && data.upsSurePost == smallestExcludingNA && data.upsSurePost != 0) || (data.weight < 1 && data.upsSurePost == smallest && data.upsSurePost != 0) ? "customColor" : ""}>${data.upsSurePost || 'N/A'}</td>
                                <td className={(data.weight > 1 && data.uspsFirstClass == smallestExcludingNA && data.uspsFirstClass != 0) || (data.weight < 1 && data.uspsFirstClass == smallest && data.uspsFirstClass != 0) ? "customColor" : ""}>${data.uspsFirstClass || 'N/A'}</td>
                                <td className={(data.weight > 1 && data.uspsPriority == smallestExcludingNA && data.uspsPriority != 0) || (data.weight < 1 && data.uspsPriority == smallest && data.uspsPriority != 0) ? "customColor" : ""}>${data.uspsPriority || 'N/A'}</td>
                                <td>{data.length}</td>
                                <td>{data.width}</td>
                                <td>{data.height}</td>
                                <td className={data.weight < 1 ? "weightColor" : ""} >{data.weight}</td>
                                <td>${data.land || 'N/A'}</td>
                                <td>{data.case}</td>
                                <td>{data.comments}</td>
                              </tr>
                            )
                          })}


                        </tbody>

                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              : null
            }

          </div>
        </div>
      </div>
    )
  }
}
