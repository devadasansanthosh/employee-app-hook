import React from 'react'

const EmployeeTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Department</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {props.employees.length > 0 ? (
        props.employees.map(employee => (
      <tr key={employee.id}>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.department.name}</td>
        <td>
          <button  onClick={() => {props.editRow(employee)}} className="button muted-button">Edit</button>
          <button onClick={() => props.deleteEmployee(employee.id)} className="button muted-button">Delete</button>
        </td>
      </tr>
      ))
      ) : (
        <tr>
          <td colSpan={3}>Loading ....</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default EmployeeTable