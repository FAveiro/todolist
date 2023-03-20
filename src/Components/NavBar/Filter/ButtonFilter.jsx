import React, { useState } from "react";

function ButtonFilter({
  value,
  bgColor,
  color,
  text,
  valueClick,
  onClickFilter,
}) {
  const [active, setActive] = useState(false);

  const styles = {
    button: {
      backgroundColor: bgColor,
      filter: active ? `saturate(150%)` : `saturate(1)`,
      transform: active ? `scale(1)` : `scale(0.95)`,
    },
    text: {
      color: color,
      fontWeight: active ? 500 : 400,
    },
  };

  const handleClick = () => {
    setActive(!active);

    if (valueClick.indexOf(value) >= 0) {
      onClickFilter(valueClick.filter((val) => val !== value));
    } else {
      onClickFilter((valueClick) => [...valueClick, value]);
    }
  };

  return (
    <button value={value} style={styles.button} onClick={handleClick}>
      <h5 style={styles.text}>{text}</h5>
    </button>
  );
}

export default ButtonFilter;
