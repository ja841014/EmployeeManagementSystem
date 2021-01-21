import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import FlashMessage from 'react-flash-message';




class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        /**
        Constructor 是唯一一個你應該直接指定 this.state 的地方。在所有其他的方法中，你則需要使用 this.setState()。
        請避免在 constructor 中產生任何 side effect 或 subscription。如果你需要它們的話，請使用 componentDidMount()。
        */
        this.state = {
            employees: [],
            message: false
        }
        // bind this methid to this constuctor
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
        // console.log(this.props );
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployee(id) {
        this.props.history.push(`/update-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees: this.state.employees.filter(
                employee => employee.id !== id)})
        })
    }

    /**
     * 只有在 componentDidMount 這個 function 被觸發以後，Component 才會真正的出現在 DOM 上面。
     * ComponentDidMount() 的時間點就是在 「 constructor() 執行之後、且執行render() 之後 」
     * https://yakimhsu.com/project/project_w21_01_React_life_constructor.html
     */
    // popoulate the data from backend to frontend
    componentDidMount() {
        // catch the data from the EmployeeServices.js from backend
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees: res.data})
        })
    }
    // redirect
    // react router(App.js) will pass history object to each router as a props
    addEmployee() {
        
        this.props.history.push('/add-employee');
    }
    
   
    // {
    //     test ? 
    //     <div className="alert alert-success alert-dismissible fade show" role="alert">
    //         Add Successfully
    //         <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close"></button>
    //     </div> : 
    //     <div></div>
    // }

    render() {
        const test = this.props.location.state === undefined ? this.state.message :  this.props.location.state.message;
        // console.log(test);
        console.log(this.props);
        return (
            
            <div>
                {
                    test ?
                    <FlashMessage duration={3000} persistOnHover={true}>
                        <p>Add Successfully</p>
                    </FlashMessage> :
                    <div></div>
                }
                
                <h2 className="text-center">Employees List</h2>
                <div className = "row">
                    <button className = "btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className = "row">
                    <table className= "table table-striped table-bordered">

                        <thead>
                            <tr className="text-center">
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th >Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map (
                                    employee => 
                                    <tr className="text-center" key = {employee.id}>
                                        <td>{employee.firstName} </td>
                                        <td>{employee.lastName} </td>
                                        <td>{employee.emailId} </td>
                                        <td>
                                            <button style={{marginLeft: "1rem"}}onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                            
                                            <button style={{marginLeft: "1rem"}} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>

                                            <button style={{marginLeft: "1rem"}} onClick={() => this.viewEmployee(employee.id)} className="btn btn-success">View</button>

                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;