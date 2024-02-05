import { TypeLeaderBoardAwayTeam } from '../types/LeaderBoard';
import { defaultTable, TeamStatistics } from './createLeaderBoardHome';

// type FinalTable = Omit<TeamStatistics, 'name'>;

export const adicionalStatsAndOrder = (teams: TeamStatistics[]) => {
  const statsTeams = teams.map((team: TeamStatistics) => ({
    ...team,
    efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
  }));
  const orderTable = statsTeams.sort(((teamA, teamB) => {
    if (teamA.totalPoints > teamB.totalPoints) return -1;
    if (teamA.totalPoints < teamB.totalPoints) return 1;
    if (teamA.goalsBalance > teamB.goalsBalance) return -1;
    if (teamA.goalsBalance < teamB.goalsBalance) return 1;
    if (teamA.goalsFavor > teamB.goalsFavor) return -1;
    return 1;
  }));
  return orderTable;
};

const createLeaderBoardAway = (teams: TypeLeaderBoardAwayTeam[]) => {
  const teamStats: Record<string, TeamStatistics> = {};
  teams.forEach((match) => {
    const awayTeam = match.awayTeam.teamName;
    if (!teamStats[awayTeam]) teamStats[awayTeam] = defaultTable(awayTeam).time;
    teamStats[awayTeam].totalGames += 1;
    teamStats[awayTeam].goalsFavor += match.awayTeamGoals;
    teamStats[awayTeam].goalsOwn += match.homeTeamGoals;
    teamStats[awayTeam].goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
    if (match.awayTeamGoals > match.homeTeamGoals) {
      teamStats[awayTeam].totalPoints += 3;
      teamStats[awayTeam].totalVictories += 1;
    } else if (match.awayTeamGoals === match.homeTeamGoals) {
      teamStats[awayTeam].totalPoints += 1;
      teamStats[awayTeam].totalDraws += 1;
    } else teamStats[awayTeam].totalLosses += 1;
  });
  const newTeamStats = Object.values(teamStats);
  return adicionalStatsAndOrder(newTeamStats);
};

export default createLeaderBoardAway;
