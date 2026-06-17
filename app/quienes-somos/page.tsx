import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";

const values = [
  { icon: "✦", label: "Calidad" },
  { icon: "✦", label: "Confianza" },
  { icon: "✦", label: "Innovación" },
  { icon: "✦", label: "Pasión por la gastronomía" },
  { icon: "✦", label: "Experiencia" },
];

const diferenciadores = [
  "Un concepto de retail gastronómico integral",
  "Integración de la experiencia en casa y en tienda",
  "Curaduría de productos premium nacionales e importados",
  "Oferta de bebidas, vinos y destilados de alta calidad",
  "Integración de conceptos como Barril Market y Vaca Santa",
  "Desarrollo de productos propios y líneas exclusivas",
  "Asesoría gastronómica personalizada",
];

const galeriaItems = [
  {
    src: "/images/quienes-somos/estanteria_champagne.JPG",
    alt: "Selección de champagne y espumantes",
    label: "Champagne & Espumantes",
  },
  {
    src: "/images/quienes-somos/estanteria_licores.JPG",
    alt: "Estantería de licores premium",
    label: "Licores Premium",
  },
  {
    src: "/images/quienes-somos/nevera_1.JPG",
    alt: "Nevera de bebidas",
    label: "Bebidas & Refrescos",
  },
  {
    src: "/images/quienes-somos/estanteria_cafe_y_nikkei.JPG",
    alt: "Café y esencia nikkei",
    label: "Café & Nikkei",
  },
  {
    src: "/images/quienes-somos/estanteria_despensa_gourmet.JPG",
    alt: "Despensa gourmet",
    label: "Despensa Gourmet",
  },
  {
    src: "/images/quienes-somos/estanteria_rincon_italiano.JPG",
    alt: "Rincón italiano",
    label: "Rincón Italiano",
  },
];

export default function QuienesSomosPage() {
  return (
    <div
      className="min-h-screen bg-[var(--color-bg)] pt-30"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Header />

      {/* Hero — imagen de fondo */}
      <section className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        <div className="absolute inset-0">
          <img
            src="/images/quienes-somos/habitacion_vinos_de_lejos.JPG"
            alt="The Market Gourmet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#080808]/78" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[var(--color-bg)]" />
        </div>
        <div className="relative flex items-center justify-center py-44 px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-10 h-px bg-[var(--color-primary)]/60" />
              <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.25em] uppercase">
                Nuestra historia
              </span>
              <span className="w-10 h-px bg-[var(--color-primary)]/60" />
            </div>
            <h1
              className="text-[3.5rem] md:text-[5rem] font-bold text-[var(--color-text)] leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Quiénes Somos
            </h1>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl mx-auto">
              Más que una tienda, somos un punto de encuentro donde la gastronomía,
              la cultura y la experiencia culinaria convergen en un solo lugar.
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 bg-[var(--color-subtle-bg)] border-y border-[var(--color-primary)]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Bloque 1: texto izquierda + imagen derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-16">
            <div className="lg:col-span-3">
              <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.2em] uppercase block mb-4">
                Origen
              </span>
              <h2
                className="text-[2rem] md:text-[2.5rem] font-bold text-[var(--color-text)] leading-tight mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                De Barril Market a The Market Gourmet
              </h2>
              <div className="space-y-5 text-[var(--color-muted)] leading-relaxed">
                <p>
                  <strong className="text-[var(--color-text)]">The Market Gourmet</strong> nace
                  como la evolución de una visión gastronómica que inicia durante la pandemia con{" "}
                  <strong className="text-[var(--color-primary)]">Barril Market</strong>, un
                  concepto de asadores al barril enfocado en ofrecer una experiencia diferente al
                  consumo tradicional.
                </p>
                <p>
                  Desde sus inicios, Barril Market se destacó por trabajar con barriles premium,
                  accesorios diferenciados y una propuesta cuidada en cada detalle, marcando un
                  diferencial claro frente a lo que existía en el mercado y posicionándose como
                  una alternativa única para disfrutar la gastronomía en casa.
                </p>
                <p>
                  A partir de esa base, comenzó a surgir una visión más amplia, impulsada por el
                  amor por la buena cocina y lo gastronómico: no solo vivir la experiencia en
                  casa, sino también crear un espacio físico que reuniera todo el mundo culinario
                  en un solo lugar.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div
                className="relative rounded-2xl overflow-hidden border border-[var(--color-primary)]/20"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src="/images/quienes-somos/barriles_y_accesorios.JPG"
                  alt="Barriles y accesorios Barril Market"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#080808]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[var(--color-text)] text-sm font-semibold">Barril Market</span>
                  <p className="text-[var(--color-muted)] text-xs mt-0.5">El origen de nuestra historia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque 2: imagen izquierda + texto derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div
                className="relative rounded-2xl overflow-hidden border border-[var(--color-primary)]/20"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src="/images/quienes-somos/barriles_y_carbon.JPG"
                  alt="Barriles y carbón"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#080808]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[var(--color-text)] text-sm font-semibold">The Market Gourmet</span>
                  <p className="text-[var(--color-muted)] text-xs mt-0.5">Evolucionando la experiencia</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-5 text-[var(--color-muted)] leading-relaxed order-1 lg:order-2">
              <p>
                Hoy, el proyecto se encuentra en proceso de consolidación como un concepto
                integral, diseñado para reunir todas las líneas de la experiencia gastronómica:
                desde la selección de productos premium y únicos, hasta una curaduría de bebidas,
                vinos y destilados, junto con productos gourmet que no se encuentran fácilmente
                en el mercado tradicional.
              </p>
              <p>
                Dentro de esta evolución también se desarrolla{" "}
                <strong className="text-[var(--color-text)]">Vaca Santa</strong>, una carnicería
                premium diferente, donde no solo se ofrecerán cortes importados y Wagyu, sino
                también desarrollos propios y productos terminados pensados para brindar opciones
                únicas y de alta calidad.
              </p>
              <p>
                <strong className="text-[var(--color-text)]">The Market Gourmet</strong> se
                proyecta como un espacio donde convergen diferentes culturas gastronómicas,
                combinando la experiencia en casa con la experiencia en tienda, y
                consolidándose como una propuesta diferencial en la ciudad de Cali.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galería del espacio */}
      <section className="py-20 bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.2em] uppercase block mb-4">
              Nuestro espacio
            </span>
            <h2
              className="text-[2rem] md:text-[2.5rem] font-bold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Vive la experiencia
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {galeriaItems.map((item, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden group border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/40 transition-all duration-500"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#080808]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span
                    className="text-[var(--color-text)] text-sm font-semibold"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión + Visión */}
      <section className="py-20 bg-[var(--color-subtle-bg)] border-y border-[var(--color-primary)]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block w-12 h-px bg-[var(--color-primary)] mb-6" />
            <h2
              className="text-[2rem] md:text-[2.5rem] font-bold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Propósito y dirección
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--color-surface)] border border-[var(--color-primary)]/20 rounded-2xl p-8 hover:border-[var(--color-primary)]/50 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 flex items-center justify-center">
                  <span className="text-[var(--color-primary)] text-lg">◎</span>
                </div>
                <h3
                  className="text-xl font-bold text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Misión
                </h3>
              </div>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Brindar una experiencia gastronómica integral a través de productos premium,
                asesoría especializada y una propuesta que conecta distintas cocinas del mundo
                con el cliente.
              </p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-primary)]/20 rounded-2xl p-8 hover:border-[var(--color-primary)]/50 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 flex items-center justify-center">
                  <span className="text-[var(--color-primary)] text-lg">◈</span>
                </div>
                <h3
                  className="text-xl font-bold text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Visión
                </h3>
              </div>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Ser un referente en el mercado gastronómico premium de la región, destacándonos
                por la calidad de nuestros productos, la innovación en nuestras líneas y la
                experiencia que ofrecemos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section className="py-20 bg-[var(--color-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.2em] uppercase block mb-4">
              Lo que nos diferencia
            </span>
            <h2
              className="text-[2rem] md:text-[2.5rem] font-bold text-[var(--color-text)] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nuestra propuesta de valor
            </h2>
            <p className="text-[var(--color-muted)] max-w-xl mx-auto">
              En The Market Gourmet no solo vendemos productos, construimos experiencias.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {diferenciadores.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-[var(--color-surface)] border border-[var(--color-primary)]/15 rounded-xl p-5 hover:border-[var(--color-primary)]/40 transition-colors duration-300"
              >
                <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[var(--color-text)] text-sm leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-[var(--color-subtle-bg)] border-y border-[var(--color-primary)]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block w-12 h-px bg-[var(--color-primary)] mb-6" />
            <h2
              className="text-[2rem] md:text-[2.5rem] font-bold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nuestros valores
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-primary)]/20 rounded-full px-7 py-3.5 hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-primary)]/5 transition-all duration-300"
              >
                <span className="text-[var(--color-primary)] text-xs">✦</span>
                <span
                  className="text-[var(--color-text)] font-semibold text-sm tracking-wide"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {v.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final — imagen de fondo */}
      <section className="relative overflow-hidden">
        <div className="relative h-[420px] md:h-[500px]">
          <img
            src="/images/quienes-somos/punto_de_venta_mostrador.JPG"
            alt="The Market Gourmet — punto de venta"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#080808]/75" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[var(--color-primary)]/8 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative text-center px-4 max-w-2xl">
              <span className="inline-block w-12 h-px bg-[var(--color-primary)] mb-6" />
              <h2
                className="text-[2.5rem] font-bold text-[var(--color-text)] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Vive la experiencia
                <br />
                The Market Gourmet
              </h2>
              <p className="text-[var(--color-muted)] text-base mb-8 leading-relaxed">
                Descubre nuestra selección de productos premium, bebidas y accesorios gastronómicos
                cuidadosamente curados para los amantes del buen comer.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)] px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer"
              >
                Explorar la tienda
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
