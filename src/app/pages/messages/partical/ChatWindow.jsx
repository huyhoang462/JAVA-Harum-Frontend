import { useNavigate } from "react-router-dom";

export default function ChatWindow({ user }) {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div
        className="p-4 border-b bg-white font-bold flex items-center gap-3 cursor-pointer hover:bg-gray-100"
        onClick={handleGoToProfile}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        {user.name}
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {user.messages.map((msg, idx) => (
          <div key={idx} className={`flex items-end ${msg.fromMe ? "justify-end" : "justify-start"}`}>
            {!msg.fromMe && (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <div
              className={`max-w-xs px-4 py-2 rounded-xl ${
                msg.fromMe
                  ? "bg-pblue text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t flex bg-white">
        <input className="flex-1 border p-2 rounded-l-full" placeholder="Aa" />
        <button className="px-4 bg-pblue text-white rounded-r-full cursor-pointer" >Gửi</button>
      </div>
    </div>
  );
}
