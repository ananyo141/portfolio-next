import type { Metadata } from "next";
import Nav from "@components/nav";
import BlogList from "@components/blog-list";
import Footer from "@components/footer";

export const metadata: Metadata = {
  title: "Writing",
  description: "Deep dives, honest opinions, and the occasional rant about software engineering.",
};

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <BlogList />
      </main>
      <Footer />
    </>
  );
}
