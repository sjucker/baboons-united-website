export interface SuLink {
  ids: number[]
}

export interface SuGameRow {
  link: SuLink,
  cells: Array<{
    text: string[]
  }>
}

export interface SuResponse {
  data: {
    regions: Array<{
      rows: SuGameRow[]
    }>
  }
}

export interface SuGameDetailsRow {
  cells: Array<{
    image: {
      url: string
    },
    text: string[],
    link: {
      ids: number[]
    }
  }>

}

export interface SuGameDetailsResponse {
  data: {
    regions: Array<{
      rows: SuGameDetailsRow[]
    }>
  }
}

export interface Game {
  id: number,
  date: string
  location: string
  homeTeam: string
  homeTeamId: number
  homeTeamLogo: string
  guestTeam: string
  guestTeamId: number
  guestTeamLogo: string
  result?: string
}

export interface GamesOverview {
  past: Game[],
  future: Game[]
}

export interface GameDetails {
  homeTeamId: number
  homeTeamLogo: string
  guestTeamId: number
  guestTeamLogo: string
}
