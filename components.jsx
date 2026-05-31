/* ============================================================================
   Pavlo´s Store — componentes base: iconos, siluetas de botella, controles
   Neo Kinpaku: oro sobre laca negra. Iconos thin-stroke ~1.6px.
   ============================================================================ */

/* ---- Iconos (thin inline SVG, 24x24, stroke currentColor) --------------- */
function Icon({ name, size = 22, stroke = 1.6, style }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    home: <><path {...p} d="M3 10.5 12 3l9 7.5" /><path {...p} d="M5 9.5V20h14V9.5" /></>,
    catalog: <><path {...p} d="M4 5h16M4 12h16M4 19h16" /></>,
    grid: <><rect {...p} x="3" y="3" width="7" height="7" rx="1" /><rect {...p} x="14" y="3" width="7" height="7" rx="1" /><rect {...p} x="3" y="14" width="7" height="7" rx="1" /><rect {...p} x="14" y="14" width="7" height="7" rx="1" /></>,
    combo: <><path {...p} d="M4 8h16l-1.2 11.2a1 1 0 0 1-1 .8H6.2a1 1 0 0 1-1-.8z" /><path {...p} d="M8.5 8V6.2A2.2 2.2 0 0 1 10.7 4h2.6a2.2 2.2 0 0 1 2.2 2.2V8" /><path {...p} d="M9.5 12.5v3M14.5 12.5v3" /></>,
    cart: <><circle {...p} cx="9" cy="20" r="1.3" /><circle {...p} cx="18" cy="20" r="1.3" /><path {...p} d="M2.5 3.5h2.2l2 12.2a1 1 0 0 0 1 .8h9.1a1 1 0 0 0 1-.78L21 7H6" /></>,
    info: <><circle {...p} cx="12" cy="12" r="9" /><path {...p} d="M12 11v5M12 7.6v.4" /></>,
    plus: <path {...p} d="M12 5v14M5 12h14" />,
    minus: <path {...p} d="M5 12h14" />,
    close: <path {...p} d="M6 6l12 12M18 6 6 18" />,
    check: <path {...p} d="M4 12.5l5 5 11-11" />,
    search: <><circle {...p} cx="11" cy="11" r="7" /><path {...p} d="M20 20l-4-4" /></>,
    clock: <><circle {...p} cx="12" cy="12" r="9" /><path {...p} d="M12 7v5l3.5 2" /></>,
    pin: <><path {...p} d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle {...p} cx="12" cy="10" r="2.5" /></>,
    chevron: <path {...p} d="M9 6l6 6-6 6" />,
    chevronDown: <path {...p} d="M6 9l6 6 6-6" />,
    arrow: <path {...p} d="M5 12h14M13 6l6 6-6 6" />,
    trash: <><path {...p} d="M4 7h16M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M6 7l1 12.2a1 1 0 0 0 1 .8h8a1 1 0 0 0 1-.8L18 7" /></>,
    whatsapp: <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.6 14.2c-.24.66-1.4 1.27-1.92 1.31-.5.05-.5.4-3.17-.66-2.68-1.06-4.35-3.78-4.48-3.96-.13-.18-1.07-1.42-1.07-2.71s.68-1.92.92-2.19c.24-.26.53-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.58.8 2 .87 2.14.07.13.11.29.02.47-.09.18-.13.29-.26.45-.13.16-.28.35-.4.47-.13.13-.27.27-.12.53.16.26.7 1.15 1.5 1.87 1.03.92 1.9 1.2 2.16 1.34.26.13.41.11.56-.07.16-.18.65-.76.83-1.02.17-.26.35-.21.59-.13.24.09 1.53.72 1.79.85.26.13.43.2.5.31.06.11.06.64-.18 1.3z" fill="currentColor" stroke="none" />,
    instagram: <><rect {...p} x="3.5" y="3.5" width="17" height="17" rx="5" /><circle {...p} cx="12" cy="12" r="3.8" /><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" /></>,
    bike: <><circle {...p} cx="5.5" cy="17.5" r="3" /><circle {...p} cx="18.5" cy="17.5" r="3" /><path {...p} d="M5.5 17.5 10 8h4l2.5 4.5M9 8h3M14 8l4.5 9.5" /></>,
    sparkle: <path {...p} d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />,
    copy: <><rect {...p} x="8" y="8" width="12" height="12" rx="2" /><path {...p} d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
    card: <><rect {...p} x="3" y="5.5" width="18" height="13" rx="2" /><path {...p} d="M3 9.5h18" /></>,
    heart: <path d="M12 20s-7-4.3-9.2-8.4C1.3 8.7 2.7 5.5 5.8 5.5c1.9 0 3.2 1.1 4.2 2.4 1-1.3 2.3-2.4 4.2-2.4 3.1 0 4.5 3.2 3 6.1C19 15.7 12 20 12 20z" fill="currentColor" stroke="none" />,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: "block", ...style }} aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
}

/* ---- Silueta de botella (placeholder elegante en oro) -------------------
   viewBox 0 0 48 150. fill=currentColor (oro). Banda de etiqueta + brillo
   pinstripe sutil. type: spirit | whiskey | wine | beer | can | mixer       */
function BottlePlaceholder({ type = "spirit", size = 56, glow = false }) {
  const G = "currentColor";
  const label = "rgba(0,0,0,0.30)";    // banda etiqueta (oscurece el oro)
  const sheen = "rgba(255,255,255,0.22)"; // brillo vertical
  const shapes = {
    spirit: (
      <>
        <rect x="18" y="2" width="12" height="7" rx="1.5" fill={G} />
        <rect x="20" y="8" width="8" height="22" fill={G} />
        <path d="M20 30 Q12 36 12 54 V138 Q12 144 18 144 H30 Q36 144 36 138 V54 Q36 36 28 30 Z" fill={G} />
        <rect x="13.5" y="86" width="21" height="34" rx="1.5" fill={label} />
      </>
    ),
    whiskey: (
      <>
        <rect x="16" y="3" width="16" height="7" rx="1.5" fill={G} />
        <rect x="20" y="9" width="8" height="13" fill={G} />
        <path d="M20 22 Q9 28 9 44 V137 Q9 144 15 144 H33 Q39 144 39 137 V44 Q39 28 28 22 Z" fill={G} />
        <rect x="11" y="78" width="26" height="40" rx="1.5" fill={label} />
      </>
    ),
    wine: (
      <>
        <rect x="19" y="2" width="10" height="6" rx="1" fill={G} />
        <rect x="20.5" y="6" width="7" height="44" fill={G} />
        <path d="M20.5 50 Q13 58 13 76 V138 Q13 144 18 144 H30 Q35 144 35 138 V76 Q35 58 27.5 50 Z" fill={G} />
        <rect x="14.5" y="96" width="19" height="30" rx="1" fill={label} />
      </>
    ),
    beer: (
      <>
        <path d="M18 4 q6 -3 12 0 v3 h-12 z" fill={G} />
        <rect x="20.5" y="7" width="7" height="30" fill={G} />
        <path d="M20.5 37 Q13.5 44 13.5 60 V137 Q13.5 144 19 144 H29 Q34.5 144 34.5 137 V60 Q34.5 44 27.5 37 Z" fill={G} />
        <rect x="15" y="82" width="18" height="38" rx="1.5" fill={label} />
      </>
    ),
    can: (
      <>
        <path d="M12 22 q0 -4 4 -4 h16 q4 0 4 4 V134 q0 4 -4 4 H16 q-4 0 -4 -4 Z" fill={G} />
        <ellipse cx="24" cy="20" rx="12" ry="3.4" fill={G} />
        <ellipse cx="24" cy="20" rx="7" ry="1.8" fill={label} />
        <rect x="14" y="58" width="20" height="44" rx="2" fill={label} />
      </>
    ),
    mixer: (
      <>
        <rect x="19" y="2" width="10" height="7" rx="1.5" fill={G} />
        <rect x="20.5" y="9" width="7" height="9" fill={G} />
        <path d="M20.5 18 Q12 24 12 38 V136 Q12 144 18 144 H30 Q36 144 36 136 V38 Q36 24 27.5 18 Z" fill={G} />
        <rect x="13.5" y="56" width="21" height="30" rx="1.5" fill={label} />
        <path d="M13 122 H35 M13 128 H35 M13 134 H35" stroke={label} strokeWidth="1.4" fill="none" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 48 150" width={size} height={size * 150 / 48}
      style={{ display: "block", color: "var(--pv-gold)", filter: glow ? "drop-shadow(0 6px 14px rgba(0,0,0,0.5))" : "none", overflow: "visible" }}
      aria-hidden="true">
      {shapes[type] || shapes.spirit}
      <rect x="18" y="34" width="2.4" height="100" rx="1.2" fill={sheen} />
    </svg>
  );
}

/* ---- Control de cantidad ------------------------------------------------ */
function Stepper({ qty, onInc, onDec, size = "md" }) {
  const sm = size === "sm";
  return (
    <div className={"pv-stepper" + (sm ? " pv-stepper-sm" : "")}>
      <button type="button" onClick={onDec} aria-label="Quitar uno"><Icon name="minus" size={sm ? 15 : 17} /></button>
      <span>{qty}</span>
      <button type="button" onClick={onInc} aria-label="Agregar uno"><Icon name="plus" size={sm ? 15 : 17} /></button>
    </div>
  );
}

Object.assign(window, { Icon, BottlePlaceholder, Stepper });
