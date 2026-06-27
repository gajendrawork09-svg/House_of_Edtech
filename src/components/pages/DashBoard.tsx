"use client";

import React from 'react';
import { Button, Typography, Space } from 'antd';
import { PlusOutlined, FileTextOutlined, ClockCircleOutlined, MoreOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface DocumentItem {
  id: string;
  title: string;
  updatedAt: string;
}

interface DashboardUIProps {
  documents: DocumentItem[];
  onCreateDocument: () => void;
  onOpenDocument: (id: string) => void;
  isCreating: boolean;
}

export default function DashBoard({
  documents,
  onCreateDocument,
  onOpenDocument,
  isCreating
}: DashboardUIProps) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* 1. Header (Google Docs Minimal Style) */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-md flex items-center justify-center">
            <FileTextOutlined className="text-white text-xl" />
          </div>
          <span className="text-xl font-medium tracking-tight text-gray-700">Docs</span>
        </div>
        
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          loading={isCreating}
          onClick={onCreateDocument}
          className="bg-blue-600 hover:bg-blue-700 shadow-sm font-medium rounded-full h-10 px-5"
        >
          Blank Document
        </Button>
      </header>

      {/* 2. Top Section: Start New Document (Gray Grid Strip) */}
      <section className="bg-gray-100 border-b border-gray-200 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-medium text-gray-600 mb-4">Start a new document</h2>
          
          {/* Flex/Grid Blank Template Container */}
          <div className="flex">
            <div 
              onClick={onCreateDocument}
              className="group cursor-pointer"
            >
              <div className="w-36 h-48 bg-white border border-gray-300 rounded-md shadow-sm hover:border-blue-500 transition-all flex items-center justify-center overflow-hidden bg-no-repeat bg-center">
                <PlusOutlined className="text-4xl text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700 pl-1">Blank</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Section: Recent Documents List (Pure Flex Layout) */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-gray-800">Recent documents</h3>
        </div>

        {/* Fallback Empty State */}
        {documents.length === 0 && (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-white text-gray-500 text-sm">
            No documents yet. Click "Blank" to create one.
          </div>
        )}

        {/* Pure Tailwind Card Row System */}
        <div className="space-y-1">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onOpenDocument(doc.id)}
              className="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-md hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all shadow-sm"
            >
              {/* Left Side: Icon & Title Info */}
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <FileTextOutlined className="text-blue-500 text-lg flex-shrink-0" />
                <span className="font-medium text-gray-800 truncate text-sm sm:text-base hover:text-blue-600">
                  {doc.title}
                </span>
              </div>

              {/* Right Side: Timestamp & Actions metadata */}
              <div className="flex items-center space-x-8 flex-shrink-0 ml-4">
                <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                  <ClockCircleOutlined />
                  <span>{doc.updatedAt}</span>
                </div>
                
                {/* Visual menu placeholder button to match Google Docs design */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents row click navigation trigger
                    alert('Menu options coming soon!');
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <MoreOutlined className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}