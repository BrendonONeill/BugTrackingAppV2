"use client"
import RecycleCard from "@/app/components/RecycleCard";
import { useContext, useEffect, useState } from "react";
import MainContext from "@/app/components/MainContext";
import BugLoading from "./BugLoading";


function RecyclingBin() {
    const {LoginUser, setRecyclingBinBugs, recyclingBinBugs, flashCard, setFlashCard} = useContext(MainContext)
    const [emptyList,setEmptyList] = useState(false)
    const [deleteCard, setDeleteCard] = useState(false);
    const [deleteCardContent, setDeleteCardContent] = useState({});
    const [deleteString, setDeleteString] = useState("");
    const [deleteButton, setDeleteButton] = useState(false);
    useEffect(() => {
        async function test()
        {
          const res = await fetch("/api/bugs/recyclingbin", {method: "GET", cache: 'no-store'})
          const data = await res.json()
          if(data.length === 0)
          {
            setEmptyList(true);
          }
          setRecyclingBinBugs(data);
        }
        test()
      
      },[]) 

      setTimeout(() => {
        if(flashCard !== '')
        {
          setFlashCard('');
        }
      }, 3000)

  function deletionProcess(information)
  {
    let a = information.bugUserId.fname.trim();
    let b = information.bugUserId.lname.trim();
    let c = information.bugName.trim();
    c = c.replaceAll(" ", "_");
    setDeleteCardContent(information);
    setDeleteString(`${a}${b}/${c}`);
    setDeleteCard(true);
  }

  function hide(e)
  {
    if(e.target.classList.contains("delete-card-bg") || e.target.classList.contains("delete-card-close"))
      {
        setDeleteCard(false)
      }
  }

  async function permanentlyDelete(e)
  {
    e.preventDefault();
    await fetch('/api/bugs/permanmentlydelete', {
      method: 'POST',
      body: JSON.stringify({id: deleteCardContent._id, user: LoginUser}),
    });

    let data = recyclingBinBugs.filter(bug => bug._id !== deleteCardContent._id);
    setFlashCard('Bug was deleted');
    setRecyclingBinBugs([...data]);
    setDeleteString("");
    setDeleteCard(false);
    setDeleteCardContent({});
    setDeleteButton(false);

    if(data.length === 0)
    {
      setEmptyList(true);
    }
  }

  return (
   <>
   <div className="card-container"> 
    {
      flashCard ? 
        <div className="flashCard">
          {flashCard}
        </div>
      : null
    }
    {
      deleteCard ?
      <div className="delete-card-bg" onClick={(e) => hide(e)}>
        <div className="delete-card">
          <button className="delete-card-close">x</button>
          <p>This will permanently delete this bug if you are sure re-type the below string into the input box and submit. ( Case Sensitive )</p>
          <p className="delete-card-text">{deleteString}</p>
          <form onSubmit={(e) => permanentlyDelete(e)} >
                <input className="delete-card-input" type="text" onChange={(e) => deleteString === e.target.value ? setDeleteButton(true): null} />
                <input className={deleteButton?"delete-card-button": "delete-card-noButton"} disabled={!deleteButton}  type="submit" value="Permanently Delete" />
          </form>
        </div>
      </div>
      : null
    }
    {
         recyclingBinBugs.length > 0 && LoginUser ?
         recyclingBinBugs.map((post, index) => (
           <RecycleCard post={post} index={index} key={post._id} test={post._id} setEmptyList={setEmptyList} deletionProcess={deletionProcess} />
         )) 
         : emptyList && recyclingBinBugs.length === 0 ? <div className="noticeblock"><p>You have no cards in the recycling bin.</p></div> 
         :<> <BugLoading /> <BugLoading /> <BugLoading /> </>
    }
   </div>
   </>
  )
}

export default RecyclingBin