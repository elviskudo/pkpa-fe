import Image from "next/image";
import NavbarLanding from "@/components/User/Navbar-landing";
import Carousel from "@/components/User/Carousel";
import UniversityList from "@/components/User/UnivList";
import AboutUs from "@/components/User/AboutUs";

export default function Home() {
  return (
    <div className="container">
      <NavbarLanding />
      <Carousel />
      <UniversityList />
      <AboutUs />
    </div>
  );
}
