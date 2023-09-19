export default function TypeChart({
  type,
  superEff,
  notVEff,
  noDam,
  weak,
  resists,
  blocks,
}) {
  return (
    <>
      <h1 className="white-text">{type}</h1>
      <div className="typeChartGrid">
        <div className="typeChartCell">
          <h2 className="white-text">Weaknesses x2</h2>
          {weak.map((type) => {
            return (
              <img
                key={type}
                className="typeChartIcon"
                src={`/assets/icons/${type}.png`}
                alt={type}
                title={type}
              />
            );
          })}
        </div>
        <div className="typeChartCell">
          <h2 className="white-text">Super-Effective x2</h2>
          {superEff.map((type) => {
            return (
              <img
                key={type}
                className="typeChartIcon"
                src={`/assets/icons/${type}.png`}
                alt={type}
                title={type}
              />
            );
          })}
        </div>
        <div className="typeChartCell">
          <h2 className="white-text">Resists x0.5</h2>
          {resists.map((type) => {
            return (
              <img
                key={type}
                className="typeChartIcon"
                src={`/assets/icons/${type}.png`}
                alt={type}
                title={type}
              />
            );
          })}
        </div>
        <div className="typeChartCell">
          <h2 className="white-text">Not Very Effective x0.5</h2>
          {notVEff.map((type) => {
            return (
              <img
                key={type}
                className="typeChartIcon"
                src={`/assets/icons/${type}.png`}
                alt={type}
                title={type}
              />
            );
          })}
        </div>
        <div className="typeChartCell">
          <h2 className="white-text">Blocks x0</h2>
          {blocks.map((type) => {
            return (
              <img
                key={type}
                className="typeChartIcon"
                src={`/assets/icons/${type}.png`}
                alt={type}
                title={type}
              />
            );
          })}
        </div>
        <div className="typeChartCell">
          <h2 className="white-text">No Damage x0</h2>
          {noDam.map((type) => {
            return (
              <img
                key={type}
                className="typeChartIcon"
                src={`/assets/icons/${type}.png`}
                alt={type}
                title={type}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
