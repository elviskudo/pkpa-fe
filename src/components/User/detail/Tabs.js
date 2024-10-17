import React, { useState, Children, cloneElement } from "react";
import "./Tabs.css";

export const Tabs = ({ children, ...props }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.value);

  return (
    <div
      {...props}
      className={`${props.className ? props.className : ""} tabs`}
    >
      {Children.map(children, (child) => {
        return cloneElement(child, {
          active: child.props.value === activeTab,
          setActiveTab,
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
  setActiveTab,
  ...props
}) => {
  const handleClick = () => {
    if (setActiveTab) {
      setActiveTab(value);
    }
  };

  return (
    <div
      {...props}
      className={`${props.className ? props.className : ""} py-4 px-10 tabsTrigger ${
        active ? "active" : ""
      }`}
      onClick={handleClick}
    >
      <span className="tab-icon">{icon}</span> {}
      {children}
    </div>
  );
};

export const TabsContent = ({ children, active = false, ...props }) => {
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
