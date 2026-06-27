import DashBoardClient from "@/src/components/pages/DashBoardClient";
import { auth } from "@/src/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  console.log("Session in dashboard page:", session);
  if (!session) {
    redirect("/login");
  }

  return <DashBoardClient />;
}