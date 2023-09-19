import { useEffect, useRef, useState } from "react";
import About from "./About";
import FreePlaySettings from "./FreePlaySettings";
import BattleScreen from "./BattleScreen";
import ChartModal from "./ChartModal";
import BlitzScreen from "./BlitzScreen";
export function Page() {
  const [pageContent, setPageContent] = useState("about");
  const [showDialog, setShowDialog] = useState(false);
  let dialogRef = useRef(null);
  useEffect(() => {
    if (showDialog === true) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [showDialog]);
  let userTypesRef = useRef([]);
  let oppTypesRef = useRef([]);

  return (
    <>
      {pageContent === "about" && (
        <About
          toFreePlaySettings={() => setPageContent("freePlaySettings")}
          toBlitz={() => setPageContent("blitz")}
          setShowDialog={setShowDialog}
        />
      )}
      {pageContent === "freePlaySettings" && (
        <FreePlaySettings
          toAbout={() => setPageContent("about")}
          toBattleScreen={() => setPageContent("battleScreen")}
          userTypesRef={userTypesRef}
          oppTypesRef={oppTypesRef}
        />
      )}
      {pageContent === "battleScreen" && (
        <BattleScreen
          toAbout={() => setPageContent("about")}
          userTypesRef={userTypesRef}
          oppTypesRef={oppTypesRef}
        />
      )}
      {pageContent === "blitz" && (
        <BlitzScreen toAbout={() => setPageContent("about")} />
      )}
      <button
        className="chartButton"
        onClick={() => setShowDialog(true)}
        title="Type Chart"
      >
        {/* <img src="src/assets/map.png" alt="" /> */}
        <img src="public/assets/map.png" alt="" />
      </button>
      <ChartModal
        dialogRef={dialogRef}
        isShowing={showDialog}
        closeDialog={() => setShowDialog(false)}
      />
    </>
  );
}
