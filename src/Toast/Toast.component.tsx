import React, { useEffect } from "react";
import "./Toast.css";
interface ToastProps {
  id: string;
  isOpen: boolean;
  onClose?: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  isOpen,
  onClose,
  children
}) => {
  console.log("render");

  useEffect(() => {
    console.log("[]");
    return () => {
      console.log("onDestroy");
    };
  }, []);

  useEffect(() => {
    console.log("empty");
  }, [isOpen, id]);

  return (
    <div className="myToast">
      <div className="myToastContent">{children}</div>
      <div className="myToastAction">
        <button className="btn" onClick={() => onClose?.(id)}>
          X
        </button>
      </div>
    </div>
  );
};
