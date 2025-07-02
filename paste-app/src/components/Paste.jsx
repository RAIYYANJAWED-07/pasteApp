import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FiEdit, FiEye, FiTrash2, FiCopy, FiShare2 } from 'react-icons/fi';

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    const [seacrhTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(
            seacrhTerm.toLowerCase()
        )
    );

    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId));
    }

    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <input
                className="p-3 rounded-xl w-full bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition mb-6 placeholder-gray-400"
                type="search"
                placeholder="Search pastes..."
                value={seacrhTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map((paste) => (
                        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-6 transition hover:shadow-2xl" key={paste?._id}>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                <div className="text-lg font-semibold text-blue-400 truncate">{paste.title}</div>
                                <div className="text-xs text-gray-500">{new Date(paste.createAt).toLocaleString()}</div>
                            </div>
                            <div className="text-gray-200 whitespace-pre-line break-words mb-4 max-h-32 overflow-y-auto">{paste.content}</div>
                            <div className="flex flex-wrap gap-3 justify-end">
                                <button
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition"
                                    onClick={() => { window.location.href = `/?pasteId=${paste?._id}`; }}
                                    title="Edit"
                                >
                                    <FiEdit /> Edit
                                </button>
                                <button
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white transition"
                                    onClick={() => { window.location.href = `/pastes/${paste?._id}`; }}
                                    title="View"
                                >
                                    <FiEye /> View
                                </button>
                                <button
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white transition"
                                    onClick={() => handleDelete(paste?._id)}
                                    title="Delete"
                                >
                                    <FiTrash2 /> Delete
                                </button>
                                <button
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
                                    onClick={() => {
                                        navigator.clipboard.writeText(paste?.content);
                                        toast.success('copied to clipboard!');
                                    }}
                                    title="Copy"
                                >
                                    <FiCopy /> Copy
                                </button>
                                <button
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white transition"
                                    onClick={async () => {
                                        try {
                                            await navigator.share({ text: paste.content });
                                        } catch (err) {
                                            toast.error('Share failed or was cancelled.');
                                        }
                                    }}
                                    title="Share"
                                >
                                    <FiShare2 /> Share
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 py-10">No pastes found.</div>
                )}
            </div>
        </div>
    )
}

export default Paste
