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

* The geometry version can be selected by adding the choice to the URL e.g. https://phoenixatlas.web.cern.ch/PhoenixATLAS/?geom=run4Full.
  * All possible options are shown in [atlas.component.ts](https://github.com/ATLAS-experiment/PhoenixATLAS/blob/main/src/app/pages/atlas/atlas.component.ts)
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
# For macOS you need to make sure you have done: brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

To run in development mode:

```sh
yarn start
```

This will start Phoenix ATLAS locally which you can access through the URL [http://localhost:4200](http://localhost:4200).

Remember that this is using a local app, and so if you want to update the base configuration then you will need to edit this (i.e. if you want to change the geometry, or the configuration).

N.B. To clean up the build directory, you can use:
```sh
git clean -fdx
```

### Updating to the newest version of Phoenix
This can be done with e.g.: 
```sh
yarn upgrade phoenix-event-display@latest phoenix-ui-components@latest
```
or use:
```
yarn upgrade-interactive
```
to upgrade many dependencies at the same time (see the yarn [https://classic.yarnpkg.com/lang/en/docs/cli/upgrade-interactive/](documentation) for more details on this command).

**After upgrading, check for missing icons.** `phoenix-ui-components` ships no icon assets of its own - it expects the consuming app to supply its own copy under `src/assets/icons/`. A phoenix update that adds new UI panels/controls will reference new icon files this repo doesn't have yet, which only shows up as 404s when you actually run the app (not as a build error), so:

1. Run `yarn start`, open the app, and check the browser console/network tab for 404s under `assets/icons/`.
2. For each missing `<icon-name>.svg`, fetch it from [HSF/phoenix's reference app](https://github.com/HSF/phoenix/tree/main/packages/phoenix-ng/projects/phoenix-app/src/assets/icons), e.g.:
   ```sh
   curl -O https://raw.githubusercontent.com/HSF/phoenix/main/packages/phoenix-ng/projects/phoenix-app/src/assets/icons/<icon-name>.svg
   mv <icon-name>.svg src/assets/icons/
   ```
3. Restart `yarn start` (the dev server only copies `assets/` at startup, so newly added icon files won't be picked up without a restart) and confirm the 404s are gone.

`phoenix-ui-components` does not ship any icon assets in its npm package - it expects the consuming app to provide its own copy under `src/assets/icons/`. If a phoenix update adds new UI panels/controls, it will reference new icon files that this repo doesn't have yet, which only shows up as 404s when actually running the app (not as a build error). After upgrading, run the app and check the browser console for 404s under `assets/icons/`, then copy any missing `.svg` files from [HSF/phoenix's reference app assets](https://github.com/HSF/phoenix/tree/main/packages/phoenix-ng/projects/phoenix-app/src/assets/icons) into `src/assets/icons/`.

### Deployment

You can deploy Phoenix with the command:

```sh
yarn deploy
```

This will put a static production/build version of Phoenix ATLAS in the `./docs` directory which you can copy to your server.
For example with the command: `rsync -avz docs/ lxplus.cern.ch:/eos/atlas/atlascerngroupdisk/proj-phoenixatlas/www/atlas`

This is accessible at https://phoenixatlas.web.cern.ch/PhoenixATLAS

Or for dev:
`rsync -avz docs/ lxplus.cern.ch:/eos/atlas/atlascerngroupdisk/proj-phoenixatlas/www/atlas-dev`

which is accessible at https://phoenixatlastest.web.cern.ch

The following shows how to roll a new version of PhoenixATLAS, with a dedicated event as default.
* [Deploy with a specific event](./guides/deploy-specific-event.md)

## Useful guides

* [Complete user guide](https://github.com/HSF/phoenix/blob/master/guides/users.md)
* [Deploy with a specific event](./guides/deploy-specific-event.md)
* [Include in a web blog or article](./guides/phoenix-iframe.md)
