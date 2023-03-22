import React, { useEffect, useState } from "react";

//* Import hooks
import { useOutSideClick } from "../../Hooks/useOutSideClick";

function ListBox({ titleListBox, info, name, newValue, value, disabledButton }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value ? value : info[0]);

  const handleClick = (selectReg) => {
    setOpen(false);
    setSelected(selectReg);
  };

  const ref = useOutSideClick(() => leaveComponent());

  const leaveComponent = () => {
    setOpen(false);
  };

  useEffect(() => {
    newValue((prevTask) => {
      return {
        ...prevTask,
        [name]: selected,
      };
    });
  }, [selected]);

  return (
    <>
      {!open ? (
        <div className="listbox_container_close">
          <button disabled={disabledButton} onClick={() => setOpen(true)}>
            <label
              value={selected.value}
              style={{
                color: selected.color,
                fontWeight: "500"
              }}
              text={selected.text}
            >
              {selected.text}
            </label>
          </button>
        </div>
      ) : (
        <div ref={ref} className="listbox_container_open">
          <h5>{titleListBox}</h5>
          {info.map((data, i) => (
            <button key={i} onClick={() => handleClick(data)}>
              <label
                value={data.value}
                style={{
                  color: data.color,
                  fontWeight: selected === data ? "600" : "400",
                }}
                text={data.text}
              >
                {data.text}
              </label>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default ListBox;
