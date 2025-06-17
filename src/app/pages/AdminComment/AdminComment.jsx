// src/pages/admin/AdminCommentPage.jsx

import React, { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommentReport,
  updateCommentReportStatus,
  updateCommentStatus,
} from "./AdminCommentService";
import Pagination from "./partials/Pagination";
import CommentReportFilters from "./partials/CommentReportFilters";
import CommentReportList from "./partials/CommentReportList";
import ConfirmationModal from "./partials/ConfirmationModal"; // Import modal mới
import { toast } from "react-toastify";

const PAGE_SIZE = 5;

export default function AdminComment() {
  const [filters, setFilters] = useState({ searchTerm: "", status: "ALL" });
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    action: null,
    data: null,
  });

  const queryClient = useQueryClient();

  // --- QUERIES & MUTATIONS ---

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

  const dismissMutation = useMutation({
    mutationFn: (reportId) => updateCommentReportStatus(reportId, "REVIEWED"),
    onSuccess: () => {
      toast.info("Đã bỏ qua báo cáo.");
      queryClient.invalidateQueries(["allCommentReports"]);
    },
    onError: () => {
      toast.error("Lỗi khi bỏ qua báo cáo!");
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ commentId, reportId }) => {
      await updateCommentStatus(commentId); // Vô hiệu hóa comment
      await updateCommentReportStatus(reportId, "RESOLVED"); // Giải quyết report
    },
    onSuccess: () => {
      toast.success("Đã xóa bình luận và giải quyết báo cáo.");
      queryClient.invalidateQueries(["allCommentReports"]);
    },
    onError: () => {
      toast.error("Lỗi khi xóa bình luận!");
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  // --- LOGIC LỌC & PHÂN TRANG (Không đổi) ---

  const filteredData = useMemo(() => {
    // ... logic lọc không đổi ...
    let data = [...allReports];
    if (filters.status !== "ALL")
      data = data.filter((r) => r.status === filters.status);
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      data = data.filter(
        (r) =>
          r.reporterName.toLowerCase().includes(term) ||
          r.commentOwnerName.toLowerCase().includes(term) ||
          r.reason.toLowerCase().includes(term) ||
          r.commentContent.toLowerCase().includes(term)
      );
    }
    return data.sort((a, b) => {
      if (a.status === "PENDING" && b.status !== "PENDING") return -1;
      if (a.status !== "PENDING" && b.status === "PENDING") return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [allReports, filters]);

  const paginatedData = useMemo(() => {
    // ... logic phân trang không đổi ...
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const pageInfo = useMemo(() => {
    // ... logic tạo pageInfo không đổi ...
    const totalElements = filteredData.length;
    const totalPages = Math.ceil(totalElements / PAGE_SIZE);
    return {
      number: currentPage - 1,
      totalPages,
      totalElements,
      size: PAGE_SIZE,
      first: currentPage === 1,
      last: currentPage === totalPages,
    };
  }, [filteredData, currentPage]);

  // --- HANDLERS ---

  const handleFilterChange = useCallback((newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, action: null, data: null });
  };

  const handleConfirmAction = () => {
    if (modalState.action === "dismiss") {
      dismissMutation.mutate(modalState.data.reportId);
    } else if (modalState.action === "delete") {
      deleteMutation.mutate(modalState.data);
    }
  };

  const handleRequestDismiss = (reportId) => {
    setModalState({
      isOpen: true,
      action: "dismiss",
      data: { reportId },
    });
  };

  const handleRequestDelete = (commentId, reportId) => {
    setModalState({
      isOpen: true,
      action: "delete",
      data: { commentId, reportId },
    });
  };

  const isMutating = dismissMutation.isLoading || deleteMutation.isLoading;

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Báo cáo Bình luận</h1>
        {isFetching && !isLoading && (
          <div className="text-sm text-pblue animate-pulse">
            Đang làm mới...
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <CommentReportFilters onFilterChange={handleFilterChange} />

        <CommentReportList
          reports={paginatedData}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onDismiss={handleRequestDismiss}
          onDeleteComment={handleRequestDelete}
        />

        <Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />
      </div>

      {/* Render Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        isMutating={isMutating}
        title={
          modalState.action === "delete"
            ? "Xác nhận Xóa Bình luận"
            : "Xác nhận Bỏ qua"
        }
        message={
          modalState.action === "delete"
            ? "Hành động này sẽ ẩn bình luận và không thể hoàn tác. Bạn có chắc chắn không?"
            : "Bạn có chắc muốn bỏ qua báo cáo này không?"
        }
        confirmText={
          modalState.action === "delete" ? "Xóa bình luận" : "Bỏ qua"
        }
        variant={modalState.action === "delete" ? "danger" : "success"}
      />
    </div>
  );
}
