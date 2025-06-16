// src/pages/admin/components/PostReportList.jsx

import React from "react";
import PostReportItem from "./PostReportItem";

const PostReportList = ({
  reports,
  isLoading,
  isError,
  error,
  onDismiss,
  onDeletePost,
}) => {
  if (isLoading) {
    return <div className="text-center p-8">Đang tải danh sách báo cáo...</div>;
  }

  if (isError) {
    return <div className="text-center p-8 text-red-500">{error.message}</div>;
  }

  if (reports.length === 0) {
    return <div className="text-center p-8">Không có báo cáo nào phù hợp.</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {reports.map((report) => (
        <PostReportItem
          key={report.reportId}
          report={report}
          onDismiss={onDismiss}
          onDeletePost={onDeletePost}
        />
      ))}
    </div>
  );
};

export default PostReportList;
