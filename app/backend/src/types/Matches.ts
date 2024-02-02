export type TypeUpdateScore = {
  id: number,
  awayTeamGoals: number,
  homeTeamGoals: number,
};

export type TypeInsertMatches = {
  homeTeamId: number,
  awayTeamId: number,
  awayTeamGoals: number,
  homeTeamGoals: number
};
