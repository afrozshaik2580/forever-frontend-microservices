import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSellers from "../components/BestSellers";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";

function HomePage() {
  return (
    <div>
        <Hero />
        <LatestCollection />
        <BestSellers />
        <OurPolicy />
        <NewsLetter />
    </div>
  )
}

export default HomePage