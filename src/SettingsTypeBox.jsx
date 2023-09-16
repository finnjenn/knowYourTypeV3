export default function SettingsTypeBox({ typeArray, setTypeArray }) {
  function handleClick(typeClicked) {
    setTypeArray(
      typeArray.map((type) => {
        if (type.name === typeClicked.name)
          return { ...type, isSelected: !type.isSelected };
        return { ...type };
      })
    );
  }

  function handleReset() {
    setTypeArray(
      typeArray.map((type) => {
        return { ...type, isSelected: false };
      })
    );
  }

  function handleSelectAll() {
    setTypeArray(
      typeArray.map((type) => {
        return { ...type, isSelected: true };
      })
    );
  }

  return (
    <>
      <section className="settingsTypeBox">
        {typeArray.map((type) => {
          return (
            <button
              key={type.name}
              className={
                type.isSelected
                  ? `${type.name}-picked picked settingsTypeButton`
                  : `${type.name} settingsTypeButton white-text`
              }
              onClick={() => handleClick(type)}
            >
              {type.name}
            </button>
          );
        })}
      </section>
      <div className="resetSelectBox">
        <button className="settingsReset white-text" onClick={handleReset}>
          Reset
        </button>
        <button className="selectAll" onClick={handleSelectAll}>
          Select All
        </button>
      </div>
    </>
  );
}
