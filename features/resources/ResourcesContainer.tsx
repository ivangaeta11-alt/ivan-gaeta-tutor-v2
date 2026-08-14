import React, { useEffect, useState, useRef, useCallback } from "react";
import { resourceService } from "../../services/resourceService";
import ResourcesPage from "../../pages/ResourcesPage";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Risorsa } from "../../types/resource";

interface ResourcesContainerProps {
  onGoToContact: () => void;
}

/**
 * ResourcesContainer
 *
 * Handles:
 * - Fetching resources from backend
 * - Managing loading state
 * - Managing error state
 * - Preventing race conditions and memory leaks
 *
 * Does NOT handle:
 * - Layout
 * - Routing
 * - Global state
 */
const ResourcesContainer: React.FC<ResourcesContainerProps> = ({
  onGoToContact,
}) => {
  const [resources, setResources] = useState<Risorsa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchResources = useCallback(async () => {
    const hasSupabase =
      import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!hasSupabase) {
      setLoading(false);
      setError(
        "Configurazione Supabase mancante. Aggiungi VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nel file .env"
      );
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const data = await resourceService.getAll(abortController.signal);

      if (!isMountedRef.current || abortController.signal.aborted) {
        return;
      }

      setResources(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      if (isMountedRef.current) {
        const message =
          err instanceof Error
            ? err.message
            : "Errore imprevisto durante il recupero delle risorse.";
        setError(message);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchResources();

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [fetchResources]);

  if (loading) {
    return (
      <div className="pt-48 pb-24 text-center">
        <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-400 font-medium">
          Connecting to database...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-48 pb-24 px-4 text-center max-w-lg mx-auto">
        <div className="bg-red-50 border border-red-100 p-8 rounded-[2rem] shadow-xl">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Database Error
          </h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            {error}
          </p>
          <button
            onClick={fetchResources}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ResourcesPage
      risorse={resources}
      onGoToContact={onGoToContact}
    />
  );
};

export default ResourcesContainer;
