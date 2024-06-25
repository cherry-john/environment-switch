# Environment Switcher Web Extension

This Web extension allows you to easily identify and switch between environments within a project.

It uses [wxt](https://wxt.dev) as a web extension framework.

## Getting Started

This is a React Typescript project, which requres nodejs and npm. The latest versions used to generate the extension bundles are NodeJS `v20.12.2` and npm `10.8.0`

Once you've installed NodeJs run:
```
npm i

npm run dev
```

This will open firefox, with the plugin installed. If you prefer to develop in chrome run:

```
npm run dev:chrome
```

## Building

```
npm run build
npm run build:chrome
```

## Bundling

wxt creates zip files ready for upload to the Mozilla Add-on Store and Chrome Web Store:

```
npm run zip
npm run zip:chrome
```
