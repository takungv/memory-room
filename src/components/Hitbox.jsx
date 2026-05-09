function Hitbox({ onClick, title, className = "hitbox-glow", style }) {
    return (
      <div
        className={className}
        onClick={onClick}
        title={title}
        style={{
          position: "absolute",
          cursor: "pointer",
          ...style,
        }}
      />
    );
  }
  
  export default Hitbox;