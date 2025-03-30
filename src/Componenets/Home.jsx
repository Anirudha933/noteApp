import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToNotes, updateToNotes } from '../notes/notesSlice';
const Home = () => {
  // const {id}=useParams()
  const data=useSelector((state)=>state.note.notes);
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [noteID,setNoteID]=useSearchParams(" ");
  const noteId=noteID.get("noteID");
  const dispatch=useDispatch();
  
  useEffect(() => {
    if(noteId){
      const note=data.find((item)=>item._id===noteId)
      console.log(note)
      console.log(noteId)
      setTitle(note.Title);
      setContent(note.Content);
    }
  
 }, [noteId])
 
    
    const createOrUpdateNote=()=>{
       const note={
        Title:title,
       Content:content,
       _id:noteId || Date.now().toString(36),
       createdAt:new Date().toLocaleDateString()
       }
       if(noteId){
        //update note
        dispatch(updateToNotes(note))
       }
       else{
        //create note
        dispatch(addToNotes(note))
       }
       setContent(" ");
       setTitle(" ");
       setNoteID({});
    }
  return (
    <div>
        <div>
      <input 
      className='mt-4 p-2 rounded-sm bg-black'
      type="text"
      placeholder='Enter Title for your note'
      onChange={(e)=>setTitle(e.target.value)}
      value={title}
      required
      ></input>
      <button
      className='ml-10 bg-black'
      onClick={createOrUpdateNote}>
      {noteId?"Update Note":"Create Note"}
      </button>
      </div>
      <div>
        <textarea 
        required
        rows={20}
        className='mt-4 p-2 rounded-sm bg-black min-w-150'
        type='text'
        placeholder='Enter Your Content here'
        onChange={(e)=>setContent(e.target.value)}
        value={content}
        >
        </textarea>
      </div>
    </div>
  )
}

export default Home
