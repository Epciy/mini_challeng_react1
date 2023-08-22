import React from "react";

export default function Box({tiles,handleTileClick}) {
  return (
    <div className="game-grid">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={`tile ${tile.flipped ? 'flipped' : ''} ${tile.matched ? 'matched' : ''}`}
            onClick={() => handleTileClick(tile)}
          >
            {tile.flipped && !tile.matched ? tile.number : ''}
          </div>
        ))}
      </div>
  );
}
