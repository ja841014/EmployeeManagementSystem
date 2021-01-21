import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // get the param from the route
            id: this.props.match.params.id,
            employee : {}
        };
        this.backPage = this.backPage.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({employee: res.data})
        })
    }

    backPage() {
        this.props.history.push("/employees");
    }

    render() {
        return (
            <div className= "container justify-content-center align-items-center mt-5">
                    <div className="row">
                        <div className="card shadow col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                            <h3 className="text-center">View Employee Page</h3>
                                <div className="card-body">
                                    <form>
                                        <div className="subtitle mb-3">
                                            <label>  Employee First Name: </label>
                                            <div>{ this.state.employee.firstName }</div>
                                        </div>
                                        <div className="subtitle mb-3">
                                            <label> Employee Last Name: </label>
                                            <div>{ this.state.employee.lastName }</div>
                                        </div>
                                        <div className="subtitle mb-3">
                                            <label> Employee Email Address: </label>
                                            <div>{ this.state.employee.emailId }</div>
                                        </div>
                                        
                                        <button className="btn btn-success" onClick={this.backPage}>Back to Show Page</button>

                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default ViewEmployeeComponent;