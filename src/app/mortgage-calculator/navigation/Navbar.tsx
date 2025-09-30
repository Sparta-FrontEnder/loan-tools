"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 左边 Logo */}
        <Link href="/" className=" pl-10 text-xl font-bold hover:text-gray-200">
          Mortgage App
        </Link>

        {/* 中间菜单 */}
        <div className="hidden md:flex space-x-6 gap-20">
          <Link href="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link href="/mortgage-calculator" className="hover:text-gray-200">
            Blog
          </Link>
          <Link href="/mortgage-calculator" className="hover:text-gray-200">
            News
          </Link>
          <Link href="/mortgage-calculator" className="hover:text-gray-200">
            Calculator
          </Link>
          <Link href="/about" className="hover:text-gray-200">
            About
          </Link>
        </div>

        {/* 右边按钮 */}
        {/* <button className="bg-white text-blue-600 px-4 py-1 rounded-md font-semibold hover:bg-gray-100 transition">
          Sign In
        </button> */}
        <div className="w-[80px]"></div>
      </div>
    </nav>
  );
}
