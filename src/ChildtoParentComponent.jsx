import React, { useState } from "react";

const ChildtoParentComponent = ({ sendDataToParent }) => {
  const [sendMessage, setSendMessage] = useState("");

  const handleChange = (e) => {
    setSendMessage(e.target.value);
  };

  const handleClick = () => {
    sendDataToParent(sendMessage);
  };

  return (
    <>
      <h3>Child to Parent Component Communication</h3>

      <input
        type="text"
        value={sendMessage}
        onChange={handleChange}
        placeholder="Enter message"
      />

      <br />
      <br />

      <button onClick={handleClick}>
        Send Message To Parent
      </button>
    </>
  );
};

export default ChildtoParentComponent;