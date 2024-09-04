import React, { useState, useEffect } from "react";
import "./sideBar.style.scss";

import OrganisationUnitTree from "../OrganisationUnitTree";

import { useDispatch, useSelector } from "react-redux";
import {
  setClickedOU,
  setOUList,
  setUserOU,
} from "../../store/outree/outree.action";
import {
  setDataElements,
  setDataSetElements,
  setDatasets,
  setPrograms,
} from "../../store/sidebar/sidebar.action";
import { Programs } from "./Programs.component";
import {
  setDataSet,
  setProgram,
  setStatus,
} from "../../store/main/main.action";
import { DataSets } from "./Datasets.component";
import { Period } from "./Period.component";

const SideBar = ({ data }) => {
  const dispatch = useDispatch();

  const selectedOU = useSelector((state) => state.outree.clickedOU);

  useEffect(() => {
    if (data) {
      if (data.ouList) dispatch(setOUList(data.ouList.organisationUnits));
      if (data.me) {
        if (data.me.organisationUnits.length >= 2)
          data.me.organisationUnits = data.me.organisationUnits.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        dispatch(setUserOU(data.me.organisationUnits));
        dispatch(setClickedOU(data.me.organisationUnits[0]));
      }
      if (data.programList) dispatch(setPrograms(data.programList.programs));
      if (data.dataElementList) {
        let dataElementCode = {};
        data.dataElementList.dataElements.forEach((de) => {
          let attribute = de.attributeValues.filter(
            (attr) => attr.attribute.id == "iEnxrrNZkG9" //Tracker to Aggregate Mapping ../api/attributes.json
          );
          if (attribute.length) dataElementCode[de.id] = attribute[0].value;
        });
        dispatch(setDataElements(dataElementCode));
      }
      if (data.dataSetList) {
        let dataSets = [];
        let dataSetElements = {};
        data.dataSetList.dataSets.forEach((dataSet) => {
          if (
            dataSet.attributeValues.find(
              (attrVal) =>
                attrVal.attribute.id == "bUiUwQkTSrD" && attrVal.value == "true" //Data Set Sharing ../api/attributes.json
            )
          ) {
            var modifiedDataSet = dataSet;
            modifiedDataSet.dataElements = {};
            dataSet.dataSetElements.forEach((dse) => {
              dataSetElements[dse.dataElement.id] = dse.dataElement.name;
              dse.dataElement.categoryCombo.categoryOptionCombos.forEach(
                (coc) => {
                  dataSetElements[coc.id] = coc.displayName;
                  modifiedDataSet.dataElements[
                    `${dse.dataElement.code}+${coc.displayName}`
                  ] = `${dse.dataElement.id}-${coc.id}`;
                }
              );
            });
            dataSets.push(modifiedDataSet);
          }
        });
        dispatch(setDatasets(dataSets));
        dispatch(setDataSetElements(dataSetElements));
      }
    }
  }, [data]);

  useEffect(() => {
    if (selectedOU && selectedOU.id) {
      dispatch(setDataSet(null));
      dispatch(setProgram(null));
    }
  }, [selectedOU]);

  return (
    <div className="side-bar">
      <div>
        {selectedOU && (
          <>
            <input
              className="form-control"
              id="organisation-unit"
              disabled
              value={selectedOU.name}
            />
            <div>
              <OrganisationUnitTree />
            </div>
          </>
        )}
      </div>
      <div className="my-2">
        <Programs />
      </div>
      <div className="my-2">
        <DataSets />
      </div>
      <div className="my-2">
        <Period />
      </div>
      <button
        type="button"
        onClick={() => dispatch(setStatus(true))}
        className={"btn btn-primary w-100 my-5"}
      >
        Start Process
      </button>
    </div>
  );
};

export default SideBar;
