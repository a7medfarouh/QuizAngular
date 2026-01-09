
# Quiz

A lightweight Angular quiz app that serves multiple-choice questions, shows results, and can fetch short AI-generated hints using Google's Generative Language API (Gemini).

**Quick links**
- **Source:** [src/app](src/app)
- **Hint service:** [src/app/serivces/hint.service.ts](src/app/serivces/hint.service.ts#L1)
- **Environments:** [src/environments/environment.ts](src/environments/environment.ts#L1-L4) and [src/environments/environment.prod.ts](src/environments/environment.prod.ts#L1-L4)

## Features

- Present multiple-choice questions
- Provide result screen with scoring
- Optional AI hint generation via Gemini API (server key required)

## Prerequisites

- Node.js (16+ recommended)
- npm (or yarn)
- Angular CLI (optional, for running `ng` commands)

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Environments

- Development environment is [src/environments/environment.ts](src/environments/environment.ts#L1-L4). It includes a `geminiApiKey` for local development.
- Production environment is [src/environments/environment.prod.ts](src/environments/environment.prod.ts#L1-L4). Keep the production key empty in the repo and inject it during CI/CD or the build pipeline.

Set a Gemini API key before using the hint feature. Example (local):

```ts
// src/environments/environment.ts
export const environment = {
	production: false,
	geminiApiKey: 'YOUR_GEMINI_KEY_HERE'
};
```

Do NOT commit production API keys to source control.

## Running the app

Run locally:

```bash
npm start
# or
ng serve --open
```

Build for production:

```bash
npm run build
# or
ng build --configuration=production
```

If your CI/CD injects environment values, ensure the `geminiApiKey` is provided to `environment.prod.ts` during the build.

## Testing

Run tests with:

```bash
npm test
```

## Important files and structure

- `src/app/serivces/hint.service.ts` — calls Gemini to request a short hint.
- `src/app/components` — UI components: `question`, `result`, `setup`.
- `src/environments/*` — environment configs for dev/prod.
- `angular.json`, `package.json` — build and dependency configuration.

## Troubleshooting

- Cannot find module `@angular/fire/remote-config` or its type declarations:
	- If you intentionally use AngularFire remote config, install and configure the required packages:

		```bash
		npm install firebase @angular/fire
		```

	- If you do not use remote-config, search for imports of `@angular/fire/remote-config` and remove or replace them. Example search:

		```bash
		grep -R "@angular/fire/remote-config" -n
		```

- Gemini/API errors: make sure the `geminiApiKey` is valid and has appropriate quotas. Check console logs in `hint.service.ts` for details.

## Security

- Never commit API keys. For production, inject secrets via your CI/CD or environment variables and write them to `environment.prod.ts` at build time.

## Contributing

- Fork the repo, create a topic branch, and open a PR with a clear description and tests where appropriate.

## License

This project does not include a license file. Add an appropriate license if you plan to share the repository publicly.

---
If you'd like, I can (A) add `src/environments/environment.ts` and `src/environments/environment.prod.ts` files now, (B) replace the inline API key in `src/app/serivces/hint.service.ts` to import the environment, or (C) run `npm install firebase @angular/fire` to resolve the AngularFire error. Tell me which next step you want.
