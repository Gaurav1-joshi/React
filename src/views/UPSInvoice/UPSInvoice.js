import React, { Component } from 'react'
import { API_URL } from '../../actions/utilAction';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
export default class UPSInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            fileData: null,
            modelsLoading: false,
        }
    }
    componentDidMount = () => {
        this.setState({ userId: localStorage.getItem("userId") });
        if (this.props.userId == null || this.props.userId === '' || localStorage.getItem('token') == null) {
            this.props.history.push('/login');
        }
    }
    handleFileChange = (event) => { 
        var filePath = event.target.value;
        var fileData = event.target.files[0];
        var fileName = filePath.replace(/^.*[\\\/]/, '');
        this.setState({
            file: fileName,
            fileData: fileData
        })
    }

    uploadInvoiceCSV = () => {
       if (this.state.file.length>0) {
            this.setState({
                modelsLoading: true
            })
            var UploadUpsCsvURL = `${API_URL}/api/UpsInvoice/UploadUpsInvoiceCSV`;
            var SaveUpsDataURL = `${API_URL}/api/UpsInvoice/SaveUpsInvoiceData`;
            let formData = new FormData();
            // let responseFile = this.state.fileData;
            // var blob = responseFile.slice(0, responseFile.size, 'image/png');
            //var newFile = new File([blob], response.data.data.data, { type: 'csv' });
            formData.append("body", this.state.fileData)
            axios.post(UploadUpsCsvURL, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    if (response.data.statusCode === 200) {

                        let formData1 = new FormData();
                        formData1.fileName = response.data.data.fileNameToBeReturned;
                        formData1.userId = this.props.userId;
                        formData1.invoiceDate = response.data.data.invoiceDate;
                        this.setState({
                            modelsLoading: true
                        })
                        axios.post(SaveUpsDataURL, JSON.stringify(formData1), {
                            headers: {
                                'content-type': 'application/json',
                                'authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                        })
                        this.setState({
                            modelsLoading: false,
                        })
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });

                    }
                    else {
                        toast.error(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    this.setState({
                        modelsLoading: false
                    })
                })
        }
        else {
            toast.warn("Please select the valid file...!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        this.setState({
            file: ''
        })
    }
    render() {
        return (
            <div className="container-fluid">
            <ToastContainer ref={(el) => this.notify = el} autoClose={5000} className="showToaster"/>
                <div className="title">
                    <h1>UPS Invoice</h1>
                </div>
                <div className="card card-default">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="uploadfile d-flex flex-row justify-content-center">
                                        <div className="file-select d-flex flex-column justify-content-center flex-wrap">
                                            <div className="file-message" id="fileName"></div>
                                            {(this.state.file !== '' && this.state.file != null) ?
                                                <div className="file-select-name" id="noFile">{this.state.file}</div> :
                                                <div className="file-select-name" id="noFile">Upload UPS Invoice CSV</div>
                                            }
                                            <input type="file" name="chooseFile" id="chooseFile" accept=".csv" onChange={this.handleFileChange} title={this.state.file} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 form-button text-center mt-3">
                                {!this.state.modelsLoading ?
                                    <button className="btn btn-primary" type="submit" onClick={this.uploadInvoiceCSV.bind(this)} >Submit<i className="fa fa-arrow-right"></i></button>
                                    :
                                    <button className="btn btn-primary" type="submit" disabled  >Submit<i className="fa fa-arrow-right"></i></button>
                                }
                            </div>
                            <div className="col-sm-12 text-center mt-3">
                                {this.state.modelsLoading === true ?
                                    <Spinner type="grow" color="primary" />
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
