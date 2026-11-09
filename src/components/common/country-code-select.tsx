"use client";

import { useState } from "react";

const countries = [
  { code: "PK", name: "Pakistan", dialCode: "+92" },
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "BD", name: "Bangladesh", dialCode: "+880" },
  { code: "TR", name: "Turkey", dialCode: "+90" },
  { code: "AU", name: "Australia", dialCode: "+61" },
];

interface CountryCodeSelectProps {
  value?: string;
  onChange?: (dialCode: string) => void;
}

export function CountryCodeSelect({ value, onChange }: CountryCodeSelectProps = {}) {
  const initialCountry = countries.find((c) => c.dialCode === value) || countries[0];
  const [selected, setSelected] = useState(initialCountry);
  const [open, setOpen] = useState(false);

  const handleSelect = (country: typeof countries[0]) => {
    setSelected(country);
    setOpen(false);
    onChange?.(country.dialCode);
  };

  return (
    <div className="country-code-select">
      <input type="hidden" name="countryCode" value={selected.dialCode} />
      <button type="button" className="country-code-trigger" aria-expanded={open} aria-label="Choose country code" onClick={() => setOpen((value) => !value)}>
        <span>{selected.code} {selected.dialCode}</span>
      </button>
      {open ? (
        <div className="country-code-menu" role="listbox">
          {countries.map((country) => (
            <button
              type="button"
              className={country.code === selected.code ? "active" : ""}
              key={country.code}
              role="option"
              aria-selected={country.code === selected.code}
              onClick={() => {
                handleSelect(country);
              }}
            >
              <span>{country.code} {country.dialCode}</span>
              <strong>{country.name}</strong>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
