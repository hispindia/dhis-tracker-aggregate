export const dataSet = {
    post: async (dataValueSets) => {
      var url = `${process.env.REACT_APP_DHIS2_BASE_URL}/api/dataValueSets`;
      let response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataValueSets),
      });
      let resData = await response.json();
      if (resData.response.status == "SUCCESS") {
        return {
          conflict: "",
          status: resData.response.status
        };
      }
      if (resData.status == "ERROR") {
        return {
          conflict: resData.response.importSummaries[0].description,
          status: resData.status
        };
      }
    },
  };
  