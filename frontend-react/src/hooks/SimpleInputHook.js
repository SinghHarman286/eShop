import { useState, useEffect } from "react";

export default (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const resetValue = () => {
    setValue("");
  };
  return [value, handleChange, resetValue];
};
