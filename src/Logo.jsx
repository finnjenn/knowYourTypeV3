import logo from "/assets/knowyourtype.png";
import "animate.css";
export default function Logo({ toAbout }) {
  return (
    <header className="animate__animated animate__headShake">
      <img src={logo} alt="" onClick={toAbout} />
    </header>
  );
}
