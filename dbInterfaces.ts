export interface ICountries {
  id: number;
  name: string;
}

export interface ICities {
  id: number;
  name: string;
  country_id: number;
  latitude: number;
  longitude: number;
  altitude: number;
}

export interface IEnvironment {
  id: number;
  temperature: number;
  humidity: number;
  wind: number;
  cloud: number;
  pressure: number;
}

export interface IRecords {
  id: number;
  clayWins: number;
  clayLosses: number;
  grassWins: number;
  grassLosses: number;
  hardWins: number;
  hardLosses: number;
  titles: number;
  money: number;
}

export interface IServeQuality {
  id: number;
  firstServeInPercentage: number;
  firstServePointsWonPercentage: number;
  secondServePointsWonPercentage: number;
  serviceGamesWonPercentage: number;
  avgAcesPerMatch: number;
  avgDoubleFaultsPerMatch: number;
  rating: number;
}

export interface IServes {
  id: number;
  overall_id: number;
  grass_id: number;
  clay_id: number;
  hard_id: number;
}

export interface IReturnAbility {
  id: number;
  firstServeReturnPointsWonPercentage: number;
  secondServeReturnPointsWonPercentage: number;
  returnGamesWonPercentage: number;
  rating: number;
}

export interface IReturns {
  id: number;
  overall_id: number;
  grass_id: number;
  clay_id: number;
  hard_id: number;
}

export interface IUnderPressure {
  id: number;
  breakPointsConvertedPercentage: number;
  breakPointsSavedPercentage: number;
  tiebreaksWon: number;
  decidingSetsWon: number;
  rating: number;
}

export interface IPressure {
  id: number;
  overall_id: number;
  grass_id: number;
  clay_id: number;
  hard_id: number;
}

export interface IStats {
  id: number;
  rank: number;
  elo: number;
  points: number;
  records_id: number;
  serves_id: number;
  returns_id: number;
  pressure_id: number;
}

export interface IInjuries {
  id: number;
  player_id: string;
  stats_id: number;
  type: string;
  startDate: string;
  endDate: string;
}

export interface IMatchStats {
  id: number;
  rank: number;
  elo: number;
  points: number;
  serve_quality_id: number;
  return_ability_id: number;
  under_pressure_id: number;
}

export interface IPlayers {
  id: string;
  name: string;
  gender: boolean;
  flashLink: string;
  atpLink: string;
  sofaLink: string;
  city_id: number;
  birthDate: string;
  height: number;
  weight: number;
  rightHanded: boolean;
  allTimeStats_id: number;
  lastYearStats_id: number;
}

export interface IHeadToHead {
  id: number;
  home_id: string;
  away_id: string;
  homeMatchesWon: number;
  homeSetsWon: number;
  awayMatchesWon: number;
  awaySetsWon: number;
  lastMatchDate: string;
}

export interface IOutcomes {
  id: number;
  homeFirstSet: number;
  homeSecondSet: number;
  homeThirdSet: number;
  homeFourthSet: number;
  homeFifthSet: number;
  awayFirstSet: number;
  awaySecondSet: number;
  awayThirdSet: number;
  awayFourthSet: number;
  awayFifthSet: number;
  homeFirstTiebreak: number;
  homeSecondTiebreak: number;
  homeThirdTiebreak: number;
  homeFourthTiebreak: number;
  homeFifthTiebreak: number;
  awayFirstTiebreak: number;
  awaySecondTiebreak: number;
  awayThirdTiebreak: number;
  awayFourthTiebreak: number;
  awayFifthTiebreak: number;
  firstSetDuration: number;
  secondSetDuration: number;
  thirdSetDuration: number;
  fourthSetDuration: number;
  fifthSetDuration: number;
}

export interface IRewards {
  id: number;
  points: number;
  money: number;
}

export interface IMatches {
  id: string;
  tour: string;
  home_id: string;
  away_id: string;
  winner_id: string;
  reward_id: number;
  homeOdds: number;
  awayOdds: number;
  dateTime: string;
  city_id: number;
  neutral: boolean;
  indoor: boolean;
  surface: string;
  environment_id: number;
  outcome_id: number;
  head_to_head_id: number;
  homeMatchStats_id: number;
  awayMatchStats_id: number;
  votes_id: number;
}

export interface IVotes {
  id: number;
  home: number;
  away: number;
  votes: number;
}

export type IDB =
  | ICountries
  | ICities
  | IEnvironment
  | IRecords
  | IServeQuality
  | IServes
  | IReturnAbility
  | IReturns
  | IUnderPressure
  | IPressure
  | IStats
  | IInjuries
  | IMatchStats
  | IPlayers
  | IHeadToHead
  | IOutcomes
  | IRewards
  | IMatches
  | IVotes;
