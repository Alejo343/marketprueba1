import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";

const horarios = [
  { dia: "Lunes", horas: "10:00 a.m. – 10:00 p.m." },
  { dia: "Martes", horas: "10:00 a.m. – 10:00 p.m." },
  { dia: "Miércoles", horas: "10:00 a.m. – 10:00 p.m." },
  { dia: "Jueves", horas: "10:00 a.m. – 10:00 p.m." },
  { dia: "Viernes", horas: "10:00 a.m. – 2:00 a.m." },
  { dia: "Sábado", horas: "10:00 a.m. – 2:00 a.m." },
  { dia: "Domingo", horas: "10:00 a.m. – 6:00 p.m." },
];

const today = new Date().toLocaleDateString("es-CO", { weekday: "long" });
const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

export default function ContactanosPage() {
  return (
    <div
      className="min-h-screen bg-[var(--color-bg)] pt-30"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[var(--color-primary)]/6 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Estamos para atenderte
          </span>
          <h1
            className="text-[3rem] md:text-[4rem] font-bold text-[var(--color-text)] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Contáctanos
          </h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-xl mx-auto">
            Visítanos en nuestra tienda en Cali o escríbenos por cualquiera de nuestros canales.
          </p>
        </div>
      </section>

      {/* Contacto + Horarios */}
      <section className="py-16 bg-[var(--color-subtle-bg)] border-y border-[var(--color-primary)]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Info de contacto */}
            <div className="space-y-4">
              <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.2em] uppercase block mb-6">
                Información de contacto
              </span>

              {/* WhatsApp / Teléfono */}
              <a
                href="https://wa.me/573155927944"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-[var(--color-surface)] border border-[var(--color-primary)]/15 rounded-xl p-5 hover:border-[var(--color-primary)]/50 transition-all duration-300 group"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.39 2 2 0 0 1 3.55 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[var(--color-text)] font-semibold text-sm mb-0.5">WhatsApp / Teléfono</p>
                  <p className="text-[var(--color-primary)] text-base font-bold">+57 315 592 7944</p>
                  <p className="text-[var(--color-muted)] text-xs mt-1">Toca para abrir WhatsApp</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:contacto@themarketgourmet.com"
                className="flex items-start gap-4 bg-[var(--color-surface)] border border-[var(--color-primary)]/15 rounded-xl p-5 hover:border-[var(--color-primary)]/50 transition-all duration-300 group"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[var(--color-text)] font-semibold text-sm mb-0.5">Correo electrónico</p>
                  <p className="text-[var(--color-primary)] text-sm font-bold">contacto@themarketgourmet.com</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/themarketgourmet.cali/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-[var(--color-surface)] border border-[var(--color-primary)]/15 rounded-xl p-5 hover:border-[var(--color-primary)]/50 transition-all duration-300 group"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="var(--color-primary)" />
                  </svg>
                </div>
                <div>
                  <p className="text-[var(--color-text)] font-semibold text-sm mb-0.5">Instagram</p>
                  <p className="text-[var(--color-primary)] text-sm font-bold">@themarketgourmet.cali</p>
                </div>
              </a>

              {/* Dirección */}
              <a
                href="https://maps.google.com/?q=Cl.+17+Nte.+%239N-77,+Santa+Monica+Residential,+Cali,+Valle+del+Cauca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-[var(--color-surface)] border border-[var(--color-primary)]/15 rounded-xl p-5 hover:border-[var(--color-primary)]/50 transition-all duration-300 group"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[var(--color-text)] font-semibold text-sm mb-0.5">Dirección</p>
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                    Cl. 17 Nte. #9N-77, Santa Monica Residential<br />
                    Cali, Valle del Cauca
                  </p>
                  <p className="text-[var(--color-primary)] text-xs mt-1.5 font-medium">Ver en Google Maps →</p>
                </div>
              </a>
            </div>

            {/* Horarios */}
            <div>
              <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.2em] uppercase block mb-6">
                Horarios de atención
              </span>
              <div className="bg-[var(--color-surface)] border border-[var(--color-primary)]/15 rounded-xl overflow-hidden">
                {horarios.map((h, i) => {
                  const isToday = h.dia === todayCapitalized;
                  return (
                    <div
                      key={h.dia}
                      className={`flex items-center justify-between px-5 py-3.5 ${
                        i < horarios.length - 1 ? "border-b border-[var(--color-primary)]/8" : ""
                      } ${isToday ? "bg-[var(--color-primary)]/8" : ""}`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            isToday
                              ? "text-[var(--color-primary)]"
                              : "text-[var(--color-text)]"
                          } ${!isToday ? "ml-4" : ""}`}
                        >
                          {h.dia}
                        </span>
                      </div>
                      <span
                        className={`text-sm ${
                          isToday
                            ? "text-[var(--color-primary)] font-semibold"
                            : "text-[var(--color-muted)]"
                        }`}
                      >
                        {h.horas}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[var(--color-muted)] text-xs mt-3 px-1">
                * Viernes y sábado con horario extendido hasta las 2:00 a.m.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Mapa embed */}
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="text-[1.75rem] font-bold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Encuéntranos aquí
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[var(--color-primary)]/20 h-[380px]">
            <iframe
              title="Ubicación The Market Gourmet"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.523!2d-76.532!3d3.465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCl.+17+Nte.+%239N-77%2C+Santa+Monica+Residential%2C+Cali!5e0!3m2!1ses!2sco!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
