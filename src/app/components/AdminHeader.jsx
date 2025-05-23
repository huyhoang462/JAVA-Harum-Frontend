import React from "react";

export default function AdminHeader() {
  return (
    <div className="fixed bg-gray-300 h-hheader  [width:calc(100vw-var(--spacing-wsidebar))]">
      <div className="flex h-full justify-between items-center">
        <div>Hello</div>
        <div className="flex items-center">
          <img
            className="rounded-full h-10 w-10 object-cover mr-4"
            src="/src/app/assets/images/daisy.jpg"
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
}
