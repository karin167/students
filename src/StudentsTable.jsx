import React from "react";
import DeleteIcon from "./delete-button.svg";
import useStudents from "./useStudents";

export default function StudentsTable({ students, onDeleteStudent }) {
  if (!students.length) return null;
  return (
    <div>
      <div className="container mt-4 mb-2 "></div>
      <h1>Students:</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Major</th>
              <th>Check in time</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.email}</td>
                <td>{student.major}</td>
                <td>{new Date(student.check_in_time).toLocaleString()}</td>
                <td>
                  <img
                    role="button"
                    src={DeleteIcon}
                    alt=""
                    width={18}
                    onClick={() => onDeleteStudent(student.id)}
                  />
                </td>
              </tr>
            ))}
            <div></div>
          </tbody>
        </table>
      </div>
    </div>
  );
}
