export type TypeLeaderBoardHomeTeam = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    id: number,
    teamName: string,
  }
};

export type TypeLeaderBoardAwayTeam = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  awayTeam: {
    id: number,
    teamName: string,
  }
};
