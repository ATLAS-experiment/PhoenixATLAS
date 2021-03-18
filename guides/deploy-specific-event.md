# Deploy with a specific event

Phoenix can be deployed with a specific event. To do that.

1. Copy the event data to `./src/assets` (or you can use a URL instead)
1. Specify the event data type and file path (or URL) in `./src/event-config.json`
1. Lastly, run the command: `yarn deploy:web`

The deployed application will be in `./docs` which can be copied to an HTTP server.
