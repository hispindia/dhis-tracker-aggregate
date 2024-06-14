import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataSet } from "../../store/main/main.action";

export const DataSets = () => {
  const dispatch = useDispatch();
  const dataSets = useSelector((state) => state.sidebar.dataSets);
  const orgUnit = useSelector((state) => state.outree.clickedOU);
  const [ouDataSets, setOUDataSets] = useState([]);

  useEffect(() => {
    if (dataSets) {
      var selectedDataSets = [];
      if (orgUnit) {
        dataSets.forEach((dataSet) => {
          const OUPresent = dataSet.organisationUnits.filter(
            (ou) => ou.id == orgUnit.id
          );
          if (OUPresent.length) selectedDataSets.push(dataSet);
        });
      } else selectedDataSets = programs;
      setOUDataSets(selectedDataSets);
    }
  }, [orgUnit]);

  const handleChange = (ev) => {
    const { value } = ev.target;
    if (value) {
      const dataSet = ouDataSets.filter((ds) => ds.id === value);
      if (dataSet.length) {
        dispatch(setDataSet(dataSet[0]))
      }
    }
  };

  if(!ouDataSets.length) return null;
  return (
    <div className="dataset-container">
      <select className="form-select" onChange={handleChange}>
        <option className="text-italic" val="">
          --Select Data Set--
        </option>
        {ouDataSets.map((ds) => (
          <option key={ds.id} value={ds.id}>
            {ds.name}
          </option>
        ))}
      </select>
    </div>
  );
};
