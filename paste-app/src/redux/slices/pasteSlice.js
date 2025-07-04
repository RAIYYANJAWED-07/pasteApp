import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes'))
        : []
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;

            // Check if paste with same title already exists
            const existingPaste = state.pastes.find(p => p.title === paste.title);
            if (existingPaste) {
                toast.error('A paste with this title already exists!');
                return;
            }
            state.pastes.push(paste);
            localStorage.setItem('pastes', JSON.stringify(state.pastes));
            toast.success('Paste created successfully!');

        },
        updateTopastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);

            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success('paste updated successfully!')
            }
        },
        resetAllPastes: (state, action) => {
            state.pastes =[];
            localStorage.removeItem('pastes');
        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload;

            const index = state.pastes.findIndex((item) => item._id === pasteId);
            if(index >= 0){
                state.pastes.splice(index, 1);
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success('Paste deleted successfully!');
            }

        },
    },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateTopastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer