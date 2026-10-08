"use client";

import { useState } from "react";

const roles = [
  ["Customer", "Book orders & get custom outfits", "/images/auth/role-customer.png"],
  ["Tailor", "Offer services & grow business", "/images/auth/role-tailor.png"],
  ["Designer", "Create designs & get discovered", "/images/auth/role-designer.png"],
];

interface AccountRoleChoiceProps {
  value?: string;
  onChange?: (role: string) => void;
}

export function AccountRoleChoice({ value, onChange }: AccountRoleChoiceProps) {
  const [internalRole, setInternalRole] = useState(roles[0][0]);
  const currentRole = value || internalRole;

  const handleSelect = (role: string) => {
    if (onChange) {
      onChange(role);
    } else {
      setInternalRole(role);
    }
  };

  return (
    <div className="role-choice" aria-label="Choose account type">
      <input type="hidden" name="role" value={currentRole.toLowerCase()} />
      {roles.map(([role, description, image]) => {
        const selected = currentRole.toLowerCase() === role.toLowerCase();

        return (
          <button
            type="button"
            className={`role-btn ${selected ? "active" : ""}`}
            aria-pressed={selected}
            key={role}
            onClick={() => handleSelect(role)}
          >
            {selected ? <span className="role-check" aria-hidden="true">&#10003;</span> : null}
            <span className="role-icon">
              <img src={image} alt="" aria-hidden="true" />
            </span>
            <span className="role-text">
              <strong>{role}</strong>
              <span>{description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
