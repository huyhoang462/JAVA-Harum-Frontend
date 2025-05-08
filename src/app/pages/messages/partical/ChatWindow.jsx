export default function ChatWindow({ user }) {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="p-4 border-b bg-white font-bold">{user.name}</div>
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {user.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-xl ${
              msg.fromMe ? "bg-pblue text-white ml-auto" : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-3 border-t flex bg-white">
        <input className="flex-1 border p-2 rounded-l-full" placeholder="Aa" />
        <button className="px-4  bg-pblue text-white rounded-r-full">Gửi</button>
      </div>
    </div>
  );
}
