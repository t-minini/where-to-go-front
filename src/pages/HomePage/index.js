import style from "./style.module.css";
import { WhereWannaGo } from "../../components/HomePage/WhereWannaGo/WhereWannaGo";
import { HowWorks } from "../../components/HomePage/howWorks";
import { TripSlider } from "../../components/HomePage/tripsSlider";
import { Envelopes } from "../../components/HomePage/envelopes";

export function HomePage() {
  return (
    <div className={style.homePage}>
      <WhereWannaGo />
      <HowWorks />
      <TripSlider />
      <Envelopes />
    </div>
  );
}
