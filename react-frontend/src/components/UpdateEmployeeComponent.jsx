import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';


class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName:'',
            emailId:''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this); 
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this); 
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);

    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(
            res => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                });
            });
    }


    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName : this.state.firstName, 
            lastName: this.state.lastName,
            emailId: this.state.emailId }
            // at axios POST methid return promise so we have to add then
        EmployeeService.updateEmployee(employee, this.state.id).then(
            res => {
                console.log(res);

                this.props.history.push({
                    pathname: "/employees",
                    state: {
                        message: true
                    }
                });
            }).catch(
            err => {
                console.log("ERROR: " + err);
                this.props.history.push("/employees");
            });
    }

   
    cancel() {
        this.props.history.push("/employees");
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }
    changeEmailIdHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

    render() {
        return (
            // take away d-flex 
                <div className= "container justify-content-center align-items-center mt-5">
                    <div className="row">
                        <div className="card shadow col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                            <h3 className="text-center">Update Employee</h3>
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" value={this.state.firstName} onChange={this.changeFirstNameHandler}></input>
                                        </div>
                                        <div className="mb-3">
                                            <label> Second Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" value={this.state.lastName} onChange={this.changeLastNameHandler}></input>
                                        </div>
                                        <div className="mb-3">
                                            <label> Email Address: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" value={this.state.emailId} onChange={this.changeEmailIdHandler}></input>
                                        </div>
                                        
                                        <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>
                                        <button className="btn btn-danger align-right" onClick={this.cancel} style={{float: "right"}}>Cancel</button>

                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default UpdateEmployeeComponent;