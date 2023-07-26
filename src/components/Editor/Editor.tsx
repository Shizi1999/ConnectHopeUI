import { memo, useState, useEffect, forwardRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

type EditorProps = {
  content?: string;
  config?: {};
};

function Editor({ content, config }: EditorProps, ref: React.Ref<HTMLInputElement>) {
  const [editorContent, setEditorContent] = useState('');
  const handleChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  const editorConfig = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      ...config
    };
  }, []);

  useEffect(() => {
    setEditorContent(content || '');
  }, [content]);

  return (
    <>
      <JoditEditor
        value={editorContent}
        config={editorConfig}
        onBlur={handleChange} // preferred to use only this option to update the content for performance reasons
        onChange={handleChange}
      />
      <input ref={ref} className='hidden' readOnly value={editorContent} />
    </>
  );
}
export default forwardRef(Editor);
