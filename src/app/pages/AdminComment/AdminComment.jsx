import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommentReport } from "./AdminCommentService";
import Pagination from "./partials/Pagination";
import CommentReportFilters from "./partials/CommentReportFilters";
import CommentReportList from "./partials/CommentReportList";
import { toast } from "react-toastify";

const PAGE_SIZE = 5;

export default function AdminComment() {
  const [filters, setFilters] = useState({ searchTerm: "", status: "ALL" });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allReports = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["allCommentReports"],
    queryFn: getCommentReport,
    staleTime: 1000 * 60 * 5,
  });

  const filteredData = useMemo(() => {
    let data = [...allReports];

    if (filters.status !== "ALL") {
      data = data.filter((report) => report.status === filters.status);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      data = data.filter(
        (report) =>
          report.reporterName.toLowerCase().includes(term) ||
          report.commentOwnerName.toLowerCase().includes(term) ||
          report.reason.toLowerCase().includes(term) ||
          report.commentContent.toLowerCase().includes(term)
      );
    }

    return data.sort((a, b) => {
      if (a.status === "PENDING" && b.status !== "PENDING") return -1;
      if (a.status !== "PENDING" && b.status === "PENDING") return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [allReports, filters]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const pageInfo = useMemo(() => {
    const totalElements = filteredData.length;
    const totalPages = Math.ceil(totalElements / PAGE_SIZE);
    return {
      number: currentPage - 1,
      totalPages: totalPages,
      totalElements,
      size: PAGE_SIZE,
      first: currentPage === 1,
      last: currentPage === totalPages,
    };
  }, [filteredData, currentPage]);

  const handleFilterChange = useCallback((newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDismissReport = (reportId) => {
    console.log("Bỏ qua báo cáo:", reportId);
    toast.info(`Đã bỏ qua báo cáo ${reportId}`);
  };

  const handleDeleteComment = (commentId, reportId) => {
    console.log("Xóa bình luận:", commentId, "từ báo cáo:", reportId);
    toast.success(`Đã xóa bình luận ${commentId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="flex justify-between items-center mb-6">
        {isFetching && !isLoading && (
          <div className="text-sm text-pblue animate-pulse"></div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <CommentReportFilters onFilterChange={handleFilterChange} />

        <CommentReportList
          reports={paginatedData}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onDismiss={handleDismissReport}
          onDeleteComment={handleDeleteComment}
        />

        <Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
