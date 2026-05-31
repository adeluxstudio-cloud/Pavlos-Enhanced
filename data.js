/* ============================================================================
   Pavlo´s Store — datos del negocio (catálogo, combos, sucursales, config)
   Precios en COP de EJEMPLO realista — el dueño los cambia luego.
   ============================================================================ */
(function () {
  "use strict";

  const CONFIG = {
    nombre: "Pavlo´s Store",
    instagram: "pavlos.store",
    instagramUrl: "https://instagram.com/pavlos.store",
    // Número de ejemplo — cambiar al real. Formato wa.me: 57 + número sin espacios.
    whatsapp: "573014490958",
    whatsappDisplay: "301 449 0958",
    domicilio: 6000, // costo de ejemplo
    zonas: ["Santo Tomás", "Palmar de Varela"],
    pagos: ["Nequi", "Daviplata", "Bancolombia", "Llave Bre-b"],
    sucursales: [
      { id: 1, ciudad: "Santo Tomás", dir: "Cra 11 # 7-07, Boulevard", principal: true },
      { id: 2, ciudad: "Santo Tomás", dir: "Boulevard, bajando", nota: "dirección exacta pendiente" },
      { id: 3, ciudad: "Palmar de Varela", dir: "Boulevard, Calle 7", nota: "dirección exacta pendiente" },
    ],
    // Horarios. close > 24h indica que cierra de madrugada (día siguiente).
    horarios: [
      { dias: "Lun – Vie", rango: "1:00 p.m. – 1:00 a.m." },
      { dias: "Sáb – Dom", rango: "12:00 p.m. – 3:00 a.m." },
    ],
  };

  // Categorías del catálogo (orden de aparición)
  const CATEGORIAS = [
    { id: "aguardiente", nombre: "Aguardiente" },
    { id: "whiskey", nombre: "Whiskey" },
    { id: "ron", nombre: "Ron" },
    { id: "tequila", nombre: "Tequila" },
    { id: "vodka", nombre: "Vodka" },
    { id: "vinos", nombre: "Vinos" },
    { id: "cerveza", nombre: "Cerveza" },
    { id: "mezcladores", nombre: "Mezcladores" },
  ];

  // bottle: forma de la silueta placeholder (spirit | whiskey | wine | beer | can | mixer)
  const PRODUCTOS = [
    // ⭐ Aguardiente — producto estrella
    { id: "agu-amarillo-750", nombre: "Aguardiente Amarillo", variante: "Botella 750 ml", cat: "aguardiente", precio: 52000, vol: "750 ml", abv: "24°", bottle: "spirit", estrella: true, tag: "Estrella" },
    { id: "agu-amarillo-litro", nombre: "Aguardiente Amarillo", variante: "Litro", cat: "aguardiente", precio: 68000, antes: 76000, promo: true, vol: "1 L", abv: "24°", bottle: "spirit", estrella: true },
    { id: "agu-amarillo-375", nombre: "Aguardiente Amarillo", variante: "Media 375 ml", cat: "aguardiente", precio: 30000, vol: "375 ml", abv: "24°", bottle: "spirit" },
    { id: "agu-nectar", nombre: "Aguardiente Néctar", variante: "Botella 750 ml", cat: "aguardiente", precio: 48000, vol: "750 ml", abv: "24°", bottle: "spirit", tag: "Más vendido" },

    // Whiskey
    { id: "whisky-buchanans-12", nombre: "Buchanan´s 12", variante: "Botella 750 ml", cat: "whiskey", precio: 138000, vol: "750 ml", abv: "40°", bottle: "whiskey", tag: "Premium" },
    { id: "whisky-oldparr", nombre: "Old Parr", variante: "Botella 750 ml", cat: "whiskey", precio: 122000, vol: "750 ml", abv: "40°", bottle: "whiskey" },
    { id: "whisky-something", nombre: "Something Special", variante: "Botella 750 ml", cat: "whiskey", precio: 72000, vol: "750 ml", abv: "40°", bottle: "whiskey" },
    { id: "whisky-byw", nombre: "Black & White", variante: "Botella 750 ml", cat: "whiskey", precio: 58000, antes: 66000, promo: true, vol: "750 ml", abv: "40°", bottle: "whiskey" },

    // Ron
    { id: "ron-medellin", nombre: "Ron Medellín Añejo", variante: "Botella 750 ml", cat: "ron", precio: 48000, antes: 55000, promo: true, vol: "750 ml", abv: "37.5°", bottle: "spirit", tag: "Más vendido" },
    { id: "ron-caldas", nombre: "Ron Viejo de Caldas", variante: "Botella 750 ml", cat: "ron", precio: 45000, vol: "750 ml", abv: "35°", bottle: "spirit" },
    { id: "ron-bacardi", nombre: "Bacardí Blanco", variante: "Botella 750 ml", cat: "ron", precio: 55000, vol: "750 ml", abv: "37.5°", bottle: "spirit" },

    // Tequila
    { id: "teq-cuervo", nombre: "José Cuervo Especial", variante: "Botella 695 ml", cat: "tequila", precio: 95000, vol: "695 ml", abv: "38°", bottle: "spirit", tag: "Premium" },
    { id: "teq-1800", nombre: "1800 Reposado", variante: "Botella 750 ml", cat: "tequila", precio: 165000, vol: "750 ml", abv: "40°", bottle: "spirit" },

    // Vodka
    { id: "vod-smirnoff", nombre: "Smirnoff", variante: "Botella 750 ml", cat: "vodka", precio: 45000, vol: "750 ml", abv: "37.5°", bottle: "spirit" },
    { id: "vod-absolut", nombre: "Absolut", variante: "Botella 750 ml", cat: "vodka", precio: 78000, vol: "750 ml", abv: "40°", bottle: "spirit" },

    // Vinos
    { id: "vino-casillero", nombre: "Casillero del Diablo", variante: "Cabernet · 750 ml", cat: "vinos", precio: 48000, vol: "750 ml", abv: "13.5°", bottle: "wine" },
    { id: "vino-gato", nombre: "Gato Negro", variante: "Cabernet · 750 ml", cat: "vinos", precio: 32000, vol: "750 ml", abv: "13°", bottle: "wine" },
    { id: "vino-clos", nombre: "Clos", variante: "Tinto · 1 L", cat: "vinos", precio: 22000, vol: "1 L", abv: "12°", bottle: "wine" },

    // Cerveza
    { id: "cer-aguila-6", nombre: "Águila", variante: "Six pack · 330 ml", cat: "cerveza", precio: 16000, vol: "6 x 330 ml", abv: "4°", bottle: "beer", tag: "Más vendido" },
    { id: "cer-club-6", nombre: "Club Colombia Dorada", variante: "Six pack · 330 ml", cat: "cerveza", precio: 19000, vol: "6 x 330 ml", abv: "4.7°", bottle: "beer" },
    { id: "cer-corona-6", nombre: "Corona", variante: "Six pack · 330 ml", cat: "cerveza", precio: 28000, antes: 33000, promo: true, vol: "6 x 330 ml", abv: "4.5°", bottle: "beer" },
    { id: "cer-poker-6", nombre: "Poker", variante: "Six pack · 330 ml", cat: "cerveza", precio: 14000, vol: "6 x 330 ml", abv: "4°", bottle: "beer" },

    // Mezcladores
    { id: "mez-cocacola", nombre: "Coca-Cola", variante: "1.5 L", cat: "mezcladores", precio: 6000, vol: "1.5 L", bottle: "mixer" },
    { id: "mez-soda", nombre: "Soda Premium", variante: "1.5 L", cat: "mezcladores", precio: 4000, vol: "1.5 L", bottle: "mixer" },
    { id: "mez-hielo", nombre: "Hielo", variante: "Bolsa 2 kg", cat: "mezcladores", precio: 5000, vol: "2 kg", bottle: "can" },
    { id: "mez-redbull", nombre: "Red Bull", variante: "Lata 250 ml", cat: "mezcladores", precio: 8000, vol: "250 ml", bottle: "can" },
    { id: "mez-hit", nombre: "Jugo Hit", variante: "1.5 L", cat: "mezcladores", precio: 5000, vol: "1.5 L", bottle: "mixer" },
  ];

  // Combos / promos — inventados, creíbles para licorería de domicilios
  const COMBOS = [
    {
      id: "combo-parranda",
      nombre: "Combo Parranda",
      desc: "Para arrancar la noche sin pensarlo.",
      items: ["Aguardiente Amarillo 750 ml", "2 gaseosas 1.5 L", "Hielo 2 kg"],
      precio: 62000, antes: 68000, tag: "El más pedido",
    },
    {
      id: "combo-whiskeria",
      nombre: "Combo Whiskería",
      desc: "Old Parr y todo listo para servir.",
      items: ["Old Parr 750 ml", "4 sodas 1.5 L", "Hielo 2 kg"],
      precio: 138000, antes: 150000, tag: "Premium",
    },
    {
      id: "combo-ron-noche",
      nombre: "Noche de Ron",
      desc: "Ron Medellín bien acompañado.",
      items: ["Ron Medellín Añejo 750 ml", "2 Coca-Cola 1.5 L", "Hielo 2 kg"],
      precio: 58000, antes: 64000,
    },
    {
      id: "combo-cervecero",
      nombre: "Combo Cervecero",
      desc: "Doce fría y hielo, listo el plan.",
      items: ["12 Águila 330 ml", "Hielo 2 kg"],
      precio: 30000, antes: 34000,
    },
    {
      id: "combo-express",
      nombre: "Combo Express",
      desc: "Para dos, rápido y al grano.",
      items: ["Aguardiente Néctar 375 ml", "Gaseosa 1.5 L", "Hielo 2 kg"],
      precio: 32000, antes: 36000,
    },
    {
      id: "combo-brindis",
      nombre: "Combo Brindis",
      desc: "Dos tintos para la ocasión.",
      items: ["Casillero del Diablo 750 ml", "Gato Negro 750 ml"],
      precio: 74000, antes: 80000,
    },
  ];

  // ===== Helpers ============================================================
  function pesos(n) {
    return "$" + Math.round(n).toLocaleString("es-CO");
  }

  // Horario: Lun–Vie 13:00–01:00 · Sáb–Dom 12:00–03:00 (cierra de madrugada).
  // Devuelve minutos desde medianoche; close puede ser > 1440 (cruza medianoche).
  function horasDia(day /* 0=Dom..6=Sáb */) {
    if (day === 0 || day === 6) return { open: 12 * 60, close: 27 * 60 }; // 12:00 → 03:00
    return { open: 13 * 60, close: 25 * 60 }; // 13:00 → 01:00
  }

  function estadoApertura(now) {
    now = now || new Date();
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const hoy = horasDia(day);
    // ventana de hoy (parte antes de medianoche)
    if (mins >= hoy.open && mins < Math.min(hoy.close, 1440)) {
      return { abierto: true, cierra: hoy.close };
    }
    // ventana de ayer que se extiende a la madrugada de hoy
    const ayer = horasDia((day + 6) % 7);
    if (ayer.close > 1440 && mins < ayer.close - 1440) {
      return { abierto: true, cierra: ayer.close - 1440 };
    }
    // cerrado — ¿a qué hora abre hoy?
    return { abierto: false, abre: hoy.open > mins ? hoy.open : null };
  }

  function minsToHora(m) {
    m = ((m % 1440) + 1440) % 1440;
    let h = Math.floor(m / 60);
    const min = m % 60;
    const ampm = h < 12 || h === 24 ? "a.m." : "p.m.";
    let h12 = h % 12; if (h12 === 0) h12 = 12;
    return h12 + (min ? ":" + String(min).padStart(2, "0") : "") + " " + ampm;
  }

  // Publicaciones de Instagram (placeholders — reemplazar por las reales).
  // tone: gold | patina | dark — define el degradado del placeholder.
  const IG_POSTS = [
    { id: "ig1", titulo: "Combo Parranda", sub: "Llévalo hoy", tone: "gold", likes: 248 },
    { id: "ig2", titulo: "2x1 los jueves", sub: "Cervezas frías", tone: "dark", likes: 412 },
    { id: "ig3", titulo: "Aguardiente Amarillo", sub: "El de siempre", tone: "gold", likes: 530 },
    { id: "ig4", titulo: "Noche de Ron", sub: "Combo del fin", tone: "patina", likes: 176 },
    { id: "ig5", titulo: "Whiskería", sub: "Old Parr + sodas", tone: "dark", likes: 198 },
    { id: "ig6", titulo: "Domicilio gratis", sub: "Desde $80.000", tone: "gold", likes: 305 },
  ];

  // Promos para el carrusel de Inicio: botellas con descuento + combos.
  function getPromos() {
    const bottles = PRODUCTOS.filter(p => p.promo).map(p => ({
      kind: "prod", id: p.id, nombre: p.nombre, sub: p.variante,
      precio: p.precio, antes: p.antes, bottle: p.bottle,
    }));
    const combos = COMBOS.filter(c => c.antes).map(c => ({
      kind: "combo", id: c.id, nombre: c.nombre, sub: c.items.length + " productos",
      precio: c.precio, antes: c.antes,
    }));
    // intercalar botella, combo, botella, combo…
    const out = []; let i = 0, j = 0;
    while (i < bottles.length || j < combos.length) {
      if (i < bottles.length) out.push(bottles[i++]);
      if (j < combos.length) out.push(combos[j++]);
    }
    return out;
  }

  window.PAVLOS = {
    CONFIG, CATEGORIAS, PRODUCTOS, COMBOS, IG_POSTS,
    pesos, estadoApertura, minsToHora, getPromos,
  };
})();
