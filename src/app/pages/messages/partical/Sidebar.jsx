import { useNavigate } from "react-router-dom";

export default function Sidebar({ users, onSelectUser, selectedUserId }) {
  const navigate = useNavigate();

  return (
    <div className="w-1/4 border-r overflow-y-auto bg-white">
      <div 
        className="p-4 border-b cursor-pointer flex items-center justify-center"
        onClick={() => navigate("/")}
      >
      <img src="/logoFull.svg" alt="Logo" className="w-28 h-auto" />
      </div>

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
