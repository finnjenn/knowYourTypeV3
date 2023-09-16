export default function Countdown({ seconds, TIMER_LENGTH }) {
  const percentLeft = seconds * (100 / TIMER_LENGTH);
  let timerColor;
  if (percentLeft >= 50) timerColor = "#00db36";
  else if (percentLeft >= 25) timerColor = "#ffd100";
  else timerColor = "#de2a48";
  return (
    <>
      <div
        className="countContainer"
        style={{ border: "1px solid " + timerColor }}
      >
        <div
          style={{ width: `${percentLeft}%`, backgroundColor: timerColor }}
          className="countdown"
        ></div>
      </div>
    </>
  );
}
