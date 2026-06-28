"use client";

import StarterKit from "@tiptap/starter-kit";
import EditorHeader from "./EditorHeader";
import EditorToolbar from "./EditorToolbar";
import EditorContent from "./EditorContent";
import { useEditor } from "@tiptap/react";
import VersionHistoryDrawer from "./VersionHistoryDrawer";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getDocumentById, updateDocument } from "@/src/lib/api/document.api";
import { useAutoSave } from "@/src/hooks/useAutoSave";
interface EditorProps {
  documentId: string;
}
const Editior = ({ documentId }: EditorProps) => {
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    editable : documentId ? true : false,
    onUpdate: () => {
    triggerSave();
  },
  });

const { status , triggerSave} = useAutoSave({
  documentId,
  title,
  editor, // Set to true to trigger save on every update
});
useEffect(() => {
  triggerSave();
}, [title, triggerSave]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await getDocumentById(documentId);

        setTitle(response.data.title);

        editor?.commands.setContent(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    if (editor) {
      fetchDocument();
    }
  }, [editor, documentId]);

  // const handleSave = async () => {
  //   if (!editor) return;

  //   try {
  //     await updateDocument(documentId, {
  //       title,
  //       content: editor.getJSON(),
  //     });

  //     console.log("Saved Successfully");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="min-h-screen bg-slate-100">
      <EditorHeader
      documentId={documentId}
        title={title}
        onTitleChange={setTitle}
        // onSave={handleSave}
          saveStatus={status}
      />
      <EditorToolbar />
      <div className="flex">
        <div className="flex-1">
          <EditorContent editor={editor} />
        </div>
        <VersionHistoryDrawer />
      </div>
      <Footer />
    </div>
  );
};

export default Editior;
