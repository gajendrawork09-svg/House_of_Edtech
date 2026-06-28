"use client";

import StarterKit from "@tiptap/starter-kit";
import EditorHeader from "./EditorHeader";
import EditorToolbar from "./EditorToolbar";
import EditorContent from "./EditorContent";
import { useEditor } from "@tiptap/react";
import VersionHistoryDrawer from "./VersionHistoryDrawer";
import Footer from "../Footer/Footer";
import { useEffect, useMemo, useRef, useState } from "react";
import { getDocumentById, updateDocument } from "@/src/lib/api/document.api";
import { useAutoSave } from "@/src/hooks/useAutoSave";
import { getSocket } from "@/src/socket/client";
import { SOCKET_EVENTS } from "@/src/socket/event";

interface EditorProps {
  documentId: string;
}
const Editior = ({ documentId }: EditorProps) => {
  const isRemoteUpdate = useRef(false);
  const socket = useMemo(() => getSocket(), []);
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    editable: documentId ? true : false,
    onUpdate: ({ editor }) => {
      if (isRemoteUpdate.current) {
        return;
    }

    socket.emit(
        SOCKET_EVENTS.DOCUMENT_CHANGE,
        {
            documentId,
            content: editor.getJSON(),
        }
    );

      triggerSave();
    },
  });

  const { status, triggerSave } = useAutoSave({
    documentId,
    title,
    editor,
  });

  useEffect(() => {
    if (!editor) return;

    socket.on(SOCKET_EVENTS.DOCUMENT_CHANGE, ({ content }) => {
      if (!editor) return;

      isRemoteUpdate.current = true;

      editor.commands.setContent(content);

      setTimeout(() => {
        isRemoteUpdate.current = false;
      }, 0);
    });

    return () => {
      socket.off(SOCKET_EVENTS.DOCUMENT_CHANGE);
    };
  }, [editor]);

  useEffect(() => {
    socket.connect();
    socket.emit(SOCKET_EVENTS.JOIN_DOCUMENT, {
      documentId,
    });
    return () => {
      socket.emit(SOCKET_EVENTS.LEAVE_DOCUMENT, {
        documentId,
      });
      socket.disconnect();
    };
  }, [documentId]);

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
