import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";

const Dropdown = (props) => {
  
  const [isActive, setIsActive] = useState(false);
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsActive(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const appendOptions = (newItemId) => {
    props.onChange && props.onChange([...props.value, newItemId]);
  };

  const removeOption = (removedItemId) => {
    props.onChange &&
      props.onChange(props.value.filter((i) => i !== removedItemId));
  };

  const multiSelectOptionRender = () => {
    return props.value.length ? (
      props.value.map((option) => (
        <div key={option.id} className="dropdown-option">
          {option.label}
          {"  "}
          <span
            className="dropdown-remove"
            onClick={() => removeOption(option)}
          >
            X
          </span>
        </div>
      ))
    ) : (
      <div
        onClick={() => setIsActive(!isActive)}
        className="dropdown-placeholder"
      >
        Select Option(s)
      </div>
    );
  };

  const singleSelectOptionRender = () => {
    return props.selected ? (
      <div
        onClick={() => setIsActive(!isActive)}
        className="dropdown-placeholder"
      >
        {props.selected.label}
      </div>
    ) : (
      <div
        onClick={() => setIsActive(!isActive)}
        className="dropdown-placeholder"
      >
        Select Option
      </div>
    );
  };

  return (
    <div className="dropdown-container" ref={node}>
      {props.multiSelect ? (
        <label>Multi-Select</label>
      ) : (
        <label>Single-Select</label>
      )}
      <div className="dropdown-input">
        <span onClick={() => setIsActive(!isActive)} className="arrow"></span>
        <div className="dropdown-options">
          {props.multiSelect
            ? multiSelectOptionRender()
            : singleSelectOptionRender()}
        </div>
      </div>

      <div
        className={classnames("dropdown-values", {
          "dropdown-active": isActive,
        })}
      >
        {props.multiSelect
          ? props.options
              .filter((i) => props.value.findIndex((v) => v.id === i.id) === -1)
              .map((option) => (
                <div
                  onClick={() => appendOptions(option)}
                  className="dropdown-item"
                  key={option.id}
                >
                  {option.label}
                </div>
              ))
          : props.options.map((option) => (
              <div
                onClick={() => {
                  props.setSelectedSingleOption(option);
                  setIsActive(false);
                }}
                className="dropdown-item"
                key={option.id}
              >
                {option.label}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Dropdown;
