import React from "react";
import DeleteIcon from "./delete-button.svg";
import useStudents from "./useStudents";
export default function StudentsTable({ students, onDeleteStudent }) {
  if (!students.length) return null;
  return (
    <div>
      <h1>Students:</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Check in time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
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
