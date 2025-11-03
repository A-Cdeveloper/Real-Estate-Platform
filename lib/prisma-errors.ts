/**
 * Pretvara Prisma greške u user-friendly poruke
 */
export function getPrismaErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Došlo je do greške pri učitavanju podataka iz baze.";
  }

  const message = error.message;

  // Prepoznaj tip greške i vrati odgovarajuću poruku
  if (message.includes("Can't reach database")) {
    return "Baza podataka nije dostupna. Proverite da li je MySQL server pokrenut.";
  }

  if (message.includes("Authentication failed")) {
    return "Neispravni podaci za pristup bazi podataka.";
  }

  if (message.includes("does not exist")) {
    return "Baza podataka ne postoji. Proverite konfiguraciju.";
  }

  if (message.includes("Unique constraint")) {
    return "Podatak već postoji u bazi.";
  }

  if (message.includes("Foreign key constraint")) {
    return "Greška u relacijama podataka.";
  }

  // Fallback za ostale greške
  return "Došlo je do greške pri učitavanju podataka iz baze.";
}
