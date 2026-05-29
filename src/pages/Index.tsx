import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import CrisisOrb from "@/components/CrisisOrb";

const DOCTOR_IMG = "https://cdn.poehali.dev/projects/f2d47d20-918c-4a35-b96c-bc037db5c753/files/9892e090-1522-4ee3-a0ad-f2daa2cbbd09.jpg";

const CALL_BTN = "linear-gradient(95deg, #2A7A4B, #1E5F3A)";
const CALL_SHADOW = "0 8px 32px rgba(42,122,75,0.35)";
const PAGE_BG = "linear-gradient(145deg, #FFFFFF, #F5F8FE)";

const services = [
  "Мягкий вывод из запоя",
  "Купирование последствий отмены любых психоактивных веществ",
  "Неврозы",
  "Навязчивые состояния",
  "Бессонница",
  "Консультации дома",
  "Помощь на дому",
  "Капельницы",
  "Базовые обследования",
  "Кислород",
  "Встреча пациента в аэропорту (лечение в пути)",
  "При необходимости госпитализация в стационар по выбору",
  "Анонимно",
  "Мы не передаём данные",
];

const specialties = [
  { label: "КРИЗИС", crisis: true },
  { label: "ДЕТОКС", crisis: false },
  { label: "ВЫВОД ИЗ ЗАПОЯ", crisis: false },
  { label: "Купирование последствий приёма любых ПАВ", crisis: false },
  { label: "НЕВРОЗЫ", crisis: true },
  { label: "ТРЕВОГА", crisis: false },
  { label: "ДЕПРЕССИЯ", crisis: false },
  { label: "ОКР", crisis: false },
  { label: "ПТСР", crisis: true },
];

const faqs = [
  { q: "Вы действительно анонимны?", a: "Да. Мы не запрашиваем паспорт, не передаём данные третьим лицам, не ставим на учёт. Ваши данные — только у вас." },
  { q: "Как быстро приедет врач?", a: "Среднее время прибытия по Москве и МО — от 30 до 60 минут в зависимости от трафика и удалённости." },
  { q: "Можно вызвать врача не для себя, а для близкого?", a: "Да. Вы можете позвонить от имени родственника или друга. Расскажите ситуацию — мы подберём правильный подход." },
  { q: "Какие препараты вы используете?", a: "Мы работаем только с лицензированными препаратами. Все врачи имеют допуски и необходимые разрешения." },
  { q: "Что если нужна госпитализация?", a: "Если домашние условия не позволяют помочь — организуем госпитализацию: вызовем городскую скорую или сами отвезём в клинику по вашему выбору." },
  { q: "Работаете ли вы за пределами Москвы?", a: "Да, работаем по всей Московской области. Также встречаем пациентов в аэропортах." },
];

// ─── Glassmorphism card style ───────────────────────────────────────────────
const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.4)",
  boxShadow: "0 8px 32px rgba(14,31,50,0.08), inset 0 0 0 1px rgba(255,255,255,0.5)",
  borderRadius: "24px",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function FadeSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-px bg-[#B8965A]" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#B8965A]" />
      <div className="w-6 h-px bg-[#B8965A]" />
    </div>
  );
}

function BrainWave() {
  const bars = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.45, 0.95, 0.55];
  return (
    <div className="flex items-end gap-1 h-10">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1 rounded-full"
          style={{
            height: `${h * 100}%`,
            background: "linear-gradient(to top, #E86A3F, #FF9B6B)",
            animation: "brainwave 1.4s ease-in-out infinite",
            animationDelay: `${i * 0.12}s`,
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div key={i} style={{ ...glass, borderRadius: "16px" }} className="overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/60 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-manrope font-semibold text-[#1A2A3A] text-base pr-4">{item.q}</span>
            <span className={`transition-transform duration-300 flex-shrink-0 ${open === i ? "rotate-45" : ""}`}>
              <Icon name="Plus" size={20} className="text-[#2A7A4B]" />
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
            <p className="px-6 pb-5 font-inter text-[#6B7E8F] leading-relaxed text-sm">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Call popup ───────────────────────────────────────────────────────────────
function CallPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(13,31,45,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-8 animate-fade-in-up"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow: "0 32px 80px rgba(14,31,50,0.22), inset 0 0 0 1px rgba(255,255,255,0.6)",
          borderRadius: "28px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-black/8"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          <Icon name="X" size={17} className="text-[#1A2A3A]/70" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#E86A3F] animate-pulse" style={{ boxShadow: "0 0 8px #E86A3F" }} />
          <span className="text-[#E86A3F] text-xs font-semibold tracking-[0.18em] uppercase">Срочный вызов</span>
        </div>
        <h3 className="font-manrope font-extrabold text-[#1A2A3A] text-2xl mb-2">Заказать звонок</h3>
        <p className="font-inter text-[#6B7E8F] text-sm mb-6">Оставьте номер — перезвоним в течение 2 минут. Анонимно.</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full px-5 py-3.5 rounded-xl bg-white/70 border border-white/60 text-[#1A2A3A] placeholder-[#6B7E8F]/60 outline-none focus:border-[#2A7A4B]/50 transition-colors font-inter text-sm"
            style={{ backdropFilter: "blur(8px)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          />
          <input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            className="w-full px-5 py-3.5 rounded-xl bg-white/70 border border-white/60 text-[#1A2A3A] placeholder-[#6B7E8F]/60 outline-none focus:border-[#2A7A4B]/50 transition-colors font-inter text-sm"
            style={{ backdropFilter: "blur(8px)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 text-white py-4 rounded-xl font-manrope font-bold text-base transition-all active:scale-95 hover:brightness-110"
            style={{ background: CALL_BTN, boxShadow: CALL_SHADOW }}
          >
            <Icon name="Phone" size={18} className="text-white" />
            Перезвоните мне
          </button>
        </form>
        <p className="text-center text-[#6B7E8F]/60 text-xs mt-4 font-inter">Нажимая, вы соглашаетесь с политикой конфиденциальности</p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-inter text-[#1A2A3A] min-h-screen" style={{ background: PAGE_BG }}>

      <CallPopup open={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        style={scrolled ? {
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 4px 24px rgba(14,31,50,0.08)",
        } : { background: "transparent" }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2A7A4B,#1E5F3A)" }}>
              <Icon name="Plus" size={16} className="text-white" />
            </div>
            <span className={`font-manrope font-bold text-lg tracking-tight transition-colors ${scrolled ? "text-[#1A2A3A]" : "text-white"}`}>АЛЬЯНС-М</span>
          </div>
          <nav className={`hidden md:flex items-center gap-6 text-sm font-medium transition-colors ${scrolled ? "text-[#1A2A3A]/70" : "text-white/60"}`}>
            {["#services:Услуги", "#about:О нас", "#relatives:Родственникам", "#faq:Вопросы"].map(s => {
              const [href, label] = s.split(":");
              return <a key={href} href={href} className="hover:text-[#2A7A4B] transition-colors">{label}</a>;
            })}
          </nav>
          <button
            onClick={() => setPopupOpen(true)}
            className="hidden md:flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
            style={{ background: CALL_BTN, boxShadow: "0 4px 16px rgba(42,122,75,0.3)" }}
          >
            <Icon name="Phone" size={14} className="text-white" />
            Позвонить
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[#0D1F2D]" />
        <div className="absolute inset-0 opacity-12 bg-cover bg-center" style={{ backgroundImage: `url(${DOCTOR_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F2D] via-[#0D1F2D]/85 to-[#0D1F2D]/40" />
        <div className="absolute inset-0 noise-bg-dark opacity-50" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(232,106,63,0.15) 0%, transparent 65%)" }} />

        {/* 3D ORB → CROSS */}
        <div className="absolute right-[-4%] md:right-[4%] top-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[460px] md:h-[460px] opacity-90 pointer-events-none">
          <CrisisOrb />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-36 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
              <div className="w-8 h-px bg-[#E86A3F]" />
              <span className="text-[#E86A3F] text-xs font-semibold tracking-[0.2em] uppercase">Выезд 24 / 7 · Анонимно · Москва и МО</span>
            </div>

            <h1 className="font-manrope font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight mb-6 animate-fade-in-up delay-100">
              КОММЕРЧЕСКАЯ<br />
              <span style={{ color: "#E86A3F" }}>СПЕЦИАЛИЗИРОВАННАЯ</span><br />
              СКОРАЯ ПОМОЩЬ
            </h1>

            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-inter animate-fade-in-up delay-200">
              Круглосуточная помощь при запоях, потере контроля, нервных срывах,
              навязчивых и тревожных состояниях, депрессиях, неврозах.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button
                onClick={() => setPopupOpen(true)}
                className="flex items-center justify-center gap-3 text-white px-8 py-4 rounded-2xl text-base font-manrope font-bold transition-all hover:brightness-110 active:scale-95"
                style={{ background: CALL_BTN, boxShadow: CALL_SHADOW }}
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white/30 animate-pulse-ring" />
                  <Icon name="Phone" size={18} className="text-white relative z-10" />
                </span>
                Позвонить сейчас
              </button>
              <a
                href="#chat"
                className="flex items-center justify-center gap-3 border text-white px-8 py-4 rounded-2xl text-base font-manrope font-semibold transition-all hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.15)" }}
              >
                <Icon name="MessageCircle" size={20} className="text-white/70" />
                Начать чат
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-8 mt-14 animate-fade-in-up delay-400">
              {[
                { icon: "ShieldCheck", label: "Лицензировано" },
                { icon: "Lock", label: "Анонимно" },
                { icon: "Clock", label: "Выезд 24/7" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/40 text-sm">
                  <Icon name={item.icon} size={15} style={{ color: "#E86A3F" }} fallback="Check" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
          <Icon name="ChevronDown" size={22} className="text-white/20" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 px-4 md:px-8" style={{ background: PAGE_BG }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <GoldDivider />
            <p className="font-manrope font-semibold text-[#2A7A4B] text-xs uppercase tracking-[0.18em] mb-2">Услуги</p>
            <h2 className="font-manrope font-extrabold text-[#1A2A3A] text-3xl md:text-4xl mb-12">Чем мы помогаем</h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <FadeSection key={i} delay={(i % 3) * 80}>
                <div
                  style={glass}
                  className="p-5 flex items-start gap-4 hover:shadow-xl transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform"
                    style={{ background: "linear-gradient(135deg,rgba(42,122,75,0.15),rgba(42,122,75,0.05))" }}>
                    <Icon name="Check" size={13} style={{ color: "#2A7A4B" }} />
                  </div>
                  <span className="font-inter text-[#1A2A3A] text-sm leading-snug">{service}</span>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALTIES GRID + BRAINWAVE */}
      <section className="py-16 px-4 md:px-8" style={{ background: "linear-gradient(145deg, #1A2E3F, #0F212F)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#E86A3F]/50" />
                <p className="font-manrope font-semibold text-[#E86A3F]/70 text-xs uppercase tracking-[0.2em]">Кризисные состояния</p>
                <div className="w-8 h-px bg-[#E86A3F]/50" />
              </div>
              <BrainWave />
            </div>
          </FadeSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {specialties.map((s, i) => (
              <FadeSection key={i} delay={i * 60}>
                <div
                  className={`rounded-2xl px-5 py-6 flex items-center justify-center text-center min-h-[80px] border transition-all duration-200 ${
                    s.crisis ? "hover-shake animate-crisis-pulse" : "hover:scale-[1.02]"
                  }`}
                  style={{
                    background: "linear-gradient(145deg, #1A2E3F, #0F212F)",
                    borderColor: s.crisis ? "rgba(232,106,63,0.5)" : "rgba(42,122,75,0.25)",
                    boxShadow: s.crisis ? "inset 0 0 0 1px rgba(232,106,63,0.1)" : "none",
                  }}
                >
                  <span className="font-manrope font-bold text-white text-sm md:text-base uppercase tracking-wide leading-tight">
                    {s.label}
                  </span>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28 px-4 md:px-8" style={{ background: PAGE_BG }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <GoldDivider />
            <p className="font-manrope font-semibold text-[#2A7A4B] text-xs uppercase tracking-[0.18em] mb-2">О нас</p>
            <h2 className="font-manrope font-extrabold text-[#1A2A3A] text-3xl md:text-4xl mb-12">АЛЬЯНС-М</h2>
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {[
                "Мы коммерческая скорая помощь нового поколения. Допуски и лицензии на все препараты, кислород, опытные врачи. Не мотивированы коммерческой выгодой, действуем исходя из ценности Жизни и ваших возможностей.",
                "АЛЬЯНС-М — переосмысление скорой помощи на дому. Современный подход, сотрудничество с бесплатными и платными клиниками.",
                "Отдельное внимание малой психиатрии: неврозы, депрессивные эпизоды, ОКР, БАР, ПТСР. Консультируем на дому в тишине, не осуждаем. Помогаем на месте, даём экспертный взгляд и пути решения.",
              ].map((text, i) => (
                <FadeSection key={i} delay={i * 100}>
                  <p className="font-inter text-[#6B7E8F] leading-relaxed text-base border-l-2 pl-5" style={{ borderColor: "rgba(42,122,75,0.4)" }}>
                    {text}
                  </p>
                </FadeSection>
              ))}
            </div>

            <div className="space-y-5">
              {/* Зависимости */}
              <FadeSection delay={100}>
                <div style={glass} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#E86A3F,#FF8254)" }}>
                      <Icon name="Zap" size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-manrope font-bold text-[#1A2A3A] mb-2">Зависимости</h3>
                      <p className="font-inter text-[#6B7E8F] text-sm leading-relaxed">Мягко выводим из запоя, снимаем напряжённость, купируем влечение к алкоголю и другим ПАВ.</p>
                    </div>
                  </div>
                </div>
              </FadeSection>

              {/* Госпитализация */}
              <FadeSection delay={200}>
                <div style={glass} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#2A7A4B,#1E5F3A)" }}>
                      <Icon name="Truck" size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-manrope font-bold text-[#1A2A3A] mb-2">Госпитализация</h3>
                      <p className="font-inter text-[#6B7E8F] text-sm leading-relaxed">Если домашние условия не позволяют помочь или угроза жизни — организуем госпитализацию. Вызовем городскую скорую или сами доставим в клинику по профилю, по вашему выбору, вне зависимости от прописки.</p>
                    </div>
                  </div>
                </div>
              </FadeSection>

              {/* Анонимность — glassmorphism с градиентной рамкой */}
              <FadeSection delay={300}>
                <div
                  className="p-6 rounded-3xl"
                  style={{
                    background: "rgba(255,255,255,0.72)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1.5px solid transparent",
                    backgroundClip: "padding-box",
                    boxShadow: "0 8px 32px rgba(14,31,50,0.08), inset 0 0 0 1px rgba(255,255,255,0.55), 0 0 0 1.5px rgba(42,122,75,0.25)",
                    borderRadius: "24px",
                  }}
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { value: "24/7", label: "Выезд" },
                      { value: "100%", label: "Анонимно" },
                      { value: "МО", label: "Вся область" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="font-manrope font-extrabold text-2xl mb-1" style={{ color: "#2A7A4B" }}>{stat.value}</div>
                        <div className="font-inter text-[#6B7E8F] text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeSection>
            </div>
          </div>
        </div>
      </section>

      {/* RELATIVES */}
      <section id="relatives" className="py-20 md:py-28 px-4 md:px-8" style={{ background: "linear-gradient(145deg,#0D1F2D,#0F212F)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#E86A3F]" /><div className="w-1.5 h-1.5 rounded-full bg-[#E86A3F]" /><div className="w-6 h-px bg-[#E86A3F]" />
            </div>
            <p className="font-manrope font-semibold text-[#E86A3F] text-xs uppercase tracking-[0.18em] mb-2">Родственникам</p>
            <h2 className="font-manrope font-extrabold text-white text-3xl md:text-4xl mb-4">
              Информация для родственников<br className="hidden md:block" /> или близких
            </h2>
            <p className="text-white/40 font-inter mb-12 text-base max-w-xl">Если вы звоните не для себя — это правильно. Мы работаем с вами напрямую.</p>
          </FadeSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              { icon: "ShieldAlert", title: "Без шума и белых халатов", text: "Приедем тихо, без давления. Прервём запой, снимем тревогу на месте.", hot: true },
              { icon: "Building2", title: "Выбор клиники за вами", text: "Если угроза жизни — предложим ГКБ или коммерческую клинику. Не уедем до приёма. Нет мест — подберём.", hot: false },
              { icon: "Plane", title: "Встреча в аэропорту", text: "Встретим в аэропорту, лечение в пути. Транспортировка в стационар по профилю в Москве и МО.", hot: true },
              { icon: "Lock", title: "Полная анонимность", text: "Без паспорта. Помощь полностью анонимна, не задаём лишних вопросов.", hot: false },
              { icon: "Heart", title: "Не судим, не торгуемся", text: "Мы здесь ради человека, а не ради дохода. Звоните — приедем.", hot: true },
              { icon: "Phone", title: "Звоните от чужого имени", text: "Можно позвонить за близкого. Расскажите ситуацию — мы подберём правильный подход.", hot: false },
            ].map((item, i) => (
              <FadeSection key={i} delay={(i % 3) * 100}>
                <div
                  className="p-6 h-full transition-all hover:scale-[1.01] duration-200"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: `1px solid ${item.hot ? "rgba(232,106,63,0.3)" : "rgba(255,255,255,0.1)"}`,
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                    borderRadius: "24px",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: item.hot ? "linear-gradient(135deg,#E86A3F,#FF8254)" : "linear-gradient(135deg,#2A7A4B,#1E5F3A)" }}>
                    <Icon name={item.icon} size={18} className="text-white" fallback="Check" />
                  </div>
                  <h3 className="font-manrope font-bold text-white mb-2 text-base">{item.title}</h3>
                  <p className="font-inter text-white/45 text-sm leading-relaxed">{item.text}</p>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection>
            <div
              className="p-8 text-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(232,106,63,0.3)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                borderRadius: "28px",
              }}
            >
              <p className="font-manrope font-bold text-white text-xl mb-2">Звоните — приедем.</p>
              <p className="font-inter text-white/45 text-sm mb-8">Не судим. Анонимно. Без паспорта.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setPopupOpen(true)}
                  className="flex items-center justify-center gap-3 text-white px-8 py-4 rounded-2xl font-manrope font-bold text-base transition-all hover:brightness-110"
                  style={{ background: CALL_BTN, boxShadow: CALL_SHADOW }}
                >
                  <Icon name="Phone" size={18} className="text-white" />
                  Позвонить от имени близкого человека
                </button>
                <a href="#chat" className="flex items-center justify-center gap-3 border text-white px-8 py-4 rounded-2xl font-manrope font-semibold text-base transition-all hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.15)" }}>
                  <Icon name="MessageCircle" size={18} className="text-white/70" />
                  Начать чат
                </a>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 px-4 md:px-8" style={{ background: PAGE_BG }}>
        <div className="max-w-3xl mx-auto">
          <FadeSection>
            <GoldDivider />
            <p className="font-manrope font-semibold text-[#2A7A4B] text-xs uppercase tracking-[0.18em] mb-2">Вопросы</p>
            <h2 className="font-manrope font-extrabold text-[#1A2A3A] text-3xl md:text-4xl mb-10">Частые вопросы</h2>
          </FadeSection>
          <FadeSection delay={120}>
            <FAQSection />
          </FadeSection>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contacts" className="py-20 md:py-24 px-4 md:px-8" style={{ background: "linear-gradient(145deg,#0D1F2D,#0F212F)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeSection>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#E86A3F]/50" />
              <span className="w-2 h-2 rounded-full bg-[#E86A3F] animate-pulse" style={{ boxShadow: "0 0 8px #E86A3F" }} />
              <div className="w-8 h-px bg-[#E86A3F]/50" />
            </div>
            <h2 className="font-manrope font-extrabold text-white text-3xl md:text-5xl mb-4 leading-tight">Нужна помощь?<br />Позвоните сейчас.</h2>
            <p className="text-white/40 font-inter text-base mb-10 max-w-lg mx-auto">Мы выслушаем, не осудим. Приедем в течение часа по Москве и области.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setPopupOpen(true)}
                className="flex items-center justify-center gap-3 text-white px-10 py-5 rounded-2xl font-manrope font-bold text-lg transition-all hover:brightness-110"
                style={{ background: CALL_BTN, boxShadow: "0 10px 40px rgba(42,122,75,0.4)" }}
              >
                <Icon name="Phone" size={22} className="text-white" />
                Позвонить
              </button>
              <a href="#chat" className="flex items-center justify-center gap-3 border text-white px-10 py-5 rounded-2xl font-manrope font-semibold text-lg transition-all hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.15)" }}>
                <Icon name="MessageCircle" size={22} className="text-white/70" />
                Начать онлайн-консультацию
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="text-white/30 py-10 px-4 md:px-8"
        style={{ background: "linear-gradient(95deg, #17212D, #0E1722)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2A7A4B,#1E5F3A)" }}>
                <Icon name="Plus" size={14} className="text-white" />
              </div>
              <span className="font-manrope font-bold text-white/80 text-base">АЛЬЯНС-М</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs font-inter">
              <span className="flex items-center gap-1.5"><Icon name="Clock" size={12} className="text-white/25" />Выезд 24/7</span>
              <span className="flex items-center gap-1.5"><Icon name="Lock" size={12} className="text-white/25" />Анонимно</span>
              <span className="flex items-center gap-1.5"><Icon name="ShieldOff" size={12} className="text-white/25" />Мы не передаём данные</span>
            </div>
            <a href="#" className="text-xs font-inter hover:text-white/60 transition-colors">Политика конфиденциальности</a>
          </div>
          <div className="border-t border-white/8 mt-8 pt-6 text-center text-xs">© 2024 АЛЬЯНС-М. Все права защищены.</div>
        </div>
      </footer>

      {/* FLOATING CALL BUTTON — glassmorphism */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <button
          onClick={() => setPopupOpen(true)}
          className="flex items-center gap-3 text-white px-8 py-4 rounded-full font-manrope font-bold text-base transition-all active:scale-95"
          style={{
            background: "rgba(42,122,75,0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(42,122,75,0.45), inset 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white/30 animate-pulse-ring" />
            <Icon name="Phone" size={18} className="text-white relative z-10" />
          </span>
          Позвонить
        </button>
      </div>

    </div>
  );
}
