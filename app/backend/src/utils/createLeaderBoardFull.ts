import { TeamStatistics, defaultTable,
  additionalStatsAndOrderTable } from './createLeaderBoardHome';
// type FinalTable = Omit<TeamStatistics, 'name'>;

const createLeaderBoardFull = (teamsHome: TeamStatistics[], teamsAway: TeamStatistics[]) => {
  const tableFull: Record<string, TeamStatistics> = {};
  teamsHome.forEach((teamA) => {
    const teamName = teamA.name;
    if (!tableFull[teamName]) tableFull[teamName] = defaultTable(teamName).time;
    teamsAway.forEach((teamB) => {
      if (teamA.name === teamB.name) {
        tableFull[teamName].goalsFavor += teamA.goalsFavor + teamB.goalsFavor;
        tableFull[teamName].goalsOwn += teamA.goalsOwn + teamB.goalsOwn;
        tableFull[teamName].totalPoints += teamA.totalPoints + teamB.totalPoints;
        tableFull[teamName].totalVictories += teamA.totalVictories + teamB.totalVictories;
        tableFull[teamName].totalLosses += teamA.totalLosses + teamB.totalLosses;
        tableFull[teamName].totalDraws += teamA.totalDraws + teamB.totalDraws;
        tableFull[teamName].totalGames += teamA.totalGames + teamB.totalGames;
      }
    });
  });
  const table = Object.values(tableFull);
  return additionalStatsAndOrderTable(table);
};

export default createLeaderBoardFull;
