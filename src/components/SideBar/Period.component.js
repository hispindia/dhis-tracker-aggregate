import React,{ useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setPeriod } from "../../store/main/main.action";

export const Period = () => {
  const dispatch = useDispatch();
  const dataSet = useSelector((state) => state.main.dataSet);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const handleChange = (e, type) => {
    const {value} = e.target;
    if(type == 'yyyy') setYear(value);
    if(type == 'mm') setMonth(value);
  }
  useEffect(() => {
    if(year) dispatch(setPeriod(year));
    if(month) dispatch(setPeriod(`${year}-${month}`))
  }, [year,month])

  if(!dataSet) return null;
  return (
    <div className="period-container">
      <DisplayPeriod periodType={dataSet.periodType} setMonth={setMonth} handleChange={handleChange}/>
    </div>
  );
};


const DisplayPeriod = ({periodType, handleChange, setMonth}) => {
  if(!periodType) return null;
  if(periodType == "Yearly") {
    const currentYear = new Date().getFullYear();
    const years = []
    for(let i= currentYear-5; i<=currentYear; i++) years.push(i);

    return  <div className="col">
        <select className="form-select" onChange={(e) => {
          setMonth('');
          handleChange(e, 'yyyy');
        }}>
        <option className="text-italic" val="">
          Year
        </option>
          {years.map(year => <option value={year}>{year}</option>)}
        </select> 
      </div>
  }
  if(periodType == "Monthly") {
    const currentYear = new Date().getFullYear();
    const years = []
    for(let i= currentYear-5; i<=currentYear; i++) years.push(i);
    
    var months = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sept_Oct_Nov_Dec";
    months=months.split('_');

    return <div className="row">
      <div className="col">
        <select className="form-select" onChange={(e) => handleChange(e, 'yyyy')}>
        <option className="text-italic" val="">
          Year
        </option>
          {years.map(year => <option value={year}>{year}</option>)}
        </select> 
      </div>
      <div className="col">
        <select className="form-select" onChange={(e) => handleChange(e, 'mm')}>
        <option className="text-italic" val="">
          Month
        </option>
          {months.map((month, index) => <option value={`00${index+1}`.slice(-2)}>{month}</option>)}
        </select> 
      </div>
    </div>
  }
}