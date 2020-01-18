import React, { Component } from 'react'
import { Spinner } from 'reactstrap';
import '../../../App.css';
import { AutoComplete } from 'primereact/autocomplete';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import swal from 'sweetalert';
import { CSVLink } from "react-csv";
import CSVReader from 'react-csv-reader'
import SimpleReactValidator from 'simple-react-validator';
import { API_URL } from '../../../actions/utilAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import ReactExport from 'react-data-export';
const csvHeaders = [
  { label: "Item Number", key: "Item Number" },
]
const tableHeader = [
  { label: "Name", key: "Name" },
  { label: "Length", key: "Length" },
  { label: "Width", key: "Width" },
  { label: "Height", key: "Height" },
  { label: "Weight", key: "Weight" },
]

const CSVData = [];
export default class Colors extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: message => <div className="text-danger"  >{message}</div>
    });
    this.state = {
      className: true,
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
      moduleText: 'Single or list of model number',

    };
  }
  handleForce = (data) => {
    this.setState({
      data: data
    })
  };

  //Api call to get zone values on dropdown from backend
  componentDidMount = () => {
    this.setState({ userId: localStorage.getItem("userId") });
    if (this.props.userId == null || this.props.userId === '' || localStorage.getItem('token') == null) {
      this.props.history.push('/login');
    }

    const zoneValuesApi = `${API_URL}/api/ShippingQuotes/GetZoneValues`;
    axios.get(zoneValuesApi,
      { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
    )
      .then(res => {
        this.setState({
          zoneValues: res.data.data,
        });
      })
  }

  componentWillMount() {

  }

  handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function (e) {
      // Use reader.result
      alert(reader.result)
    }
    reader.readAsText(files[0]);
  }
  //function call on click on first tab
  hideShow = () => {

    this.validator.hideMessages();
    this.forceUpdate();
    this.setState({
      showResult: true,
      emailField: false,
      textData: false,
      importCsv: false,
      email: null,
      modelNumber: '',
      className: true,
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
      moduleText: 'Single or list of model number',
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
      className: false,
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
      moduleText: 'Single or list of model number',
    });
  }
  //function call on click on second tab
  emailHideShow = (event) => {
    this.validator.hideMessages();
    this.forceUpdate();
    this.setState({
      emailField: true,
      showResult: false,
      textData: false,
      selectedZone: null,
      modelNumber: '',
      className: false,
      ListOfModelNumber: false,
      importCsv: true,
      importManualDims: false,
      data: [],
      rows: [],
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
      moduleText: 'Import CSV',
    });
  }
  //function call on click on third tab
  tableShow = () => {

    this.validator.hideMessages();
    this.forceUpdate();
    this.setState({
      tabledData: true,
      emailField: false,
      showResult: false,
      textData: false,
      selectedZone: null,
      modelNumber: '',
      className: false,
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
      moduleText: 'Input/Import Manual Dims',

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

  //functio to add scroller bar after calling the third tab api
  bottomScroll = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }

  //the function calling on button click 

  formValidation = (e) => {


    // disabled={(this.state.selectedZone && this.state.selectedZone.length === 0 && this.state.showResult && !this.state.ListOfModelNumber && !this.state.modelNumber)} 



    if (this.state.className || this.state.importManualDims || this.state.ListOfModelNumber) {
      this.validator.fields.email = true;
      this.validator.fields.file = true;
    }
    else {
      this.validator.fields.email = true;
      this.validator.fields.file = this.state.file ? true : false;
    }
    e.preventDefault()
    if (this.validator.allValid()) {
      var apiBaseUrl = `${API_URL}/api/ShippingQuotes/SaveShippingData`;
      //var singleBaseApiUrl = `${API_URL}/api/ShippingQuotes/GetNegotiatedRates?modelNumbers=${modelNumbers}&shipToZipCode=${this.state.selectZone}`;
      var CsvImportApiUrl = `${API_URL}/api/ShippingQuotes/UploadShippingFiles`;
      let formData = new FormData();
      formData.shippingZone = this.state.selectZone;
      formData.userId = this.props.userId;
      formData.fileName = this.state.file;

      //Api call to click on third radio button 
      if (this.state.importCsv === true) {

        this.setState({
          modelsLoading: true
        })
        axios.post(apiBaseUrl, JSON.stringify(formData), {
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
          },
        })
          .then(response => {
            if (response.data.statusCode === 200) {
              let formData1 = new FormData();
              let responseFile = this.state.fileData;
              var blob = responseFile.slice(0, responseFile.size, 'image/png');
              var newFile = new File([blob], response.data.data.data, { type: 'csv' });

              //responseFile.name = response.data.data;
              formData1.append("body", newFile)
              axios.post(CsvImportApiUrl, formData1, {
                headers: {
                  'content-type': 'multipart/form-data',
                  'authorization': `Bearer ${localStorage.getItem('token')}`
                }
              })
                .then(response => {
                  if (response.data.statusCode === 200) {
                    this.setState({
                      modelsLoading: false,
                      file: ''

                    })
                    //this.growl.show({severity: 'success', summary: "CSV File  successfully import by user email will be sent to the user!" });
                    toast.success("CSV File  successfully import by user email will be sent to the user...!", {
                      position: toast.POSITION.TOP_RIGHT
                    });
                  }
                  else {
                    //this.growl.show({severity: 'error', summary: 'Invalid file data' });
                    toast.error("Invalid file data...!", {
                      position: toast.POSITION.TOP_RIGHT
                    });
                  }
                })
            } else {
              this.setState({
                modelsLoading: false,
              })
              //this.growl.show({ severity: 'error', summary: 'Invalid file data' });
              toast.error("Invalid file data...!", {
                position: toast.POSITION.TOP_RIGHT
              });
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
      // api call to click on first radio button 
      else if (this.state.showResult || this.state.ListOfModelNumber) {
        if (this.state.selectedZone && this.state.selectedZone.length === 0 && this.state.showResult && !this.state.ListOfModelNumber && !this.state.modelNumber) {
          toast.warn("Please enter model number...!", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        else {
          let str = this.state.modelNumber;
          str = str.split(" ").join("\n")
          // str = str.replace(" ", "\n");
          this.setState({
            modelNumber: str
          })
          var modelNumbersManually = this.state.modelNumber ? str.toUpperCase().split('\n') : '';
          var mergemodelNumbers = this.state.selectedZone.concat(modelNumbersManually);
          var models = mergemodelNumbers.toString();
          models = `,${models},`;
          var singleBaseApiUrl = `${API_URL}/api/ShippingQuotes/GetNegotiatedRates?modelNumbers=${models}&shipToZipCode=${this.state.selectZone}`;
          this.setState({
            modelsLoading: mergemodelNumbers !== "" && mergemodelNumbers.length !== "" ? true : false
          })
          if (mergemodelNumbers !== "" && mergemodelNumbers.length !== "") {
            axios.get(singleBaseApiUrl,
              { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
            )
              .then(res => {
                // let ExportGridResponse = this.state.ExportGridResponse;
                this.setState({
                  ExportGridResponse: res.data.data.listUPSAPICustomResponseViewModel,
                  modelsLoading: false,
                  selectedZone: [],
                  modelNumber: ''
                });
              })
          }
          else {
            swal({
              text: "Please select or enter the model number first",
              icon: "warning",
              timer: 2000,
            });
          }
        }
    }
    else if (this.state.importManualDims) {
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
      if (dimensionsArray.length > 0) {

        this.setState({
          modelsLoading: true,
          dimensionsArray: dimensionsArray
        })

        axios.post(importDimApiUrl, JSON.stringify(dimensionsArray), {
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
            ,
          },
        })
          .then(response => {
            if (response.data.statusCode === 200) {
              setTimeout(this.bottomScroll, 200);
              this.setState({
                ExportGridResponse: response.data.data.listUPSAPICustomResponseViewModel,
                modelsLoading: false,
              })
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
      else if (this.state.data.length === 0 || this.state.rows.length === 0) {
        //this.growl.show({ severity: 'error', summary: 'Please enter data' });
        toast.warn("Please enter data...!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  } else {
  this.validator.showMessages();
  this.forceUpdate();
}

  }
// get the modelnumber from state and set into State

handleChange = (event) => {
  var modelsNumber = event.target.value
  this.setState({
    modelNumber: modelsNumber
  });


}
//get the zone from dropdown
shippingZoneChange = (event) => {
  this.setState({
    selectZone: event.target.value
  });
}
//get the file 
handleFileChange = (event) => {
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
  axios.get(`${API_URL}/api/ShippingQuotes/GetModelNumbers?modelNumber=${e.query}`,
    { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
  )
    .then(res => {
      let ZoneModelNumber = [];
      res.data.data.forEach(element => {
        ZoneModelNumber.push(element.model);
      });

      this.setState({
        ZoneModelNumber: ZoneModelNumber
      });
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

        })
      }
    });
}
handleSelect = (e) => {
  // const sZone = e.value;
  this.setState({
    selectedZone: e.value
  }, () => {
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
  const re = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
  if (re.test(e.target.value)) {
    var Lengths = this.state.Length;
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

  var NameCsv = this.state.NameCsv;
  NameCsv[i] = e.target.value;
  var data = this.state.data;
  data[i][0] = e.target.value;
  this.setState({
    NameCsv: NameCsv,
    data: data
  })
}
handleLengthCsvChange = (e, i) => {
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
  // let headers = [
  //   { label: 'MODEL', key: 'model' },
  //   { label: 'UPS GROUND', key: 'upsGround' },
  //   { label: 'UPS SUREPOST', key: 'upsSurePost' },
  //   { label: 'USPS FC', key: 'uspsFirstClass' },
  //   { label: 'USPS PRIORITY', key: 'uspsPriority' },
  //   { label: 'LENGTH', key: 'length' },
  //   { label: 'WIDTH', key: 'width' },
  //   { label: 'HEIGHT', key: 'height' },
  //   { label: 'WEIGHT', key: 'weight' },
  //   { label: 'LAND', key: 'land' },
  //   { label: 'CASE', key: 'case' },
  //   { label: 'COMMENTS', key: 'comments' },
  // ];
  let data = this.state.ExportGridResponse;
  let exportCustomData = [];
  for (var i in this.state.ExportGridResponse) {
    exportCustomData.push([]);
  }
  for (var x in exportCustomData) {
    let smallest = Math.min(data[x].upsGround, data[x].upsSurePost, data[x].uspsFirstClass, data[x].uspsPriority);
    let smallestExcludingNA = Math.min(data[x].upsGround, data[x].upsSurePost, data[x].uspsPriority);
    var myObj = {
      value: data[x].model, style: {
        border: {
          top: {
            style: "thin",
            color: "ADD8E6"
          },
          bottom: {
            style: "thin",
            color: "ADD8E6"
          },
          left: {
            style: "thin",
            color: "ADD8E6"
          },
          right: {
            style: "thin",
            color: "ADD8E6"
          },
        },
      }
    }
    var myObj2 = {};
    if ((data[x].weight >= 1 && data[x].upsGround === smallestExcludingNA && data[x].upsGround !== 0) || (data[x].weight < 1 && data[x].upsGround === smallest && data[x].upsGround !== 0) || (data[x].upsGround !== 0 && data[x].upsSurePost === 0 && data[x].uspsFirstClass === 0 && data[x].uspsPriority === 0) || (data[x].upsGround !== 0 && data[x].upsSurePost === 0 && data[x].uspsFirstClass === 0 && data[x].uspsPriority > data[x].upsGround)) {
      myObj2 = {
        value: data[x].upsGround,
        style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
          numFmt: "$0.00",
          fill: {
            fgColor: {
              rgb: "90ee90"
            }
          }
        },
      }
    } else {
      myObj2 = {
        value: data[x].upsGround > 0 ? data[x].upsGround : 'N/A', style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
          numFmt: "$0.00",
        },
      }
    }

    var myObj3 = {};
    if ((data[x].weight >= 1 && data[x].upsSurePost === smallestExcludingNA && data[x].upsSurePost !== 0) || (data[x].weight < 1 && data[x].upsSurePost === smallest && data[x].upsSurePost !== 0)) {
      myObj3 = {
        value: data[x].upsSurePost, style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
          numFmt: "$0.00",
          fill: {
            fgColor: {
              rgb: "90ee90"
            }
          }
        },
      }
    } else {
      myObj3 = {
        value: data[x].upsSurePost > 0 ? data[x].upsSurePost : 'N/A',
        style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
          numFmt: "$0.00",
        }
      }
    }
    var myObj4 = {};
    if ((data[x].weight >= 1 && data[x].uspsFirstClass === smallestExcludingNA && data[x].uspsFirstClass !== 0) || (data[x].weight < 1 && data[x].uspsFirstClass === smallest && data[x].uspsFirstClass !== 0)) {
      myObj4 = {
        value: data[x].uspsFirstClass, style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
          numFmt: "$0.00",
          fill: {
            fgColor: {
              rgb: "90ee90"
            }
          }
        },
      }
    } else {
      myObj4 = {
        value: data[x].uspsFirstClass > 0 ? data[x].uspsFirstClass : 'N/A',
        style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
          numFmt: "$0.00",
        },
      }
    }

    var myObj5 = {};
    if ((data[x].weight >= 1 && data[x].uspsPriority === smallestExcludingNA && data[x].uspsPriority !== 0) || (data[x].weight < 1 && data[x].uspsPriority === smallest && data[x].uspsPriority !== 0) || (data[x].upsGround === 0 && data[x].upsSurePost === 0 && data[x].uspsFirstClass === 0 && data[x].uspsPriority !== 0)) {
      myObj5 = {
        value: data[x].uspsPriority, style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
          numFmt: "$0.00",
          fill: {
            fgColor: {
              rgb: "90ee90"
            }
          }
        },
      }
    } else {
      myObj5 = {
        value: data[x].uspsPriority > 0 ? data[x].uspsPriority : 'N/A',
        style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
          numFmt: "$0.00",
        },
      }
    }

    var myObj6 = {
      value: data[x].length ? parseFloat(data[x].length, 10) : 'N/A', style: {
        border: {
          top: {
            style: "thin",
            color: "ADD8E6"
          },
          bottom: {
            style: "thin",
            color: "ADD8E6"
          },
          left: {
            style: "thin",
            color: "ADD8E6"
          },
          right: {
            style: "thin",
            color: "ADD8E6"
          },
        },
      }
    }
    var myObj7 = {
      value: data[x].width ? parseFloat(data[x].width, 10) : 'N/A', style: {
        border: {
          top: {
            style: "thin",
            color: "ADD8E6"
          },
          bottom: {
            style: "thin",
            color: "ADD8E6"
          },
          left: {
            style: "thin",
            color: "ADD8E6"
          },
          right: {
            style: "thin",
            color: "ADD8E6"
          },
        },
      }
    }
    var myObj8 = {
      value: data[x].height ? parseFloat(data[x].height, 10) : 'N/A', style: {
        border: {
          top: {
            style: "thin",
            color: "ADD8E6"
          },
          bottom: {
            style: "thin",
            color: "ADD8E6"
          },
          left: {
            style: "thin",
            color: "ADD8E6"
          },
          right: {
            style: "thin",
            color: "ADD8E6"
          },
        },
      }
    }

    var myObj9 = {};
    if (data[x].weight && parseFloat(data[x].weight, 10) < 1) {
      myObj9 = {
        value: data[x].weight ? parseFloat(data[x].weight, 10) : '', style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
          fill: {
            fgColor: {
              rgb: "ADD8E6"
            }
          }
        }
      }
    } else {
      myObj9 = {
        value: data[x].weight ? parseFloat(data[x].weight, 10) : 'N/A', style: {
          border: {
            top: {
              style: "thin",
              color: "ADD8E6"
            },
            bottom: {
              style: "thin",
              color: "ADD8E6"
            },
            left: {
              style: "thin",
              color: "ADD8E6"
            },
            right: {
              style: "thin",
              color: "ADD8E6"
            },
          },
        }
      }
    }

    var myObj10 = {
      value: data[x].land ? data[x].land : 'N/A',
      style: {
        border: {
          top: {
            style: "thin",
            color: "ADD8E6"
          },
          bottom: {
            style: "thin",
            color: "ADD8E6"
          },
          left: {
            style: "thin",
            color: "ADD8E6"
          },
          right: {
            style: "thin",
            color: "ADD8E6"
          },
        },
        numFmt: "$0.00",
      },
    }
    var myObj11 = {
      value: data[x].case ? parseInt(data[x].case, 0) : 'N/A', style: {
        border: {
          top: {
            style: "thin",
            color: "ADD8E6"
          },
          bottom: {
            style: "thin",
            color: "ADD8E6"
          },
          left: {
            style: "thin",
            color: "ADD8E6"
          },
          right: {
            style: "thin",
            color: "ADD8E6"
          },
        },
      }
    }
    var myObj12 = {
      value: data[x].comments ? data[x].comments : '', style: {
        border: {
          top: {
            style: "thin",
            color: "ADD8E6"
          },
          bottom: {
            style: "thin",
            color: "ADD8E6"
          },
          left: {
            style: "thin",
            color: "ADD8E6"
          },
          right: {
            style: "thin",
            color: "ADD8E6"
          },
        },
      }
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
  const multiDataSet = [
    {
      columns: [
        { title: "Model", width: { wpx: 80 } },//pixels width 
        { title: "UPS Ground", width: { wpx: 80 } },//char width 
        { title: "UPS SurePost", width: { wpx: 90 } },
        { title: "USPS FC", width: { wpx: 90 } },
        { title: "USPS Priority", width: { wpx: 90 } },
        { title: "Length", width: { wpx: 90 } },
        { title: "Width", width: { wpx: 90 } },
        { title: "Height", width: { wpx: 90 } },
        { title: "Weight", width: { wpx: 90 } },
        { title: "Land", width: { wpx: 90 } },
        { title: "Case", width: { wpx: 90 } },
        { title: "Comments", width: { wpx: 90 } },
      ],
      data:

        exportCustomData

    }
  ];
  return (
    //  Begin Page Content 
    <div className="container-fluid">
      {/* <Growl  ref={(el) => this.growl = el} className="setGrowl" /> */}
      <ToastContainer ref={(el) => this.notify = el} autoClose={5000} className="showToaster" />
      <div className="title">
        <h1>Shipping Quote</h1>
      </div>
      {/* Card content */}
      <div className="card card-default">
        {/* Tabs */}
        <ul className={this.state.modelsLoading ? "nav nav-tabs disabled" : "nav nav-tabs"} id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="listmodel-tab" data-toggle="tab" href="#listmodel" role="tab" aria-controls="listmodel" aria-selected="true" onClick={this.hideShow.bind(this)}>Single or List of Model no.</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="importcsv-tab" data-toggle="tab" href="#importcsv" role="tab" aria-controls="importcsv" aria-selected="false" onClick={this.emailHideShow.bind(this)}>Import CSV</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="importmanual-tab" data-toggle="tab" href="#importmanual" role="tab" aria-controls="importmanual" aria-selected="false" onClick={this.tableShow.bind(this)}>Input/Import Manual Dims</a>
          </li>
        </ul>
        <div className="card-body">
          {/* Tab Contents */}
          {/* Single or List of Model no. */}
          <div className="tab-pane fade show active" id="listmodel" role="tabpanel" aria-labelledby="listmodel-tab">
            {/* Zone fields */}
            <div className="row field-row">
              <div className="col-lg-6 col-first">
                <div className="form-group form-group-flex align-items-center">
                  <label htmlFor="" className="form-label">Select Ship-to-Zone<span className="req">*</span></label>
                  <div className="form-input">
                    <select className="form-control" name="select" value={this.state.selectZone} onChange={this.shippingZoneChange.bind(this)} disabled={this.state.modelsLoading ? true : false}>
                      {this.state.zoneValues && this.state.zoneValues.length ?
                        this.state.zoneValues.map((obj, index) => {
                          return (
                            <option key={index} value={obj.value}>{obj.key}</option>
                          )
                        }) : null}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Zone Field */}
            {this.state.showResult === true ?
              <div className="row field-row">
                <div className="col-lg-6 col-first">
                  <div className="form-group form-group-flex">
                    <label htmlFor="" className="form-label form-label-textarea">Model Number<span className="req">*</span></label>
                    <AutoComplete
                      onChange={(e) => this.handleSelect(e)}
                      value={this.state.selectedZone}
                      size={30}
                      className="p-autocomplete"
                      disabled={this.state.modelsLoading === true}
                      minLength={1}
                      required={true}
                      suggestions={this.state.ZoneModelNumber}
                      multiple={true}
                      completeMethod={(e) => this.handleModelNumberChange(e)}
                    />
                  </div>
                </div>
                <div className="col-or">
                  <div className="orTxt align-items-center d-flex"><span>or</span></div>
                </div>
                <div className="col-lg-6 col-last">
                  <div className="form-group form-group-flex">
                    <label htmlFor="" className="form-label form-label-textarea">List Model Number<span className="req">*</span>
                    </label>
                    <div className="form-input">
                      <span><i className="fa fa-info-circle" aria-hidden="true"></i> Input max.of 50 model numbers</span>
                      <textarea className="form-control resizeno"
                        value={this.state.modelNumber}
                        onChange={this.handleChange.bind(this)}
                        disabled={this.state.modelsLoading === true}
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
                {/* button */}
                <div className="col-sm-12 form-button text-center mt-3">
                  <button className="btn btn-primary" onClick={this.formValidation.bind(this)}
                  // disabled={(this.state.selectedZone && this.state.selectedZone.length === 0 && this.state.showResult && !this.state.ListOfModelNumber && !this.state.modelNumber)} 
                  >Get Shipping Rate <i className="fa fa-arrow-right"></i></button>
                </div>
                {/* spinnr */}
                <div className="col-sm-12 text-center mt-3">
                  {this.state.modelsLoading === true ?
                    <Spinner type="grow" color="primary" />
                    : null
                  }
                </div>
              </div>
              :
              this.state.emailField ?
                //  Import Csv
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="uploadfile d-flex flex-row justify-content-center">
                        <div className="file-select d-flex flex-column justify-content-center flex-wrap">
                          <div className="file-message" id="fileName"></div>
                          {(this.state.file !== '' && this.state.file !== null) ?
                            <div className="file-select-name" id="noFile">{this.state.file}</div> :
                            <div className="file-select-name" id="noFile">Upload File<span className="req">*</span></div>

                          }
                          <input type="file" name="chooseFile" id="chooseFile" accept=".csv" onChange={this.handleFileChange} />
                          <div className="textSet">   {this.validator.message('file', this.state.file, 'required|file')}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <CSVLink data={CSVData} headers={csvHeaders} filename="ImportItemsTemplate.csv" className="link">
                          Sample CSV Files
                            </CSVLink>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 form-button text-center mt-3">
                    <button className="btn btn-primary" type="submit" onClick={this.formValidation.bind(this)}>Submit  <i className="fa fa-arrow-right"></i></button>
                  </div>
                  {/* spinnr */}
                  <div className="col-sm-12 text-center mt-3">
                    {this.state.modelsLoading === true ?
                      <Spinner type="grow" color="primary" />
                      : null
                    }
                  </div>
                </div>
                :
                this.state.tabledData === true ?
                  // Input/Import Manual Dims 
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="uploadfile d-flex flex-row justify-content-center">
                          <div className="file-select d-flex flex-column justify-content-center flex-wrap">
                            <div className="file-message" id="fileName"></div>
                            {this.state.data.length > 2 ?
                              <div className="file-select-name" id="noFile">File data imported Successfull</div> :
                              <div className="file-select-name" id="noFile">Upload File<span className="req">*</span></div>
                            }
                            <input type="file" name="chooseFile" id="chooseFile" onChange={this.handleFileChange} />
                            <CSVReader
                              cssClass="react-csv-input"
                              onFileLoaded={this.handleForce}
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <CSVLink data={CSVData} headers={tableHeader} filename="ImportCustomDimsTemplate.csv" className="link">
                            Sample CSV Files
                              </CSVLink>
                        </div>
                        {/* Input Manual Dims Table tabel Data Section */}
                        <div className="resultSection">
                          <div className="d-flex align-items-center mb-3">
                            <h2>Input Manual Dims Table</h2>
                            <button className="btn  btn-primary btn-sm ml-auto" type="button" onClick={this.addRow}><i className="fa fa-plus mr-2"></i> Add new row</button>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-bordered table-default mb-0 table-text-left">
                              <thead>
                                <tr>
                                  <th width="238">Name</th>
                                  <th>Length</th>
                                  <th>Width</th>
                                  <th>Height</th>
                                  <th>Weight</th>
                                  <th width="70">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.data.map((data, index) => {
                                  var x = this.state.data.length;
                                  x = x - 1;
                                  if (index > 0 && index !== x) {
                                    return (
                                      <tr key={index}>
                                        <td>{<input maxLength="20" type="text" value={data[0]} className="form-control" onChange={(e) => this.handleNameCsvChange(e, index)}></input>}</td>
                                        <td >{<input title="Please enter numbers only" maxLength="6" type="text" pattern="[0-9]*" value={data[1]} className="form-control" onChange={(e) => this.handleLengthCsvChange(e, index)}></input>}</td>
                                        <td >{<input title="Please enter numbers only" maxLength="6" type="text" pattern="[0-9]*" value={data[2]} className="form-control" onChange={(e) => this.handleWidthCsvChange(e, index)}></input>}</td>
                                        <td >{<input title="Please enter numbers only" maxLength="6" type="text" pattern="[0-9]*" value={data[3]} className="form-control" onChange={(e) => this.handleHeightCsvChange(e, index)}></input>}</td>
                                        <td >{<input title="Please enter numbers only" maxLength="6" type="text" pattern="[0-9]*" value={data[4]} className="form-control" onChange={(e) => this.handleWeightCsvChange(e, index)}></input>}</td>
                                        <td >
                                          <a onClick={(e) => this.handleRowDeleteInfo(e, index)} className="btn btn-danger btn-action-icon" title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                        </td>
                                      </tr>
                                    )
                                  }
                                })}
                                {this.state.rows.map((r, index) => (
                                  <tr key={r.index}>
                                    <td>{r}{<input maxLength="20" value={this.state.Name[index]} type="text" className="form-control" onChange={(e) => this.handleNameChange(e, index)}></input>}</td>
                                    <td>{r}{<input title="Please enter numbers only" maxLength="6" pattern="[0-9]*" value={this.state.Length.length ? this.state.Length[index] : ''} type="text" className="form-control" onChange={(e) => this.handleLengthChange(e, index)}></input>}</td>
                                    <td>{r}{<input title="Please enter numbers only" maxLength="6" pattern="[0-9]*" value={this.state.Width.length ? this.state.Width[index] : ''} type="text" className="form-control" onChange={(e) => this.handleWidthChange(e, index)} ></input>}</td>
                                    <td>{r}{<input title="Please enter numbers only" maxLength="6" pattern="[0-9]*" value={this.state.Width.length ? this.state.Height[index] : ''} type="text" className="form-control" onChange={(e) => this.handleHeightChange(e, index)}></input>}</td>
                                    <td>{r}{<input title="Please enter numbers only" maxLength="6" pattern="[0-9]*" value={this.state.Weight.length ? this.state.Weight[index] : ''} type="text" className="form-control" onChange={(e) => this.handleWeightChange(e, index)}></input>}</td>
                                    <td>
                                      <a onClick={(e) => this.handleRowDelete(e, index)} className="btn btn-danger btn-action-icon" title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* //Button */}
                    <div className="col-sm-12 form-button text-center mt-3">
                      <button className="btn btn-primary" onClick={this.formValidation.bind(this)} disabled={(this.state.selectedZone && this.state.selectedZone.length === 0 && this.state.showResult && !this.state.ListOfModelNumber && !this.state.modelNumber)}>Get Shipping Rate <i className="fa fa-arrow-right"></i></button>
                    </div>
                    {/* spinnr */}
                    <div className="col-sm-12 text-center mt-3">
                      {this.state.modelsLoading === true ?
                        <Spinner type="grow" color="primary" />
                        : null
                      }
                    </div>
                  </div>
                  : null
            }
            {/* tabel Data Section */}
            {this.state.ExportGridResponse && this.state.ExportGridResponse.length && (this.state.showResult || this.state.ListOfModelNumber || this.state.importManualDims) ?
              <div className="resultSection">
                <div className="d-flex align-items-center mb-3">
                  <h2>Export of Negotiated Rates</h2>
                  <div className="ml-auto">
                    <ExcelFile filename="Negotiated Rates" element={
                      <button className="btn btn-primary btn-sm ml-auto" ><img src="assets/images/export-icon.svg" alt="" className="mr-2 icon" /> <img src="assets/images/export-icon-hover.svg" alt="" className="mr-2 icon-hover" /> Export</button>}>
                      <ExcelSheet dataSet={multiDataSet} name="Organization" />
                    </ExcelFile>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-default table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Model</th>
                        <th>UPS Ground</th>
                        <th> UPS Surepost</th>
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
                    <tbody>
                      {this.state.ExportGridResponse.map((data, index) => {
                        let smallest = Math.min(data.upsGround, data.upsSurePost, data.uspsFirstClass, data.uspsPriority);
                        let smallestExcludingNA = Math.min(data.upsGround, data.upsSurePost, data.uspsPriority);
                        return (
                          <tr key={index}>
                            <td title={data.model}>{data.model.length > 10 ? `${data.model.substring(0, 10)}...`
                              : data.model}
                            </td>
                            <td className={(data.weight >= 1 && data.upsGround === smallestExcludingNA && data.upsGround !== 0) || (data.weight < 1 && data.upsGround === smallest && data.upsGround !== 0 || (data.upsGround !== 0 && data.upsSurePost === 0 && data.uspsFirstClass === 0 && data.uspsPriority === 0) || (data.upsGround !== 0 && data.upsSurePost === 0 && data.uspsFirstClass === 0 && data.uspsPriority > data.upsGround) || (data.upsGround < data.upsSurePost && data.uspsFirstClass === 0 && data.uspsPriority === 0)) ? "customColor" : ""}>{data.upsGround > 0 ? `$${data.upsGround}` : 'N/A'}</td>
                            <td className={(data.weight >= 1 && data.upsSurePost === smallestExcludingNA && data.upsSurePost !== 0) || (data.weight < 1 && data.upsSurePost === smallest && data.upsSurePost !== 0) || (data.upsSurePost > data.upsGround && data.uspsFirstClass === 0 && data.uspsPriority === 0) ? "customColor" : ""}>
                              {data.upsSurePost > 0 ? `$${data.upsSurePost}` : 'N/A'}</td>
                            <td className={(data.weight >= 1 && data.uspsFirstClass === smallestExcludingNA && data.uspsFirstClass !== 0) || (data.weight < 1 && data.uspsFirstClass === smallest && data.uspsFirstClass !== 0) ? "customColor" : ""}>{data.uspsFirstClass > 0 ? `$${data.uspsFirstClass}` : 'N/A'}</td>
                            <td className={(data.weight >= 1 && data.uspsPriority === smallestExcludingNA && data.uspsPriority !== 0) || (data.weight < 1 && data.uspsPriority === smallest && data.uspsPriority !== 0 || (data.upsGround === 0 && data.upsSurePost === 0 && data.uspsFirstClass === 0 && data.uspsPriority !== 0)) ? "customColor" : ""}>{data.uspsPriority > 0 ? `$${data.uspsPriority}` : 'N/A'}</td>
                            <td>{data.length}</td>
                            <td>{data.width}</td>
                            <td>{data.height}</td>
                            <td className={data.weight < 1 && data.weight > 0 ? "weightColor" : ""} >{data.weight}</td>
                            <td>
                              {data.land > 0 ? `$${data.land}`
                                : 'N/A'}</td>
                            <td>{data.case || 'N/A'}</td>
                            <td>{data.comments ? data.comments : ''}</td>
                          </tr>
                        )
                      }
                      )}
                    </tbody>
                  </table>
                </div>
              </div> :
              null}
          </div>
        </div>
      </div>
    </div>
  )
}
}
