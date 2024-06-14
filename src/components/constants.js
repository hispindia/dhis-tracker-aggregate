export const InitialQuery = {
  me: {
    resource: "me.json",
    params: {
      fields: ["id", "organisationUnits[id,name,code,path]"],
    },
  },
  ouList: { 
    resource: "organisationUnits.json",
    params: {
      fields: ["id,name,code,path,children[id,name]"],
      withinUserHierarchy: true,
      paging: false,
    },
  },
  dataElementList: {
    resource: "dataElements.json",
    params: {
      fields: ["id,name,displayName,code,attributeValues"],
      paging: false
    }
  },
  programList: {
    resource: "programs.json",
    params: {
      fields: ["id,name,trackedEntityType,programTrackedEntityAttributes[id,valueType,trackedEntityAttribute[id,name,optionSetValue,optionSet[options[name,code]]]],programStages[id,name,programStageDataElements[compulsory,dataElement[id,name,valueType,optionSetValue,optionSet[options[name,code]]]]],organisationUnits"],
      paging: false
    }
  },
  dataSetList: {
    resource: "dataSets.json",
    params: {
      fields: ["id,name,displayName,periodType,organisationUnits,attributeValues,dataSetElements[categoryCombo,dataElement[id,displayName,name,code,categoryCombo[categories[id,name],categoryOptionCombos[id,displayName,categoryOptions[id,name]]]"],
      paging: false
    }
  },
};

export const AgeGroup = {
  "Below 25 Yrs": "_<25",
  "25 Yrs & Above": "_>=25",
  "Less than 1 Yr": "_<1",
  "1-2 Yrs": "_>=1 && _<=2",
  "3-5 Yrs": "_>=3 && _<=5",
  "6-9 Yrs": "_>=6 && _<=9",
  "10 Yrs and More": '_>=10',
  "Less than 10 Yrs": '_<10',
  "10-14 Yrs": "_>=10 && _<=14",
  "15-19 Yrs": "_>=15 && _<=19",
  "20-24 Yrs": "_>=20 && _<=24",
  "25-29 Yrs": "_>=25 && _<=29",
  "30-34 Yrs": "_>=30 && _<=35",
  "35-39 Yrs": "_>=35 && _<=39",
  "40-44 Yrs": "_>=40 && _<=44",
  "45-49 Yrs": "_>=45 && _<=49",
  "50 Yrs and Above": '_>=50',
}