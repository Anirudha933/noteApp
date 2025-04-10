import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
const Share = () => {
    //notes-start
    const data = useSelector((state) => state.note.notes
    )
    console.log(data)
    const dispatch = useDispatch();
    const [search, setsearch] = useState(" ");

    const handleSearch = (e) => {
        setsearch(e.target.value)
    }

    //  const handleEdit=(note)=>{
    //   dispatch(updateToNotes(note))
    //  }

    const displayNotes = data.filter((note) => note.Title.toLowerCase().includes(search.toLowerCase()))
    //notes-end
    const { id } = useParams();
    const currentUrl = `localhost:5173/notes/${id}`;
    const note = useSelector((state) => state.note.notes.find((item) => item._id === id));

    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`;
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`;
    const mailShareUrl = `mailto:?subject=${note.Title}&body=${encodeURIComponent(currentUrl)}`;

    return (

        //notes-start
        <div className='relative h-screen'>
            <input
                onChange={handleSearch}
                disabled
                placeholder='Search title here'
                className='mt-4 p-2 rounded-sm bg-black'
            ></input>
            <div className='mt-4 flex flex-col gap-3'>
                {
                    displayNotes.length > 0 && displayNotes.map((note) => {
                        return (
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
                                            <i className="fa-solid fa-pen-fancy"></i>

                                        </button>
                                        {/* delete */}
                                        <button>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                        {/* copy */}
                                        <button
                                        >
                                            <i className="fa-solid fa-copy"></i>
                                        </button>
                                        <button >
                                            {/* view */}

                                            <i className="fa-solid fa-eye"></i>

                                        </button>
                                        <button>
                                            {/* share */}

                                            <i className="fa-solid fa-share-nodes"></i>

                                        </button>
                                    </div>
                                </div>
                                <div
                                    className='bg-black rounded-md p-2'
                                >Content: {note.Content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

{/* start of share tab */}
            <div className='bg-gray-600  rounded-md p-5 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' >
                <h2 className='text-2xl font-bold'>Share</h2>
                <span className='absolute top-5 right-5 cursor-pointer'>
                    <button>
                        <NavLink to={`/notes`}>
                            <i className="fa-solid fa-x"></i>
                        </NavLink>
                    </button>
                </span>
                <div className='mt-5 flex gap-3'>
                    <div>
                        {/* twitter */}
                        <a href={twitterShareUrl}>
                            <i className="fa-brands fa-x-twitter hover:text-white text-lg bg-black p-2 rounded-lg"></i>
                        </a>
                        <p className='font-medium'>Twitter</p>
                    </div>
                    <div>
                        {/* facebook */}
                        <a href={facebookShareUrl}>
                            <i className="fa-brands fa-facebook-f  hover:text-white text-lg bg-blue-600 p-2 pl-3 pr-3 rounded-lg"></i>
                        </a>
                        <p className='font-medium'>Facebook</p>
                    </div>
                    <div>
                        {/* whatsapp */}
                        <a href={whatsappShareUrl}>
                            <i className="fa-brands fa-whatsapp hover:text-white text-lg bg-green-600 p-2 pl-2.5 pr-2.5 rounded-lg"></i>
                        </a>
                        <p className='font-medium'>WhatsApp</p>
                    </div>
                    <div>
                        {/* mail */}
                        <a href={mailShareUrl}>
                            <i className="fa-solid fa-envelope  hover:text-white text-lg bg-stone-400 p-2 pl-2.5 pr-2.5 rounded-lg"></i>
                        </a>
                        <p className='font-medium'>Mail</p>
                    </div>
                    <div>
                        {/* linkedin */}
                        <a href={linkedinShareUrl}>
                            <i className="fa-brands fa-linkedin-in  hover:text-white text-lg bg-blue-600 p-2 pl-2.5 pr-2.5 rounded-lg"></i>
                        </a>
                        <p className='font-medium'>LinkedIn</p>
                    </div> 
                </div>
                <div className='bg-black p-3 rounded-3xl mt-5 flex justify-between items-center'>
                    {currentUrl}
                    <button 
                    onClick={() => {if(navigator.clipboard.writeText(currentUrl)){
                        toast.success("Copied to clipboard")}}} 
                    className='cursor-pointer'>
                        <p>
                        <i className="fa-solid fa-copy hover:border-none"></i>
                        </p>
                    </button>
                </div>
            </div>
                    {/* end of share tab */}
        </div>
        //notes-end



    )
}

export default Share
