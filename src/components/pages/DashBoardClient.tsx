"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashBoard from './DashBoard';
import { createDocument } from '@/src/lib/api/document.api';


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
    const response = await createDocument();

    console.log(response);

    router.push(`/editor/${response.data.id}`);
  } catch (error) {
    console.error(error);
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