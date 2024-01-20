import React, { useEffect } from "react";
import type { DropEvent } from "@mirohq/websdk-types";
import '../src/assets/style.css';

const { board } = miro;

export function DropCharacters() {
  const images = [
    "https://cdn-icons-png.flaticon.com/512/1727/1727571.png",
    "https://cdn-icons-png.flaticon.com/512/7508/7508360.png",
    "https://cdn-icons-png.flaticon.com/512/3509/3509800.png",
    "https://cdn-icons-png.flaticon.com/512/213/213311.png"
  ];

  const drop = async (e: DropEvent) => {
    const { x, y, target } = e;

    if (target instanceof HTMLImageElement) {
      await board.createImage({ x, y, url: target.src, width: 250 });
    }
  };

  // Register the drop event handler once.
  useEffect(() => {
    board.ui.on("drop", drop);
  }, []);

  return (
    <div className="main">
      {images.map((image, index) => {
        return (
          <img
            src={image}
            draggable={false}
            className="character miro-draggable draggable-item"
            key={index}
            width="45%"
          />
        );
      })}
    </div>
  );
}
