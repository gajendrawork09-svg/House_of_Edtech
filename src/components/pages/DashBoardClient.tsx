"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashBoard from './DashBoard';


const DashBoardClient = () => {
    const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  // Mock initial dataset for recent docs
  const [documents] = useState([
    { id: 'doc-1', title: 'Project Requirements Specification', updatedAt: '2 hours ago' },
    { id: 'doc-2', title: 'MERN Stack Architecture Notes', updatedAt: 'Yesterday' },
    { id: 'doc-3', title: 'Personal Goals 2026', updatedAt: '3 days ago' },
  ]);

  // Handler for creating a new document
  const handleCreateDocument = async () => {
    setIsCreating(true);
    try {
      // 1. You would normally trigger your backend POST request here:
      // const res = await fetch('/api/documents', { method: 'POST' });
      // const newDoc = await res.json();
      
      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockNewId = `doc-${Date.now()}`; 
      console.log('Document created with ID:', mockNewId);

      // 2. Automatically push the route context straight into the Editor page
      router.push(`/editor/${mockNewId}`);
    } catch (error) {
      console.error('Failed to create document:', error);
    } finally {
      setIsCreating(false);
    }
  };

  // Handler for clicking on an existing document item
  const handleOpenDocument = (id: string) => {
    router.push(`/editor/${id}`);
  };
  return (
    <DashBoard 
      documents={documents}
      onCreateDocument={handleCreateDocument}
      onOpenDocument={handleOpenDocument}
      isCreating={isCreating}
    />
  )
}

export default DashBoardClient