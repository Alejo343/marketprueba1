"use client";

import { useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Transition } from "react-transition-group";
import "animate.css";

type AccordionProps = {
  children: React.ReactNode;
  heading: string;
};

export default function Accordion({ children, heading }: AccordionProps) {
  const nodeRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggleContent = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="shadow-sm bg-surface rounded-xl-custom">
      <button
        className="flex items-center justify-between
      bg-surface text-theme
      py-[23px] px-5 w-full group"
        onClick={toggleContent}
      >
        <p className="font-medium">{heading}</p>

        {!isOpen && <BsChevronDown />}
        {isOpen && <BsChevronUp />}
      </button>

      <Transition
        in={isOpen}
        timeout={800}
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRef}
      >
        {(state) => {
          return (
            <div
              ref={nodeRef}
              className={`bg-surface text-theme ${
                state === "entering"
                  ? "animate__animated animate__fadeInDown animate__fast"
                  : state === "exiting"
                    ? "animate__animated animate__fadeOutUp animate__fast"
                    : ""
              }`}
            >
              {children}
            </div>
          );
        }}
      </Transition>
    </div>
  );
}
