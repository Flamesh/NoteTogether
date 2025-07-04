export interface INoteContent {
    direction: string,
    format: string,
    indent: number,
    type: string,
    version: number
    textFormat: number,
    children: INoteContent[],
    detail: number,
    text: string,
}
export interface INote {
    id: string;
    title: string;
    content: string;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
}