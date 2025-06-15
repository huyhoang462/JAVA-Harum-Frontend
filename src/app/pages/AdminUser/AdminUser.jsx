import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "./AdminUserService";
import Pagination from "./partials/Pagination";
import UserFilters from "./partials/UserFilters";
import UserTable from "./partials/UserTable";

const PAGE_SIZE = 8;

export default function AdminUser() {
  const [filters, setFilters] = useState({ searchTerm: "", role: "ALL" });
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredData = useMemo(() => {
    let data = [...allUsers];
    if (filters.role !== "ALL") {
      data = data.filter((user) => user.role?.roleName === filters.role);
    }
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
    const endIndex = startIndex + PAGE_SIZE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const pageInfo = useMemo(() => {
    const totalElements = filteredData.length;
    const totalPages = Math.ceil(totalElements / PAGE_SIZE);
    return {
      number: currentPage - 1,
      totalPages: totalPages,
      totalElements: totalElements,
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

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="flex justify-between items-center mb-6">
        {isFetching && <div className="text-sm text-pblue animate-pulse"></div>}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <UserFilters onFilterChange={handleFilterChange} />

        <UserTable
          users={paginatedData}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />

        <Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
