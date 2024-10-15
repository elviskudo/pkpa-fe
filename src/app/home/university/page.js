import NavbarLogin from "@/components/User/universitas/NavbarLogin";
import CampusProfile from "@/components/User/universitas/CampusProfile";
import Testimoni from "@/components/LandingPage/Testimoni";
import Footer from "@/components/LandingPage/footer";

export default function University(uuid) {
  return (
    <div className="container">
      <NavbarLogin />
      <div id="profile"><CampusProfile /></div>
      <div id="testimoni"><Testimoni /></div>
      <Footer />
    </div>
  );
}
