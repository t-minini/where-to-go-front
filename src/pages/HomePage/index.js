import style from "./style.module.css"
import { NavBar } from "../../components/HomePage/navBar";
import { Hello } from "../../components/HomePage/helloUser";
import { HowWorks } from "../../components/HomePage/howWorks";
import { TripSlider } from "../../components/HomePage/tripsSlider";
import { Envelopes } from "../../components/HomePage/envelopes";
import { ContactUs } from "../../components/HomePage/contactUs";

export function HomePage() {
  return (
    <div className={style.homePage}> 
      <NavBar />
      <Hello />
      <HowWorks />
      <TripSlider />
      <Envelopes />
      <ContactUs />
    </div>
  );
}
