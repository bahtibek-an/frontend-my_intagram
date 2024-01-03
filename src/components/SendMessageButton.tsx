import React, { useState } from "react";
import Button from "./ui/Button";
import SendMessageModal from "./modals/SendMessageModal";
const SendMessageButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        className="bg-blue dark:bg-blue px-4 text-white"
        onClick={() => setIsOpen(true)}
      >
        Send message
      </Button>
      <SendMessageModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default SendMessageButton;
