import React from "react";

export default function PostContent({ post }) {
  const content = {
    time: 1745829824721,
    blocks: [
      {
        id: "tBkwtSDQfi",
        type: "paragraph",
        data: {
          text: "ngày hôm ấy em đi trong mưa thế nhưng lại quên tim không khóa cửa,để cho mưa lân la hỏi thăm lẻn vào trộm đi khế ước trăm năm, ngày em đi theo cơn mưa ngau bầy chim lạc cánh khóc hoảng tìm nhau, ai đong ai đếm hết bao giọt sầu, hỏi mùa thu đang ru miên man mỗi năm mùa rơi bao chiếc lá vàng, liệu có biết ở nơi nào không có lá nào trông như lá diêu bông, hỡi diêu bông ơi hỡi diêu bông bình minh chưa hé tôi phải tìm xong, vì mai người ta đã đi lấy chồng",
        },
      },
      {
        id: "tBkwtSDQ3i",
        type: "paragraph",
        data: {
          text: "em đi về ở phía mặt trời, anh về phía một đời không em",
        },
      },
      {
        id: "Oc-Ov65eJs",
        type: "paragraph",
        data: {
          text: "nơi anh chỉ toàn là bão với giông nào ngờ em thích nắng hồng",
        },
      },
      {
        id: "nX9K0-rBU3",
        type: "paragraph",
        data: {
          text: "ba đồng một mớ tình duyên, ai mua mà bán",
        },
      },
      {
        id: "vFkXO2s1fi",
        type: "paragraph",
        data: {
          text: "hứa cả ngàn lần hợp rồi cũng tan",
        },
      },
      {
        id: "7ZjO70aiMc",
        type: "paragraph",
        data: {
          text: "chút nắng hồng kèm với mưa giông mà chẳng thấy cầu vồng nơi đâu",
        },
      },
      {
        id: "E66EGdqmYc",
        type: "paragraph",
        data: {
          text: "cứ ngỡ ôm trọn được thế gian rồi nào ngờ lại là bão giông",
        },
      },
      {
        id: "yDwbuFqYtA",
        type: "paragraph",
        data: {
          text: "ba lời hẹn ước là số không, mây hòa theo gió trời",
        },
      },
      {
        id: "OV7aontEWM",
        type: "paragraph",
        data: {
          text: "đúng là đời hứa sẽ đợi nhưng lại không tới",
        },
      },
      {
        id: "821E0trfEK",
        type: "quote",
        data: {
          text: "Người yêu ơi cho dù anh biết em không về, về bên anh<br>Thì anh vẫn không hề than trách em dẫu là nhớ người<br>Vì khi yêu, anh chẳng mong ước chi xa vời lớn lao<br>Chỉ mong sao em đừng mang dối trá đánh lừa trái tim",
        },
      },
      {
        id: "H4sgC9GruL",
        type: "image",
        data: {
          file: {
            url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…rAuqWv7/11cBRZqQotakKlmpCi1qQos1Si1jUVQs1FS//2Q==",
          },
          caption: "",
          stretched: false,
          withBackground: false,
          withBorder: false,
        },
      },
      {
        id: "tBkwtSDQ2i",
        type: "paragraph",
        data: {
          text: "rồi người nào đó sẽ yêu em thương em và gần em hơn",
        },
      },
      {
        id: "Oc-Ov65eSs",
        type: "paragraph",
        data: {
          text: "chẳng còn những ngày phải ngóng anh về",
        },
      },
      {
        id: "nX9K0-rBC3",
        type: "paragraph",
        data: {
          text: "vì anh biết sẽ không ai cam tâm chờ mãi một người",
        },
      },
      {
        id: "vFkXO2a1fi",
        type: "paragraph",
        data: {
          text: "thế gian này những yêu thương luôn có thời hạn",
        },
      },
      {
        id: "7ZjO70afMc",
        type: "paragraph",
        data: {
          text: "người thật lòng nhất sẽ luôn đi sau lưng một người vô tư",
        },
      },
      {
        id: "E66EGdqxYc",
        type: "paragraph",
        data: {
          text: "từng ngày lo lắng người ấy đối với em thế nào",
        },
      },
      {
        id: "yDwbuFqYtD",
        type: "paragraph",
        data: {
          text: "giờ đoạn đường ấy vẫn như xưa nhưng hôm nay thiếu một người",
        },
      },
      {
        id: "OV7aontEQM",
        type: "paragraph",
        data: {
          text: "vì ta đánh mất nhau mất thật rồi",
        },
      },
    ],
    version: "2.31.0-rc.7",
  };

  return (
    <div className="mx-auto w-[800px]">
      <div className="mt-4">
        <p className="text-sm text-text">{post.topic}</p>
        <p className="text-[40px] leading-tight my-4 text-text font-semibold">
          {post.title}
        </p>
        <div className="flex justify-between mt-4 items-center">
          <div className="flex  items-center">
            <img
              className="w-14 h-14  object-cover rounded-full mr-2.5"
              src={post.user.avatar}
            />
            <div className="text-sm font-semibold">
              <p className="text-text">{post.user.name}</p>
              <p className="text-text2">{post.date}</p>
            </div>
          </div>
          <div className="border border-text2  cursor-pointer text-text2 px-8 py-2 font-semibold text-sm rounded-3xl flex items-center justify-center">
            Theo dõi
          </div>
        </div>
      </div>

      <div className=" mt-7 ">
        <div className="space-y-4">
          {content?.blocks.map((block, index) => {
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
      </div>
    </div>
  );
}
