// import React, { useState } from "react";
// import Editor from "./partials/Editor";

// export default function WritePost() {
//   const [title, setTitle] = useState("");

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       {/* Tiêu đề bài viết */}
//       <input
//         type="text"
//         placeholder="Enter your title here..."
//         className="w-full text-3xl font-bold p-3 mb-4 border-b focus:outline-none focus:border-blue-500"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       {/* Vùng Editor */}
//       <Editor />
//     </div>
//   );
// }

import React, { useState } from "react";
import Editor from "./partials/Editor";

export default function WritePost() {
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Tiêu đề bài viết */}
      <input
        type="text"
        placeholder="Enter your title here..."
        className="w-full text-3xl font-bold p-3 mb-4 border-b focus:outline-none focus:border-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Vùng Editor */}
      <Editor data={data} onChange={setData} editorBlock="editorjs-container" />

      {/* Xem trước JSON data (chỉ để debug) */}
      {/* <pre className="mt-4 p-2 text-sm bg-gray-100 rounded">
          {JSON.stringify(data, null, 2)}
        </pre> */}

      {/* Hiển thị nội dung dưới dạng HTML */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">📖 Nội dung hiển thị:</h2>
        <RenderContent data={data} />
      </div>
    </div>
  );
}

const RenderContent = ({ data }) => {
  if (!data || !data.blocks)
    return <p className="text-gray-500">Chưa có nội dung.</p>;

  return (
    <div className="space-y-4">
      {data.blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-gray-400 pl-4 italic text-gray-600"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          case "image":
            return (
              <img
                key={index}
                src={block.data.file.url}
                alt=""
                className="rounded-lg shadow-md"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
