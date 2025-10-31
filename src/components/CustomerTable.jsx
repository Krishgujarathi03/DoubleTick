import React, { useMemo, useState, useCallback } from "react";
import { FixedSizeList } from "react-window";
import { generateCustomers } from "../utils/generateCustomers";

import userIcon from "../assets/test_user.svg";
import searchIcon from "../assets/test_Search-3.svg";
import FiltersDropdown from "./FiltersDropdown";

// For debounced search
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const PAGE_SIZE = 30;
const DATA = generateCustomers(1000000);

const columns = [
  { key: "checkbox", label: "Checkbox" }, // Checkbox col, no label
  { key: "name", label: "Customer" },
  { key: "score", label: "Score" },
  { key: "email", label: "Email" },
  { key: "lastMessageAt", label: "Last message sent at" },
  { key: "addedBy", label: "Added by" },
];

export default function CustomersTable() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const debouncedSearch = useDebounce(search, 250);

  const filteredData = useMemo(() => {
    let rows = DATA;
    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      rows = rows.filter(
        (row) =>
          row.name.toLowerCase().includes(s) ||
          row.email.toLowerCase().includes(s) ||
          row.phone.toLowerCase().includes(s)
      );
    }
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        let cA = a[sortKey] || "";
        let cB = b[sortKey] || "";
        if (typeof cA === "string") cA = cA.toLowerCase();
        if (typeof cB === "string") cB = cB.toLowerCase();
        if (cA < cB) return sortDir === "asc" ? -1 : 1;
        if (cA > cB) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return rows;
  }, [debouncedSearch, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // For react-window: render a display row
  const Row = useCallback(
    ({ index, style }) => {
      const row = filteredData[index];
      return (
        <div className="table-row" style={style} key={row.id}>
          <div className="cell avatar-cell">
            <img src={row.avatar} alt="" className="avatar" />
            <div>
              <div className="name">{row.name}</div>
              <div className="phone">{row.phone}</div>
            </div>
          </div>
          <div className="cell">{row.score}</div>
          <div className="cell">{row.email}</div>
          <div className="cell">
            {new Date(row.lastMessageAt).toLocaleString()}
          </div>
          <div className="cell">
            <span>
              <img src={userIcon} alt="" style={{ paddingLeft: "4px" }} />
            </span>
            {row.addedBy}
          </div>
        </div>
      );
    },
    [filteredData]
  );

  return (
    <div className="customers-table">
      <div className="actions-bar">
        <span>
          <img src={searchIcon} alt="" />
        </span>
        <input
          className="search"
          placeholder="Search Customers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FiltersDropdown />
      </div>

      <div className="table-header sticky">
        <div className="header-cell" style={{ width: 48, textAlign: "center" }}>
          <input type="checkbox" />
        </div>
        {columns.slice(1).map((col) => (
          <div
            className={`header-cell ${sortKey === col.key ? "sorted" : ""}`}
            key={col.key}
            onClick={() => handleSort(col.key)}
            title="Sort"
          >
            {col.label}
            {sortKey === col.key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
          </div>
        ))}
      </div>

      <FixedSizeList
        height={600}
        itemCount={filteredData.length}
        itemSize={68}
        width="100%"
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}
