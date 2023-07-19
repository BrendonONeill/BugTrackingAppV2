"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Nav from '@/app/components/Nav';
import Link from 'next/link';

function page() {
    const pathName = useParams()
    const [infoBug, setInfoBug] = useState(null)

    useEffect(() => {
     function test()
     {
         fetch(`/api/bugs/buginfo?q=${pathName.idBug}`, {method: "GET"}).then(res => res.json()).then(data => {
         setInfoBug(data.bug)}).catch(error => console.log(error))
     }
     test()
    },[])
  return (
    <main>
      <Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
      {infoBug !== null ?
      <>
        <Nav />
        <div className='bug-expanded-info'>
        <h2>{infoBug.bugName}</h2>

        <p className='bug-expanded-info-label'>Created By</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugUserId?.fname} {infoBug.bugUserId?.lname}</p>
        </div>

        <p className='bug-expanded-info-label'>Description</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugDes}</p>
        </div>

        <p className='bug-expanded-info-label'>Code</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugCode}</p>
        </div>

        <p className='bug-expanded-info-label'>Project</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugProject}</p>
        </div>

        <p className='bug-expanded-info-label'>Importance</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugImportance}</p>
        </div>
      

        <p className='bug-expanded-info-label'>Date Created</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.dateBugCreated.slice(0,10)}</p>
        </div>
        </div></>: null
        }
    </main>
    
  )
}

export default page