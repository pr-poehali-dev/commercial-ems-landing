import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const DOCTOR_IMG = "https://cdn.poehali.dev/projects/f2d47d20-918c-4a35-b96c-bc037db5c753/files/9892e090-1522-4ee3-a0ad-f2daa2cbbd09.jpg";

// Premium palette
// --navy:   #0D1F2D  (deep background)
// --slate:  #1A2F40  (cards on dark)
// --ocean:  #1E4A6B  (trust accent)
// --gold:   #B8965A  (premium accent)
// --goldLt: #D4B07A  (hover / light gold)
// --fog:    #F2F5F8  (light section bg)
// --ink:    #1A2A3A  (body text)
// --mist:   #6B7E8F  (secondary text)

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
  { label: "КРИЗИС", bg: "#1A2F40", border: "#B8965A" },
  { label: "ДЕТОКС", bg: "#1E4A6B", border: "#1E4A6B" },
  { label: "ВЫВОД ИЗ ЗАПОЯ", bg: "#0D1F2D", border: "#B8965A" },
  { label: "Купирование последствий приёма любых ПАВ", bg: "#1E4A6B", border: "#1E4A6B" },
  { label: "НЕВРОЗЫ", bg: "#1A2F40", border: "#B8965A" },
  { label: "ТРЕВОГА", bg: "#0D1F2D", border: "#0D1F2D" },
  { label: "ДЕПРЕССИЯ", bg: "#0D1F2D", border: "#0D1F2D" },
  { label: "ОКР", bg: "#1E4A6B", border: "#1E4A6B" },
  { label: "ПТСР", bg: "#1A2F40", border: "#B8965A" },
];

const faqs = [
  {
    q: "Вы действительно анонимны?",
    a: "Да. Мы не запрашиваем паспорт, не передаём данные третьим лицам, не ставим на учёт. Ваши данные — только у вас.",
  },
  {
    q: "Как быстро приедет врач?",
    a: "Среднее время прибытия по Москве и МО — от 30 до 60 минут в зависимости от трафика и удалённости.",
  },
  {
    q: "Можно вызвать врача не для себя, а для близкого?",
    a: "Да. Вы можете позвонить от имени родственника или друга. Расскажите ситуацию — мы подберём правильный подход.",
  },
  {
    q: "Какие препараты вы используете?",
    a: "Мы работаем только с лицензированными препаратами. Все врачи имеют допуски и необходимые разрешения.",
  },
  {
    q: "Что если нужна госпитализация?",
    a: "Если домашние условия не позволяют помочь — организуем госпитализацию: вызовем городскую скорую или сами отвезём в клинику по вашему выбору.",
  },
  {
    q: "Работаете ли вы за пределами Москвы?",
    a: "Да, работаем по всей Московской области. Также встречаем пациентов в аэропортах.",
  },
];

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

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
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

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div key={i} className="border border-[#1E4A6B]/20 rounded-2xl overflow-hidden bg-white">
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#F2F5F8] transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-manrope font-semibold text-[#1A2A3A] text-base pr-4">{item.q}</span>
            <span className={`transition-transform duration-300 flex-shrink-0 ${open === i ? "rotate-45" : ""}`}>
              <Icon name="Plus" size={20} className="text-[#B8965A]" />
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

export default function Index() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-inter bg-[#F2F5F8] text-[#1A2A3A] min-h-screen">

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0D1F2D]/97 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#B8965A] flex items-center justify-center">
              <Icon name="Plus" size={16} className="text-white" />
            </div>
            <span className="font-manrope font-bold text-white text-lg tracking-tight">АЛЬЯНС-М</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
            <a href="#services" className="hover:text-[#D4B07A] transition-colors">Услуги</a>
            <a href="#about" className="hover:text-[#D4B07A] transition-colors">О нас</a>
            <a href="#relatives" className="hover:text-[#D4B07A] transition-colors">Родственникам</a>
            <a href="#faq" className="hover:text-[#D4B07A] transition-colors">Вопросы</a>
          </nav>
          <a
            href="tel:+7"
            className="hidden md:flex items-center gap-2 bg-[#B8965A] hover:bg-[#D4B07A] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Icon name="Phone" size={14} className="text-white" />
            Позвонить
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[#0D1F2D]" />
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: `url(${DOCTOR_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F2D] via-[#0D1F2D]/80 to-[#0D1F2D]/30" />
        {/* subtle gold grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(184,150,90,0.4) 2px, rgba(184,150,90,0.4) 3px)"
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-36 w-full">
          <div className="max-w-3xl">
            {/* gold eyebrow */}
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
              <div className="w-8 h-px bg-[#B8965A]" />
              <span className="text-[#B8965A] text-xs font-semibold tracking-[0.2em] uppercase">Выезд 24 / 7 · Анонимно · Москва и МО</span>
            </div>

            <h1 className="font-manrope font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight mb-6 animate-fade-in-up delay-100">
              КОММЕРЧЕСКАЯ<br />
              <span style={{ color: "#B8965A" }}>СПЕЦИАЛИЗИРОВАННАЯ</span><br />
              СКОРАЯ ПОМОЩЬ
            </h1>

            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-inter animate-fade-in-up delay-200">
              Круглосуточная помощь при запоях, потере контроля, нервных срывах,
              навязчивых и тревожных состояниях, депрессиях, неврозах.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <a
                href="tel:+7"
                className="flex items-center justify-center gap-3 text-white px-8 py-4 rounded-2xl text-base font-manrope font-bold transition-all"
                style={{ background: "linear-gradient(135deg, #B8965A 0%, #D4B07A 100%)", boxShadow: "0 8px 32px rgba(184,150,90,0.35)" }}
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white/30 animate-pulse-ring" />
                  <Icon name="Phone" size={18} className="text-white relative z-10" />
                </span>
                Позвонить сейчас
              </a>
              <a
                href="#chat"
                className="flex items-center justify-center gap-3 bg-white/8 hover:bg-white/14 border border-white/15 text-white px-8 py-4 rounded-2xl text-base font-manrope font-semibold transition-all"
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
                  <Icon name={item.icon} size={15} style={{ color: "#B8965A" }} fallback="Check" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <Icon name="ChevronDown" size={22} className="text-white/20" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 px-4 md:px-8 bg-[#F2F5F8]">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <GoldDivider />
            <p className="font-manrope font-semibold text-[#B8965A] text-xs uppercase tracking-[0.18em] mb-2">Услуги</p>
            <h2 className="font-manrope font-extrabold text-[#1A2A3A] text-3xl md:text-4xl mb-12">
              Чем мы помогаем
            </h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <FadeSection key={i}>
                <div className="bg-white rounded-2xl p-5 flex items-start gap-4 border border-[#1E4A6B]/8 hover:border-[#B8965A]/40 hover:shadow-md transition-all duration-200 group">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform"
                    style={{ background: "linear-gradient(135deg, #B8965A22 0%, #1E4A6B18 100%)" }}>
                    <Icon name="Check" size={13} style={{ color: "#B8965A" }} />
                  </div>
                  <span className="font-inter text-[#1A2A3A] text-sm leading-snug">{service}</span>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALTIES GRID */}
      <section className="py-16 px-4 md:px-8 bg-[#0D1F2D]">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="flex items-center gap-3 mb-10 justify-center">
              <div className="w-8 h-px bg-[#B8965A]/50" />
              <p className="font-manrope font-semibold text-[#B8965A]/60 text-xs uppercase tracking-[0.2em]">
                Направления помощи
              </p>
              <div className="w-8 h-px bg-[#B8965A]/50" />
            </div>
          </FadeSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {specialties.map((s, i) => (
              <FadeSection key={i}>
                <div
                  className="rounded-2xl px-5 py-6 flex items-center justify-center text-center min-h-[80px] border transition-all hover:scale-[1.02] duration-200"
                  style={{ backgroundColor: s.bg, borderColor: s.border + "40" }}
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
      <section id="about" className="py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <GoldDivider />
            <p className="font-manrope font-semibold text-[#B8965A] text-xs uppercase tracking-[0.18em] mb-2">О нас</p>
            <h2 className="font-manrope font-extrabold text-[#1A2A3A] text-3xl md:text-4xl mb-12">
              АЛЬЯНС-М
            </h2>
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {[
                "Мы коммерческая скорая помощь нового поколения. Допуски и лицензии на все препараты, кислород, опытные врачи. Не мотивированы коммерческой выгодой, действуем исходя из ценности Жизни и ваших возможностей.",
                "АЛЬЯНС-М — переосмысление скорой помощи на дому. Современный подход, сотрудничество с бесплатными и платными клиниками.",
                "Отдельное внимание малой психиатрии: неврозы, депрессивные эпизоды, ОКР, БАР, ПТСР. Консультируем на дому в тишине, не осуждаем. Помогаем на месте, даём экспертный взгляд и пути решения.",
              ].map((text, i) => (
                <FadeSection key={i}>
                  <p className="font-inter text-[#6B7E8F] leading-relaxed text-base border-l-2 pl-5"
                    style={{ borderColor: "#B8965A55" }}>
                    {text}
                  </p>
                </FadeSection>
              ))}
            </div>

            <div className="space-y-5">
              <FadeSection>
                <div className="rounded-2xl p-6 border border-[#1E4A6B]/12" style={{ background: "linear-gradient(135deg, #0D1F2D08 0%, #1E4A6B06 100%)" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #B8965A 0%, #D4B07A 100%)" }}>
                      <Icon name="Zap" size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-manrope font-bold text-[#1A2A3A] mb-2">Зависимости</h3>
                      <p className="font-inter text-[#6B7E8F] text-sm leading-relaxed">
                        Мягко выводим из запоя, снимаем напряжённость, купируем влечение к алкоголю и другим ПАВ.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeSection>

              <FadeSection>
                <div className="rounded-2xl p-6 border border-[#1E4A6B]/12" style={{ background: "linear-gradient(135deg, #0D1F2D08 0%, #1E4A6B06 100%)" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1E4A6B] flex items-center justify-center flex-shrink-0">
                      <Icon name="Truck" size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-manrope font-bold text-[#1A2A3A] mb-2">Госпитализация</h3>
                      <p className="font-inter text-[#6B7E8F] text-sm leading-relaxed">
                        Если домашние условия не позволяют помочь или угроза жизни — организуем госпитализацию. Вызовем городскую скорую или сами доставим в клинику по профилю, по вашему выбору, вне зависимости от прописки.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeSection>

              <FadeSection>
                <div className="bg-[#F2F5F8] rounded-2xl p-6 border border-[#1E4A6B]/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { value: "24/7", label: "Выезд" },
                      { value: "100%", label: "Анонимно" },
                      { value: "МО", label: "Вся область" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="font-manrope font-extrabold text-2xl mb-1" style={{ color: "#B8965A" }}>{stat.value}</div>
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
      <section id="relatives" className="py-20 md:py-28 px-4 md:px-8 bg-[#0D1F2D]">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#B8965A]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#B8965A]" />
              <div className="w-6 h-px bg-[#B8965A]" />
            </div>
            <p className="font-manrope font-semibold text-[#B8965A] text-xs uppercase tracking-[0.18em] mb-2">Родственникам</p>
            <h2 className="font-manrope font-extrabold text-white text-3xl md:text-4xl mb-4">
              Информация для родственников<br className="hidden md:block" /> или близких
            </h2>
            <p className="text-white/40 font-inter mb-12 text-base max-w-xl">
              Если вы звоните не для себя — это правильно. Мы работаем с вами напрямую.
            </p>
          </FadeSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: "ShieldAlert",
                title: "Без шума и белых халатов",
                text: "Приедем тихо, без давления. Прервём запой, снимем тревогу на месте.",
                gold: true,
              },
              {
                icon: "Building2",
                title: "Выбор клиники за вами",
                text: "Если угроза жизни — предложим ГКБ или коммерческую клинику. Не уедем до приёма. Нет мест — подберём.",
                gold: false,
              },
              {
                icon: "Plane",
                title: "Встреча в аэропорту",
                text: "Встретим в аэропорту, лечение в пути. Транспортировка в стационар по профилю в Москве и МО.",
                gold: true,
              },
              {
                icon: "Lock",
                title: "Полная анонимность",
                text: "Без паспорта. Помощь полностью анонимна, не задаём лишних вопросов.",
                gold: false,
              },
              {
                icon: "Heart",
                title: "Не судим, не торгуемся",
                text: "Мы здесь ради человека, а не ради дохода. Звоните — приедем.",
                gold: true,
              },
              {
                icon: "Phone",
                title: "Звоните от чужого имени",
                text: "Можно позвонить за близкого. Расскажите ситуацию — мы подберём правильный подход.",
                gold: false,
              },
            ].map((item, i) => (
              <FadeSection key={i}>
                <div className="rounded-2xl p-6 border h-full transition-all hover:border-[#B8965A]/30 duration-200"
                  style={{ backgroundColor: "#1A2F40", borderColor: item.gold ? "#B8965A30" : "#1E4A6B50" }}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: item.gold ? "linear-gradient(135deg,#B8965A 0%,#D4B07A 100%)" : "#1E4A6B" }}
                  >
                    <Icon name={item.icon} size={18} className="text-white" fallback="Check" />
                  </div>
                  <h3 className="font-manrope font-bold text-white mb-2 text-base">{item.title}</h3>
                  <p className="font-inter text-white/45 text-sm leading-relaxed">{item.text}</p>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection>
            <div className="rounded-2xl p-8 text-center border border-[#B8965A]/25"
              style={{ background: "linear-gradient(135deg, #1A2F40 0%, #1E3A52 100%)" }}>
              <p className="font-manrope font-bold text-white text-xl mb-2">
                Звоните — приедем.
              </p>
              <p className="font-inter text-white/45 text-sm mb-8">Не судим. Анонимно. Без паспорта.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+7"
                  className="flex items-center justify-center gap-3 text-white px-8 py-4 rounded-2xl font-manrope font-bold text-base transition-all"
                  style={{ background: "linear-gradient(135deg,#B8965A 0%,#D4B07A 100%)", boxShadow: "0 6px 24px rgba(184,150,90,0.3)" }}
                >
                  <Icon name="Phone" size={18} className="text-white" />
                  Позвонить от имени близкого человека
                </a>
                <a
                  href="#chat"
                  className="flex items-center justify-center gap-3 bg-white/8 hover:bg-white/14 border border-white/15 text-white px-8 py-4 rounded-2xl font-manrope font-semibold text-base transition-all"
                >
                  <Icon name="MessageCircle" size={18} className="text-white/70" />
                  Начать чат
                </a>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 px-4 md:px-8 bg-[#F2F5F8]">
        <div className="max-w-3xl mx-auto">
          <FadeSection>
            <GoldDivider />
            <p className="font-manrope font-semibold text-[#B8965A] text-xs uppercase tracking-[0.18em] mb-2">Вопросы</p>
            <h2 className="font-manrope font-extrabold text-[#1A2A3A] text-3xl md:text-4xl mb-10">
              Частые вопросы
            </h2>
          </FadeSection>
          <FadeSection>
            <FAQSection />
          </FadeSection>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contacts" className="py-20 md:py-24 px-4 md:px-8 bg-[#0D1F2D]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeSection>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#B8965A]/50" />
              <span className="w-2 h-2 rounded-full bg-[#B8965A]" style={{ boxShadow: "0 0 8px #B8965A" }} />
              <div className="w-8 h-px bg-[#B8965A]/50" />
            </div>
            <h2 className="font-manrope font-extrabold text-white text-3xl md:text-5xl mb-4 leading-tight">
              Нужна помощь?<br />Позвоните сейчас.
            </h2>
            <p className="text-white/40 font-inter text-base mb-10 max-w-lg mx-auto">
              Мы выслушаем, не осудим. Приедем в течение часа по Москве и области.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+7"
                className="flex items-center justify-center gap-3 text-white px-10 py-5 rounded-2xl font-manrope font-bold text-lg transition-all"
                style={{ background: "linear-gradient(135deg,#B8965A 0%,#D4B07A 100%)", boxShadow: "0 10px 40px rgba(184,150,90,0.35)" }}
              >
                <Icon name="Phone" size={22} className="text-white" />
                Позвонить
              </a>
              <a
                href="#chat"
                className="flex items-center justify-center gap-3 bg-white/8 hover:bg-white/14 border border-white/15 text-white px-10 py-5 rounded-2xl font-manrope font-semibold text-lg transition-all"
              >
                <Icon name="MessageCircle" size={22} className="text-white/70" />
                Начать онлайн-консультацию
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#07131C] text-white/30 py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#B8965A] flex items-center justify-center">
                <Icon name="Plus" size={14} className="text-white" />
              </div>
              <span className="font-manrope font-bold text-white/80 text-base">АЛЬЯНС-М</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs font-inter">
              <span className="flex items-center gap-1.5">
                <Icon name="Clock" size={12} className="text-white/25" />
                Выезд 24/7
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="Lock" size={12} className="text-white/25" />
                Анонимно
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="ShieldOff" size={12} className="text-white/25" />
                Мы не передаём данные
              </span>
            </div>
            <a href="#" className="text-xs font-inter hover:text-white/60 transition-colors">
              Политика конфиденциальности
            </a>
          </div>
          <div className="border-t border-white/8 mt-8 pt-6 text-center text-xs">
            © 2024 АЛЬЯНС-М. Все права защищены.
          </div>
        </div>
      </footer>

      {/* FLOATING CALL BUTTON — mobile only */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <a
          href="tel:+7"
          className="flex items-center gap-3 text-white px-8 py-4 rounded-full font-manrope font-bold text-base transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg,#B8965A 0%,#D4B07A 100%)", boxShadow: "0 8px 32px rgba(184,150,90,0.5)" }}
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white/25 animate-pulse-ring" />
            <Icon name="Phone" size={18} className="text-white relative z-10" />
          </span>
          Позвонить
        </a>
      </div>

    </div>
  );
}
