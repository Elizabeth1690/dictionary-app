/** @format */
"use client";

import { fontAtom } from "@/app/atom";
import { useAtom } from "jotai";
import React, { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

type Props = {};

export default function FontSelector({}: Props) {
  const [selectedFont, setSelectedFont] = useAtom(fontAtom);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useOnclickOutside(() => {
    setDropdownOpen(false);
  });

  function handleToggleDropdown() {
    setDropdownOpen(!isDropdownOpen);
  }

  const fontOptions = ["sans serif", "serif", "mono"];

  return (
    <div className="relative z-50">
      <button onClick={handleToggleDropdown}>{selectedFont}</button>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="flex absolute items-start flex-col gap-3 shadow-lg px-6 py-3 rounded-md w-[150px] top-10 right-[-40px] bg-white dark:bg-slate-700 capitalize"
        >
          {fontOptions.map((font, index) => (
            <button
              onClick={() => setSelectedFont(font)}
              className="capitalize"
              key={index}
            >
              {font}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
