import { useCallback, useEffect, useMemo, useState } from "react";
import { mapProfileUpdateError } from "../../../../lib/auth/errors";
import { updateOwnProfile } from "../../../../lib/auth/userData";
import { useAuth } from "../../../auth/AuthProvider";

function normalizeField(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function useStudentProfileForm() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name ?? "");
    setPhone(profile.phone ?? "");
  }, [profile]);

  const email = user?.email ?? "";
  const displayName =
    profile?.full_name?.trim() || user?.email?.split("@")[0] || "Utente";

  const isDirty = useMemo(() => {
    if (!profile) return false;
    return (
      fullName !== (profile.full_name ?? "") || phone !== (profile.phone ?? "")
    );
  }, [fullName, phone, profile]);

  const saveProfile = useCallback(async () => {
    if (!user) {
      setErrorMessage("Sessione non valida. Effettua di nuovo l'accesso.");
      return;
    }

    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const { error } = await updateOwnProfile(user.id, {
      full_name: normalizeField(fullName),
      phone: normalizeField(phone),
    });

    if (error) {
      setSaving(false);
      setErrorMessage(mapProfileUpdateError(error));
      return;
    }

    await refreshProfile();
    setSaving(false);
    setSuccessMessage("Profilo aggiornato con successo.");
  }, [fullName, phone, refreshProfile, user]);

  return {
    loading,
    saving,
    fullName,
    setFullName,
    phone,
    setPhone,
    email,
    displayName,
    isDirty,
    successMessage,
    errorMessage,
    saveProfile,
  };
}
