import { INote } from "@/interfaces/note";

export interface NoteState {
    notes: INote[];
}


export interface CreateNoteAction {
  type: string;
  payload: INote;
}

export interface UpdateNoteAction { 
    type: string;
    payload: INote;
}

export interface UpdateNoteContentAction {
  type: string;
  payload: {
    id: string;
    content: string;
  };
}

export interface DeleteNoteAction {
    type: string;
    payload: string; 
}