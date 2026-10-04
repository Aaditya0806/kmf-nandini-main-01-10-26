// Curved section edge, like the wave dividers on amul.com. Placed inside a
// `relative` section: `top` draws the previous section's colour curving down
// into this one; `bottom` draws the next section's colour curving up.
// `fill` is any CSS colour. Two profiles (a / b) so consecutive waves differ.

const PATHS = {
  a: 'M0,48 C240,96 480,0 720,40 C960,80 1200,96 1440,32 L1440,0 L0,0 Z',
  b: 'M0,24 C180,88 420,88 720,44 C1020,0 1260,8 1440,56 L1440,0 L0,0 Z',
};

export default function Wave({ position = 'top', fill = '#ffffff', profile = 'a', className = '' }) {
  const top = position === 'top';
  return (
    <svg
      className={`pointer-events-none absolute inset-x-0 z-[1] h-10 w-full md:h-20 ${top ? 'top-0' : 'bottom-0 rotate-180'} ${className}`}
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[profile] || PATHS.a} fill={fill} />
    </svg>
  );
}
