"""
Regenerates src/data/aiStats.js from this machine's real Claude Code session
history (~/.claude/projects/*/*.jsonl). Run this whenever you want the
"Powered by Karen" section on the site to reflect current usage:

    python scripts/update-ai-stats.py

Methodology (kept deliberately simple/transparent, not reverse-engineered
from any specific dashboard):
  - "Sessions"     = one top-level *.jsonl file per project directory.
                     Nested `<session>/subagents/*.jsonl` files are excluded
                     — those are internal Task-tool transcripts, not turns
                     the user directly had.
  - "Messages"     = count of type:"user" or type:"assistant" entries
                     across all sessions (includes tool-result echoes,
                     which is how these API turns are actually logged).
  - "Total tokens" = input_tokens + output_tokens only. Deliberately
                     EXCLUDES cache_creation/cache_read — a long
                     conversation re-reads its own growing history on
                     every turn, so summing cache reads massively
                     over-counts "tokens used" versus what a human
                     would intuitively mean by that phrase.
  - Active days / streaks / peak hour are all computed in IST
    (UTC+5:30, fixed offset — India has no DST) from message timestamps.
"""
import json
import os
import glob
from datetime import datetime, timedelta, timezone

ROOT = os.path.expanduser('~/.claude/projects')
TZ = timezone(timedelta(hours=5, minutes=30))
OUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'aiStats.js')

MODEL_NAMES = {
    'claude-sonnet-5': 'Claude Sonnet 5',
    'claude-opus-4-8': 'Claude Opus 4.8',
    'claude-sonnet-4-6': 'Claude Sonnet 4.6',
    'claude-fable-5': 'Claude Fable 5',
    'claude-haiku-4-5-20251001': 'Claude Haiku 4.5',
}

files = glob.glob(os.path.join(ROOT, '*', '*.jsonl'))

sessions = len(files)
messages = 0
model_counts = {}
total_input = total_output = 0
active_dates = set()
hour_counts = {h: 0 for h in range(24)}
day_counts = {}

for path in files:
    with open(path, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue

            t = obj.get('type')
            if t not in ('user', 'assistant'):
                continue
            ts = obj.get('timestamp')
            if not ts:
                continue

            dt_local = datetime.fromisoformat(ts.replace('Z', '+00:00')).astimezone(TZ)
            date_str = dt_local.date().isoformat()

            messages += 1
            active_dates.add(date_str)
            hour_counts[dt_local.hour] += 1
            day_counts[date_str] = day_counts.get(date_str, 0) + 1

            if t == 'assistant':
                msg = obj.get('message', {})
                model = msg.get('model')
                if model and model != '<synthetic>':
                    model_counts[model] = model_counts.get(model, 0) + 1
                usage = msg.get('usage') or {}
                total_input += usage.get('input_tokens', 0) or 0
                total_output += usage.get('output_tokens', 0) or 0

total_tokens = total_input + total_output

sorted_dates = sorted(active_dates)
date_objs = [datetime.fromisoformat(d).date() for d in sorted_dates]
longest_streak = 1 if date_objs else 0
cur = 1
for i in range(1, len(date_objs)):
    if (date_objs[i] - date_objs[i - 1]).days == 1:
        cur += 1
        longest_streak = max(longest_streak, cur)
    else:
        cur = 1

today = datetime.now(TZ).date()
date_set = set(date_objs)
d = today if today in date_set else today - timedelta(days=1)
current_streak = 0
while d in date_set:
    current_streak += 1
    d -= timedelta(days=1)

peak_hour = max(hour_counts, key=hour_counts.get) if messages else 0
favorite_model_id = max(model_counts, key=model_counts.get) if model_counts else None
favorite_model = MODEL_NAMES.get(favorite_model_id, favorite_model_id or 'Unknown')

WAR_AND_PEACE_TOKENS = 587287 * 1.3
war_and_peace_multiple = round(total_tokens / WAR_AND_PEACE_TOKENS, 1) if total_tokens else 0

data = {
    'sessions': sessions,
    'messages': messages,
    'totalTokens': total_tokens,
    'activeDays': len(active_dates),
    'currentStreak': current_streak,
    'longestStreak': longest_streak,
    'peakHour': peak_hour,
    'favoriteModel': favorite_model,
    'warAndPeaceMultiple': war_and_peace_multiple,
    'firstActiveDate': sorted_dates[0] if sorted_dates else None,
    'lastActiveDate': sorted_dates[-1] if sorted_dates else None,
    'generatedAt': today.isoformat(),
    'dayCounts': day_counts,
}

js = f"""// Real numbers from Jiteen's own Claude Code usage history — computed from
// local session transcripts (~/.claude/projects), not a vanity/fake stat.
// "Total tokens" = input + output only (excludes cache read/write, which
// would otherwise double-count reused context across a long conversation).
// Regenerate with: python scripts/update-ai-stats.py
export const aiStats = {json.dumps(data, indent=2)}

export default aiStats
"""

with open(OUT_PATH, 'w', encoding='utf-8') as f:
    f.write(js)

print(f"Wrote {OUT_PATH}")
print(json.dumps({k: v for k, v in data.items() if k != 'dayCounts'}, indent=2))
