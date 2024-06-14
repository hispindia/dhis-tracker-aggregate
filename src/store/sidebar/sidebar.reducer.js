export const SIDEBAR_ACTION_TYPES = {
  SET_PROGRAMS: "SET_PROGRAMS",
  SET_DATASETS: "SET_DATASETS",
  SET_DATA_ELEMENTS: 'SET_DATA_ELEMENTS',
  SET_DATA_SET_ELEMENTS: 'SET_DATA_SET_ELEMENTS',
};

export const INITIAL_STATE = {
  programs: null,
  dataSets: null,
  dataElements: null,
  dataSetElements: null
};

export const sidebarReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIDEBAR_ACTION_TYPES.SET_PROGRAMS:
      return { ...state, programs: payload };
    case SIDEBAR_ACTION_TYPES.SET_DATASETS:
      return { ...state, dataSets: payload };
      case SIDEBAR_ACTION_TYPES.SET_DATA_ELEMENTS:
        return { ...state, dataElements: payload };
        case SIDEBAR_ACTION_TYPES.SET_DATA_SET_ELEMENTS:
          return { ...state, dataSetElements: payload };
    default:
      return state;
  }
};
