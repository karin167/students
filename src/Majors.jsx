import React, { useState, useEffect } from "react";
import Select from "react-select";

function Majors({ onSelectChange }) {
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");

  const handleSelectChange = (newValue, action) => {
    onSelectChange(newValue.value);
  };

  const sanitizeMajors = (majors) => {
    if (!Array.isArray(majors)) return [];

    return majors.map((major) => ({ value: major.name, label: major.name }));
  };

  useEffect(() => {
    fetch("https://ios-interview.joinhandshake-internal.com/majors")
      .then((response) => response.json())
      .then((data) => setMajors(sanitizeMajors(data.majors)));
  }, []);
  console.log(majors);

  if (!majors.length) return null;

  return <Select options={majors} onChange={handleSelectChange} />;
}

export default Majors;
