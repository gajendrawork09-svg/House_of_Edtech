"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashBoard from './DashBoard';
import { createDocument, getDocumentsByOwner } from '@/src/lib/api/document.api';


const DashBoardClient = () => {
    const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  
  // Mock initial dataset for recent docs
  const [documents , setDocuments] = useState([]);

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
useEffect(() => {
  const fetchDocuments = async()=>{
    const docs = await getDocumentsByOwner();
    setDocuments(docs.data);
  }
  fetchDocuments();
},[])
console.log("Documents in dashboard client:", documents);
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