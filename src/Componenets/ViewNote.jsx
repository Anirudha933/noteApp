import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToNotes } from '../notes/notesSlice';
import toast from 'react-hot-toast';
const ViewNote = () => {
  const {id}=useParams();
  const data=useSelector((state)=>state.note.notes);
  const find=data.find((item)=>item._id===id);
  return (
    <div>
    <div>
  <input 
  className='mt-4 p-2 rounded-sm bg-black'
  type="text"
  placeholder='Enter Title for your note'
  onChange={(e)=>setTitle(e.target.value)}
  value={find.Title}
  required
  disabled
  ></input>
  {/* <button
  className='ml-10'
  onClick={createOrUpdateNote}>
  {noteId?"Update Note":"Create Note"}
  </button> */}
  </div>
  <div className='relative'>
  <button 
      className='absolute top-4 right-0 bg-black'
      onClick={() => {if(navigator.clipboard.writeText(find.Content)){
      toast.success("Copied to clipboard")}}}>
          <i className="fa-solid fa-copy"></i>
        </button>
    <textarea 
    required
    rows={20}
    className='mt-4 p-2 rounded-sm bg-black min-w-150 '
    type='text'
    placeholder='Enter Your Content here'
    onChange={(e)=>setContent(e.target.value)}
    value={find.Content}
    disabled
    >
     
    </textarea>
      
  </div>
</div>
  )
}

export default ViewNote
