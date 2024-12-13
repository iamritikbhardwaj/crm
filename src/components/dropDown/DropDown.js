import React, { useEffect, useState } from "react";

function ProfileDropdown() {
  // State to manage the visibility of the dropdown
  const [isOpen, setIsOpen] = useState(false);

  // State to manage the selected profile
  const [profile, setProfile] = useState("");

  // Toggle the dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#menu-button") &&
        !event.target.closest("#menu-item")
      ) {
        setIsOpen(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle option selection and close dropdown
  const handleSelectProfile = (profileValue) => {
    setProfile(profileValue);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown} // Toggle dropdown on button click
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {profile || "Profile"} {/* Show the selected profile or default text */}
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              value="Sales"
              onClick={() => handleSelectProfile("Sales")} // Set profile and close dropdown
              className="block px-4 py-2 text-sm w-full text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Sales
            </button>
            <button
              value="Operations"
              onClick={() => handleSelectProfile("Operations")}
              className="block w-full px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Operations
            </button>
            <button
              value="Finance"
              onClick={() => handleSelectProfile("Finance")}
              className="block w-full px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              Finance
            </button>
            <button
              value="Admin"
              onClick={() => handleSelectProfile("Admin")}
              className="block w-full px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-3"
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { ProfileDropdown };
