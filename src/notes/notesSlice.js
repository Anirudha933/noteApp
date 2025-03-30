import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

// const initialState={
//   notes:localStorage.getItem("Notes")?Array.isArray(JSON.parse(localStorage.getItem("Notes")))?JSON.parse(localStorage.getItem("Notes")):[JSON.parse(localStorage.getItem("Notes"))]:[],
// };

export const notesSlice = createSlice({
  name: 'notes',
  initialState:{
    notes:localStorage.getItem("Notes")?Array.isArray(JSON.parse(localStorage.getItem("Notes")))?JSON.parse(localStorage.getItem("Notes")):[JSON.parse(localStorage.getItem("Notes"))]:[],
  },
  reducers: {
    addToNotes:(state,action)=>{

//triming all the whitespaces
  const note=action.payload;
  for (let key in note) {
    if (typeof note[key] === 'string') {
        note[key] = note[key].trim();
    }
}

  console.log(typeof(state.notes))
//Checking it the note exists already or not
const noteExists = state.notes.some((existingNote) => 
  existingNote.Title === note.Title && existingNote.Content === note.Content
);

  if(noteExists){
    toast.error("Note already exists");
      return
  }
   else{ 
    //Making sure there is no empty content or title
    if(!note.Title||!note.Content){
      toast.error("Please fill all the fields");
      return
    }
    state.notes.push(note);
    try {
      localStorage.setItem("Notes", JSON.stringify(state.notes));
      console.log('Stored in localStorage:', localStorage.getItem("Notes"));
      toast.success("Note created successfully");
    } catch (error) {
      console.error("LocalStorage error:", error);
      toast.error("Failed to save note");
    }}
    },
    updateToNotes: (state,action) => {
      const note=action.payload;
      console.log(note)
      const index=state.notes.findIndex((item)=>item._id===note._id)
      console.log(index)
      if(index>=0){
        state.notes[index]=note;
        localStorage.setItem("Notes",JSON.stringify(state.notes))
        toast.success("Note Updated Successfully");
      }
    },
    removeNote: (state, action) => {

      const noteId=action.payload;
      const index=state.notes.findIndex((item)=>item._id===noteId)
     if(index>=0){
     try{ state.notes.splice(index,1);
      localStorage.setItem("Notes",JSON.stringify(state.notes))
      toast.success("Note Deleted Successfully");}
      catch(err){
        console.log(err)
        toast.error("Failed to delete note")
      }
     }
     else{
      toast.error(`No Note exists with the title : ${note.Title}`)
     }
    },
    resetAllNotes: (state, action) => {
     state.notes=[];
     localStorage.removeItem("Notes");
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToNotes, updateToNotes, resetAllNotes,removeNote } = notesSlice.actions

export default notesSlice.reducer