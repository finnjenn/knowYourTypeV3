import { useState, useEffect } from "react";
import { allTypes } from "./typeData";
import TypeChart from "./TypeChart";
export default function ChartModal({ closeDialog, dialogRef }) {
  const [chartContent, setChartContent] = useState("main");
  useEffect(() => {
    console.log("In Use Effect");
    let escDialog = (event) => {
      console.log(event.keyCode);
      if (event.keyCode === 27) {
        event.preventDefault();
        // dialogRef.current.close();
        // handleClose();
      }
    };
    dialogRef.current.addEventListener("keydown", escDialog);
    return () => {
      console.log("In Cleanup");
      dialogRef.current.removeEventListener("keydown", escDialog);
    };
  }, [chartContent]);
  useEffect(() => {
    let clickBackdrop = (event) => {
      let rect = event.target.getBoundingClientRect();
      if (
        rect.left > event.clientX ||
        rect.right < event.clientX ||
        rect.top > event.clientY ||
        rect.bottom < event.clientY
      ) {
        dialogRef.current.close();
        handleClose();
      }
    };
    dialogRef.current.addEventListener("click", clickBackdrop);
    return () => dialogRef.current.removeEventListener("click", clickBackdrop);
  }, []);
  function handleClose() {
    setChartContent("main");
    closeDialog();
  }
  return (
    <dialog className="chartDialog" ref={dialogRef}>
      {chartContent === "main" && (
        <>
          <h1 className="white-text">Type Info</h1>
          <div className="iconGrid">
            {allTypes.map((type) => {
              return (
                <button
                  key={type}
                  className="iconButton"
                  onClick={() => setChartContent(type)}
                >
                  <img
                    className="chartIcon"
                    src={`../public/assets/icons/${type}.png`}
                    alt={type}
                    title={type}
                  />
                </button>
              );
            })}
          </div>
        </>
      )}
      {chartContent === "Normal" && (
        <TypeChart
          type="Normal"
          superEff={[]}
          notVEff={["Rock", "Steel"]}
          noDam={["Ghost"]}
          weak={["Fighting"]}
          resists={[]}
          blocks={["Ghost"]}
        />
      )}
      {chartContent === "Fire" && (
        <TypeChart
          type="Fire"
          superEff={["Grass", "Ice", "Bug", "Steel"]}
          notVEff={["Fire", "Water", "Rock", "Dragon"]}
          noDam={[]}
          weak={["Water", "Ground", "Rock"]}
          resists={["Fire", "Grass", "Ice", "Steel", "Fairy"]}
          blocks={[]}
        />
      )}
      {chartContent === "Water" && (
        <TypeChart
          type="Water"
          superEff={["Fire", "Ground", "Rock"]}
          notVEff={["Water", "Grass", "Dragon"]}
          noDam={[]}
          weak={["Grass", "Electric"]}
          resists={["Fire", "Water", "Ice", "Steel"]}
          blocks={[]}
        />
      )}
      {chartContent === "Grass" && (
        <TypeChart
          type="Grass"
          superEff={["Water", "Ground", "Rock"]}
          notVEff={[
            "Fire",
            "Grass",
            "Poison",
            "Flying",
            "Bug",
            "Dragon",
            "Steel",
          ]}
          noDam={[]}
          weak={["Fire", "Ice", "Poison", "Flying", "Bug"]}
          resists={["Water", "Grass", "Electric", "Ground"]}
          blocks={[]}
        />
      )}
      {chartContent === "Electric" && (
        <TypeChart
          type="Electric"
          superEff={["Water", "Flying"]}
          notVEff={["Grass", "Electric", "Dragon"]}
          noDam={["Ground"]}
          weak={["Ground"]}
          resists={["Electric", "Flying", "Steel"]}
          blocks={[]}
        />
      )}
      {chartContent === "Ice" && (
        <TypeChart
          type="Ice"
          superEff={["Grass", "Ground", "Flying", "Dragon"]}
          notVEff={["Fire", "Water", "Ice", "Steel"]}
          noDam={[]}
          weak={["Fire", "Fighting", "Rock", "Steel"]}
          resists={["Ice"]}
          blocks={[]}
        />
      )}
      {chartContent === "Fighting" && (
        <TypeChart
          type="Fighting"
          superEff={["Normal", "Ice", "Rock", "Dark", "Steel"]}
          notVEff={["Poison", "Flying", "Psychic", "Bug", "Fairy"]}
          noDam={["Ghost"]}
          weak={["Flying", "Psychic", "Fairy"]}
          resists={["Bug", "Rock", "Dark"]}
          blocks={[]}
        />
      )}
      {chartContent === "Poison" && (
        <TypeChart
          type="Poison"
          superEff={["Grass", "Fairy"]}
          notVEff={["Poison", "Ground", "Rock", "Ghost"]}
          noDam={["Steel"]}
          weak={["Ground", "Psychic"]}
          resists={["Grass", "Fighting", "Poison", "Bug", "Fairy"]}
          blocks={[]}
        />
      )}
      {chartContent === "Ground" && (
        <TypeChart
          type="Ground"
          superEff={["Fire", "Electric", "Poison", "Rock", "Steel"]}
          notVEff={["Grass", "Bug"]}
          noDam={["Flying"]}
          weak={["Water", "Grass", "Ice"]}
          resists={["Poison", "Rock"]}
          blocks={["Electric"]}
        />
      )}
      {chartContent === "Flying" && (
        <TypeChart
          type="Flying"
          superEff={["Grass", "Fighting", "Bug"]}
          notVEff={["Electric", "Rock", "Steel"]}
          noDam={[]}
          weak={["Electric", "Ice", "Rock"]}
          resists={["Grass", "Fighting", "Bug"]}
          blocks={["Ground"]}
        />
      )}
      {chartContent === "Psychic" && (
        <TypeChart
          type="Psychic"
          superEff={["Fighting", "Poison"]}
          notVEff={["Psychic", "Steel"]}
          noDam={["Dark"]}
          weak={["Bug", "Ghost", "Dark"]}
          resists={["Fighting", "Psychic"]}
          blocks={[]}
        />
      )}
      {chartContent === "Bug" && (
        <TypeChart
          type="Bug"
          superEff={["Grass", "Psychic", "Dark"]}
          notVEff={[
            "Fire",
            "Fighting",
            "Poison",
            "Flying",
            "Ghost",
            "Steel",
            "Fairy",
          ]}
          noDam={[]}
          weak={["Fire", "Flying", "Rock"]}
          resists={["Grass", "Fighting", "Ground"]}
          blocks={[]}
        />
      )}
      {chartContent === "Rock" && (
        <TypeChart
          type="Rock"
          superEff={["Fire", "Ice", "Flying", "Bug"]}
          notVEff={["Fighting", "Ground", "Steel"]}
          noDam={[]}
          weak={["Water", "Grass", "Fighting", "Ground", "Steel"]}
          resists={["Normal", "Fire", "Poison", "Flying"]}
          blocks={[]}
        />
      )}
      {chartContent === "Ghost" && (
        <TypeChart
          type="Ghost"
          superEff={["Psychic", "Ghost"]}
          notVEff={["Dark"]}
          noDam={["Normal"]}
          weak={["Ghost", "Dark"]}
          resists={["Poison", "Bug"]}
          blocks={["Normal", "Fighting"]}
        />
      )}
      {chartContent === "Dragon" && (
        <TypeChart
          type="Dragon"
          superEff={["Dragon"]}
          notVEff={["Steel"]}
          noDam={["Fairy"]}
          weak={["Ice", "Dragon", "Fairy"]}
          resists={["Fire", "Water", "Grass", "Electric"]}
          blocks={[]}
        />
      )}
      {chartContent === "Dark" && (
        <TypeChart
          type="Dark"
          superEff={["Psychic", "Ghost"]}
          notVEff={["Fighting", "Dark", "Fairy"]}
          noDam={[]}
          weak={["Fighting", "Bug", "Fairy"]}
          resists={["Ghost", "Dark"]}
          blocks={["Psychic"]}
        />
      )}
      {chartContent === "Steel" && (
        <TypeChart
          type="Steel"
          superEff={["Ice", "Rock", "Fairy"]}
          notVEff={["Fire", "Water", "Steel"]}
          noDam={[]}
          weak={["Fire", "Fighting", "Ground"]}
          resists={[
            "Normal",
            "Grass",
            "Ice",
            "Flying",
            "Psychic",
            "Bug",
            "Rock",
            "Dragon",
            "Steel",
            "Fairy",
          ]}
          blocks={["Poison"]}
        />
      )}
      {chartContent === "Fairy" && (
        <TypeChart
          type="Fairy"
          superEff={["Fighting", "Dragon", "Dark"]}
          notVEff={["Fire", "Poison", "Steel"]}
          noDam={[]}
          weak={["Poison", "Steel"]}
          resists={["Fighting", "Bug", "Dark"]}
          blocks={["Dragon"]}
        />
      )}
      <br />
      <button className="closeDialog" onClick={handleClose}>
        X
      </button>
      {chartContent !== "main" && (
        <button
          className="back"
          onClick={() => {
            setChartContent("main");
          }}
        >
          <img className="unown-back" src="../public/assets/unown.webp" />
        </button>
      )}
    </dialog>
  );
}
