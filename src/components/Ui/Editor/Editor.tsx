'use client'

import StarterKit from '@tiptap/starter-kit'
import EditorHeader from './EditorHeader'
import EditorToolbar from './EditorToolbar'
import EditorContent from './EditorContent'
import { useEditor } from '@tiptap/react'
import VersionHistoryDrawer from './VersionHistoryDrawer'
import Footer from '../Footer/Footer'
interface EditorProps {
  documentId: string;
}
const Editior = ({ documentId }: EditorProps) => {
    const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })
  return (
    <div className='min-h-screen bg-slate-100'>
    <EditorHeader/>
    <EditorToolbar/>
     <div className="flex">
   <div className="flex-1">
            <EditorContent editor={editor} />
        </div>
        <VersionHistoryDrawer />
    </div>
    <Footer />
    </div>
  )
}

export default Editior