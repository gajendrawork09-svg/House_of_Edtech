import Editior from "@/src/components/Ui/Editor/Editor";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <Editior documentId={id} />;
}