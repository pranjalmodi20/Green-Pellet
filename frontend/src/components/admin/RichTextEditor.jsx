import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table';
import { uploadFile } from '../../services/blogService';

const RichTextEditor = ({ content, onChange, token }) => {
  const [imageUploading, setImageUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline font-semibold cursor-pointer'
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-2xl mx-auto my-8 block'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse w-full my-8'
        }
      }),
      TableRow,
      TableHeader,
      TableCell
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  // Sync content if it changes externally (e.g. when editing a new/different blog)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="w-full min-h-[350px] bg-surface-container-low rounded-xl border border-outline-variant/40 animate-pulse flex items-center justify-center">
        <span className="text-on-surface-variant font-body-md text-sm">Initializing Editor...</span>
      </div>
    );
  }

  // Handle URL Link
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter Link URL:', previousUrl);
    
    // cancelled
    if (url === null) {
      return;
    }
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    // set link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  // Handle Local Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const { url } = await uploadFile(file, token);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      console.error('[RichTextEditor] Image upload failed:', err);
      alert('Failed to upload image.');
    } finally {
      setImageUploading(false);
      e.target.value = ''; // Reset file input
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="w-full border border-outline-variant/40 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-surface-container/60 border-b border-outline-variant/20 select-none">
        
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Heading 1"
        >
          <span className="font-bold text-xs px-1">H1</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Heading 2"
        >
          <span className="font-bold text-xs px-1">H2</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Heading 3"
        >
          <span className="font-bold text-xs px-1">H3</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('paragraph') && !editor.isActive('heading') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Paragraph text"
        >
          <span className="material-symbols-outlined text-lg block">text_fields</span>
        </button>

        <div className="w-px h-6 bg-outline-variant/30 mx-1" />

        {/* Basic Styles */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('bold') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Bold"
        >
          <span className="material-symbols-outlined text-lg block">format_bold</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('italic') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Italic"
        >
          <span className="material-symbols-outlined text-lg block">format_italic</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('underline') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Underline"
        >
          <span className="material-symbols-outlined text-lg block">format_underlined</span>
        </button>

        <div className="w-px h-6 bg-outline-variant/30 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('bulletList') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Bullet list"
        >
          <span className="material-symbols-outlined text-lg block">format_list_bulleted</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('orderedList') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Numbered list"
        >
          <span className="material-symbols-outlined text-lg block">format_list_numbered</span>
        </button>

        <div className="w-px h-6 bg-outline-variant/30 mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Align left"
        >
          <span className="material-symbols-outlined text-lg block">format_align_left</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Align center"
        >
          <span className="material-symbols-outlined text-lg block">format_align_center</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Align right"
        >
          <span className="material-symbols-outlined text-lg block">format_align_right</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Align justify"
        >
          <span className="material-symbols-outlined text-lg block">format_align_justify</span>
        </button>

        <div className="w-px h-6 bg-outline-variant/30 mx-1" />

        {/* Blocks */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('blockquote') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Quote block"
        >
          <span className="material-symbols-outlined text-lg block">format_quote</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('codeBlock') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Code block"
        >
          <span className="material-symbols-outlined text-lg block">code</span>
        </button>

        <div className="w-px h-6 bg-outline-variant/30 mx-1" />

        {/* Links */}
        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('link') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Insert Link"
        >
          <span className="material-symbols-outlined text-lg block">link</span>
        </button>
        {editor.isActive('link') && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-1.5 rounded hover:bg-surface-container-high transition-colors text-error"
            title="Remove Link"
          >
            <span className="material-symbols-outlined text-lg block">link_off</span>
          </button>
        )}

        <div className="w-px h-6 bg-outline-variant/30 mx-1" />

        {/* Image Upload */}
        <label
          className="p-1.5 rounded hover:bg-surface-container-high transition-colors text-on-surface-variant cursor-pointer flex items-center justify-center"
          title="Upload image"
        >
          <span className="material-symbols-outlined text-lg block">{imageUploading ? 'hourglass_top' : 'image'}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={imageUploading}
            onChange={handleImageUpload}
          />
        </label>

        <div className="w-px h-6 bg-outline-variant/30 mx-1" />

        {/* Tables */}
        <button
          type="button"
          onClick={insertTable}
          className={`p-1.5 rounded hover:bg-surface-container-high transition-colors ${editor.isActive('table') ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
          title="Insert Table (3x3)"
        >
          <span className="material-symbols-outlined text-lg block">table_chart</span>
        </button>
      </div>

      {/* ── Table Action Sub-Toolbar (Only shows when cursor is in a table) ── */}
      {editor.isActive('table') && (
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5 bg-surface-container-low border-b border-outline-variant/10 text-xs select-none">
          <span className="font-semibold text-primary/70 mr-2 uppercase tracking-wide text-[10px]">Table Tools:</span>
          
          <button type="button" onClick={() => editor.chain().focus().addColumnBefore().run()} className="px-2 py-1 bg-white hover:bg-surface-container-high border border-outline-variant/30 rounded text-on-surface-variant">
            + Col Left
          </button>
          <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className="px-2 py-1 bg-white hover:bg-surface-container-high border border-outline-variant/30 rounded text-on-surface-variant">
            + Col Right
          </button>
          <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} className="px-2 py-1 bg-white hover:bg-surface-container-high border border-outline-variant/30 rounded text-error">
            - Col
          </button>
          
          <div className="w-px h-4 bg-outline-variant/20 mx-1" />
          
          <button type="button" onClick={() => editor.chain().focus().addRowBefore().run()} className="px-2 py-1 bg-white hover:bg-surface-container-high border border-outline-variant/30 rounded text-on-surface-variant">
            + Row Above
          </button>
          <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className="px-2 py-1 bg-white hover:bg-surface-container-high border border-outline-variant/30 rounded text-on-surface-variant">
            + Row Below
          </button>
          <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} className="px-2 py-1 bg-white hover:bg-surface-container-high border border-outline-variant/30 rounded text-error">
            - Row
          </button>
          
          <div className="w-px h-4 bg-outline-variant/20 mx-1" />
          
          <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="px-2 py-1 bg-error-container text-on-error-container rounded font-bold">
            Delete Table
          </button>
        </div>
      )}

      {/* ── Editor Content Canvas ── */}
      <div className="flex-1 bg-surface-container-lowest max-h-[500px] overflow-y-auto">
        <EditorContent editor={editor} className="min-h-[350px]" />
      </div>
    </div>
  );
};

export default RichTextEditor;
