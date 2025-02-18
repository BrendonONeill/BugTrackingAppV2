"use client"

function ConfirmCard({text,permanentlyDelete, deleteString, deleteButton, setDeleteButton}) {

  return (
        <div className="delete-card">
          <button className="delete-card-close">x</button>
          <p>{text}</p>
          <p className="delete-card-text">{deleteString}</p>
          <form onSubmit={(e) => permanentlyDelete(e)} >
                <input className="delete-card-input" type="text" onChange={(e) => deleteString === e.target.value ? setDeleteButton(true): null} />
                <input className={deleteButton?"delete-card-button": "delete-card-noButton"} disabled={!deleteButton}  type="submit" value="Permanently Delete" />
          </form>
        </div>
  )
}

export default ConfirmCard