import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeNote, updateToNotes } from '../notes/notesSlice'
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Notes = () => {
  const data=useSelector((state)=>state.note.notes
    )
    console.log(data)
  const dispatch = useDispatch();
  const [search,setsearch]=useState(" ");
 const handleSearch=(e)=>{
    setsearch(e.target.value)
 }
//  const handleEdit=(note)=>{
//   dispatch(updateToNotes(note))
//  }
 const handleDelete=(id)=>{
  dispatch(removeNote(id))
 }

 const displayNotes=data.filter((note)=>note.Title.toLowerCase().includes(search.toLowerCase()))
  return (
   <div>
    <input
    onChange={handleSearch}
    placeholder='Search title here'
    className='mt-4 p-2 rounded-sm bg-black'
    ></input>
    <div className='mt-4 flex flex-col gap-3'>
{
  displayNotes.length>0 && displayNotes.map((note)=>{
    return(
      <div key={note._id}
      className='flex flex-col gap-3 p-3 border-5 border-double '>
        <div className='flex justify-between items-center'>
          <div>
          Title: {note.Title}
          </div>
          <div
        className='flex'>
          {/* buttons */}
          <button>
            {/* edit */}
           <NavLink to={`/?noteID=${note._id}`}>
           <i className="fa-solid fa-pen-fancy"></i>
           </NavLink>
          </button>
          {/* delete */}
          <button  onClick={()=>handleDelete(note?._id)} >
          <i className="fa-solid fa-trash"></i>
          </button>
          {/* copy */}
          <button  onClick={() => {if(navigator.clipboard.writeText(note?.Content)){
            toast.success("Copied to clipboard")}}} 
            >
            <i className="fa-solid fa-copy"></i>
          </button>
          <button >
            {/* view */}
            <NavLink
            to={`/notes/${note._id}`}
            >
              <i className="fa-solid fa-eye"></i>
            </NavLink>
          </button>
          <button>
            {/* share */}
            <NavLink
            to={`/share/${note._id}`}>
          <i class="fa-solid fa-share-nodes"></i>
            </NavLink>
          </button>
              </div>
        </div>
        {/* absolute top-0 right-0 */}
        <div
        className='bg-black rounded-md p-2'
        >Content: {note.Content}
        </div>
       </div>
    )
  })
}
    </div>
   </div>
  )
}

export default Notes
