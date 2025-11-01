import { useState } from "react";
import filterIcon from "../assets/test_Filter.svg";

export default function FiltersDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="filters-dropdown">
      <button onClick={() => setOpen((prev) => !prev)}>
        <span>
          <img
            src={filterIcon}
            alt="Filter Icon"
            style={{
              width: "18px",
              height: "18px",
              verticalAlign: "middle",
              marginRight: "6px",
            }}
          />
        </span>
        Add Filters
      </button>
      {open && (
        <div className="filters-list" style={{ zIndex: 100 }}>
          <div>Filter 1</div>
          <div>Filter 2</div>
          <div>Filter 3</div>
          <div>Filter 4</div>
        </div>
      )}
    </div>
  );
}
