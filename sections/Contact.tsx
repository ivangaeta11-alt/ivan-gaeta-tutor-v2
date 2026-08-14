import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { messageService } from '../services/messageService';

const OBIETTIVI = [
  'Semestre Filtro Medicina',
  'Preparazione TOLC',
  'Esame Universitario',
  'Scuole superiori',
] as const;

const Contact: React.FC = () => {
  const [form, setForm] = useState({ nome: '', email: '', obiettivo: OBIETTIVI[0], messaggio: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    if (!form.nome.trim() || !form.email.trim() || !form.messaggio.trim()) {
      setError('Compila tutti i campi obbligatori.');
      return;
    }
    setLoading(true);
    messageService
      .send({
        nome: form.nome,
        email: form.email,
        obiettivo: form.obiettivo,
        messaggio: form.messaggio,
      })
      .then(() => {
        setSent(true);
        setForm({ nome: '', email: '', obiettivo: OBIETTIVI[0], messaggio: '' });
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Errore durante l\'invio. Riprova.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section id="contatti" className="pt-10 pb-16 md:pt-12 md:pb-20 bg-gradient-to-b from-white to-slate-50/50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl md:rounded-[2rem] shadow-xl shadow-slate-200/30 overflow-hidden border border-slate-100">
          <div className="grid lg:grid-cols-2">
            {/* Colonna Info di Contatto */}
            <div className="p-8 sm:p-12 lg:p-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">Iniziamo a conoscerci</h2>
              <p className="text-blue-100 text-lg mb-12">
                Descrivimi il tuo percorso e l'esame che vuoi superare. Ti risponderò entro 24 ore per fissare un colloquio conoscitivo gratuito.
              </p>
              <div className="space-y-8">
                <div className="flex items-start sm:items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center group-hover:bg-blue-400/50 transition-colors mt-1 sm:mt-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Email</p>
                    <a 
                      href="mailto:ivangaetatutor@gmail.com" 
                      className="text-base sm:text-lg font-medium hover:underline underline-offset-4 decoration-blue-300 break-all block"
                    >
                      ivangaetatutor@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center group-hover:bg-blue-400/50 transition-colors mt-1 sm:mt-0">
                    <MessageCircle className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">WhatsApp</p>
                    <a 
                      href="https://wa.me/393495519055" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-base sm:text-lg font-medium hover:underline underline-offset-4 decoration-emerald-400"
                    >
                      +39 349 5519055
                    </a>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center mt-1 sm:mt-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Modalità</p>
                    <p className="text-base sm:text-lg font-medium">Online su Zoom/Meet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonna Form */}
            <div className="p-8 sm:p-12 lg:p-20">
              {sent ? (
                <div className="py-8 px-4 text-center rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p className="text-xl font-bold text-emerald-700">Messaggio inviato con successo.</p>
                  <p className="text-slate-600 mt-2">Ti risponderò entro 24 ore.</p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-blue-600 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} method="post" action="#" className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nome</label>
                      <input
                        type="text"
                        value={form.nome}
                        onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all"
                        placeholder="Il tuo nome"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all"
                        placeholder="La tua email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Il tuo obiettivo</label>
                    <select
                      value={form.obiettivo}
                      onChange={(e) => setForm((f) => ({ ...f, obiettivo: e.target.value as typeof OBIETTIVI[number] }))}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all"
                      required
                    >
                      {OBIETTIVI.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Messaggio</label>
                    <textarea
                      rows={4}
                      value={form.messaggio}
                      onChange={(e) => setForm((f) => ({ ...f, messaggio: e.target.value }))}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all resize-none"
                      placeholder="Parlami del tuo percorso..."
                      required
                    />
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Invio in corso...' : 'Invia Messaggio'} <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
