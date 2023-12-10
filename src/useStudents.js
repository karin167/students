import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import { useState } from "react";

const GET_STUDENTS = gql`
  {
    students {
      check_in_time
      first_name
      last_name
      id
    }
  }
`;

const ADD_STUDENT = gql`
  mutation InsertStudent($firstName: String, $lastName: String) {
    insert_students_one(
      object: { first_name: $firstName, last_name: $lastName }
    ) {
      last_name
      first_name
      id
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($studentId: Int!) {
    delete_students_by_pk(id: $studentId) {
      first_name
      last_name
      id
    }
  }
`;

function useStudents() {
  const [
    _getStudents,
    { loading: getStudentsLoading, error: getStudentsError },
  ] = useLazyQuery(GET_STUDENTS, { fetchPolicy: "no-cache" });

  const [insertStudent, { loading: insertStudentLoading, error }] =
    useMutation(ADD_STUDENT);
  const [deleteStudent, { loading: deleteLoading }] =
    useMutation(DELETE_STUDENT);

  const [students, setStudents] = useState([]);

  const addStudent = ({ firstName, lastName }) => {
    console.log({ firstName, lastName });
    return insertStudent({
      variables: { firstName, lastName },
    });
  };

  const resetStudents = () => setStudents([]);

  const getStudents = () => {
    _getStudents({
      onCompleted: (data) => {
        console.log("CONTENT RELOADED", data);
        setStudents(data?.students || []);
      },
    });
  };

  return {
    addStudent,
    getStudentsError,
    students,
    getStudentsLoading,
    getStudents,
    resetStudents,
    insertStudentLoading,
    deleteStudent,
  };
}

export default useStudents;
