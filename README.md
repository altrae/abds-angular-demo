# Example App - Angular

## Start the app

Use Yarn 4.17.0 and a Node version supported by Angular 22:
Node 22.22.3+, Node 24.15.0+, or Node 26+. This upgrade was verified with Node 26.3.1.
See [Angular's compatibility table](https://angular.dev/reference/versions).

Install the dependencies and start the server.

```sh
yarn install --immutable
yarn start
```

The last command should open your browser and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If port 4200 is occupied, use `yarn start --port 4201`.
The OpenSSL legacy-provider workaround is no longer needed.

## Build and test

```sh
yarn build
yarn test --watch=false
```

Production files are written to `dist/example-app-angular/browser/`.
Tests use Angular's Vitest runner with jsdom, so no Chrome installation is required.
Use `yarn test --watch` to rerun tests as files change.

## Dependency compatibility

Angular and its CLI/build packages are aligned at 22.2.2. TypeScript is pinned to
6.0.3 because Angular 22 requires TypeScript 6.0.x; TypeScript 7 is not supported yet.
Other direct dependencies use their latest stable releases, and transitive dependencies
have been refreshed within the ranges supported by their parent packages.

`@abds/components` is pinned to 3.4.3, its latest published release. It still ships
older Stencil tooling and declares a webpack 5.36 peer dependency, so Yarn reports
a missing webpack peer warning. This app uses `@angular/build` rather than webpack.
Upgrading those ABDS internals requires a new upstream library release.

Two settings in `angular.json` accommodate ABDS's legacy lazy loader:

- The `.map` import loader ignores source maps accidentally matched by Stencil's
  dynamic imports. JavaScript component chunks are still bundled and lazy-loaded.
- The development server excludes `@abds/components` from Vite prebundling so its
  dynamic imports are bundled correctly by Angular.

`skipLibCheck` avoids errors in ABDS's published third-party declarations;
application TypeScript and Angular template checks remain strict. The app retains
its NgModule structure and explicitly enables Zone.js and eager change detection
to preserve its previous behavior with Angular 22's changed defaults.

## abds component usage

See the [ABDS component reference](ABDS_COMPONENTS.md) for every component's props,
defaults, variations, slots, events, methods, and the full icon catalog for version 3.4.3.

Pre requisites:

1. Add `@abds/components` into your `package.json` as a dependency

Using a Stencil built web component collection within an Angular CLI project is a two-step process. We need to:

1. Include the `CUSTOM_ELEMENTS_SCHEMA` in the modules that use the components.
   - In this example it is used here `src/app/app.module.ts`.
2. Call `defineCustomElements()` from `main.ts` (or the project's entry point).
   - In this example it is imported in `src/main.ts` and then invoked later in that file.
   - This function is provided by Stencil's loader and it allows components to be lazy-loaded.

By importing the abds custom components above, Angular will let you use them freely throughout your project. All abds components use the `<abds-` prefix. You can see an instance of the `<abds-button>` being used in `src/app/app.component.html`.

## Additional information

For more information about the abds components that are available and their props see our [ZeroHeight documentation.](https://zeroheight.com/6af807fb0/v/latest/p/56f98e-components/b/173c7d)

For more information about integrating with Angular see [Stencil's documentation here.](https://stenciljs.com/docs/angular)

---

This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli)
12.2.10 and has been migrated to Angular 22.2.2.
