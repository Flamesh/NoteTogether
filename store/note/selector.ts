import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";


export const selectUserNotes = (state: RootState) => state.notes.notes

// export const selectSortedNotesByPin = createSelector(
//   selectUserNotes,
//   (notes) => [...notes].sort((a, b) => {
//     if (a.isPinned && !b.isPinned) return -1;
//     if (!a.isPinned && b.isPinned) return 1;
//     return 0;
//   })
// );

export const selectNoteById = (id: string) =>
  createSelector(selectUserNotes, (data) => data.find(note => note.id === id));

export const selectPinnedNotes = createSelector(
  selectUserNotes,
  (notes) => notes.filter(note => note.isPinned)
);