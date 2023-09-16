import logo from "./assets/knowyourtype.png";
export default function Logo({ toAbout }) {
  return (
    <header>
      <img src={logo} alt="" onClick={toAbout} />
    </header>
  );
}
