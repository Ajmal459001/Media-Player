// rafce
import React,{useState} from 'react'
import { Modal,Button,Form,FloatingLabel } from 'react-bootstrap'
import { saveVideoAPI } from '../services/allAPI'


const Add = ({setAddResponseFromHome}) => {
  const [invalidYouTubeLink,setinvalidYouTubeLink] = useState(false)
  const [videoDetails,setVideoDetails] = useState({
    caption:"",imgUrl:"",youTubeLink:""
  })
  console.log(videoDetails);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const extractingEmbedLinkFromYouTubeLink = (userInputYouTubeLink) => {
    // steps creating embed link from youtube link
    if(userInputYouTubeLink.includes("https://www.youtube.com/watch?v=")){
      console.log(userInputYouTubeLink.split("v=")[1].slice(0,11));
      const videoId =userInputYouTubeLink.split("v=")[1].slice(0,11)
      setinvalidYouTubeLink(false)
      setVideoDetails({...videoDetails,youTubeLink:`https://www.youtube.com/embed/${videoId}`})
    }else{
      setinvalidYouTubeLink(true)
      setVideoDetails({...videoDetails,youTubeLink:""})
    }
  }

  const handleUploadVideo = async () => {
    // object destructure : const {key1,key2....} = object_name
    const {caption,imgUrl,youTubeLink} = videoDetails
    if(caption && imgUrl && youTubeLink){
      // store video detilas permanently
      // alert("proceed to store video details permanently")
      try {
        const result = await saveVideoAPI(videoDetails)
        console.log(result);
        if(result.status>=200 && result.status<300){
          // video added to json file
          alert("Video Uploaded successfully!!!")
          handleClose()
          // pass result to view component
          setAddResponseFromHome(result)
        }else{
          console.log(result);
        }        

      } catch (err) {
        console.log(err);
      }
    }else{
      alert("Please fill the form!!!")
    }
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <h5>Upload New Video</h5>
        <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
      </div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Uploading Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
            <FloatingLabel controlId="floatingCaption" label="Caption">
              <Form.Control onChange={e=>setVideoDetails({...videoDetails,caption:e.target.value})} type="text" placeholder="Caption" />
            </FloatingLabel>
            <FloatingLabel onChange={e=>setVideoDetails({...videoDetails,imgUrl:e.target.value})} className='mt-2' controlId="floatingUrl" label="Vedio Image URL">
              <Form.Control type="text" placeholder="Caption" />
            </FloatingLabel>
            <FloatingLabel className='mt-2' controlId="floatingLink" label="Vedio YouTube Link">
              <Form.Control onChange={e=>extractingEmbedLinkFromYouTubeLink(e.target.value)} type="text" placeholder="Caption" />
            </FloatingLabel>
            {
              // conditional rendering
              invalidYouTubeLink && 
              <div className="text-danger fw-bolder mt-2">Invalid youtube link...Please try with another!!!</div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUploadVideo} className='btn btn-info' variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add