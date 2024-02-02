import { TypeLeaderBoardHomeTeam } from '../types/LeaderBoard';

type TypeDefaultTable = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};

const defaultTable = (name: string): TypeDefaultTable => (
  { name,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0 });

function additionalStats(teamStats: TypeDefaultTable) {
  Object.values(teamStats).map((team: any) => ({
    ...team,
    goalsBalance: team.goalsFavor - team.goalsOwn,
    efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
  }));
  const resultArray = Object.values(teamStats);
  return resultArray;
}

export default function createLeaderBoardHome(teams: TypeLeaderBoardHomeTeam[]) {
  const teamStats = {} as any;
  teams.forEach((match) => {
    const homeTeam = match.homeTeam.teamName;
    if (!teamStats[homeTeam]) teamStats[homeTeam] = defaultTable(homeTeam);
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
  return additionalStats(teamStats);
}
