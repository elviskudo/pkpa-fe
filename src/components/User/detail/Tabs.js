import React, { useState, useEffect, Children, cloneElement } from "react";
import "./Tabs.css";

export const Tabs = ({ children, value, onValueChange, ...props }) => {
  const [activeTab, setactivetab] = useState(value || children[0].props.value);

  useEffect(() => {
    if (value !== "") {
      setactivetab(value);
    }
  }, [value]);

  const handleTabChange = (newValue) => {
    setactivetab(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div
      {...props}
      className={`${props.className ? props.className : ""} tabs`}
    >
      {Children.map(children, (child) => {
        return cloneElement(child, {
          active: child.props.value === activeTab,
          setactivetab: handleTabChange,
        });
      })}
    </div>
  );
};

export const TabsTrigger = ({
  value,
  children,
  icon,
  active,
  setactivetab,
  ...props
}) => {
  const handleClick = () => {
    if (setactivetab) {
      setactivetab(value);
    }
  };

  return (
    <div
      {...props}
      className={`${
        props.className ? props.className : ""
      } py-4 px-10 tabsTrigger ${active ? "active" : ""}`}
      onClick={handleClick}
    >
      <span className="tab-icon">{icon}</span> {}
      {children}
    </div>
  );
};

export const TabsContent = ({ children, value, active, ...props }) => {
  if (!active) {
    return null;
  }

  return (
    <div
      {...props}
      className={`tabsContent ${props.className ? props.className : ""}`}
    >
      {children}
    </div>
  );
};
