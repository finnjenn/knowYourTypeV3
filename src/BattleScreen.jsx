import { useState } from "react";
import Logo from "./Logo";
import { allTypes, typeTable } from "./typeData";
import UserTypeBox from "./UserTypeBox";
import Opponent from "./Opponent";
export default function BattleScreen({ toAbout, userTypesRef, oppTypesRef }) {
  const MAX_USER_TYPES = 4;
  const MAX_OPP_TYPES = 2;
  const [oppTypes, setOppTypes] = useState(getRandomOppTypes);
  const [userTypes, setUserTypes] = useState(getUserTypes);
  const [damageOutput, setDamageOutput] = useState("Your Moves");

  function getUserTypes() {
    if (userTypesRef.current.length <= MAX_USER_TYPES) {
      let userTypesChosen = userTypesRef.current.map((type) => ({
        ["index"]: allTypes.indexOf(type),
        ["isSelected"]: false,
      }));
      return userTypesChosen;
    } else {
      let shuffledUserTypesRef = userTypesRef.current.sort(
        () => Math.random() - 0.5
      );
      let shuffledUserTypeIndexes = shuffledUserTypesRef.map((type) => ({
        ["index"]: allTypes.indexOf(type),
        ["isSelected"]: false,
      }));
      let userTypesChosen = shuffledUserTypeIndexes.slice(0, MAX_USER_TYPES);
      return userTypesChosen;
    }
  }

  function getRandomOppTypes() {
    let numOfTypes = Math.floor(Math.random() * MAX_OPP_TYPES) + 1;
    let shuffledOppTypesRef = oppTypesRef.current.sort(
      () => Math.random() - 0.5
    );
    let shuffledOppTypeIndexes = shuffledOppTypesRef.map((type) =>
      allTypes.indexOf(type)
    );
    let oppTypesChosen = shuffledOppTypeIndexes.slice(0, numOfTypes);
    if (numOfTypes === MAX_OPP_TYPES) {
      oppTypesChosen.sort(function (a, b) {
        return a - b;
      });
    }
    return oppTypesChosen;
  }

  function handleMoveClicked(typeClicked) {
    let type1Damage = getDamageMultiplier(typeClicked.index, oppTypes[0]);
    let type2Damage;
    let collectiveDamage;
    let output;
    if (oppTypes.length === MAX_OPP_TYPES) {
      type2Damage = getDamageMultiplier(typeClicked.index, oppTypes[1]);
      collectiveDamage = type1Damage * type2Damage;
      output = `${type1Damage} x ${type2Damage} = x${collectiveDamage} Damage`;
    } else {
      collectiveDamage = type1Damage;
      output = `x${collectiveDamage} Damage`;
    }
    setDamageOutput(output);
    setUserTypes(
      userTypes.map((type) => {
        if (type.index === typeClicked.index) {
          return { ...type, isSelected: true };
        }
        return { ...type, isSelected: false };
      })
    );
  }

  function getDamageMultiplier(attackingType, defendingType) {
    return typeTable[attackingType][defendingType];
  }

  return (
    <>
      <Logo toAbout={toAbout} />
      <Opponent oppTypes={oppTypes} MAX_OPP_TYPES={MAX_OPP_TYPES} />
      <h1 className="output">{damageOutput}</h1>
      <UserTypeBox
        userTypes={userTypes}
        handleMoveClicked={handleMoveClicked}
      />
      <button
        className="next"
        onClick={() => {
          setOppTypes(getRandomOppTypes());
          setUserTypes(getUserTypes());
          setDamageOutput("Your Moves");
        }}
      >
        <img className="unown-next" src="../public/assets/unown.webp" />
      </button>
    </>
  );
}
