export interface INoteContent {
    direction: string,
    format: number | string,
    indent: number,
    type: string,
    version: number
    textFormat: number,
    children: INoteContent[],
    detail: number,
    text: string,
    listType?: string,
    value?: number,
}
export interface INote {
    id: string;
    title: string;
    content?: INoteContent;
    createdAt: string;
    updatedAt: string;
}