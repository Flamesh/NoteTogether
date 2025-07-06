import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const selectUserNotes = (state: RootState) => state.notes.notes;

export const selectNoteById = (id: string) =>
  createSelector(selectUserNotes, (data) =>
    data.find((note) => note.id === id)
  );
