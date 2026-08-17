import React from "react";
import { useAuth } from "../auth/AuthProvider";

const AuthLoadingScreen: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center px-6">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mb-4" />
      <p className="text-sm text-slate-500 font-light">Caricamento in corso…</p>
    </div>
  </div>
);

export default AuthLoadingScreen;

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading, session } = useAuth();

  if (loading) return <AuthLoadingScreen />;
  if (!session) return null;
  return <>{children}</>;
};
