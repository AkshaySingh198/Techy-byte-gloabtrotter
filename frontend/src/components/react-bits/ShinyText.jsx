export default function ShinyText({
  text = '',
  disabled = false,
  speed = 3,
  className = '',
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text ${
        disabled ? '' : 'animate-shine'
      } ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0) 80%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animation: disabled ? 'none' : `shine ${animationDuration} linear infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </span>
  );
}
