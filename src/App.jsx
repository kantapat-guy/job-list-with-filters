import { useState, useEffect } from "react";
import data from "./data.json";
import "./App.css";
import x from '../public/images/icon-remove.svg'

function App() {

  const [select, setSelect] = useState([])
  const [list, setList] = useState(data)

  const handleClick = (tag) => {
    if (select.includes(tag)) {
        return;
    }
    setSelect(prev => [...prev, tag]);
  };

  const clearFilter = () => {
    setSelect([])
    setList(data)
  }

  const removeFilter = (tag) => {
    const remove = select.filter((data) => {
      return data !== tag
    })
    setSelect(remove)
  }

  const filter = (terms) => {
    const sort = data.filter(list => {
      const tags = [...list.languages, ...list.tools, list.role, list.level];
      return terms.every(term => tags.includes(term));
    })
    setList(sort)
  }

  useEffect(() => {
    filter(select)
  }, [select])

  console.log((list));

  return (
    <div className="App">
      <div className="header" style={{ backgroundImage: `url(./images/bg-header-desktop.svg)` }}></div>
      <div className="list-container">
        <div className="select" style={{display: select != "" ? "flex" : "none"}} >
          <div className="left-select" style={{display: "flex", flexWrap: 'wrap'}}>
          {select.map((data) => (
            <div className="select-text">
              <p className="text">{data}</p>
              <button className="x" onClick={() => removeFilter(data)} ><img src={x} /></button>
            </div>
          ))}
          </div>
          <p className="clear" onClick={clearFilter} >Clear</p>
        </div>
        {list.map((data) => (
          <div className="job-list" key={data.id} style={{borderLeft: data.featured === true ? "5px solid hsl(180, 29%, 50%)" : "none", }} >
            <div className="left-container">
              <image className="logo" style={{ backgroundImage: `url(${data.logo})` }} alt={`${data.company} logo`} />
              <div className="detail-container">
                <div className="company-text">
                  <p className="company">{data.company}</p>
                  <p className="new" style={{display: data.new === true ? "flex" : "none"}}>{ data.new === true && "NEW!"}</p>
                  <p className="feature" style={{display: data.featured === true ? "flex" : "none"}} >{ data.featured === true && "FEATURED"}</p>
                </div>
                <p className="position">{data.position}</p>
                <div className="sub-detail">
                  <p>{data.postedAt}</p>
                  <p>&#8226;</p>
                  <p>{data.contract}</p>
                  <p>&#8226;</p>
                  <p>{data.location}</p>
                </div>
              </div>
            </div>
            <div className="right-container">
              <button onClick={()=> handleClick(data.role)}>{data.role}</button>
              <button onClick={()=> handleClick(data.level)}>{data.level}</button>
              {(data.tools).map((data) => (<button onClick={()=> handleClick(data)}>{data}</button>))}
              {(data.languages).map((data) => (<button onClick={()=> handleClick(data)}>{data}</button>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
