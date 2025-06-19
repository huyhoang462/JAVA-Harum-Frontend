import React, { useState } from 'react';
import { FileText, Edit, Trash2, Eye, EyeOff, Flag, CheckCircle } from 'lucide-react';

const AdminPost = () => {
  const [activeTab, setActiveTab] = useState('approval');
  
  const [pendingPosts, setPendingPosts] = useState([
    {
      id: 1,
      title: 'Hướng dẫn kiếm người yêu cho mấy thằng FA',
      author: 'user1',
      status: 'PENDING',
      content: 'Lo học hành đi yêu đương cái gì',
      createdAt: '2023-08-15',
      topic: 'Love'
    },
    {
      id: 2,
      title: 'So sánh giữa học sinh và sinh viên',
      author: 'user2',
      status: 'PENDING',
      content: 'Bài viết so sánh ưu nhược điểm...',
      createdAt: '2023-08-16',
      topic: 'abcd'
    }
  ]);

  const [reportedPosts, setReportedPosts] = useState([
    {
      id: 3,
      title: 'Cách hack Facebook',
      author: 'user3',
      status: 'REPORTED',
      reports: 5,
      reason: 'Nội dung vi phạm chính sách',
      content: 'Hack fb em gái mưa...',
      createdAt: '2023-08-10',
      topic: 'Security'
    },
    {
      id: 4,
      title: 'hahahha',
      author: 'user4',
      status: 'REPORTED',
      reports: 3,
      reason: 'Nội dung spam',
      content: 'hahahaha',
      createdAt: '2023-08-12',
      topic: 'Other'
    }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleApprove = (postId) => {
    setPendingPosts(pendingPosts.filter(post => post.id !== postId));
  };

  const handleReject = (postId) => {
    setPendingPosts(pendingPosts.filter(post => post.id !== postId));
  };

  const handleResolveReport = (postId, action) => {
    if (action === 'DELETE') {
      setReportedPosts(reportedPosts.filter(post => post.id !== postId));
    } else {
      setReportedPosts(reportedPosts.map(post => 
        post.id === postId ? { ...post, status: 'RESOLVED' } : post
      ));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý Bài viết</h1>
      
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'approval' ? 'text-sblue border-b-2 border-pblue' : 'text-gray-500'}`}
          onClick={() => setActiveTab('approval')}
        >
          Bài viết chờ duyệt
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'reported' ? 'text-sblue border-b-2 border-pblue'  : 'text-gray-500'}`}
          onClick={() => setActiveTab('reported')}
        >
          Bài viết bị báo cáo
        </button>
      </div>

      {activeTab === 'approval' ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chủ đề</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đăng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.topic}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.createdAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedPost(post);
                            setIsViewModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleApprove(post.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Phê duyệt"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleReject(post.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Từ chối"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do báo cáo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượt báo cáo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đăng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportedPosts.filter(post => post.status === 'REPORTED').map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.reports}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.createdAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedPost(post);
                            setIsViewModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleResolveReport(post.id, 'KEEP')}
                          className="text-green-600 hover:text-green-900"
                          title="Giữ lại bài viết"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleResolveReport(post.id, 'DELETE')}
                          className="text-red-600 hover:text-red-900"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Chi tiết bài viết</h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{selectedPost?.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span>Tác giả: {selectedPost?.author}</span>
                <span className="mx-2">•</span>
                <span>Chủ đề: {selectedPost?.topic}</span>
                <span className="mx-2">•</span>
                <span>Ngày đăng: {selectedPost?.createdAt}</span>
              </div>
              {activeTab === 'reported' && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Flag className="h-3 w-3 mr-1" />
                    Bị báo cáo: {selectedPost?.reason} ({selectedPost?.reports} lượt)
                  </span>
                </div>
              )}
            </div>
            
            <div className="prose max-w-none">
              <p>{selectedPost?.content}</p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Xác nhận hành động</h2>
            <p>
              {activeTab === 'approval' 
                ? `Bạn có chắc chắn muốn từ chối bài viết "${selectedPost?.title}"?` 
                : `Bạn có chắc chắn muốn xóa bài viết "${selectedPost?.title}"?`}
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  if (activeTab === 'approval') {
                    handleReject(selectedPost.id);
                  } else {
                    handleResolveReport(selectedPost.id, 'DELETE');
                  }
                  setIsDeleteModalOpen(false);
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPost;