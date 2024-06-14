import { MAIN_ACTION_TYPES } from "./main.reducer";

export const setProgram = (program) => ({
  type: MAIN_ACTION_TYPES.SET_PROGRAM,
  payload: program,
});

export const setDataSet = (dataset) => ({
  type: MAIN_ACTION_TYPES.SET_DATA_SET,
  payload: dataset,
});

export const setStatus = (bool) => ({
  type: MAIN_ACTION_TYPES.SET_STATUS,
  payload: bool,
});

export const setPeriod = (period) => ({
  type: MAIN_ACTION_TYPES.SET_PERIOD,
  payload: period,
});
