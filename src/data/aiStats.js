// Real numbers from Jiteen's own Claude Code usage history — computed from
// local session transcripts (~/.claude/projects), not a vanity/fake stat.
// "Total tokens" = input + output only (excludes cache read/write, which
// would otherwise double-count reused context across a long conversation).
// Regenerate with: python scripts/update-ai-stats.py
export const aiStats = {
  "sessions": 20,
  "messages": 30105,
  "totalTokens": 19982464,
  "activeDays": 27,
  "currentStreak": 2,
  "longestStreak": 9,
  "peakHour": 17,
  "favoriteModel": "Claude Sonnet 5",
  "warAndPeaceMultiple": 26.2,
  "firstActiveDate": "2026-06-23",
  "lastActiveDate": "2026-07-30",
  "generatedAt": "2026-07-30",
  "dayCounts": {
    "2026-07-24": 1524,
    "2026-07-18": 161,
    "2026-07-01": 1575,
    "2026-07-02": 6,
    "2026-07-03": 534,
    "2026-07-05": 109,
    "2026-07-06": 1554,
    "2026-07-07": 2001,
    "2026-07-08": 3071,
    "2026-07-09": 1066,
    "2026-07-19": 1978,
    "2026-07-20": 210,
    "2026-07-21": 805,
    "2026-07-22": 59,
    "2026-07-25": 2695,
    "2026-07-26": 6828,
    "2026-07-10": 2311,
    "2026-06-27": 954,
    "2026-06-29": 291,
    "2026-07-30": 357,
    "2026-07-29": 344,
    "2026-06-23": 396,
    "2026-06-24": 3,
    "2026-06-25": 584,
    "2026-07-11": 73,
    "2026-07-15": 138,
    "2026-07-23": 478
  }
}

export default aiStats
