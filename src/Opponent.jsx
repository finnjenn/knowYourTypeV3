import { allTypes } from "./typeData";
export default function Opponent({ oppTypes, MAX_OPP_TYPES }) {
  return (
    <>
      <div className="spriteBox">
        {oppTypes.length === MAX_OPP_TYPES ? (
          <img
            className="sprite"
            src={`src/assets/sprites/${oppTypes[0]}_${oppTypes[1]}.png`}
            onError={(e) => {
              e.preventDefault();
              e.target.src = "src/assets/sprites/arceus.png";
            }}
          />
        ) : (
          <img
            className="sprite"
            src={`src/assets/sprites/${oppTypes[0]}_${oppTypes[0]}.png`}
            onError={(e) => {
              e.preventDefault();
              e.target.src = "src/assets/sprites/arceus.png";
            }}
          />
        )}
      </div>
      <div className="oppTypeBox">
        <span className={allTypes[oppTypes[0]] + " white-text"}>
          {allTypes[oppTypes[0]]}
        </span>
        {oppTypes.length === MAX_OPP_TYPES && (
          <span className={allTypes[oppTypes[1]] + " white-text"}>
            {allTypes[oppTypes[1]]}
          </span>
        )}
      </div>
    </>
  );
}
