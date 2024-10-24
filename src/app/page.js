import NavbarLanding from "@/components/LandingPage/Navbar-landing";
import Carousel from "@/components/LandingPage/Carousel";
import UniversityList from "@/components/LandingPage/UnivList";
import AboutUs from "@/components/LandingPage/AboutUs";
import CarouselKeunggulan from "@/components/LandingPage/CarouselKeunggulan";
import AlurPendaftaran from "@/components/LandingPage/AlurDaftar";
import Kurikulum from "@/components/LandingPage/Kurikulum";
import Brosur from "@/components/LandingPage/Brosur";
import Testimony from "@/components/LandingPage/Testimony";
import Footer from "@/components/LandingPage/footer";

export default function Home() {
  return (
    <>
      {/* Render NavbarLanding */}
      <NavbarLanding />

      {/* Wrap the rest of the content in the container */}
      <div className="w-full mx-auto">
        <div id="carousel" className="scroll-mt-24"><Carousel /></div>
        <div id="university" className="scroll-mt-24"><UniversityList /></div>
        <div id="about" className="scroll-mt-24"><AboutUs /></div>
        <div id="keunggulan" className="scroll-mt-24"><CarouselKeunggulan /></div>
        <div id="alur-daftar" className="scroll-mt-24"><AlurPendaftaran /></div>
        <div id="kurikulum" className="scroll-mt-24"><Kurikulum /></div>
        <div id="brosur" className="scroll-mt-24"><Brosur /></div>
        <div id="testimoni" className="scroll-mt-24"><Testimony /></div>

        <Footer />
      </div>
    </>
  );
}
