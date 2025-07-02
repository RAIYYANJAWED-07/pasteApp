import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateTopastes } from '../redux/pasteSlice';

const Home = () => {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [seachParams, setSearchParams] = useSearchParams();
    const pasteId = seachParams.get('pasteId');
    const dispatch = useDispatch();
    const allPaste = useSelector ((state) => state.paste.pastes);

    useEffect(() => {
        if(pasteId){
            const paste = allPaste.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])

    function createPaste() {
        const paste ={
            title : title,
            content : value,
            _id: pasteId || Date.now().toString(36), // Generate a unique ID if pasteId is not provided
            createAt: new Date().toISOString(),
        }

        if(pasteId){
            //update
            dispatch(updateTopastes(paste));
        }
        else {
            //create 
            dispatch(addToPastes(paste));
        }

        //after updation 
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-10">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        className="flex-1 p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        onClick={createPaste}
                        className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold transition shadow-md"
                    >
                        {pasteId ? 'Update My Paste' : 'Create My Paste'}
                    </button>
                </div>
                <textarea
                    className="w-full h-64 p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400 resize-none mb-2"
                    placeholder="Enter content here"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Home
