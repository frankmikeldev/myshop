import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Bestsellers from "@/components/Bestsellers";
import PromoBanner from "@/components/PromoBanner";
import PromoCards from "@/components/PromoCards";
import TrustBadges from "@/components/TrustBadges";
import { Newsletter, Footer } from "@/components/FooterNewsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
  <Hero />
  <Categories />
  <Bestsellers />
  <PromoBanner />
  <PromoCards />
  <TrustBadges /> 
  <Newsletter />
</main>
    </>
  );
}