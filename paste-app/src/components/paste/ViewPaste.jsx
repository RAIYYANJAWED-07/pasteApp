import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateTopastes } from '../../redux/slices/pasteSlice';

const ViewPaste = () => {

    const {id } = useParams();

    const allPaste = useSelector((state)=> state.paste.pastes);
    const paste = allPaste.find((p) => p._id === id);

    if (!paste) {
        return (
            <div className="w-full max-w-2xl mx-auto mt-10 text-center text-red-400">
                Paste not found.
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-10">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        className="flex-1 p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 outline-none placeholder-gray-400"
                        type="text"
                        placeholder="Enter title here"
                        value={paste.title}
                        disabled
                    />
                    <button
                        className="px-6 py-3 rounded-xl bg-blue-700 text-white font-semibold opacity-60 cursor-not-allowed"
                        disabled
                    >
                        Create My Paste
                    </button>
                </div>
                <textarea
                    className="w-full h-64 p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 outline-none placeholder-gray-400 resize-none mb-2"
                    placeholder="Enter content here"
                    value={paste.content}
                    disabled
                />
            </div>
        </div>
    )
}

export default ViewPaste
