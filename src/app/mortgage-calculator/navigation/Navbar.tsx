"use client";
import React, { useState } from "react";
import Link from "next/link";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 左边 Logo */}
        <Link href="/mortgage-calculator" className="pl-0 md:pl-10 text-xl font-bold hover:text-gray-200">
            MTech
        </Link>

        {/* 中间菜单 */}
        <div className="hidden md:flex space-x-6 gap-8">
          <Link href="/mortgage-calculator" className="hover:text-gray-200">
            Home
          </Link>
          <Link href="/blog" className="hover:text-gray-200">Blog</Link>

          <Link href="/news" className="hover:text-gray-200">
            News
          </Link>
          <Link href="/mortgage-calculator" className="hover:text-gray-200">
            Calculator
          </Link>
          <Link href="/aboutus" className="hover:text-gray-200">
            About-us
          </Link>
        </div>
        {/* 移动端菜单按钮 */}
        <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
        >
            <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>

        </button>
        <div className="hidden md:block md:w-[80px]"></div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-2">
          <Link
            href="/mortgage-calculator"
            className="block py-2 text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="block py-2 text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/news"
            className="block py-2 text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            News
          </Link>
          <Link
            href="/mortgage-calculator"
            className="block py-2 text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Calculator
          </Link>
          <Link
            href="/aboutus"
            className="block py-2 text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
}
