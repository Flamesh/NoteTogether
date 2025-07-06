'use dom';

import "./index.css";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { ListItemNode, ListNode } from "@lexical/list";

import ToolbarPlugin from "./plugins/toolbar";
import Theme from "./theme";

const placeholder = "Enter your note here...";

const editorConfig = {
  namespace: "NoteEditor",
  nodes: [ListNode, ListItemNode],
  onError(error: Error) {
    throw error;
  },
  theme: Theme,
};
export default function Editor({
  setEditorState,
}: {
  setEditorState: React.Dispatch<React.SetStateAction<string | null>>;
  
  }) {
  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
           <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className="editor-placeholder">{placeholder}</div>
                  }
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin
              onChange={(editorState, editor, tags) => {
                setEditorState(JSON.stringify(editorState.toJSON()));
              }}
              ignoreHistoryMergeTagChange
              ignoreSelectionChange
            />
            <HistoryPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <AutoFocusPlugin />
           
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}