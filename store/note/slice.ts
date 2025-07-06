
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
            console.log("Adding note:", action.payload);
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
        updateSortedNotes: (state: NoteState, action: { payload: NoteState['notes'] }) => {
            state.notes = action.payload;
        }
    },
})

export const { addNote, updateNote, deleteNote, updateSortedNotes } = noteSlice.actions;

export default noteSlice.reducer;