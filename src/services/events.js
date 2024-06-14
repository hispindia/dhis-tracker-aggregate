export const events = {
  get: async(orgUnit, program, startDate, endDate) => {
    var url = `${process.env.REACT_APP_DHIS2_BASE_URL}/api/events.json?paging=false&orgUnit=${orgUnit}&program=${program}&startDate=${startDate}&endDate=${endDate}`
    let response = await fetch(url);
    let resData = await response.json();
    return resData;
  },
  put: async (id, events) => {
    var url = `${process.env.REACT_APP_DHIS2_BASE_URL}/api/events/${id}`;
    let response = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      url: url,
      body: JSON.stringify(events),
    });
    let resData = await response.json();

    if (resData.response.status == "SUCCESS") {
      return {
        conflict: "",
        status: resData.response.status,
        reference: id,
      };
    }
    if (resData.status == "ERROR") {
      return {
        conflict: resData.response.importSummaries[0].description,
        status: resData.status,
        reference: "",
      };
    }
  },
  post: async (events) => {
    var url = `${process.env.REACT_APP_DHIS2_BASE_URL}/api/events`;
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
    });
    let resData = await response.json();
    
    if (resData.response.status == "SUCCESS") {
      return {
        conflict: "",
        status: resData.response.status,
        reference: resData.response.importSummaries[0].reference,
      };
    }
    if (resData.status == "ERROR") {
      return {
        conflict: resData.response.importSummaries[0].description,
        status: resData.status,
        reference: "",
      };
    }
  },
};
