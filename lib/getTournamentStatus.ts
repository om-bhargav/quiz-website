// lib/tournamentStatus.ts
export function getTournamentStatus(tournament: {
  id: string;
  windowOpenTime: Date;
  startTime: Date;
  endTime: Date;
}) {
  const now = new Date();

  if (now < tournament.windowOpenTime) {
    return "DRAFT";
  }

  if (now >= tournament.windowOpenTime && now < tournament.startTime) {
    return "PUBLISHED";
  }

  if (now >= tournament.startTime && now < tournament.endTime) {
    return "LIVE";
  }
  return "COMPLETED";
}