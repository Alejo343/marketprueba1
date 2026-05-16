import s from "./HeroSection.module.css";

const PASTELS = ["#f5dfc0", "#c0d5f5", "#c0f5dc", "#f5c0d5", "#f5f0c0"];

interface FranjaItem {
  label: string;
  href: string;
}

function OvalFranjas({ items }: { items: FranjaItem[] }) {
  return (
    <div className={s.oval}>
      {items.map(({ label, href }, i) => (
        <a
          key={label}
          href={href}
          className={s.franja}
          style={{ background: PASTELS[i % PASTELS.length] }}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

const cards = [
  {
    img: "/images/hero-tipo3/elemento1.png",
    logo: "/images/hero-tipo3/elemento1-logo.png",
    titulo: "/images/hero-tipo3/elemento1-titulo.png",
    franjas: [
      { label: "G.R USDA CHOICE",   href: "#" },
      { label: "Wagyu",             href: "#" },
      { label: "C.H.B UPPER CHOICE",href: "#" },
      { label: "Wagyu Puro",        href: "#" },
    ],
  },
  {
    img: "/images/hero-tipo3/elemento2.png",
    logo: "/images/hero-tipo3/elemento2-logo.png",
    titulo: "/images/hero-tipo3/elemento2-titulo.png",
    franjas: [
      { label: "Utensilios", href: "#" },
      { label: "Accesorios", href: "#" },
    ],
  },
  {
    img: "/images/hero-tipo3/elemento3.png",
    logo: "/images/hero-tipo3/elemento3-logo.png",
    titulo: "/images/hero-tipo3/elemento3-titulo.png",
    franjas: [
      { label: "Licores",      href: "#" },
      { label: "Agua",         href: "#" },
      { label: "Energizantes", href: "#" },
    ],
  },
  {
    img: "/images/hero-tipo3/elemento4.png",
    logo: "/images/hero-tipo3/elemento4-logo.png",
    titulo: "/images/hero-tipo3/elemento4-titulo.png",
    franjas: [
      { label: "Especias", href: "#" },
      { label: "Salsas",   href: "#" },
    ],
  },
];

export default function HeroSection() {
  return (
    <section className={s.section}>
      <div
        className={s.heroBg}
        style={{ backgroundImage: 'url("/images/hero-fondo.png")' }}
      />
      <div className={s.content}>
        <img
          src="/images/hero-titulo.png"
          alt="Gourmet título"
          className={s.titleImg}
        />
        <p className={s.sub}>
          Productos selectos para los verdaderos apasionados
          <br />
          del buen sabor
        </p>
        <div className={s.elementos}>
          {cards.map((card) => (
            <div key={card.img} className={s.card}>
              <div className={s.circuloWrap}>
                <div
                  className={s.circulo}
                  style={{ backgroundImage: `url("${card.img}")` }}
                />
                <OvalFranjas items={card.franjas} />
              </div>
              <img src={card.logo}   className={s.cardLogo}   alt="" />
              <img src={card.titulo} className={s.cardTitulo} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
