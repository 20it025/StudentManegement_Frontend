import React, {useEffect, useState} from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import axios from "axios";

export default function StudentList() {

  const [student, setStudent] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/listStudents")
        .then(response => {

            setStudent(response.data);

        })
        .catch(error => alert(error));
  },[student])


  let deleteStudent = (id)  => {

    axios.delete("http://localhost:8080/student/" + id)
        .then(response => {
          setStudent(response.data)
        })
        .catch(error => alert(error));
  }

  return (
    <div className="my-3">
      <Container>
        <Card.Header><h3>Students List</h3></Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student Id</th>
                <th>Student Name</th>
                <th>Student Address</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
            {student.map((stu, i) => (
              <tr key={i}>
                <td>{stu.id}</td>
                <td>{stu.name}</td>
                <td>{stu.address}</td>
                <td><Button variant="primary">Edit</Button>  <Button variant="primary" onClick={()=>{deleteStudent(stu.id)}}>Delete</Button> </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Card.Body>
      </Container>
    </div>
  );
}
