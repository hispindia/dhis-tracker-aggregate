export const MAIN_ACTION_TYPES = {
    SET_STATUS: "SET_STATUS",
    SET_PROGRAM: 'SET_PROGRAM',
    SET_DATA_SET: 'SET_DATA_SET',
    SET_PERIOD: 'SET_PERIOD',
  };
  
  export const INITIAL_STATE = {
    status: false,
    program: null,
    dataSet: null,
    period: null,
  };
  
  export const mainReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
      case MAIN_ACTION_TYPES.SET_PROGRAM:
        return { ...state, program: payload };
      case MAIN_ACTION_TYPES.SET_DATA_SET:
        return { ...state, dataSet: payload };
      case MAIN_ACTION_TYPES.SET_STATUS:
        return { ...state, status: payload };
      case MAIN_ACTION_TYPES.SET_PERIOD:
        return { ...state, period: payload };
      default:
        return state;
    }
  };
  