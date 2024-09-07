"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import Watch from "@/app/watch/page";
const Header = () => {
  return (
    <div className="relative">
      <div className="Header bg-slate-900 p-3 fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto">
          <div className="header flex items-center justify-around">
            <div className="header-one">
              <Link href="/home">
                <h2 className="text-cyan-600 font-sans font-semibold">
                  CRYPTOFOLIO
                </h2>
              </Link>
            </div>
            <div className="header-two flex items-center gap-3">
              <select className="outline-none bg-slate-900 text-white font-sans">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <Watch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
