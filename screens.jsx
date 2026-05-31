/* ============================================================================
   Pavlo´s Store — pantallas: Inicio · Catálogo · Combos · Info
   (El Carrito/checkout vive en checkout.jsx)
   ============================================================================ */

/* ---- Estado abierto/cerrado (pill) ------------------------------------- */
function OpenPill({ estado }) {
  const { minsToHora } = window.PAVLOS;
  if (estado.abierto) {
    return (
      <span className="pv-status is-open">
        <span className="pv-status-dot" />Abierto ahora
        <span className="pv-status-sub">cierra {minsToHora(estado.cierra)}</span>
      </span>
    );
  }
  return (
    <span className="pv-status is-closed">
      <span className="pv-status-dot" />Cerrado
      {estado.abre != null && <span className="pv-status-sub">abre {minsToHora(estado.abre)}</span>}
    </span>
  );
}

/* ============================ INICIO ===================================== */
function HomeScreen({ estado, cart, add, inc, dec, cardStyle, goNav, goCat }) {
  const { PRODUCTOS, COMBOS, CATEGORIAS, CONFIG, IG_POSTS, getPromos, pesos } = window.PAVLOS;
  const estrella = PRODUCTOS.find(p => p.id === "agu-amarillo-750");
  const comboTop = COMBOS[0];
  const promos = getPromos();

  return (
    <div className="pv-screen">
      {/* Hero */}
      <header className="pv-hero">
        <div className="pv-hero-seam" />
        <div className="pv-hero-inner">
          <img className="pv-hero-logo" src="assets/pavlos-logo.png" alt="" />
          <h1 className="pv-hero-head">Tu licorería,<br />a domicilio</h1>
          <p className="pv-hero-tag">Lo que necesitas para la noche en el Atlántico, frío y a la puerta. Lo armas aquí y lo pides por WhatsApp.</p>
          <div className="pv-hero-status"><OpenPill estado={estado} /></div>
          <div className="pv-hero-cta">
            <button type="button" className="ks-button ks-button-primary pv-cta-pulse" onClick={() => goNav("catalogo")}>
              Pedir ahora <span className="ks-button-arrow"><Icon name="arrow" size={16} /></span>
            </button>
            <button type="button" className="ks-button ks-button-secondary" onClick={() => goNav("combos")}>Ver combos</button>
          </div>
          <div className="pv-hero-deli">
            <span><Icon name="bike" size={17} /> Domicilio {pesos(CONFIG.domicilio)}</span>
            <span className="pv-vsep" />
            <span><Icon name="pin" size={16} /> {CONFIG.zonas.join(" · ")}</span>
          </div>
        </div>
      </header>

      {/* Promociones — carrusel horizontal */}
      <section className="pv-block">
        <div className="pv-block-head">
          <span className="pv-eyebrow"><Icon name="sparkle" size={13} /> Promociones</span>
          <button type="button" className="pv-link" onClick={() => goNav("combos")}>Ver combos <Icon name="chevron" size={14} /></button>
        </div>
        <div className="pv-promo-rail">
          {promos.map(it => (
            <PromoCard key={it.id} item={it} qty={cart[it.id] || 0}
              onAdd={() => add(it.id)} onInc={() => inc(it.id)} onDec={() => dec(it.id)} />
          ))}
        </div>
      </section>

      {/* Producto estrella */}
      <section className="pv-block">
        <div className="pv-block-head">
          <span className="pv-eyebrow"><Icon name="sparkle" size={13} /> Producto estrella</span>
        </div>
        <div className="pv-star-feature">
          <div className="pv-star-stage">
            <BottlePlaceholder type={estrella.bottle} size={88} glow />
            <div className="pv-star-disc" />
          </div>
          <div className="pv-star-body">
            <h2 className="pv-star-name">Aguardiente Amarillo</h2>
            <p className="pv-star-desc">El que siempre piden. Suave, parrandero y nunca falta en la mesa.</p>
            <div className="pv-star-foot">
              <div>
                <span className="pv-price pv-price-lg">{pesos(estrella.precio)}</span>
                <span className="pv-star-vol">{estrella.vol} · {estrella.abv}</span>
              </div>
              {cart[estrella.id] > 0
                ? <Stepper qty={cart[estrella.id]} onInc={() => inc(estrella.id)} onDec={() => dec(estrella.id)} />
                : <button type="button" className="pv-add pv-add-block" onClick={() => add(estrella.id)}><Icon name="plus" size={16} /> Agregar</button>}
            </div>
          </div>
        </div>
      </section>

      {/* Categorías rápidas */}
      <section className="pv-block">
        <div className="pv-block-head">
          <h2 className="pv-block-title">Explora por categoría</h2>
          <button type="button" className="pv-link" onClick={() => goCat(null)}>Ver todo <Icon name="chevron" size={14} /></button>
        </div>
        <div className="pv-cat-grid">
          {CATEGORIAS.map(c => {
            const sample = PRODUCTOS.find(p => p.cat === c.id);
            return (
              <button type="button" key={c.id} className="pv-cat-card" onClick={() => goCat(c.id)}>
                <BottlePlaceholder type={sample ? sample.bottle : "spirit"} size={26} />
                <span>{c.nombre}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Combo destacado */}
      <section className="pv-block">
        <div className="pv-block-head">
          <h2 className="pv-block-title">Combo del momento</h2>
          <button type="button" className="pv-link" onClick={() => goNav("combos")}>Todos los combos <Icon name="chevron" size={14} /></button>
        </div>
        <ComboCard c={comboTop} qty={cart[comboTop.id] || 0} featured
          onAdd={() => add(comboTop.id)} onInc={() => inc(comboTop.id)} onDec={() => dec(comboTop.id)} />
      </section>

      {/* Instagram — carrusel tipo marquesina */}
      <section className="pv-block pv-ig">
        <div className="pv-block-head">
          <span className="pv-eyebrow"><Icon name="instagram" size={13} /> @{CONFIG.instagram}</span>
          <a className="pv-link" href={CONFIG.instagramUrl} target="_blank" rel="noopener">Seguir <Icon name="chevron" size={14} /></a>
        </div>
        <div className="pv-ig-marquee">
          <div className="pv-ig-track">
            {[...IG_POSTS, ...IG_POSTS].map((post, i) => <IgPost key={i} post={post} />)}
          </div>
        </div>
      </section>

      {/* Tira de info */}
      <section className="pv-block pv-info-strip">
        <button type="button" className="pv-info-chip" onClick={() => goNav("info")}>
          <Icon name="clock" size={18} />
          <div><strong>Horarios</strong><span>Hasta las 3 a.m. fin de semana</span></div>
        </button>
        <button type="button" className="pv-info-chip" onClick={() => goNav("info")}>
          <Icon name="pin" size={18} />
          <div><strong>3 sucursales</strong><span>Santo Tomás · Palmar</span></div>
        </button>
        <button type="button" className="pv-info-chip" onClick={() => goNav("info")}>
          <Icon name="card" size={18} />
          <div><strong>Pagos</strong><span>Nequi · Daviplata · Bancolombia</span></div>
        </button>
      </section>
    </div>
  );
}

/* ============================ CATÁLOGO =================================== */
function CatalogScreen({ cart, add, inc, dec, cardStyle, activeCat, setActiveCat }) {
  const { PRODUCTOS, CATEGORIAS } = window.PAVLOS;
  const [q, setQ] = React.useState("");

  const term = q.trim().toLowerCase();
  const filtered = PRODUCTOS.filter(p => {
    if (term && !(p.nombre + " " + p.variante).toLowerCase().includes(term)) return false;
    return true;
  });

  const cats = CATEGORIAS.filter(c => activeCat ? c.id === activeCat : true)
    .map(c => ({ ...c, items: filtered.filter(p => p.cat === c.id) }))
    .filter(c => c.items.length);

  const gridLayout = cardStyle === "tile" || cardStyle === "plinth";

  return (
    <div className="pv-screen">
      <div className="pv-sticky-top">
        <div className="pv-search">
          <Icon name="search" size={18} />
          <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar whiskey, aguardiente, cerveza…" />
          {q && <button type="button" className="pv-search-clear" onClick={() => setQ("")} aria-label="Limpiar"><Icon name="close" size={16} /></button>}
        </div>
        <div className="pv-chips">
          <button type="button" className={"pv-chip" + (!activeCat ? " is-active" : "")} onClick={() => setActiveCat(null)}>Todo</button>
          {CATEGORIAS.map(c => (
            <button type="button" key={c.id} className={"pv-chip" + (activeCat === c.id ? " is-active" : "")} onClick={() => setActiveCat(c.id)}>{c.nombre}</button>
          ))}
        </div>
      </div>

      <div className="pv-catalog-body">
        {cats.length === 0 && (
          <div className="ks-empty pv-empty">
            <Icon name="search" size={30} />
            <strong>Nada por aquí</strong>
            <p>No encontramos "{q}". Prueba otra búsqueda.</p>
          </div>
        )}
        {cats.map(c => (
          <section key={c.id} className="pv-cat-section">
            <h2 className="pv-cat-title">{c.nombre} <span>{c.items.length}</span></h2>
            <div className={"pv-products " + (gridLayout ? "is-grid" : "is-list") + " cs-" + cardStyle}>
              {c.items.map(p => (
                <ProductCard key={p.id} p={p} variant={cardStyle} qty={cart[p.id] || 0}
                  onAdd={() => add(p.id)} onInc={() => inc(p.id)} onDec={() => dec(p.id)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ============================ COMBOS ===================================== */
function CombosScreen({ cart, add, inc, dec }) {
  const { COMBOS } = window.PAVLOS;
  return (
    <div className="pv-screen">
      <div className="pv-page-head">
        <span className="pv-eyebrow"><Icon name="combo" size={14} /> Promociones</span>
        <h1 className="pv-page-title">Combos armados</h1>
        <p className="pv-page-sub">Listos para la parranda. Botella, mezcladores y hielo en un solo precio.</p>
      </div>
      <div className="pv-combo-list">
        {COMBOS.map((c, i) => (
          <ComboCard key={c.id} c={c} featured={i === 0} qty={cart[c.id] || 0}
            onAdd={() => add(c.id)} onInc={() => inc(c.id)} onDec={() => dec(c.id)} />
        ))}
      </div>
    </div>
  );
}

/* ============================ INFO ====================================== */
function InfoScreen({ estado }) {
  const { CONFIG, minsToHora } = window.PAVLOS;
  return (
    <div className="pv-screen">
      <div className="pv-page-head">
        <span className="pv-eyebrow"><Icon name="info" size={14} /> El negocio</span>
        <h1 className="pv-page-title">Sucursales e info</h1>
        <div className="pv-page-status"><OpenPill estado={estado} /></div>
      </div>

      <section className="pv-block">
        <h2 className="pv-block-title">Sucursales</h2>
        <div className="pv-suc-list">
          {CONFIG.sucursales.map(s => (
            <div key={s.id} className={"pv-suc" + (s.principal ? " is-main" : "")}>
              <div className="pv-suc-pin"><Icon name="pin" size={18} /></div>
              <div>
                <div className="pv-suc-city">{s.ciudad}{s.principal && <span className="pv-suc-badge">Principal</span>}</div>
                <div className="pv-suc-dir">{s.dir}</div>
                {s.nota && <div className="pv-suc-note">{s.nota}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pv-block">
        <h2 className="pv-block-title">Horarios</h2>
        <div className="pv-hours">
          {CONFIG.horarios.map((h, i) => (
            <div key={i} className="pv-hour-row"><span>{h.dias}</span><span>{h.rango}</span></div>
          ))}
          <div className="pv-hour-note"><Icon name="bike" size={16} /> Domicilios mientras estemos abiertos.</div>
        </div>
      </section>

      <section className="pv-block">
        <h2 className="pv-block-title">Domicilios y pagos</h2>
        <div className="pv-pay-grid">
          <div className="pv-pay-cost">
            <span className="pv-pay-cost-label">Costo de domicilio</span>
            <span className="pv-price pv-price-lg">{window.PAVLOS.pesos(CONFIG.domicilio)}</span>
            <span className="pv-pay-zones">Zonas: {CONFIG.zonas.join(" · ")}</span>
          </div>
          <div className="pv-pay-methods">
            <span className="pv-pay-label">Métodos de pago</span>
            <div className="pv-pay-chips">{CONFIG.pagos.map(m => <span key={m} className="pv-pay-chip">{m}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="pv-block">
        <h2 className="pv-block-title">Contacto</h2>
        <div className="pv-contact">
          <a className="pv-contact-row" href={"https://wa.me/" + CONFIG.whatsapp} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={22} /><div><strong>WhatsApp / pedidos</strong><span>{CONFIG.whatsappDisplay}</span></div><Icon name="chevron" size={16} />
          </a>
          <a className="pv-contact-row" href={CONFIG.instagramUrl} target="_blank" rel="noopener">
            <Icon name="instagram" size={22} /><div><strong>Instagram</strong><span>@{CONFIG.instagram}</span></div><Icon name="chevron" size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { OpenPill, HomeScreen, CatalogScreen, CombosScreen, InfoScreen });
