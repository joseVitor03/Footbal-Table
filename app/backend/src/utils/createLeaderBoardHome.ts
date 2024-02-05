import { TypeLeaderBoardHomeTeam } from '../types/LeaderBoard';

export type TypeDefaultTable = {
  time: {
    name: string,
    totalPoints: number,
    totalGames: number,
    totalVictories: number,
    totalDraws: number,
    totalLosses: number,
    goalsFavor: number,
    goalsOwn: number,
    goalsBalance: number,
    efficiency: string
  }
};

export type TeamStatistics = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
};

// type FinalTable = Omit<TeamStatistics, 'name'>;

export const defaultTable = (name: string): TypeDefaultTable => (
  { time: {
    name,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  },
  });

export function additionalStatsAndOrderTable(teamStats: TeamStatistics[]) {
  const newTeamStats = teamStats.map((team: TeamStatistics) => ({
    ...team,
    goalsBalance: team.goalsFavor - team.goalsOwn,
    efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
  }));
  const resultArray = Object.values(newTeamStats).sort((teamA, teamB) => {
    if (teamA.totalPoints > teamB.totalPoints) return -1;

    if (teamA.totalPoints < teamB.totalPoints) return 1;

    if (teamA.goalsBalance > teamB.goalsBalance) return -1;

    if (teamA.goalsBalance < teamB.goalsBalance) return 1;

    if (teamA.goalsFavor > teamB.goalsFavor) return -1;

    return 1;
  });
  return resultArray;
}

export default function createLeaderBoardHome(teams: TypeLeaderBoardHomeTeam[]) {
  const teamStats: Record<string, TeamStatistics> = {};
  teams.forEach((match) => {
    const homeTeam = match.homeTeam.teamName;
    if (!teamStats[homeTeam]) teamStats[homeTeam] = defaultTable(homeTeam).time;
    teamStats[homeTeam].totalGames += 1;
    teamStats[homeTeam].goalsFavor += match.homeTeamGoals;
    teamStats[homeTeam].goalsOwn += match.awayTeamGoals;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      teamStats[homeTeam].totalVictories += 1;
      teamStats[homeTeam].totalPoints += 3;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      teamStats[homeTeam].totalLosses += 1;
    } else {
      teamStats[homeTeam].totalDraws += 1;
      teamStats[homeTeam].totalPoints += 1;
    }
  });
  return additionalStatsAndOrderTable(Object.values(teamStats));
}
