import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeTable from './tables/EmployeeTable';
import AddEmployeeForm from './forms/AddEmployeeForm';
import EditEmployeeForm from './forms/EditEmployeeForm';

const App = ()=> {

  const initialFormState = { id: null, firstName: '', lastName: '', department: '' }

  const[employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(false);
  const [ currentEmployee, setCurrentEmployee ] = useState(initialFormState)
  
   const getEmployees = async ()=>{
    axios.get('http://cors-anywhere.herokuapp.com/https://empservice-api.cfapps.io/api/employee')
    .then(response =>{
        console.log(response.data);
        const employees = response.data;
        const updatedEmployees = employees.map(emp =>{
          return {
          ...emp
          }
        });
        setEmployees(updatedEmployees);
  })
}

useEffect(() => {
  getEmployees();
},[]);

const addEmployee = employee => {
  axios.post('http://cors-anywhere.herokuapp.com/https://empservice-api.cfapps.io/api/employee',employee)
  .then(response => {
    console.log(response.data);
    setEmployees([...employees, response.data])
  })
}

const deleteEmployee = id => {
  axios.delete(`https://cors-anywhere.herokuapp.com/https://empservice-api.cfapps.io/api/employee/${id}`)
  .then(response => {
    console.log(response);
    setEmployees(getEmployees())
  })
}

const editRow = employee => {
  setEditing(true)
  setCurrentEmployee({ id: employee.id, firstName: employee.firstName, lastName: employee.lastName, department: employee.department.name })
}

const updateEmployee = (id, updatedEmployee) => {
  setEditing(false)
  axios.put('https://cors-anywhere.herokuapp.com/https://empservice-api.cfapps.io/api/employee/',updatedEmployee)
  .then(response => {
    console.log(response);
    setEmployees(getEmployees())
  })
  
}

  return (
    <div className="container">
      <h1>Employee App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
        {editing ? (
          <div>
            <h2>Edit user</h2>
            <EditEmployeeForm editing={editing} setEditing={setEditing}
              currentEmployee={currentEmployee}
              updateEmployee={updateEmployee}
            />
              </div>
            ) : (
              <div>
                    <h2>Add Employee</h2>
                    <AddEmployeeForm addEmployee={addEmployee}/>
            </div>)}      
        </div>
        <div className="flex-large">
          <h2>View Employees</h2>
          <EmployeeTable employees={employees} editRow={editRow} deleteEmployee={deleteEmployee}/>
        </div>
      </div>
    </div>
  );
}

export default App;
