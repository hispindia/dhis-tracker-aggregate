import { sqlViewId } from "../components/constants";

export const sqlViews = {
    get: async(orgUnit, program, stage, startDate, endDate) => {
      var url = `${process.env.REACT_APP_DHIS2_BASE_URL}/api/sqlViews/${sqlViewId}/data?paging=false&var=program:${program}&var=stage:${stage}&var=orgUnit:${orgUnit}&var=startDate:${startDate}&var=endDate:${endDate}`
      let response = await fetch(url);
      let resData = await response.json();
      return resData.listGrid.rows;
    },
  };

  
  