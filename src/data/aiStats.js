// Real numbers from Jiteen's own Claude Code usage history — computed from
// local session transcripts (~/.claude/projects), not a vanity/fake stat.
// "Total tokens" = input + output only (excludes cache read/write, which
// would otherwise double-count reused context across a long conversation).
// Regenerate with: python scripts/update-ai-stats.py
export const aiStats = {
  "sessions": 6,
  "messages": 14655,
  "totalTokens": 10697634,
  "activeDays": 16,
  "currentStreak": 1,
  "longestStreak": 7,
  "peakHour": 14,
  "favoriteModel": "Claude Sonnet 5",
  "warAndPeaceMultiple": 14.0,
  "firstActiveDate": "2026-06-23",
  "lastActiveDate": "2026-07-15",
  "generatedAt": "2026-07-15",
  "dayCounts": {
    "2026-07-01": 1575,
    "2026-07-02": 6,
    "2026-07-03": 534,
    "2026-07-05": 109,
    "2026-07-06": 1554,
    "2026-07-07": 2001,
    "2026-07-08": 3071,
    "2026-07-09": 1066,
    "2026-07-10": 2311,
    "2026-06-27": 954,
    "2026-06-29": 291,
    "2026-06-23": 396,
    "2026-06-24": 3,
    "2026-06-25": 584,
    "2026-07-11": 73,
    "2026-07-15": 127
  }
}

export default aiStats
