// Progressive blur along the top edge: stacked backdrop-filter layers, each stronger and masked
// to a band nearer the edge, so content dissolves smoothly instead of hitting a hard line.

const LAYERS = 6;

export default function EdgeBlur() {
  return (
    <div className="edge-blur" aria-hidden="true">
      {Array.from({ length: LAYERS }, (_, i) => (
        <div key={i} />
      ))}
    </div>
  );
}
