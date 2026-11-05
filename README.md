# Departure Board for BUSY Bar

<img src="src/appmeta/icon_front_8x8.png" width="64" height="64" alt="Departure Board icon">

Upcoming departures with delay and cancellation details.

Category: **Info & Feeds**.

## Screenshots

Native display captures and their firmware, settings and capture details are
recorded in [docs/SCREENSHOTS.md](docs/SCREENSHOTS.md).

## Controls

Wheel browses departures. OK refreshes. Back exits.

## Settings

Open **Apps → Departure Board → Setup**. Saved settings are read when the app starts.

| Setting | Type | Default |
| --- | --- | --- |
| Source URL | string |  |
| Access token | string |  |
| Refresh (sec) | integer | 30 |
| Stop name | string | Departures |

Source URL returns departures with absolute timestamps. Delay is a signed number of minutes; cancellations remain visible until their departure time has passed.

Access token is sent as a Bearer token. Configure URLs and credentials in the web settings. Remote sources require Wi-Fi.

Failed refreshes retain the last valid data and show an error. Values older than three refresh intervals are marked stale.

See [docs/DATA.md](docs/DATA.md) for the response format and [examples/response.json](examples/response.json) for a sample.

## Install and build

Use the Node.js version in [.nvmrc](.nvmrc) and the pnpm version in [package.json](package.json).

    corepack pnpm install --frozen-lockfile
    corepack pnpm check
    corepack pnpm app:install
    corepack pnpm app:run

Pass --addr <host> to an app command to select a device. See [INSTALL.md](INSTALL.md).
The minimum firmware HTTP API is specified in [src/appmeta/manifest.json](src/appmeta/manifest.json).

## Development

Each project contains its own runtime, state model, assets, tests and build scripts.
Run pnpm check for metadata validation, type checking, unit tests, packaging and bundle smoke checks.
Run pnpm release to prepare a versioned archive and SHA256SUMS locally.
Generated files under dist/ are excluded from Git.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/RELEASING.md](docs/RELEASING.md).

## License

Code, pixel icons, geometric artwork and synthesized sound assets: [MIT](LICENSE).
Assets can be recreated with python art/generate_assets.py. Rendering uses fonts supplied by the BUSY Bar firmware.

## AI assistance

See [AI_ASSISTANCE.md](docs/AI_ASSISTANCE.md) for the role of AI in this project.
