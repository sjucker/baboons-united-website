import type {Handler} from '@netlify/functions'
import type {Game, GamesOverview, SuResponse} from "../../shared/types";

async function fetchGamesBySeason(season: number): Promise<Game[]> {
  const url = 'https://api-v2.swissunihockey.ch/api/games?mode=team&season=' + season + '&team_id=429321&games_per_page=1000'

  const res = await fetch(url)
  if (!res.ok) {
    return []
  }
  const data = (await res.json()) as SuResponse
  const rows = data.data?.regions?.[0]?.rows ?? []

  return rows.map((row) => {
    const id = row.link.ids[0];
    const date = row.cells[0].text[0]
    const time = row.cells[0].text[1]
    const location1 = row.cells[1].text[0]
    const location2 = row.cells[1].text[1]
    const homeTeam = row.cells[2].text[0]
    const guestTeam = row.cells[3].text[0]
    const result = row.cells[4].text[0]

    return {
      id: id,
      date: `${date} ${time}`,
      location: `${location1}, ${location2}`,
      homeTeam: homeTeam ?? 'Unknown',
      guestTeam: guestTeam ?? 'Unknown',
      result: result ?? undefined
    }
  })
}

export const handler: Handler = async () => {
  const currentYear = new Date().getFullYear()
  const responses: GamesOverview = {
    past: [],
    future: []
  }

  let games = await fetchGamesBySeason(currentYear);
  games.forEach((game) => {
    if (game.result) {
      responses.past.push(game)
    } else {
      responses.future.push(game)
    }
  })
  if (responses.past.length === 0) {
    games = await fetchGamesBySeason(currentYear - 1);
    games.forEach((game) => {
      if (game.result) {
        responses.past.push(game)
      } else {
        responses.future.push(game)
      }
    })
  }

  return {
    statusCode: 200, headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(responses)
  };
}
