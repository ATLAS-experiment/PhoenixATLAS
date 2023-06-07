# Phoenix ATLAS

An ATLAS version of the [Phoenix](https://github.com/hsf/phoenix) cross-experiment event display. The live version of PhoenixATLAS is [here](https://phoenixatlas.web.cern.ch/PhoenixATLAS/), which can be used to browse example events, or upload your own (JiveXML and JSON are supported).

PhoenixATLAS has also been used as an embedded event display in some Physics Briefings e.g. [New high-precision measurements of W and Z boson properties](https://atlas.cern/Updates/Briefing/WZ-properties-milestone) and [Not a jet all the way: is dark matter hiding in plain sight?](https://atlas.cern/Updates/Briefing/Semi-Visible-Jets). Have a look at the [documentation](./guides/phoenix-iframe.md) if you would like to do the same, or to make a QR code for use in e.g. a poster.

PhoenixATLAS is also used to display recent collisions on the [ATLAS Live Event Browser](https://atlas-live.cern.ch/browser?triggerStream=physics_Main) - you need to click on an event, and then click on "Open this Event in Phoenix live".

## Tips for users

* Most of the user interface is identical to phoenix, and so the [phoenix user guide](https://github.com/HSF/phoenix/blob/master/guides/users.md) should be the first place to start.
* The following explains how to use PhoenixATLAS in a poster, or blog article:
  * [Include in a web blog or article](./guides/phoenix-iframe.md)
* Additionally, for PhoenixATLAS we have some example events which can be reached through the `Event Browser` popup, selectable on the far right of the bottom menu (highlighted in red below):
<img width="1280" alt="Screenshot 2023-06-01 at 13 15 47" src="https://github.com/ATLAS-experiment/PhoenixATLAS/assets/6764617/ec5cacf4-92b8-4ea7-9199-cabbb0e1601f">

* And you can use of course use [PhoenixATLAS](https://phoenixatlas.web.cern.ch/PhoenixATLAS/) to open your own files using the `File upload` dialog (third from right in the screenshot above). PhoenixATLAS supports `json` ( written out by the [DumpEventDataToJSON](https://gitlab.cern.ch/atlas/athena/-/tree/master/Event/DumpEventDataToJSON) algorithm), or [JiveXML](https://twiki.cern.ch/twiki/bin/view/AtlasComputing/JiveXML), as used by [Atlantis](https://twiki.cern.ch/twiki/bin/view/AtlasComputing/Atlantis).

## Tips for developers
### Setup

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

### Updating to the newest version of Phoenix
This can be done with e.g.: 
```sh
yarn upgrade phoenix-event-display@latest phoenix-ui-components@latest
```

### Deployment

You can deploy Phoenix with the command:

```sh
yarn deploy
```

This will put a static production/build version of Phoenix ATLAS in the `./docs` directory which you can copy to your server.\
For example with the command: `rsync -avz docs/ phoenix@lxplus.cern.ch:/eos/atlas/atlascerngroupdisk/proj-phoenixatlas/www/atlas`

Or for dev:
`rsync -avz docs/ phoenix@lxplus.cern.ch:/eos/atlas/atlascerngroupdisk/proj-phoenixatlas/www/atlas-dev`

The following shows how to roll a new version of PhoenixATLAS, with a dedicated event as default.
* [Deploy with a specific event](./guides/deploy-specific-event.md)

## Useful guides

* [Complete user guide](https://github.com/HSF/phoenix/blob/master/guides/users.md)
* [Deploy with a specific event](./guides/deploy-specific-event.md)
* [Include in a web blog or article](./guides/phoenix-iframe.md)
