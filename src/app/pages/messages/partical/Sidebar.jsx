export default function Sidebar({ users, onSelectUser, selectedUserId }) {
  return (
    <div className="w-1/4 border-r overflow-y-auto bg-white">
      <h2 className="text-xl font-bold p-4 border-b">Đoạn chat</h2>
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelectUser(user.id)}
          className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 ${
            user.id === selectedUserId ? "bg-gray-200" : ""
          }`}
        >
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500 truncate">{user.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
