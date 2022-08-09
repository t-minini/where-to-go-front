import style from "./style.module.css"
import { Hello } from "../../components/HomePage/helloUser";
import { HowWorks } from "../../components/HomePage/howWorks";
import { TripSlider } from "../../components/HomePage/tripsSlider";
import { Envelopes } from "../../components/HomePage/envelopes";

export function HomePage() {
  return (
    <div className={style.homePage}> 
      <Hello />
      <HowWorks />
      <TripSlider />
      <Envelopes />
    </div>
  );
}
