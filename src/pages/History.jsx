// rafce
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistoryAPI, getAllHistoryAPI } from '../services/allAPI'

const History = () => {
  const [allVideosHistory,setAllVideoHistory] = useState([])
  useEffect(()=>{
    getAllHistory()
  },[])
  console.log(allVideosHistory);
  
  const getAllHistory = async ()=>{
    try {
      const result = await getAllHistoryAPI()
      if(result.status>=200 && result.status<300){
        setAllVideoHistory(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeHistory = async(id)=>{
    try {
      await deleteHistoryAPI(id)
      getAllHistory()
    } catch (err) {
       console.log(err);
    }
  }

  return (
    <div style={{paddingTop:'100px'}}>
      <div className="container d-flex justify-content-between">
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to home</Link>
      </div>
      <table className="container my-5 table">
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>Time Stamp</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {
            allVideosHistory?.length>0?
              allVideosHistory?.map((videoDetails,index)=>(
                <tr>
                  <td>{index+1}</td>
                  <td>{videoDetails.caption}</td>
                  <td><a href={videoDetails.youTubeLink}>{videoDetails.youTubeLink}</a></td>
                  <td>{videoDetails.timeStamp}</td>
                  <td><button onClick={()=>removeHistory(videoDetails?.id)} className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
                </tr>
              ))
              :
              <div className="fw-bolder text-danger">You didnot watch any video yet!!!</div>
         }
        </tbody>
      </table>
    </div>
  )
}

export default History