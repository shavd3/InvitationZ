# Accept Button — Pearl Highlight Design

## Goal

Make the RSVP Accept / Confirm button feel like wedding stationery instead of a solid form CTA, while staying clearly tappable for older guests.

## Decision

- Base: cream–ivory fill, warm gold text, thin gold border (lighter than the previous solid gold fill).
- Motion: slow pearl highlight sweep via `::after` (~4.5s, ease-in-out, infinite) — soft white/champagne light across the surface.
- Hover: slightly warmer cream / border; no lift or flashy glow.
- Reduced motion: disable the sweep when `prefers-reduced-motion: reduce`.
- Scope: RSVP primary actions only (`Accept with pleasure`, `Confirm attendance`). Decline stays the quieter outline. Admin / other `btn-gold` uses are unchanged.

## Implementation note

Introduce a dedicated class (e.g. `.btn-pearl`) for RSVP primary buttons rather than restyling global `.btn-gold`.
