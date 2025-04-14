import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import SimpleQuoteBlock from "./CustomQuotePlugin.js";
import DragDrop from "editorjs-drag-drop";

const Editor = ({ data, onChange, editorBlock }) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlock,
        data: data,
        onReady: () => {
          new DragDrop(editor);
        },
        tools: {
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file) {
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      resolve({
                        success: 1,
                        file: { url: reader.result }, // Trả về URL file đã tải lên
                      });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                  });
                },
              },
            },
          },
          quote: SimpleQuoteBlock,
        },
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
      });

      ref.current = editor;
    }
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className=" mx-auto p-4 bg-gray-50 border border-gray-300 rounded-lg"
      id={editorBlock}
    />
  );
};

export default memo(Editor);
