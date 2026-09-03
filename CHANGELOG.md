# Changelog

All notable changes to `@simtricity-commons/informdirect-api`. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow SemVer.

## [0.1.3] - 2026-09-03

### Added
- `CHANGELOG.md` published with the package; README links to it and to issues.

## [0.1.2] - 2026-09-03

### Added
- CLI `whoami`: authenticates and reads the portfolio, exits 1 on failure. `authenticate`
  kept as an alias.
- CLI `--json` on every command: one JSON document on stdout, banner suppressed, errors as
  `{"ok": false, "error": ...}`.

### Changed
- `tests/safe-test.ts` → `tests/live-test.ts`; task `test:prod` → `test:live` (read-only).
  `test:sandbox` unchanged and documented as the mutating, sandbox-only compliance cycle.

## [0.1.1] - 2026-09-03

### Changed
- Moved to the `@simtricity-commons` scope and the `simtricity/commons-informdirect-api`
  repo. `@simtricity/informdirect-api` 0.1.0 is archived.
- `@std/cli` ^1.0.32, `@std/dotenv` ^0.225.8; subpath imports caret-versioned.
- Added `test` and `publish:dry` tasks; LICENSE copyright holder to Simtricity Limited;
  README unofficial notice.

## [0.1.0] - 2026-02-27

### Added
- Initial release as `@simtricity/informdirect-api`: typed client with auto-refresh on 401,
  PascalCase wire types, error classes, CLI with `--sandbox`.

[0.1.3]: https://github.com/simtricity/commons-informdirect-api/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/simtricity/commons-informdirect-api/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/simtricity/commons-informdirect-api/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/simtricity/commons-informdirect-api/releases/tag/v0.1.0
