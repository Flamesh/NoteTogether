
import { createSlice } from '@reduxjs/toolkit';
import { CreateNoteAction, DeleteNoteAction, NoteState, UpdateNoteAction } from './typings';

const noteInitState: NoteState = {
    notes: [],
}

export const noteSlice = createSlice({
    name: 'NoteReducer',
    initialState: noteInitState,
    reducers: {
        addNote: (state: NoteState, action: CreateNoteAction) => {
            state.notes.push(action.payload);
            
        },
        updateNote: (state: NoteState, action: UpdateNoteAction) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
            
        },
        deleteNote: (state: NoteState, action: DeleteNoteAction) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            
        },
        updatePinNote: (state: NoteState, action: { payload: { id: string; isPinned: boolean } }) => {
            const { id, isPinned } = action.payload;
            const note = state.notes.find(note => note.id === id);
            if (note) {
                note.isPinned = isPinned;
                note.updatedAt = new Date().toISOString(); // Update the timestamp
            }
            
        }
    },
})

export const { addNote, updateNote, deleteNote, updatePinNote } = noteSlice.actions;

export default noteSlice.reducer;