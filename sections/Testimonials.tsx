import React, { useRef, useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User, X } from 'lucide-react';
import { reviewService } from '../services/reviewService';
import type { Review, ReviewCreate } from '../types/review';

interface Testimonial {
  name: string;
  role: string;
  success: string;
  text: string;
  color: 'blue' | 'emerald' | 'purple' | 'pink' | 'orange';
}

/** Card unificata: recensioni statiche o dal DB */
interface ReviewCardItem {
  id: string;
  name: string;
  badgeText: string;
  text: string;
  stars: number;
  color: 'blue' | 'emerald' | 'purple' | 'pink' | 'orange';
}

const testimonials: Testimonial[] = [
  {
    name: "Davide",
    role: "Studente",
    success: "Fisica 1 e 2",
    text: "Personalmente mi sono trovato benissimo a seguire le lezioni da Ivan, in più essendo dislessico non ho avuto nessun problema ad acquisire informazioni e dati che mi servissero per lo studio a casa post lezione, ciò perché se non riuscivo a seguire lui come ottimo insegnante ti rispiegava lo stesso concetto in modi diversi, così da poterlo apprendere al meglio, quindi consigliatissimo anche per chi è dislessico, tanto più per chi non ha 'disagi del mio tipo', in sintesi date le mie esperienze personali con vari altri insegnanti post scuola/università Ivan è al di sopra di molti questi, lo consiglio assolutamente!",
    color: "orange"
  },
  {
    name: "Giorgia",
    role: "Studentessa",
    success: "TOLC-I",
    text: "Mi sono trovata benissimo con Ivan. È un insegnante molto preparato ed è bravo anche a spiegare, passaggio per passaggio, in modo semplice, facendoti acquisire pian piano la logica e le strategie che necessiti per affrontare e svolgere gli esercizi. Ivan è sempre pronto ad aiutarti e se hai domande o dubbi, anche al di fuori dell'orario lavorativo, lui è disposto a risponderti.",
    color: "emerald"
  },
  {
    name: "Noemi",
    role: "Studentessa",
    success: "Fisica 1 e 2",
    text: "Ivan è un insegnante molto paziente e preparato. È giovane, gentile e disponibile, con orari flessibili. Mi ha aiutato a superare i miei esami di fisica senza ansia e preoccupazioni. È anche molto simpatico, le sue lezioni non risultano mai pesanti. Lo consiglio agli altri studenti che hanno bisogno di supporto per lo studio delle materie scientifiche come me.",
    color: "blue"
  },
  {
    name: "Ilenia",
    role: "Studentessa",
    success: "Matematica e Fisica",
    text: "Ho avuto il piacere di seguire lezioni con Ivan per matematica e fisica, e sono rimasta estremamente soddisfatta. Ivan ha una grande capacità di spiegare concetti complessi in modo chiaro e accessibile, utilizzando esempi pratici che aiutano a comprendere a fondo gli argomenti. Ogni lezione è ben strutturata, con esercizi mirati e verifiche per consolidare ciò che si è appreso. È sempre disponibile a rispondere a ogni domanda e riesce a creare un ambiente di studio motivante e sereno. Grazie a lui ho migliorato molto la mia comprensione e ho acquisito maggiore fiducia nelle mie capacità. Consigliatissimo!",
    color: "purple"
  },
  {
    name: "Pierluigi",
    role: "Studente",
    success: "Meccanica e Termodinamica",
    text: "Dal mio punto di vista lui è un insegnante molto preparato nelle discipline che insegna (Matematica e Fisica), ha un approccio che va al di là delle mere nozioni asettiche, riesce a farti capire il perché delle cose, dandogli un contesto pratico ed utile. Spiega molto bene, inoltre è super gentile e accogliente, dopotutto si vede lontano un chilometro quanto sia brillante nel suo campo.",
    color: "pink"
  },
  {
    name: "Danila",
    role: "Studentessa",
    success: "Analisi 1",
    text: "Molto raccomandato! È una persona estremamente disponibile, paziente e competente. Grazie al suo modo chiaro e preciso di spiegare, sono riuscita a comprendere concetti di matematica che mi sembravano ostici. La sua preparazione, unita alla sua capacità di rendere semplici argomenti complessi, mi ha davvero soddisfatta. Ha una buona preparazione e riesce a trasmetterla con molta efficacia. Eccellente!",
    color: "orange"
  },
  {
    name: "Ludovica",
    role: "Studentessa",
    success: "Matematica",
    text: "Ivan è un ragazzo serio e professionale e la sua egregia preparazione stimola la curiosità e rende l'apprendimento leggero e divertente. Riesce ad instaurare una connessione profonda con lo studente e a creare un piano didattico personalizzato in base alle esigenze, proponendo esempi concreti mediante i quali comprendere al meglio ciò che si studia e le relative applicazioni. Assolutamente consigliato!",
    color: "blue"
  },
  {
    name: "Alessio",
    role: "Studente",
    success: "Fisica 1 e 2",
    text: "Spiega molto bene e nel dettaglio in modo che tu riesca a capire perfettamente tutto. PS grazie a lui ho passato fisica 1 e 2",
    color: "emerald"
  },
  {
    name: "Nadia",
    role: "Studentessa",
    success: "Fisica",
    text: "La mia esperienza con Ivan è stata sicuramente positiva, perché oltre ad essere molto preparato nelle sue discipline ha dimostrato di saperle rendere accessibili a chi ha più difficoltà.",
    color: "purple"
  },
  {
    name: "Arianna",
    role: "Studentessa",
    success: "Matematica",
    text: "Molto valido e organizzato. Ha aiutato mia sorella per il debito in matematica. Consigliato a chiunque cerchi un aiuto in materie scientifiche.",
    color: "pink"
  }
];

const colorMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  pink: "bg-pink-50 text-pink-600 border-pink-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100"
};

const SUBJECT_COLORS: Record<string, 'blue' | 'emerald' | 'purple' | 'pink' | 'orange'> = {
  Matematica: 'blue',
  Fisica: 'emerald',
  Analisi: 'purple',
  Statistica: 'pink',
  TOLC: 'orange',
  Superiori: 'blue',
  Altro: 'orange',
};
function subjectToColor(s?: string | null): 'blue' | 'emerald' | 'purple' | 'pink' | 'orange' {
  if (!s) return 'blue';
  return SUBJECT_COLORS[s] ?? 'orange';
}

const MAX_LENGTH = 180;

const TestimonialCard: React.FC<{ item: ReviewCardItem }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = item.text.length > MAX_LENGTH;
  const displayedText = (isLong && !isExpanded) ? `${item.text.substring(0, MAX_LENGTH)}...` : item.text;

  return (
    <div 
      className="flex-shrink-0 w-[85vw] md:w-[400px] snap-center relative p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-tight border ${colorMap[item.color]}`}>
            {item.badgeText}
          </span>
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i <= item.stars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`}
              />
            ))}
          </div>
        </div>
        <Quote className="w-10 h-10 text-slate-100 mb-4" />
        <div className="min-h-[140px] mb-8">
          <p className="text-slate-700 leading-relaxed font-medium italic text-lg">
            "{displayedText}"
          </p>
          {isLong && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors uppercase tracking-wider"
            >
              {isExpanded ? "Mostra meno" : "Mostra di più"}
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
        <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
          <User className="w-7 h-7" />
        </div>
        <div>
          <div className="font-bold text-slate-900 text-lg">{item.name}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', subject: '', stars: 0, text: '' });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;
    reviewService.getApproved()
      .then((data) => { if (!cancelled) setReviews(data); })
      .catch(() => { if (!cancelled) setReviews([]); })
      .finally(() => { if (!cancelled) setReviewsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const cardItems: ReviewCardItem[] = [
    ...testimonials.map((t, i) => ({
      id: `static-${i}`,
      name: t.name,
      badgeText: t.success,
      text: t.text,
      stars: 5,
      color: t.color,
    })),
    ...reviews.map((r) => ({
      id: r.id,
      name: r.author_name,
      badgeText: r.subject || 'Recensione',
      text: r.content,
      stars: r.rating,
      color: subjectToColor(r.subject),
    })),
  ];

  const averageStars = cardItems.length
    ? cardItems.reduce((sum, i) => sum + i.stars, 0) / cardItems.length
    : 0;
  const averageDisplay = averageStars > 0 ? averageStars.toFixed(1).replace('.', ',') : '—';

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const openModal = () => {
    setModalOpen(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    setForm({ name: '', subject: '', stars: 0, text: '' });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim() || form.stars < 1) {
      setSubmitError('Compila tutti i campi e seleziona almeno una stella.');
      return;
    }
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const payload: ReviewCreate = {
        author_name: form.name.trim(),
        rating: form.stars,
        content: form.text.trim(),
        subject: form.subject || undefined,
      };
      await reviewService.create(payload);
      setSubmitSuccess(true);
      setForm({ name: '', subject: '', stars: 0, text: '' });
      setTimeout(closeModal, 2000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Errore durante l\'invio. Riprova.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <section id="recensioni" className="pt-10 pb-10 md:pt-12 md:pb-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="text-left">
            <h2 className="text-blue-600 font-bold tracking-widest text-sm mb-2 uppercase">Recensioni degli studenti</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Cosa dicono dei percorsi
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-slate-200" />
                ))}
                <div
                  className="absolute top-0 left-0 flex gap-0.5 overflow-hidden"
                  style={{ width: `${(averageStars / 5) * 100}%` }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 flex-shrink-0 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <span className="text-lg font-bold text-slate-700">{averageDisplay}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              onClick={openModal}
              className="px-5 py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all duration-200"
            >
              Lascia una recensione
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-slate-600"
                aria-label="Scorri a sinistra"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-slate-600"
                aria-label="Scorri a destra"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar items-stretch"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cardItems.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Modal Lascia una recensione */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeModal}>
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Lascia una recensione</h3>
              <button type="button" onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 text-slate-500" aria-label="Chiudi">
                <X className="w-6 h-6" />
              </button>
            </div>
            {submitSuccess ? (
              <p className="text-emerald-600 font-medium">Grazie per il tuo feedback! La recensione sarà pubblicata a breve.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Il tuo nome"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Materia</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Es. Matematica, Fisica, TOLC..."
                    maxLength={80}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Valutazione</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, stars: n }))}
                        className="p-1 rounded focus:ring-2 focus:ring-blue-200"
                        aria-label={`${n} stelle`}
                      >
                        <Star className={`w-10 h-10 ${n <= form.stars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Testo della recensione</label>
                  <textarea
                    value={form.text}
                    onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-y min-h-[120px]"
                    placeholder="Scrivi la tua esperienza..."
                    maxLength={2000}
                    rows={4}
                  />
                </div>
                {submitError && <p className="text-red-600 text-sm">{submitError}</p>}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {submitLoading ? 'Invio...' : 'Invia recensione'}
                  </button>
                  <button type="button" onClick={closeModal} className="px-5 py-3 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50">
                    Annulla
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
