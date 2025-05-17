import React from "react";
import TabSection from "./partials/TabSection";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="flex">
      <div className="mx-auto">
        <div className="text-center font-medium text-3xl py-8">
          Kết quả tìm kiếm: "<span className="italic">{query}</span>"
        </div>
        <TabSection query={query} />
      </div>
    </div>
  );
}
