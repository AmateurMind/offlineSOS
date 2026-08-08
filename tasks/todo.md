# Frontend visual refresh

- [x] Inspect the Vite/React frontend, current layout, and scripts.
- [x] Replace the generic starter styling with the requested `#0B0909`, `#2E4540`, `#408175`, and `#B5B9F0` palette.
- [x] Apply Signika for headings and Open Sans for body/interface text.
- [x] Preserve polling and message-send behavior while adding connection/empty states.
- [x] Run build and lint checks.
- [x] Confirm the local Vite server responds successfully.
- [ ] Visually verify the primary screen in the embedded browser (blocked by browser environment metadata error).

## Final review

Build and lint pass. The local server returned HTTP 200. Embedded browser verification could not start because the browser connector returned a missing `sandboxPolicy` metadata error before navigation.
