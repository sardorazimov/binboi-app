"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import { Sidebar } from "../../../components/docs/docs-sidebar";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const theme = "dark"; // İstersen bunu da state yapabilirsin

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#000000] text-white" : "bg-gray-50 text-black"} transition-colors duration-300`}>
      {/* 1. Sidebar */}
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        theme={theme} 
      />

      {/* 2. Main Content Area */}
      <motion.main
        animate={{ 
          paddingLeft: collapsed ? "64px" : "240px" 
        }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="min-h-screen w-full mt-18"
      >
        <div className="p-8">
          {children}
        </div>
      </motion.main>
    </div>
  );
}