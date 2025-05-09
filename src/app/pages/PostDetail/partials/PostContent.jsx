import React from "react";

export default function PostContent({ post }) {
  return (
    <div className="mx-auto w-[800px]">
      <div className="mt-4">
        <p className="text-sm text-text">{post?.topic}</p>
        <p className="text-[40px] leading-tight my-4 text-text font-semibold">
          {post?.title}
        </p>
        <div className="flex justify-between mt-4 items-center">
          <div className="flex  items-center">
            <img
              className="w-14 h-14  object-cover rounded-full mr-2.5"
              src={post?.user?.avatar || "/src/app/assets/images/daisy.jpg"}
            />
            <div className="text-sm font-semibold">
              <p className="text-text">{post?.user?.name || "Người dùng A"}</p>
              <p className="text-text2">{post?.date || "01-01-2025"}</p>
            </div>
          </div>
          <div className="border border-text2  cursor-pointer text-text2 px-8 py-2 font-semibold text-sm rounded-3xl flex items-center justify-center">
            Theo dõi
          </div>
        </div>
      </div>

      <div className=" mt-7 ">
        <div className="space-y-4">
          {post?.contentBlock?.map((block, index) => {
            switch (block?.type) {
              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: block?.value }}
                  />
                );
              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-gray-400 pl-4 italic text-gray-600"
                    dangerouslySetInnerHTML={{ __html: block?.value }}
                  />
                );
              case "image":
                return (
                  <img
                    key={index}
                    src={block?.value}
                    alt=""
                    className="rounded-lg shadow-md"
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
