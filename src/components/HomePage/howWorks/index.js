import style from "./style.module.css";

export function HowWorks() {
  return (
    <div className={style.howWorksContainer}>
      <div>
        <h1>How does it work?</h1>
      </div>
      <div className={style.cardsContainer}>
        <div className={style.card}>
          <div className={style.cardContent}>
            <h2>1</h2>
            <h3>Select your trip.</h3>
            <p>
              Select a day trip based on your interests and travel preferences.
            </p>
          </div>
        </div>
        <div className={style.card}>
          <div className={style.cardContent}>
            <h2>2</h2>
            <h3>Get your package.</h3>
            <p>
              Receive your beautifully curated package in the mail OR choose the
              digital version of the trip which gets sent right to your inbox.
            </p>
          </div>
        </div>
        <div className={style.card}>
        <div className={style.cardContent}>
        <h2>3</h2>
          <h3>Pack your bags.</h3>
          <p>
            Each package includes a ‘Before You Go’ guide and a series of
            envelopes that will lead you to several surprise destinations on
            your trip.
          </p>
        </div>
          
        </div>
      </div>
    </div>
  );
}
