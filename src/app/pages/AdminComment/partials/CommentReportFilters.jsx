// src/pages/admin/components/CommentReportFilters.jsx

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";

const CommentReportFilters = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("ALL");

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    onFilterChange({
      searchTerm: debouncedSearchTerm,
      status: status,
    });
  }, [debouncedSearchTerm, status, onFilterChange]);

  return (
    <div className="p-4 border-b flex flex-col md:flex-row items-center gap-4">
      <div className="relative w-full md:w-1/3">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Tìm theo nội dung, lý do, người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-pblue"
        />
      </div>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full md:w-auto bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pblue"
      >
        <option value="ALL">Tất cả trạng thái</option>
        <option value="PENDING">Chờ xử lý</option>
        <option value="REVIEWED">Đã xem</option>
        <option value="RESOLVED">Đã giải quyết</option>
      </select>
    </div>
  );
};

export default CommentReportFilters;
