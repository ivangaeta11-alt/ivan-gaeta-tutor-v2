const AUTH_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Email o password non corretti.",
  invalid_grant: "Email o password non corretti.",
  email_not_confirmed:
    "Devi confermare l'email prima di accedere. Controlla la posta in arrivo.",
  user_banned: "Account sospeso. Contatta l'assistenza.",
  over_request_rate_limit:
    "Troppi tentativi di accesso. Riprova tra qualche minuto.",
};

export function mapAuthError(message: string): string {
  const normalized = message.toLowerCase();

  for (const [key, value] of Object.entries(AUTH_ERROR_MESSAGES)) {
    if (normalized.includes(key.replace(/_/g, " ")) || normalized.includes(key)) {
      return value;
    }
  }

  if (normalized.includes("invalid login")) {
    return AUTH_ERROR_MESSAGES.invalid_credentials;
  }

  return "Accesso non riuscito. Verifica le credenziali e riprova.";
}

export function mapProfileUpdateError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("permission") || normalized.includes("policy")) {
    return "Non hai i permessi per aggiornare il profilo.";
  }

  if (normalized.includes("network") || normalized.includes("fetch")) {
    return "Connessione non disponibile. Riprova tra poco.";
  }

  return "Impossibile salvare il profilo. Riprova tra poco.";
}
