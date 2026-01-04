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

export interface Game {
  id: number,
  date: string
  location: string
  homeTeam: string
  guestTeam: string
  result?: string
}

export interface GamesOverview {
  past: Game[],
  future: Game[]
}
