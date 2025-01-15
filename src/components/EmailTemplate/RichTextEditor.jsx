import { Bold, Italic, Type } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const RichTextEditor = ({ content, onChange, isHtmlMode, variables = [] }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (isHtmlMode && editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [content, isHtmlMode]);

  const handleFormat = (command, value = null) => {
    if (!isHtmlMode) return;
    document.execCommand(command, false, value);
    const newContent = editorRef.current.innerHTML;
    onChange(newContent);
  };

  const insertVariable = (variable) => {
    if (isHtmlMode && editorRef.current) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const textNode = document.createTextNode(`{{${variable}}}`);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
      
      const newContent = editorRef.current.innerHTML;
    //   onChange(newContent);
      editorRef.current.focus();
    }
  };

  const handleOnBlur = (e) => {
     const newContent = editorRef.current.innerHTML;
     onChange(newContent);
  }
  const handleColorChange = (e) => {
    handleFormat('foreColor', e.target.value);
  };

  const handleInput = () => {
    // const newContent = editorRef.current.innerHTML;
    // onChange(newContent);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      document.execCommand('insertLineBreak');
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-2">
      {isHtmlMode && (
        <div className="flex gap-2 items-center border-b pb-2">
          <div className="flex gap-2 border-r pr-2">
            <button
              type="button"
              onClick={() => handleFormat('bold')}
              className="p-2 hover:bg-gray-100 rounded"
              title="ตัวหนา"
            >
              <Bold size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleFormat('italic')}
              className="p-2 hover:bg-gray-100 rounded"
              title="ตัวเอียง"
            >
              <Italic size={18} />
            </button>
            <div className="flex items-center gap-1">
              <Type size={18} />
              <input
                type="color"
                onChange={handleColorChange}
                className="w-8 h-8 p-1 cursor-pointer"
                title="สีตัวอักษร"
              />
            </div>
          </div>

          {/* <div className="relative group"> */}
            {/* <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded flex items-center gap-1"
              title="เพิ่มตัวแปร"
            >
              <FileText size={18} /> เพิ่มตัวแปร
            </button> */}
            {/* <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 hidden group-hover:block min-w-[200px] z-10">
              <div className="space-y-1">
                {variables.map((variable) => (
                  <button
                    key={variable}
                    onClick={() => insertVariable(variable)}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-100 rounded text-sm"
                  >
                    {`{{${variable}}}`}
                  </button>
                ))}
              </div>
            </div> */}
          {/* </div> */}
        </div>
      )}
      
      {isHtmlMode ? (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="min-h-[12rem] p-2 border rounded font-sans text-sm"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={handleOnBlur}
        />
      ) : (
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-48 p-2 border rounded font-mono text-sm"
          placeholder="เนื้อหาอีเมล..."
        />
      )}
    </div>
  );
};

export default RichTextEditor;