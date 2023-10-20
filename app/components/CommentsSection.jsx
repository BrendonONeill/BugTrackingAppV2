
"use client"
import { useContext, useState} from "react";
import MainContext from "@/app/components/MainContext";

export default function CommentsSection({id, comments, setComments, setCommentsUpdated}){
    const {LoginUser} = useContext(MainContext)
    const [comment, setComment] = useState("")
    

    async function removeComment(e)
    {
      const test = e.target.className
      const body = {
        commentid: test,
        id
      };
      await fetch('/api/bugs/removecomment', {
          method: 'PUT',
          body: JSON.stringify(body),
        });
      let newComments = comments.filter((c) => c._id !== test)  
        setComments(newComments)
    }

    
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const submitform = async (e) => {
          e.preventDefault()
          const body = {
            comment,
            id,
            user: LoginUser
          };
          await fetch('/api/bugs/comment', {
              method: 'POST',
              body: JSON.stringify(body),
            });
            setComment("")
            setCommentsUpdated(true)
    }
  return (
    <>
    <div className="comment-section">
        <div className="comment-form-header"></div>
        <form className="comment-form" onSubmit={submitform}>
            
            <label htmlFor="comment"> Comment:
                <textarea className="form-input" type="text" id="comment" value={comment} onChange={handleChange} />
                
            </label>
            <input className="form-button" type="submit" value="Post" />
        </form>    
    </div>
    <div>
        { comments.length > 0 ?
            comments.map((c, index) => (
                <div className="comment-card" key={index}>
                <div className="comment-card-header"><div className="comment-name"><p>{c.userID.fname[0]} {c.userID.lname[0]}</p></div>
                <div>{c.userID._id === LoginUser._id? <button className={c._id} onClick={removeComment} ><img src="../binBlack.svg" width={20} height={20} alt="" /></button>: null}</div></div>
                <div className="comment-text"><p>{c.userComment}</p></div>
                <div className="comment-date">
                <p>{c.commentCreated.slice(11,16)}</p>
                <p>{c.commentCreated.slice(2,10).split("-").sort((a,b,c) => (a-b-c)).join("/")}</p>
                </div>
                </div>
            )) : null
        }
    </div>
    </>
  )
}
