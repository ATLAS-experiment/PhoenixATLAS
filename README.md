# Phoenix ATLAS

An ATLAS version of [Phoenix](https://github.com/hsf/phoenix).

## Setup

To setup, you will need [Node.js](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/en/docs/install/).

To install yarn using npm package manager (which comes with Node.js).

```sh
npm install --global yarn
```

Once you have Node.js and yarn set up you can run this command to install the dependencies:

```sh
yarn install
```

To run in development mode:

```sh
yarn start
```

## Deployment

You can deploy Phoenix with the command:

```sh
yarn deploy
```

This will put a built version of Phoenix ATLAS in the `./docs` directory which you can copy to your server.\
For example with the command: `rsync -avz docs/ your-server.net:path/to/website`

## Useful guides

* [Deploy with a specific event](./guides/deploy-specific-event.md)
