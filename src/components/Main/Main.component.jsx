import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { ApiService } from "../../services/api";
import { formatDate } from "../utils.func";
import { setStatus } from "../../store/main/main.action";
import { AgeGroup } from "../constants";

const Main = () => {
  const dispatch = useDispatch();
  const clickedOU = useSelector((state) => state.outree.clickedOU);
  const dataElements = useSelector((state) => state.sidebar.dataElements);
  const dataSetElements = useSelector((state) => state.sidebar.dataSetElements);
  const dataSet = useSelector((state) => state.main.dataSet);
  const program = useSelector((state) => state.main.program);
  const period = useSelector((state) => state.main.period);
  const status = useSelector((state) => state.main.status);

  const [overView, setOverview] = useState({});
  const [process, setProcess] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (status) {
      setIsSuccess(true);
      const uploadList = async () => {
        const date = formatDate(period);
        const process = [];
        process.push("Fetching clients.");
        setProcess([...process]);
        let resTeiList = await ApiService.sqlViews.get(
          clickedOU.id,
          program,
          date.startDate,
          date.endDate
        );

        process.push(`${resTeiList.length} clients present`);
        setProcess([...process]);
        process.push("");

        var dataValues = {};
        var count = 1;
        for (let teiId of resTeiList) {
          let teiAttr = {};
          let resTei = await ApiService.trackedEntityInstance.get(
            teiId[0],
            program
          );
          process[2] = `${count++} of ${
            resTeiList.length
          } client details loaded`;
          setProcess([...process]);

          if (resTei.trackedEntityInstance) {
            resTei.attributes.forEach(
              (attr) => (teiAttr[attr.attribute] = attr.value)
            );
            resTei.enrollments.forEach((enrollment) => {
              enrollment.events.forEach((event) => {
                let eventDate = event.eventDate
                  ? event.eventDate.split("T")[0]
                  : "";

                if (
                  eventDate &&
                  new Date(date.startDate) <= new Date(eventDate) &&
                  new Date(date.endDate) >= new Date(eventDate) &&
                  event.orgUnit == clickedOU.id
                ) {
                  let ageCategory = [];
                  let calculatedAge = event.dataValues.filter(
                    (dv) => dv.dataElement == "CZKmUs2suTW" //Data Element: Age at visit
                  );
                  if (calculatedAge.length) {
                    for (let age in AgeGroup) {
                      if (
                        eval(
                          AgeGroup[age].replaceAll("_", calculatedAge[0].value)
                        )
                      ) {
                        ageCategory.push(age);
                      }
                    }
                  }

                  event.dataValues.forEach((dataValue) => {
                    ageCategory.forEach((age) => {
                      if (
                        dataValue.value == "true" &&
                        dataElements[dataValue.dataElement]
                      ) {
                        let element =
                          dataSet.dataElements[
                            `${dataElements[dataValue.dataElement]}+${
                              teiAttr["QO7Pp5yFNYV"] //trackedEntityAttribute: Gender
                            }, ${age}`
                          ];
                        if (element) {
                          if (!dataValues[element]) dataValues[element] = 0;
                          dataValues[element] += 1;
                        }
                      } else if (
                        !Number.isNaN(dataValue.value) &&
                        dataElements[dataValue.dataElement]
                      ) {
                        let element =
                          dataSet.dataElements[
                            `${dataElements[dataValue.dataElement]}+${
                              teiAttr["QO7Pp5yFNYV"] //trackedEntityAttribute: Gender
                            }, ${age}`
                          ];
                        if (element) {
                          if (!dataValues[element]) dataValues[element] = 0;
                          dataValues[element] += Number(dataValue.value);
                        }
                      }
                    });
                  });
                }
              });
            });
          }
        }
        process.push("Pushing Aggregated Values.");
        setProcess([...process]);

        var dataValueSet = [];
        for (let de in dataValues) {
          dataValueSet.push({
            dataElement: de.split("-")[0],
            categoryOptionCombo: de.split("-")[1],
            value: dataValues[de],
          });
        }
        var dataValueSets = {
          dataSet: dataSet.id,
          period: period.split("-").join(""),
          orgUnit: clickedOU.id,
          dataValues: dataValueSet,
        };

        let resDataSet = await ApiService.dataSet.post(dataValueSets);
        if (resDataSet.status) {
          setOverview({
            status: resDataSet.status,
            dataValueSet: dataValueSet,
          });
        }

        process.push("Aggregation Completed.");
        setProcess([...process]);

        dispatch(setStatus(false));
      };
      uploadList();
    }
  }, [status]);

  if (!isSuccess) return null;
  return (
    <div className="ms-2 w-100">
      <h3 className="fw-bold text-center my-4">
        {dataSet?.name} Data Set{" "}
        {process.length != 5 ? (
          <span>
            {" "}
            [Processing] <span className="tei"></span>{" "}
          </span>
        ) : (
          <span>[Completed]</span>
        )}
      </h3>
      <ol>
        {process.map((list) => (
          <li className="text-success">
            <h5>{list}</h5>
          </li>
        ))}
      </ol>
      {process.length == 5 ? (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr className="table-info">
                <td colSpan={4}>
                  Detailed Overview!{" "}
                  <span className="fst-italic">[{overView.status}]</span>{" "}
                </td>
              </tr>
              <tr className="table-secondary">
                <td>S.No.</td>
                <td>Data Elements</td>
                <td>Category</td>
                <td>Value</td>
              </tr>
            </thead>
            <tbody>
              {overView.dataValueSet.map((dv, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{dataSetElements[dv.dataElement]}</td>
                  <td>{dataSetElements[dv.categoryOptionCombo]}</td>
                  <td>{dv.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
