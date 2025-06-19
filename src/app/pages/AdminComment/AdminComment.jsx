import React, { useState } from 'react';
import { MessageSquare, Trash2, CheckCircle, Flag } from 'lucide-react';

const AdminComment = () => {
  const [reportedComments, setReportedComments] = useState([
    {
      id: 1,
      content: 'vớ va vớ vẩn',
      author: 'user1',
      postTitle: 'Hướng dẫn kiếm người yêu cho mấy thằng FA',
      reports: 3,
      reason: 'Ngôn từ không phù hợp',
      createdAt: '2023-08-15',
      status: 'REPORTED'
    },
    {
      id: 2,
      content: 'x x x x x x',
      author: 'user2',
      postTitle: 'Solo yasuo',
      reports: 5,
      reason: 'Nội dung spam',
      createdAt: '2023-08-16',
      status: 'REPORTED'
    },
    {
      id: 3,
      content: 'Thông tin tào lao mía lao',
      author: 'user3',
      postTitle: 'Đố anh bắt được em',
      reports: 2,
      reason: 'Thông tin không chính xác',
      createdAt: '2023-08-17',
      status: 'REPORTED'
    }
  ]);

  const [selectedComment, setSelectedComment] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleResolveReport = (commentId, action) => {
    if (action === 'DELETE') {
      setReportedComments(reportedComments.filter(comment => comment.id !== commentId));
    } else {
      setReportedComments(reportedComments.map(comment => 
        comment.id === commentId ? { ...comment, status: 'RESOLVED' } : comment
      ));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý Bình luận bị báo cáo</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bài viết</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do báo cáo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượt báo cáo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportedComments.filter(comment => comment.status === 'REPORTED').map((comment) => (
                <tr key={comment.id}>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-900 truncate">{comment.content}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{comment.postTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.reports}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedComment(comment);
                          setIsViewModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleResolveReport(comment.id, 'KEEP')}
                        className="text-green-600 hover:text-green-900"
                        title="Giữ lại bình luận"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedComment(comment);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Xóa bình luận"
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

      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Chi tiết bình luận bị báo cáo</h2>
            
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>Tác giả: {selectedComment?.author}</span>
                <span className="mx-2">•</span>
                <span>Bài viết: {selectedComment?.postTitle}</span>
              </div>
              
              <div className="mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <Flag className="h-3 w-3 mr-1" />
                  Lý do: {selectedComment?.reason} ({selectedComment?.reports} lượt báo cáo)
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-800">{selectedComment?.content}</p>
              </div>
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
            <h2 className="text-xl font-bold mb-4">Xác nhận xóa bình luận</h2>
            <p>Bạn có chắc chắn muốn xóa bình luận này?</p>
            <div className="bg-gray-100 p-3 rounded-md mt-3">
              <p className="text-sm italic">"{selectedComment?.content}"</p>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  handleResolveReport(selectedComment.id, 'DELETE');
                  setIsDeleteModalOpen(false);
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminComment;