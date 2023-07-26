"use client"
import { useContext, useState} from "react";
import MainContext from "@/app/components/MainContext";

function BugFilter() {
    const {bugs, setBugCards, LoginUser} = useContext(MainContext)
    const [filterForm, setFilterForm] = useState({filter: "none", sort: "none"})

    const handleChange = (e) => {
        setFilterForm({ ...filterForm, [e.target.name]: e.target.value });
    };

      
    function test(e)
    {
        let data = bugs
        e.preventDefault()
        if(filterForm.filter === "none")
        {
            sortFiltered(data)
        }
        if(filterForm.filter === "user")
        {
            data = data.filter((card) => card.bugUserId._id === LoginUser._id)
            sortFiltered(data)
        }
       
    }

    function sortFiltered(data)
    {
        if(data.length <= 1)
        {
            setBugCards(data)
        }
        if(filterForm.sort === "none")
        {
            data = data.slice()
            setBugCards(data)
        }
        else if(filterForm.sort === "bugImportance")
        {
            const order = ["high", "medium", "low"];
            let info = data.sort((a,b) => order.indexOf(a[filterForm.sort]) - order.indexOf(b[filterForm.sort]));
            let test = info.slice()
            setBugCards(test)
        }
        else
        {
            let info = data.sort((a,b) => (a[filterForm.sort] > b[filterForm.sort]) ? 1 : ((b[filterForm.sort] > a[filterForm.sort]) ? -1 : 0))
            let test = info.slice()
            setBugCards(test)
        }
    }

    
    
  return (
    <form onSubmit={test} className="bug-filter">
        <label className="filter-text" htmlFor="filter">
            <div className="bug-filter-flex">
                <img src="/filter.svg" alt="" width={15} height={15} />
                <p>Filter</p>
            </div>
            <select className="bug-filter-select" name="filter" id="filter" value={filterForm.filter} onChange={handleChange}>
                <option value="none">None</option>
                <option value="user">User</option>
            </select>
        </label>
        <label htmlFor="sort">
        <div className="bug-filter-flex">
                <img src="/sort.svg" alt="" width={15} height={15} />
                <p>Sort</p>
            </div>
            <select className="bug-filter-select"  name="sort" id="sort" value={filterForm.sort} onChange={handleChange}>
                <option value="none">None</option>
                <option value="bugName">Name</option>
                <option value="bugCode">Code</option>
                <option value="dateBugCreated">Date</option>
                <option value="bugImportance">Importance</option>
            </select>
        </label>
        <input className="bug-filter-button" type="submit" value="Submit" />
    </form>
  )
}

export default BugFilter