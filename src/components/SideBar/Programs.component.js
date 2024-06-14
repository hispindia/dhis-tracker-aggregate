import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataSet, setProgram, setProgramSheet } from "../../store/main/main.action";

export const Programs = () => {
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.sidebar.programs);
  const orgUnit = useSelector((state) => state.outree.clickedOU);
  const [ouPrograms, setOUPrograms] = useState([]);

  useEffect(() => {
    if (programs) {
      var selectedPrograms = [];
      if (orgUnit) {
        programs.forEach((program) => {
          const OUPresent = program.organisationUnits.filter(
            (ou) => ou.id == orgUnit.id
          );
          if (OUPresent.length) selectedPrograms.push(program);
        });
      } else selectedPrograms = programs;
      setOUPrograms(selectedPrograms);
    }
  }, [orgUnit]);

  const handleChange = (ev) => {
    const { value } = ev.target;
    if (value) {
      dispatch(setProgram(value));
    }
  };

  if(!ouPrograms.length) return  null;
  return (
    <div className="program-container">
      <select className="form-select" onChange={handleChange}>
        <option className="text-italic" val="">
          --Select Program--
        </option>
        {ouPrograms.map((program) => (
          <option key={program.id} value={program.id}>
            {program.name}
          </option>
        ))}
      </select>
    </div>
  );
};
