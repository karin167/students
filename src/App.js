import logo from "./logo.svg";
import "./App.css";
// import CheckIn from "./CheckIn";
import StudentsTable from "./StudentsTable";
import useStudents from "./useStudents";
import { useEffect, useState } from "react";
import AddStudentModal from "./AddStudentModal";
import { ColorRing } from "react-loader-spinner";

function App() {
  const {
    students,
    getStudentsLoading,
    getStudentsError,
    getStudents,
    resetStudents,
    deleteStudent,
  } = useStudents();
  //for loading initial content

  const handleDeleteStudent = (studentId) => {
    console.log({ studentId });

    deleteStudent({
      variables: { studentId: studentId },
      onCompleted: () => {
        getStudents();
      },
      onError: (error) => {},
    });
  };
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="app-container">
      {getStudentsLoading && (
        <p>
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </p>
      )}
      {getStudentsError && <p> Error : {getStudentsError.message}</p>}
      <StudentsTable
        students={students}
        onDeleteStudent={handleDeleteStudent}
      />
      {/* <CheckIn /> */}
      {/* /hide the button until data loaded / */}
      {!getStudentsLoading && (
        <AddStudentModal
          onAddComplete={() => {
            //. Synchronize new updates after new student added,
            getStudents();
          }}
        />
      )}
    </div>
  );
}

export default App;
