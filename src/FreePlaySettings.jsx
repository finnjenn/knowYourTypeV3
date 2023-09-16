import { useState } from "react";
import Logo from "./Logo";
import SettingsTypeBox from "./SettingsTypeBox";

export default function FreePlaySettings({
  toAbout,
  toBattleScreen,
  userTypesRef,
  oppTypesRef,
}) {
  const allTypes = [
    { name: "Normal", isSelected: false },
    { name: "Fire", isSelected: false },
    { name: "Water", isSelected: false },
    { name: "Grass", isSelected: false },
    { name: "Electric", isSelected: false },
    { name: "Ice", isSelected: false },
    { name: "Fighting", isSelected: false },
    { name: "Poison", isSelected: false },
    { name: "Ground", isSelected: false },
    { name: "Flying", isSelected: false },
    { name: "Psychic", isSelected: false },
    { name: "Bug", isSelected: false },
    { name: "Rock", isSelected: false },
    { name: "Ghost", isSelected: false },
    { name: "Dragon", isSelected: false },
    { name: "Dark", isSelected: false },
    { name: "Steel", isSelected: false },
    { name: "Fairy", isSelected: false },
  ];
  const [userTypes, setUserTypes] = useState(allTypes);
  const [oppTypes, setOppTypes] = useState(allTypes);
  function handleReadyClick() {
    userTypesRef.current = [];
    oppTypesRef.current = [];
    userTypes.forEach((type) => {
      if (type.isSelected) userTypesRef.current.push(type.name);
    });
    oppTypes.forEach((type) => {
      if (type.isSelected) oppTypesRef.current.push(type.name);
    });
    if (userTypesRef.current.length === 0 || oppTypesRef.current.length === 0) {
      alert(
        "Please select at least one type for both yourself and your opponent"
      );
      return;
    }
    toBattleScreen();
  }
  return (
    <>
      <Logo toAbout={toAbout} />
      <h1>Click to Choose Your Types</h1>
      <SettingsTypeBox typeArray={userTypes} setTypeArray={setUserTypes} />
      <h1>Click to Choose Opponent Types</h1>
      <SettingsTypeBox typeArray={oppTypes} setTypeArray={setOppTypes} />
      <button className="freePlayRoute" onClick={handleReadyClick}>
        Ready
      </button>
      <button className="freePlayRoute" onClick={toAbout}>
        Back
      </button>
    </>
  );
}
