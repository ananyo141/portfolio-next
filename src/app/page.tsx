import { redirect } from "next/navigation";

export default function Home({ params }: any) {
  // redirect to home
  redirect("/home");
}
