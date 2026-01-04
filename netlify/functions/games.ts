import type {Handler} from '@netlify/functions'
import type {Game, GameDetails, GamesOverview, SuGameDetailsResponse, SuResponse} from "../../shared/types";
import {TEAM_ID} from "../../shared/types";

const API_BASE_URL = 'https://api-v2.swissunihockey.ch/api'

async function fetchGame(id: number): Promise<GameDetails | null> {
  const res = await fetch(`${API_BASE_URL}/games/${id}`)
  if (!res.ok) return null

  const data = (await res.json()) as SuGameDetailsResponse
  const cells = data.data?.regions?.[0]?.rows?.[0]?.cells

  if (!cells) return null

  return {
    homeTeamId: cells[0].link.ids[0],
    homeTeamLogo: cells[0].image.url,
    guestTeamId: cells[2].link.ids[0],
    guestTeamLogo: cells[2].image.url
  }
}

async function fetchGamesBySeason(season: number): Promise<Game[]> {
  const url = `${API_BASE_URL}/games?mode=team&season=${season}&team_id=${TEAM_ID}&games_per_page=1000`

  const res = await fetch(url)
  if (!res.ok) return []

  const data = (await res.json()) as SuResponse
  const rows = data.data?.regions?.[0]?.rows ?? []

  return Promise.all(rows.map(async (row) => {
    const id = row.link.ids[0];
    const [date, time] = row.cells[0].text
    const [location1, location2] = row.cells[1].text
    const homeTeam = row.cells[2].text[0]
    const guestTeam = row.cells[3].text[0]
    const result = row.cells[4].text[0]

    const game: Game = {
      id,
      date: date,
      time: time,
      location: `${location1}, ${location2}`,
      homeTeam: homeTeam ?? '?',
      homeTeamId: 0,
      homeTeamLogo: '',
      guestTeam: guestTeam ?? '?',
      guestTeamId: 0,
      guestTeamLogo: '',
      result: result ?? undefined
    }

    const details = await fetchGame(id)
    return details ? {...game, ...details} : game
  }))
}

export const handler: Handler = async () => {
  const currentYear = new Date().getFullYear()
  const responses: GamesOverview = {past: [], future: []}

  const processGames = (games: Game[]) => {
    games.forEach((game) => {
      if (game.result) {
        responses.past.push(game)
      } else {
        responses.future.push(game)
      }
    })
  }

  let games = await fetchGamesBySeason(currentYear);
  processGames(games)

  if (responses.past.length === 0) {
    games = await fetchGamesBySeason(currentYear - 1);
    processGames(games)
  }

  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(responses)
  };
}
