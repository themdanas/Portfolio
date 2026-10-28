// Fixed, static backdrop: a top glow and grain.
// Colors come from the --bd-* tokens in globals.css so the theme toggle drives everything.

export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop-grain" />
    </div>
  );
}
