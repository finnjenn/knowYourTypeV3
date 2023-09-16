import { allTypes } from "./typeData";
export default function UserTypeBox({ userTypes, handleMoveClicked }) {
  return (
    <div className="userTypeBox">
      {userTypes.map((type) => {
        return (
          <button
            key={type.index}
            className={
              type.isSelected
                ? `${allTypes[type.index]}-picked picked`
                : allTypes[type.index] + " white-text"
            }
            onClick={() => handleMoveClicked(type)}
          >
            {allTypes[type.index]}
          </button>
        );
      })}
    </div>
  );
}
