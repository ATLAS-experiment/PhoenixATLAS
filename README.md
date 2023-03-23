# Phoenix ATLAS

An ATLAS version of [Phoenix](https://github.com/hsf/phoenix). The live version is [here](https://phoenixatlas.web.cern.ch/PhoenixATLAS/)

## Tips for users
Most of the user interface is identical to phoenix, and so the [phoenix user guide](https://github.com/HSF/phoenix/blob/master/guides/users.md) should be the first place to start.

There are a few special additions to PhoenixATLAS however, notably in terms of special url parameters you can pass such as:
* `theme` - can be used to force the theme to either dark or light
* `geom` - can be used to specify the geometry version. Options are 'simple', 'run2', 'run3', 'run4'  

And there are still the 'usual' Phoenix options such as 'file', 'config' and 'embed'.

## Setup

To setup, you will need [Node.js](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/).

To install yarn using corepack:

```sh
corepack enable
```

Once you have Node.js and yarn set up you can run this command to install the dependencies:

```sh
yarn install
# For macOS Ventura you may need to specify C++ version, e.g. yarn install -std=c++17

```

To run in development mode:

```sh
yarn start
```

This will start Phoenix ATLAS locally which you can access through the URL [http://localhost:4200](http://localhost:4200).

Remember that this is using a local app, and so if you want to update the base configuration then you will need to edit this (i.e. if you want to change the geometry, or the configuration).

## Updating to the newest version of Phoenix
This can be done with e.g.: 
```sh
yarn upgrade phoenix-event-display@latest phoenix-ui-components@latest
```

## Deployment

You can deploy Phoenix with the command:

```sh
yarn deploy
```

This will put a static production/build version of Phoenix ATLAS in the `./docs` directory which you can copy to your server.\
For example with the command: `rsync -avz docs/ phoenix@lxplus.cern.ch:/eos/atlas/atlascerngroupdisk/proj-phoenixatlas/www/atlas`

Or for dev:
`rsync -avz docs/ phoenix@lxplus.cern.ch:/eos/atlas/atlascerngroupdisk/proj-phoenixatlas/www/atlas-dev`

## Useful guides

* [Complete user guide](https://github.com/HSF/phoenix/blob/master/guides/users.md)
* [Deploy with a specific event](./guides/deploy-specific-event.md)
* [Include in a web blog or article](./guides/phoenix-iframe.md)
