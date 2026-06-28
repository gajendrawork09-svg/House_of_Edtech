import Editior from "@/src/components/Ui/Editor/Editor";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
console.log("Document ID:", id); // Log the document ID to the console
  return <Editior documentId={id} />;
}