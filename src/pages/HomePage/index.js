import style from "./style.module.css";
import { HowWorks } from "../../components/HomePage/HowWorks/HowWorks";
import { Envelopes } from "../../components/HomePage/Envelopes/Envelopes";
import { TripSlider } from "../../components/HomePage/TripsSlider/TripsSlider";
import { WhereWannaGo } from "../../components/HomePage/WhereWannaGo/WhereWannaGo";

export function HomePage() {
  return (
    <div className={style.homePage}>
      <WhereWannaGo />
      <HowWorks />
      <Envelopes />
      <TripSlider />
    </div>
  );
}
