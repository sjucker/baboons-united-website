import {beforeEach, describe, expect, it, vi} from 'vitest'
import {fetchGamesBySeason} from '../../../netlify/functions/games'
import {TEAM_ID} from '../../../shared/types'

global.fetch = vi.fn()

describe('fetchGamesBySeason', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should fetch and format games correctly', async () => {
    const mockSeasonResponse = {
      data: {
        regions: [
          {
            rows: [
              {
                link: {ids: [123]},
                cells: [
                  {text: ['14.01.2026', '20:00']},
                  {text: ['Location 1', 'Location 2']},
                  {text: ['Home Team']},
                  {text: ['Guest Team']},
                  {text: ['5:2']}
                ]
              }
            ]
          }
        ]
      }
    }

    const mockDetailsResponse = {
      data: {
        regions: [
          {
            rows: [
              {
                cells: [
                  {link: {ids: [10]}, image: {url: 'home-logo.png'}},
                  {},
                  {link: {ids: [20]}, image: {url: 'guest-logo.png'}}
                ]
              }
            ]
          }
        ]
      }
    }

    vi.mocked(fetch).mockImplementation(((url: string) => {
      if (url.includes('/games?')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSeasonResponse)
        })
      }
      if (url.includes('/games/123')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDetailsResponse)
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    }) as never)

    const games = await fetchGamesBySeason(2026)

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`season=2026&team_id=${TEAM_ID}`))
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/games/123'))

    expect(games).toHaveLength(1)
    expect(games[0]).toMatchObject({
      id: 123,
      time: '20:00',
      location: 'Location 1, Location 2',
      homeTeam: 'Home Team',
      guestTeam: 'Guest Team',
      result: '5:2',
      homeTeamId: 10,
      homeTeamLogo: 'home-logo.png',
      guestTeamId: 20,
      guestTeamLogo: 'guest-logo.png'
    })
    expect(games[0].date).toBeInstanceOf(Date)
    expect(games[0].date.getFullYear()).toBe(2026)
    expect(games[0].date.getMonth()).toBe(0) // January
    expect(games[0].date.getDate()).toBe(14)
  })

  it('should handle "heute" correctly', async () => {
    const mockSeasonResponse = {
      data: {
        regions: [{
          rows: [{
            link: {ids: [124]},
            cells: [
              {text: ['Heute', '18:00']},
              {text: ['Loc 1', 'Loc 2']},
              {text: ['T1']},
              {text: ['T2']},
              {text: []}
            ]
          }]
        }]
      }
    }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSeasonResponse)
    } as never).mockResolvedValueOnce({
      ok: false // details failed
    } as never)

    const games = await fetchGamesBySeason(2026)
    const today = new Date()

    expect(games[0].date.toDateString()).toBe(today.toDateString())
  })

  it('should handle "morgen" correctly', async () => {
    const mockSeasonResponse = {
      data: {
        regions: [{
          rows: [{
            link: {ids: [125]},
            cells: [
              {text: ['morgen', '18:00']},
              {text: ['Loc 1', 'Loc 2']},
              {text: ['T1']},
              {text: ['T2']},
              {text: []}
            ]
          }]
        }]
      }
    }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSeasonResponse)
    } as never).mockResolvedValueOnce({
      ok: false
    } as never)

    const games = await fetchGamesBySeason(2026)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    expect(games[0].date.toDateString()).toBe(tomorrow.toDateString())
  })

  it('should return empty array if fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false
    } as never)

    const games = await fetchGamesBySeason(2026)
    expect(games).toEqual([])
  })
})
