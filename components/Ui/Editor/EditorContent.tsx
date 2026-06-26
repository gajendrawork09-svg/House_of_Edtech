"use client";

import React from "react";
import { Editor, EditorContent as TiptapEditorContent } from "@tiptap/react";

interface EditorContentProps {
  editor: Editor | null;
}

const EditorContent = ({ editor }: EditorContentProps) => {
  if (!editor) return null;

  return (
    <div className="flex flex-1 justify-center bg-slate-100 p-8">
      <div className="min-h-[1100px] w-full max-w-5xl rounded-lg border bg-white shadow-sm">
        <TiptapEditorContent
          editor={editor}
          className="editor-content"
        />
      </div>
    </div>
  );
};

export default EditorContent;