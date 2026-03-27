"use client";

import { useState } from "react";

import Button from "@/design-system/Button";
import Modal from "@/design-system/Modal";

export default function AddNewBudget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        label="Add New Budget"
        onClick={() => setIsOpen(true)}
        variant="primary"
      />
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Budget"
        footer="primary"
        primaryLabel="Add Budget"
        onPrimaryAction={() => {}}
      >
        <div>Add New Budget</div>
      </Modal>
    </>
  );
}
