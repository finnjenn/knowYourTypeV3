import { useState, useRef, useEffect } from "react";
import Countdown from "./Countdown";
import Opponent from "./Opponent";
import UserTypeBox from "./UserTypeBox";
import { allTypes, typeTable } from "./typeData";
import { useTimer } from "react-timer-hook";
export default function BlitzScreen({ toAbout }) {
  const NUM_OF_POKES_IN_PARTY = 6;
  const MAX_OPP_TYPES = 2;
  const TIMER_LENGTH = 60;
  const OPPONENT_HEALTH = 600;
  const time = new Date();
  const [userMoves, setUserMoves] = useState(getUserMoves());
  const [opponentTeam, setOpponentTeam] = useState(getOpponentTeam);
  const [healthbar, setHealthbar] = useState(OPPONENT_HEALTH);
  const [showDialog, setShowDialog] = useState(true);
  let dialogRef = useRef(null);
  let movesUsedRef = useRef(0);
  const timer = useTimer({
    expiryTimestamp: time.setSeconds(time.getSeconds() + TIMER_LENGTH),
    autoStart: false,
    onExpire: handleGameOver,
  });
  let healthbarColor;
  let healthPercent = healthbar * (100 / OPPONENT_HEALTH);
  if (healthPercent >= 50) healthbarColor = "#00ffac";
  else if (healthPercent >= 25) healthbarColor = "#ffd100";
  else healthbarColor = "#de2a48";
  useEffect(() => {
    if (showDialog === true) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [showDialog]);
  useEffect(() => {
    if (healthbar <= 0) handleGameOver();
  });

  function getUserMoves() {
    let allTypesCopy = allTypes.slice();
    allTypesCopy.sort(() => Math.random() - 0.5);
    return [
      {
        name: allTypesCopy[0],
        index: allTypes.indexOf(allTypesCopy[0]),
      },
      {
        name: allTypesCopy[1],
        index: allTypes.indexOf(allTypesCopy[1]),
      },
      {
        name: allTypesCopy[2],
        index: allTypes.indexOf(allTypesCopy[2]),
      },
      {
        name: allTypesCopy[3],
        index: allTypes.indexOf(allTypesCopy[3]),
      },
    ];
  }
  function getOpponentTeam() {
    let team = [];
    for (let i = 0; i < NUM_OF_POKES_IN_PARTY; i++) {
      let numOfTypes = Math.floor(Math.random() * MAX_OPP_TYPES) + 1;
      let allTypesCopy = allTypes.slice();
      allTypesCopy.sort(() => Math.random() - 0.5);
      if (numOfTypes === 1) {
        team.push({
          typeIndex: [allTypes.indexOf(allTypesCopy[0])],
          image: `../public/assets/sprites/${allTypes.indexOf(
            allTypesCopy[0]
          )}_${allTypes.indexOf(allTypesCopy[0])}.png`,
          key: crypto.randomUUID(),
        });
      } else {
        let typesChosen = [
          allTypes.indexOf(allTypesCopy[0]),
          allTypes.indexOf(allTypesCopy[1]),
        ];
        typesChosen.sort(function (a, b) {
          return a - b;
        });
        team.push({
          typeIndex: typesChosen,
          image: `../public/assets/sprites/${typesChosen[0]}_${typesChosen[1]}.png`,
          key: crypto.randomUUID(),
        });
      }
    }
    return team;
  }
  function handleMoveClicked(typeClicked) {
    movesUsedRef.current += 1;
    setHealthbar(healthbar - calculateDamage(typeClicked));
    setUserMoves(getUserMoves());
    let prevFighter = opponentTeam[0];
    let restOfTeam = opponentTeam.slice(1, 6);
    setOpponentTeam([...restOfTeam, prevFighter]);
  }
  function getDamageMultiplier(attackingType, defendingType) {
    return typeTable[attackingType][defendingType];
  }
  function calculateDamageMultiplier(typeClicked) {
    let type1Damage = getDamageMultiplier(
      typeClicked.index,
      opponentTeam[0].typeIndex[0]
    );
    let type2Damage;
    let collectiveDamage;
    if (opponentTeam[0].typeIndex.length === MAX_OPP_TYPES) {
      type2Damage = getDamageMultiplier(
        typeClicked.index,
        opponentTeam[0].typeIndex[1]
      );
      collectiveDamage = type1Damage * type2Damage;
    } else {
      collectiveDamage = type1Damage;
    }
    return collectiveDamage;
  }
  function calculateDamage(typeClicked) {
    let multiplier = calculateDamageMultiplier(typeClicked);
    let damage;
    if (multiplier === 0) damage = 0;
    if (multiplier === 0.25) damage = 5;
    if (multiplier === 0.5) damage = 10;
    if (multiplier === 1) damage = 20;
    if (multiplier === 2) damage = 40;
    if (multiplier === 4) damage = 75;
    if (damage > healthbar) damage = healthbar;
    return damage;
  }
  function handleGameOver() {
    setShowDialog(true);
    timer.pause();
  }
  function handleRestart() {
    setUserMoves(getUserMoves());
    setOpponentTeam(getOpponentTeam());
    setHealthbar(OPPONENT_HEALTH);
    setShowDialog(false);
    const time = new Date();
    timer.restart(time.setSeconds(time.getSeconds() + TIMER_LENGTH), true);
  }
  return (
    <>
      <Countdown
        start={timer.start}
        TIMER_LENGTH={TIMER_LENGTH}
        seconds={timer.totalSeconds}
      />
      <div className="opponentTeam">
        {opponentTeam.map((poke) => {
          return (
            <img
              key={poke.key}
              src={poke.image}
              onError={(e) => {
                e.preventDefault();
                e.target.src = "../public/assets/sprites/arceus.png";
              }}
            />
          );
        })}
      </div>
      <Opponent MAX_OPP_TYPES={2} oppTypes={opponentTeam[0].typeIndex} />
      <div
        className="healthbarContainer"
        style={{ outline: `1px solid ${healthbarColor}` }}
      >
        {/* <p>{healthbar}</p> */}
        <div
          className="healthbar"
          style={{
            width: `${healthbar / 6}%`,
            backgroundColor: healthbarColor,
          }}
        >
          <p>{healthbar}</p>
        </div>
      </div>
      <h1>Your Moves</h1>
      <UserTypeBox
        userTypes={userMoves}
        handleMoveClicked={handleMoveClicked}
      />
      <dialog className="blitzDialog" ref={dialogRef}>
        <h1 className="white-text">Blitz Mode</h1>
        {timer.totalSeconds < TIMER_LENGTH || healthbar < OPPONENT_HEALTH ? (
          <>
            <div className="statBox">
              <p className="white-text">
                Time Elapsed: {TIMER_LENGTH - timer.seconds} seconds
              </p>
              <p className="white-text">Moves Used: {movesUsedRef.current}</p>
              <p className="white-text">Health Remaining: {healthbar}</p>
            </div>
            <button onClick={handleRestart}>Restart</button>
          </>
        ) : (
          <>
            <p className="white-text">
              You have {TIMER_LENGTH} seconds to defeat the opposing team. Good
              luck!
            </p>
            <button onClick={handleRestart}>Start</button>
          </>
        )}
      </dialog>
      <button className="back" onClick={toAbout}>
        <img className="unown-back" src="../public/assets/unown.webp" />
      </button>
    </>
  );
}
