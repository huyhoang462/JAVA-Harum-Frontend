// src/pages/admin/AdminUserPage.jsx

import React, { useState, useMemo, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllUsers, updateUserStatus } from "./AdminUserService";
import Pagination from "./partials/Pagination";
import UserFilters from "./partials/UserFilters";
import UserTable from "./partials/UserTable";
import ConfirmationModal from "./partials/ConfirmationModal";
import { toast } from "react-toastify";

const PAGE_SIZE = 8;

export default function AdminUserPage() {
  const [filters, setFilters] = useState({ searchTerm: "", role: "ALL" });
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [isSubmitting, setIsSubmitting] = useState(false); // State để quản lý loading

  const queryClient = useQueryClient();

  const {
    data: allUsers = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["allAdminUsers"],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
  });

  // LOGIC LỌC & PHÂN TRANG (Không đổi)
  const filteredData = useMemo(() => {
    let data = [...allUsers];
    if (filters.role !== "ALL")
      data = data.filter((user) => user.role?.roleName === filters.role);
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      data = data.filter(
        (user) =>
          user.username.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }
    return data;
  }, [allUsers, filters]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const pageInfo = useMemo(() => {
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

  // HANDLERS
  const handleFilterChange = useCallback((newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, data: null });
  };

  const handleRequestChangeStatus = (userId, status) => {
    setModalState({ isOpen: true, data: { userId, status } });
  };

  // Hàm xử lý chính khi xác nhận - Sử dụng async/await và useState
  const handleConfirmStatusChange = async () => {
    if (!modalState.data) return;

    setIsSubmitting(true); // << BẮT ĐẦU LOADING

    const { userId, status } = modalState.data;
    const body =
      status === "ENABLE"
        ? {
            status: "DISABLE",
            emailContent:
              "Tài khoản của bạn đã bị quản trị viên vô hiệu hóa...",
          }
        : {
            status: "ENABLE",
            emailContent: "Tài khoản của bạn đã được kích hoạt lại.",
          };

    try {
      const res = await updateUserStatus(userId, body);
      if (res.status === 200) {
        toast.info(
          status === "ENABLE"
            ? "Đã vô hiệu hóa tài khoản."
            : "Đã kích hoạt lại tài khoản."
        );
        queryClient.invalidateQueries(["allAdminUsers"]); // Làm mới dữ liệu
      } else {
        toast.error("Có lỗi xảy ra, không thể cập nhật.");
      }
    } catch (err) {
      toast.error(err.message || "Lỗi máy chủ.");
    } finally {
      setIsSubmitting(false); // << KẾT THÚC LOADING
      handleCloseModal(); // Đóng modal
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="flex justify-between items-center mb-6">
        {isFetching && !isLoading && (
          <div className="text-sm text-pblue animate-pulse"></div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <UserFilters onFilterChange={handleFilterChange} />
        <UserTable
          users={paginatedData}
          onRequestChangeStatus={handleRequestChangeStatus}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
        <Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmStatusChange}
        isLoading={isSubmitting} // << TRUYỀN STATE LOADING XUỐNG
        title={
          modalState.data?.status === "ENABLE"
            ? "Xác nhận Vô hiệu hóa"
            : "Xác nhận Kích hoạt"
        }
        message={`Bạn có chắc chắn muốn ${
          modalState.data?.status === "ENABLE" ? "vô hiệu hóa" : "kích hoạt lại"
        } tài khoản này không?`}
        confirmText={
          modalState.data?.status === "ENABLE" ? "Vô hiệu hóa" : "Kích hoạt"
        }
        variant={modalState.data?.status === "ENABLE" ? "danger" : "success"}
      />
    </div>
  );
}
