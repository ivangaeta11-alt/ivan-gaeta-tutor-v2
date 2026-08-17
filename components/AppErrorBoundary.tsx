import React from "react";

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  declare props: Readonly<{ children: React.ReactNode }>;
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Errore applicazione:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
          <div className="max-w-md text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h1 className="text-xl font-bold text-slate-900 mb-2">
              Errore di caricamento
            </h1>
            <p className="text-sm text-slate-500 font-light mb-6 leading-relaxed">
              La pagina non si è avviata correttamente. Ricarica il sito; se il
              problema resta, verifica la configurazione Supabase descritta in{" "}
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">AUTH_TEST.md</code>.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              Ricarica
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
