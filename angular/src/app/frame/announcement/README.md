# Announcement bar

Config-driven bar shown after the site header. It is generic: it renders the first entry in
`assets/site-constants/announcements.json` that is enabled, before its `endDate`, and not dismissed
(per user, via localStorage `announce:<id>`). Reusable for any announcement: edit the config, no code
change. The entry below is only an example (the Metrics launch); replace it with whatever you need.

## Config

```json
{ "announcements": [
  { "id": "metrics-launch", "enabled": true, "endDate": "2026-09-19", "dismissible": true,
    "badge": "NEW", "message": "...",
    "cta": { "text": "Explore Metrics", "href": "/metrics/", "target": "_blank" } } ] }
```

`href` may be absolute (another app). `target: "_blank"` opens a new tab and shows an external-link
icon. Bump `id` to re-show after a dismiss.

At deploy time the built-in config above is overridden by the oar-docker bind mount
`apps/sdp/announcements.json` (read-only, from apps/docker-compose.yml), so the banner can be changed
without rebuilding the app. Keep both files in the same schema.

## Files
- `announcement.component.*` - the bar.
- `app.component.html` - `<sdp-announcement>` after `<app-headbar>`.
- `app.module.ts` - declares `AnnouncementComponent`.
