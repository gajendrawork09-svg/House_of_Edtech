"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashBoard from "./DashBoard";
import {
  createDocument,
  getDocumentsByOwner,
} from "@/src/lib/api/document.api";
import { getSharedDocuments } from "@/src/lib/api/document_share";

const DashBoardClient = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const [myDocuments, setMyDocuments] = useState([]);
  const [sharedDocuments, setSharedDocuments] = useState([]);
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
    const fetchDocuments = async () => {
      try {
        const [ownedResponse, sharedResponse] = await Promise.all([
          getDocumentsByOwner(),
          getSharedDocuments(),
        ]);

        setMyDocuments(ownedResponse.data);
        setSharedDocuments(sharedResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocuments();
  }, []);

  const handleOpenDocument = (id: string) => {
    router.push(`/editor/${id}`);
  };
  return (
    <DashBoard
      myDocuments={myDocuments}
      sharedDocuments={sharedDocuments}
      onCreateDocument={handleCreateDocument}
      onOpenDocument={handleOpenDocument}
      isCreating={isCreating}
    />
  );
};

export default DashBoardClient;
