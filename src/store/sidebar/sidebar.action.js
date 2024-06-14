import { SIDEBAR_ACTION_TYPES } from "./sidebar.reducer";

export const setPrograms = (programs) => ({
  type: SIDEBAR_ACTION_TYPES.SET_PROGRAMS,
  payload: programs,
});

export const setDatasets = (dataSets) => ({
  type: SIDEBAR_ACTION_TYPES.SET_DATASETS,
  payload: dataSets,
});

export const setDataElements = (dataElements) => ({
  type: SIDEBAR_ACTION_TYPES.SET_DATA_ELEMENTS,
  payload: dataElements,
});

export const setDataSetElements = (dataElements) => ({
  type: SIDEBAR_ACTION_TYPES.SET_DATA_SET_ELEMENTS,
  payload: dataElements,
});
