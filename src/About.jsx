import Logo from "./Logo";
import elementalTriangle from "/assets/elemental-triangle.png";
import typeChart from "/assets/type-chart.webp";
export default function About({ toFreePlaySettings, toBlitz, setShowDialog }) {
  return (
    <>
      <Logo />
      <h1>Quick Play</h1>
      <div className="modeBox">
        <button className="mode" onClick={toBlitz}>
          Blitz Mode
        </button>
        <button className="mode" onClick={toFreePlaySettings}>
          FreePlay
        </button>
      </div>
      <h1>
        The
        <span style={{ color: "#f08030" }}> Fire</span>{" "}
        <span style={{ color: "#6890f0" }}>Water</span>{" "}
        <span style={{ color: "#78c850" }}>Grass</span> Elemental Triangle
      </h1>
      <div className="imgBox" style={{ background: "none" }}>
        <img src={elementalTriangle} alt="Elemental Triangle Image" />
      </div>
      <p className="pAbout">
        At the beginning of nearly every Pokemon game, the player's first
        involement with type matchups is the
        <span style={{ color: "#f08030" }}> Fire</span>{" "}
        <span style={{ color: "#6890f0" }}>Water</span>{" "}
        <span style={{ color: "#78c850" }}>Grass</span> Elemental Triangle.
      </p>
      <p className="pAbout">
        You select your starter Pokemon from these three types because no one
        type is supposed to be relatively stronger. Each has one strength and
        one weakness against the other two.
      </p>
      <p className="pAbout">
        This three-way type matchup is easy enough to remember, but what if I
        told you there are{" "}
        <span
          onClick={() => setShowDialog(true)}
          style={{ color: "#ffd100", cursor: "pointer" }}
        >
          18 different types
        </span>{" "}
        in total? Each with their own list of strengths and weaknesses.
      </p>
      <div className="imgBox">
        <img src={typeChart} alt="Pokemon Type Chart" />
      </div>
      <p className="pAbout">
        If you want to be the very best, like no one ever was, you'll need to
        know this like the back of your hand. Memorization can be hard, not to
        mention boring. That's where this website comes in to serve you.
      </p>
      <p className="pAbout">
        We are going to learn by DOING, not by staring at that mind-numbing
        chart.
      </p>
      <h1>Two Modes - Endless Possibilities</h1>
      <div className="modeInfoBox">
        <button>Blitz Mode</button>
        <button>Free Play</button>
      </div>
    </>
  );
}
