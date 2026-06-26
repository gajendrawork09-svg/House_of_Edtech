import DashBoardClient from "@/components/pages/DashBoardClient";
import { auth } from "@/src/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <DashBoardClient />;
}