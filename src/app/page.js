import NavbarLanding from "@/components/LandingPage/Navbar-landing";
import Carousel from "@/components/LandingPage/Carousel";
import UniversityList from "@/components/LandingPage/UnivList";
import AboutUs from "@/components/LandingPage/AboutUs";
import CarouselKeunggulan from "@/components/LandingPage/CarouselKeunggulan";
import AlurPendaftaran from "@/components/LandingPage/AlurDaftar";
import Kurikulum from "@/components/LandingPage/Kurikulum";
import Brosur from "@/components/LandingPage/Brosur";
import Testimoni from "@/components/LandingPage/Testimoni";
import Footer from "@/components/LandingPage/footer";

export default function Home() {
  return (
    <div className="container">
      <NavbarLanding />
      <div id="carousel"><Carousel /></div>
      <div id="university"><UniversityList /></div>
      <div id="about"><AboutUs /></div>
      <div id="keunggulan"><CarouselKeunggulan /></div>
      <div id="alur-daftar"><AlurPendaftaran /></div>
      <div id="kurikulum"><Kurikulum /></div>
      <div id="brosur"><Brosur /></div>
      <div id="testimoni"><Testimoni /></div>
      <Footer />
    </div>
  );
}
