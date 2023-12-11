import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React, { useState, useEffect } from "react";

function BasicButtonExample() {
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");

  const handleSelectChange = (eventKey) => {
    setSelectedMajor(eventKey);
    console.log("test:", selectedMajor);
  };

  useEffect(() => {
    fetch("https://ios-interview.joinhandshake-internal.com/majors")
      .then((response) => response.json())
      .then((data) => setMajors(data.majors));
  }, []);
  console.log(majors);

  return (
    <DropdownButton
      onSelect={handleSelectChange}
      id="dropdown-basic-button"
      title="Dropdown button"
    >
      {majors.map((major) => (
        <Dropdown.Item eventKey={major.name}>{major.name}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default BasicButtonExample;
