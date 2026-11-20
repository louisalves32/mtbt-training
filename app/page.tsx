"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Dumbbell, HeartPulse, Flame, Shield, Target, Zap, Move, Activity, Sparkles, User, Users, Sun, Moon, MapPin, Menu, X, MessageCircle, Instagram, Check, Play, ImageIcon, ChevronRight } from "lucide-react";

/* ====== CONFIG — modifier ici ====== */
const WA_NUMBER = "221771025509";
const INSTAGRAM = "https://www.instagram.com/mtbt_training?bqrl=MTZuaG44MXdxbzVubA==";
const TIKTOK = "https://www.tiktok.com/@mtbt__";
const PLACE = "Terrain Arsenal, derrière le CEM Mbao Kamb, à côté du Yendou Bi, Mbao, Dakar";
const MAPS_Q = encodeURIComponent(PLACE);
/** Galerie : remplacer src par "/gallery/photo1.jpg" (fichiers dans /public/gallery) */
const GALLERY: { src?: string; alt: string }[] = [
  { alt: "Séance collective" }, { alt: "Travail de vitesse" }, { alt: "Renforcement" },
  { alt: "Endurance" }, { alt: "Agilité" }, { alt: "Esprit d'équipe" },
];
/** Hero : mettre "/hero.jpg" (image dans /public) pour remplacer le fond */
const HERO_IMAGE: string | null = null;
/* =================================== */

const PROGRAMS = [
  { id: "Renforcement musculaire", icon: Dumbbell, d: "Développer la force et la masse musculaire." },
  { id: "Endurance", icon: HeartPulse, d: "Améliorer les capacités cardiovasculaires et tenir l'effort." },
  { id: "Perte de poids", icon: Flame, d: "Brûler des calories et améliorer la condition physique." },
  { id: "Résistance physique", icon: Shield, d: "Maintenir un effort intense ou prolongé." },
  { id: "Technique", icon: Target, d: "Travailler les mouvements, la coordination et la maîtrise des exercices." },
  { id: "Vitesse", icon: Zap, d: "Explosivité, accélération et rapidité." },
  { id: "Agilité & mobilité", icon: Move, d: "Souplesse, déplacements et mobilité corporelle." },
  { id: "Condition physique générale", icon: Activity, d: "Développer une condition physique complète." },
  { id: "Programme personnalisé", icon: Sparkles, d: "Précise ton propre objectif dans le formulaire." },
];
const SESSIONS = [
  { id: "Individuelle", icon: User, t: "Séance individuelle", d: "Coaching personnalisé, centré sur tes objectifs." },
  { id: "Collective", icon: Users, t: "Séance collective", d: "Entraînement en groupe, motivation et esprit d'équipe." },
];
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const LEVELS = ["Débutant", "Intermédiaire", "Avancé"];
const NAV = [["Programmes", "#programmes"], ["Séances", "#seances"], ["Tarif", "#tarif"], ["Réserver", "#reservation"], ["Lieu", "#lieu"], ["À propos", "#apropos"]];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
const Tag = ({ children }: { children: ReactNode }) => <p className="font-display font-bold uppercase tracking-[0.3em] text-accent mb-3">{children}</p>;
const Logo = ({ size = 40 }: { size?: number }) => (
  <span className="flex items-center gap-3">
    <span className="rounded-full overflow-hidden bg-black shrink-0" style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.jpeg" alt="" className="w-full h-full object-cover scale-[1.9] object-[50%_46%]" />
    </span>
    <span className="font-display font-extrabold italic text-2xl tracking-wide leading-none">MTBT <span className="font-semibold not-italic text-white/70 tracking-[0.25em] text-base">TRAINING</span></span>
  </span>
);

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [progs, setProgs] = useState<string[]>([]);
  const [session, setSession] = useState("");
  const [f, setF] = useState({ name: "", phone: "", day: "", slot: "", level: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof f, v: string) => { setF((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); setDone(false); };
  const toggle = (id: string) => { setProgs((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])); setErrors((e) => ({ ...e, progs: "" })); setDone(false); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 3) e.name = "Entre ton nom et prénom.";
    if (!/^\+?[0-9\s]{8,16}$/.test(f.phone.trim())) e.phone = "Numéro de téléphone invalide.";
    if (!progs.length) e.progs = "Choisis au moins un programme.";
    if (!session) e.session = "Choisis un type de séance.";
    if (!f.day) e.day = "Choisis un jour.";
    if (!f.slot) e.slot = "Choisis un horaire.";
    if (!f.level) e.level = "Choisis ton niveau.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) { setDone(true); setTimeout(() => document.getElementById("resume")?.scrollIntoView({ behavior: "smooth", block: "center" }), 80); }
    else setTimeout(() => document.querySelector("[data-err='1']")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };
  const message = `Bonjour MTBT Training ! Je souhaite réserver une séance d'entraînement.

Nom : ${f.name.trim()}
Téléphone : ${f.phone.trim()}
Programme : ${progs.join(", ")}
Type de séance : ${session}
Jour : ${f.day}
Horaire : ${f.slot}
Niveau : ${f.level}
Objectif / message : ${f.notes.trim() || "—"}

Je vous contacte pour confirmer ma réservation et connaître les disponibilités.`;
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const err = (k: string) => errors[k] ? <p role="alert" data-err="1" className="text-red-400 text-sm mt-2">{errors[k]}</p> : null;

  return (
    <>
      <a href="#programmes" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-ink focus:px-4 focus:py-2">Aller au contenu</a>
      <header className="fixed top-0 inset-x-0 z-50 bg-ink/80 backdrop-blur border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between" aria-label="Navigation principale">
          <a href="#top" aria-label="MTBT Training — accueil"><Logo /></a>
          <ul className="hidden lg:flex gap-8 font-display font-semibold uppercase tracking-wider">
            {NAV.map(([l, h]) => <li key={h}><a href={h} className="hover:text-accent transition">{l}</a></li>)}
          </ul>
          <a href="#reservation" className="btn btn-primary !py-2 hidden lg:inline-flex">Réserver</a>
          <button className="lg:hidden p-2" onClick={() => setMenu(!menu)} aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
        </nav>
        {menu && (
          <ul className="lg:hidden bg-ink border-t border-white/10 px-5 py-4 space-y-1 font-display text-2xl uppercase font-bold">
            {NAV.map(([l, h]) => <li key={h}><a href={h} onClick={() => setMenu(false)} className="block py-2 hover:text-accent">{l}</a></li>)}
          </ul>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden"
          style={HERO_IMAGE ? { backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/75 to-black/90" />
          {!HERO_IMAGE && <div className="absolute -right-40 top-1/4 w-[34rem] h-[34rem] rounded-full bg-accent/15 blur-[120px]" />}
          {!HERO_IMAGE && <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(115deg,#C6F000 0 2px,transparent 2px 60px)" }} />}
          <div className="relative max-w-6xl mx-auto px-5 py-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center w-full">
            <Reveal>
              <p className="font-display font-bold uppercase tracking-[0.35em] text-accent mb-4">MTBT Training · Coaching sportif</p>
              <h1 className="font-display font-extrabold uppercase leading-[0.92] text-6xl sm:text-7xl md:text-8xl">
                Ton corps.<br />Ton objectif.<br /><span className="text-accent">Ta discipline.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl">Repousse tes limites. Construis ta force. Transforme ton potentiel en performance.</p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <a href="#programmes" className="btn btn-primary">Choisir mon programme <ChevronRight size={20} /></a>
                <a href="#apropos" className="btn btn-ghost">Découvrir MTBT Training</a>
              </div>
            </Reveal>
            <Reveal className="hidden lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpeg" alt="Logo MTBT Training" className="w-full max-w-sm mx-auto rounded-full" />
            </Reveal>
          </div>
        </section>

        <section id="programmes" className="py-24 bg-coal scroll-mt-16">
          <div className="max-w-6xl mx-auto px-5">
            <Reveal><Tag>01 — Objectifs</Tag><h2 className="h2">Choisis ton programme</h2>
              <p className="mt-4 text-white/70 max-w-2xl">Sélectionne un ou plusieurs objectifs. Ils seront ajoutés à ta demande.</p></Reveal>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4" role="group" aria-label="Programmes">
              {PROGRAMS.map((p) => { const on = progs.includes(p.id); const I = p.icon; return (
                <Reveal key={p.id}>
                  <button type="button" onClick={() => toggle(p.id)} aria-pressed={on}
                    className={`relative w-full h-full text-left p-6 border-2 transition duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${on ? "border-accent bg-accent/10" : "border-white/10 bg-ink hover:border-white/40"}`}>
                    <span className={`absolute top-4 right-4 w-7 h-7 grid place-items-center border-2 ${on ? "bg-accent border-accent text-ink" : "border-white/30 text-transparent"}`}><Check size={16} strokeWidth={3} /></span>
                    <I size={36} className={on ? "text-accent" : "text-white"} />
                    <h3 className="font-display font-bold uppercase text-2xl mt-4">{p.id}</h3>
                    <p className="text-white/65 mt-1 text-sm">{p.d}</p>
                  </button>
                </Reveal>); })}
            </div>
            <p className="mt-6 font-display uppercase tracking-wider text-lg text-accent">{progs.length ? `${progs.length} objectif${progs.length > 1 ? "s" : ""} sélectionné${progs.length > 1 ? "s" : ""}` : "Aucun objectif sélectionné"}</p>

            <div className="mt-16">
              <Reveal><Tag>02 — Format</Tag><h2 className="h2 !text-4xl md:!text-5xl">Quel type d&apos;entraînement souhaites-tu ?</h2></Reveal>
              <div className="mt-8 grid md:grid-cols-2 gap-4" role="radiogroup" aria-label="Type de séance">
                {SESSIONS.map((s) => { const on = session === s.id; const I = s.icon; return (
                  <button key={s.id} type="button" role="radio" aria-checked={on} onClick={() => { setSession(s.id); setErrors((e) => ({ ...e, session: "" })); setDone(false); }}
                    className={`text-left p-7 border-2 flex gap-5 items-start transition duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${on ? "border-accent bg-accent/10" : "border-white/10 bg-ink hover:border-white/40"}`}>
                    <I size={40} className={on ? "text-accent" : ""} />
                    <span><span className="block font-display font-bold uppercase text-3xl">{s.t}</span><span className="text-white/65">{s.d}</span></span>
                  </button>); })}
              </div>
            </div>
          </div>
        </section>

        <section id="seances" className="py-24 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-5">
            <Reveal><Tag>Planning</Tag><h2 className="h2">Nos séances</h2><p className="mt-4 text-white/70">Entraînements du lundi au samedi.</p></Reveal>
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {[{ i: Sun, t: "Session du matin", h: "07h00 — 08h30" }, { i: Moon, t: "Session du soir", h: "17h00 — 18h30" }].map(({ i: I, t, h }) => (
                <Reveal key={t}><div className="p-8 bg-coal border-l-4 border-accent h-full"><I size={40} className="text-accent" /><h3 className="font-display font-bold uppercase text-2xl mt-4 text-white/70">{t}</h3><p className="font-display font-extrabold text-5xl mt-1">{h}</p><p className="text-white/60 mt-2">Lundi → Samedi</p></div></Reveal>
              ))}
              <Reveal><div className="p-8 border border-white/10 h-full"><Activity size={40} className="text-white/50" /><h3 className="font-display font-bold uppercase text-2xl mt-4 text-white/70">Dimanche</h3><p className="font-display font-extrabold text-5xl mt-1">Repos</p><p className="text-white/60 mt-2">Pas de séance programmée.</p></div></Reveal>
            </div>
          </div>
        </section>

        <section id="tarif" className="py-24 bg-accent text-ink scroll-mt-16">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <Reveal>
              <p className="font-display font-bold uppercase tracking-[0.3em]">Tarif</p>
              <p className="font-display font-extrabold leading-none text-8xl md:text-[10rem]">300 <span className="text-5xl md:text-7xl">FCFA / jour</span></p>
              <ul className="mt-6 space-y-1 text-lg font-semibold">
                <li>Séance payante · Tarif journalier : 300 FCFA</li>
                <li>Entraînement du lundi au samedi</li>
                <li>Séance individuelle ou collective selon ton choix</li>
              </ul>
              <a href="#reservation" className="btn bg-ink text-white hover:bg-white hover:text-ink mt-8">Réserver ma séance</a>
            </Reveal>
          </div>
        </section>

        <section id="reservation" className="py-24 bg-coal scroll-mt-16">
          <div className="max-w-3xl mx-auto px-5">
            <Reveal><Tag>03 — Réservation</Tag><h2 className="h2">Ta demande de séance</h2>
              <p className="mt-4 text-white/70">Aucun paiement en ligne. Ta demande est confirmée directement avec le coach sur WhatsApp.</p></Reveal>
            <form onSubmit={submit} noValidate className="mt-10 space-y-7">
              <div className="grid sm:grid-cols-2 gap-5">
                <div><label htmlFor="name" className="font-display uppercase tracking-wider font-semibold">Nom et prénom *</label>
                  <input id="name" className="field mt-2" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex : Moussa Ndiaye" autoComplete="name" />{err("name")}</div>
                <div><label htmlFor="phone" className="font-display uppercase tracking-wider font-semibold">Téléphone *</label>
                  <input id="phone" type="tel" inputMode="tel" className="field mt-2" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+221 77 000 00 00" autoComplete="tel" />{err("phone")}</div>
              </div>
              <div className="p-4 bg-ink border border-white/10 text-sm">
                <p className="font-display uppercase tracking-wider font-semibold text-base">Programme(s) *</p>
                <p className="mt-1 text-white/70">{progs.length ? progs.join(" · ") : "Sélectionne tes objectifs dans la section Programmes."} <a href="#programmes" className="text-accent underline">Modifier</a></p>
                <p className="font-display uppercase tracking-wider font-semibold text-base mt-3">Type de séance *</p>
                <p className="mt-1 text-white/70">{session ? `Séance ${session.toLowerCase()}` : "Non choisi."} <a href="#programmes" className="text-accent underline">Modifier</a></p>
              </div>
              {err("progs")}{err("session")}
              {([["day", "Jour souhaité *", DAYS], ["slot", "Horaire souhaité *", ["Matin", "Soir"]], ["level", "Niveau sportif *", LEVELS]] as const).map(([k, label, opts]) => (
                <fieldset key={k}><legend className="font-display uppercase tracking-wider font-semibold">{label}</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {opts.map((o) => (<button key={o} type="button" aria-pressed={f[k] === o} onClick={() => set(k, o)}
                      className={`px-5 py-2.5 border-2 font-display font-bold uppercase text-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${f[k] === o ? "bg-accent text-ink border-accent" : "border-white/20 hover:border-accent"}`}>
                      {o}{k === "slot" && <span className="font-normal normal-case text-sm opacity-70"> {o === "Matin" ? "(07h–08h30)" : "(17h–18h30)"}</span>}</button>))}
                  </div>{err(k)}</fieldset>))}
              <div><label htmlFor="notes" className="font-display uppercase tracking-wider font-semibold">Autres informations ou objectifs (facultatif)</label>
                <textarea id="notes" rows={4} className="field mt-2" value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Précise ton objectif, une blessure, une question…" /></div>
              <button type="submit" className="btn btn-primary w-full">Valider ma demande</button>
            </form>

            {done && (
              <div id="resume" className="mt-10 p-7 bg-ink border-2 border-accent" role="status">
                <h3 className="font-display font-extrabold uppercase text-3xl text-accent">Résumé de ta demande</h3>
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                  {([["Nom", f.name], ["Téléphone", f.phone], ["Programme(s)", progs.join(", ")], ["Séance", session], ["Jour", f.day], ["Horaire", f.slot], ["Niveau", f.level], ["Message", f.notes || "—"]] as const).map(([k, v]) => (
                    <div key={k} className="contents"><dt className="text-white/50">{k}</dt><dd className="font-semibold break-words">{v}</dd></div>))}
                </dl>
                <p className="mt-4 text-white/70 text-sm">Tarif : 300 FCFA / jour. Ta réservation n&apos;est pas encore confirmée : envoie ta demande au coach pour vérifier les disponibilités.</p>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-ink hover:bg-white w-full mt-5"><MessageCircle /> Confirmer ma demande sur WhatsApp</a>
              </div>)}
          </div>
        </section>

        <section id="lieu" className="py-24 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-10 items-center">
            <Reveal><Tag>Lieu</Tag><h2 className="h2">Terrain Arsenal</h2>
              <p className="mt-4 text-xl text-white/80 flex gap-3"><MapPin className="text-accent shrink-0 mt-1" />Derrière le CEM Mbao Kamb, à côté du Yendou Bi.</p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${MAPS_Q}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">Trouver le terrain</a></Reveal>
            <Reveal><iframe title="Carte — Terrain Arsenal, Mbao" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${MAPS_Q}&output=embed`} className="w-full h-80 md:h-96 border border-white/10 grayscale contrast-125" /></Reveal>
          </div>
        </section>

        <section id="apropos" className="py-24 bg-coal scroll-mt-16">
          <div className="max-w-5xl mx-auto px-5 text-center">
            <Reveal><Tag>À propos</Tag><h2 className="h2">Une mentalité</h2>
              <p className="mt-6 text-xl md:text-2xl text-white/85 leading-relaxed">MTBT Training, c&apos;est bien plus que l&apos;entraînement. C&apos;est une mentalité. Chaque séance est une occasion de devenir plus fort, plus discipliné et plus proche de ses objectifs. Peu importe ton niveau ou ton point de départ, le plus important est de commencer et de rester constant.</p></Reveal>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3">
              {["Discipline", "Détermination", "Progression", "Performance", "Esprit collectif"].map((v, i) => (
                <Reveal key={v}><div className="py-6 px-3 border border-white/10 hover:border-accent transition"><p className="font-display font-extrabold text-accent text-4xl">0{i + 1}</p><p className="font-display font-bold uppercase text-xl">{v}</p></div></Reveal>))}
            </div>
          </div>
        </section>

        <section id="reseaux" className="py-24 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-5">
            <Reveal><Tag>Communauté</Tag><h2 className="h2">Suis MTBT Training</h2>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Instagram size={20} /> Instagram</a>
                <a href={TIKTOK} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Play size={20} /> TikTok @mtbt__</a>
              </div></Reveal>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {GALLERY.map((g, i) => (
                <a key={i} href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label={g.alt} className="group relative aspect-square bg-steel overflow-hidden grid place-items-center">
                  {g.src ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={g.src} alt={g.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    : <span className="text-white/30 text-center"><ImageIcon className="mx-auto" size={32} /><span className="text-xs block mt-2">{g.alt}</span></span>}
                  <span className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition" />
                </a>))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-white/10 pt-14 pb-24 md:pb-10">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-10">
          <div><Logo size={48} /><p className="mt-4 text-white/70">Ton corps. Ton objectif. Ta discipline.</p></div>
          <nav aria-label="Pied de page"><p className="font-display font-bold uppercase tracking-widest text-accent mb-3">Navigation</p>
            <ul className="grid grid-cols-2 gap-2">{NAV.map(([l, h]) => <li key={h}><a href={h} className="hover:text-accent">{l}</a></li>)}</ul></nav>
          <div className="space-y-2 text-white/80"><p className="font-display font-bold uppercase tracking-widest text-accent mb-3">Contact</p>
            <p>WhatsApp : <a className="hover:text-accent" href={`https://wa.me/${WA_NUMBER}`}>+221 77 102 55 09</a></p>
            <p>Instagram : <a className="hover:text-accent" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">MTBT Training</a></p>
            <p>TikTok : <a className="hover:text-accent" href={TIKTOK} target="_blank" rel="noopener noreferrer">@mtbt__</a></p>
            <p>Terrain Arsenal, derrière le CEM Mbao Kamb, à côté du Yendou Bi.</p></div>
        </div>
        <p className="max-w-6xl mx-auto px-5 mt-10 text-white/50 text-sm">© MTBT Training — Tous droits réservés.</p>
      </footer>

      <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour MTBT Training !")}`} target="_blank" rel="noopener noreferrer" aria-label="Écrire sur WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-ink grid place-items-center shadow-lg hover:scale-110 transition"><MessageCircle size={28} /></a>
    </>
  );
}
