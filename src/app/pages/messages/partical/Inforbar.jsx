export default function InfoBar({ user }) {
    if (!user) return null;
  
    return (
      <div className="w-1/4 border-l bg-white p-4">
        <div className="flex flex-col items-center">
          <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mb-2" />
          <h3 className="text-lg font-bold">{user.name}</h3>
        </div>
        <div className="mt-4">
          <button className="w-full py-2 px-4 bg-pblue text-white rounded-lg hover:bg-blue-600">Xem trang cá nhân</button>
        </div>
      </div>
    );
  }
  