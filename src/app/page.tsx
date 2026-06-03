import Nav from "@/components/Nav";
import Profile from "@/components/Profile";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import FeaturedProject from "@/components/FeaturedProject";
import Reflection from "@/components/Reflection";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Profile />
        <div className="section-divider" />
        <Projects />
        <Skills />
        <FeaturedProject />
        <Reflection />
        <Contact />
      </main>
    </>
  );
}
