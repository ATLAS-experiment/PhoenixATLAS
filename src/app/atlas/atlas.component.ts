import { Component, OnInit } from "@angular/core";
import {
  Configuration,
  PhoenixLoader,
  PhoenixMenuNode,
  PresetView,
} from "phoenix-event-display";
import { EventDisplayService } from "phoenix-ui-components";

@Component({
  selector: "atlas-experiment",
  templateUrl: "./atlas.component.html",
  styleUrls: [],
})
export class ATLASComponent implements OnInit {
  phoenixMenuRoot = new PhoenixMenuNode("Phoenix Menu", "phoenix-menu");
  loaded = false;

  constructor(private eventDisplay: EventDisplayService) {}

  ngOnInit(): void {
    let defaultEvent: { eventFile: string; eventType: string };
    // TODO Get default event from configuration
    // if (environment?.singleEvent) {
    //   defaultEvent = eventConfig;
    // } else {
    //   defaultEvent = {
    //     eventFile: 'assets/files/JiveXML/JiveXML_336567_2327102923.xml',
    //     eventType: 'jivexml',
    //   };
    // }
    defaultEvent = {
      eventFile: "assets/files/jive-xml/JiveXML_336567_2327102923.xml",
      eventType: "jivexml",
    };

    // Define the configuration
    const configuration: Configuration = {
      eventDataLoader: new PhoenixLoader(),
      presetViews: [
        new PresetView("Left View", [0, 0, -12000], "left-cube"),
        new PresetView("Center View", [-500, 12000, 0], "top-cube"),
        new PresetView("Right View", [0, 0, 12000], "right-cube"),
      ],
      defaultView: [4000, 0, 4000],
      // Set the phoenix menu to be used (defined above)
      phoenixMenuRoot: this.phoenixMenuRoot,
      // Default event data to fallback to if none given in URL
      // Do not set if there should be no event loaded by default
      defaultEventFile: defaultEvent,
    };

    // Initialize the event display
    this.eventDisplay.init(configuration);

    // Load detector geometries
    this.eventDisplay.loadOBJGeometry(
      "assets/geometry/toroids.obj",
      "Toroids",
      0x8c8c8c,
      undefined,
      false,
      false
    );
    this.eventDisplay.loadOBJGeometry(
      "assets/geometry/TRT.obj",
      "TRT",
      0x356aa5,
      undefined,
      false
    );
    this.eventDisplay.loadOBJGeometry(
      "assets/geometry/SCT.obj",
      "SCT",
      0xfff400,
      undefined,
      false
    );
    this.eventDisplay.loadOBJGeometry(
      "assets/geometry/pixel.obj",
      "Pixel",
      0x356aa5,
      undefined,
      false
    );
    this.eventDisplay.loadOBJGeometry(
      "assets/geometry/LAR_Bar.obj",
      "LAr Barrel",
      0x19ccd2,
      undefined,
      true,
      false
    );
    this.eventDisplay.loadOBJGeometry(
      "assets/geometry/LAR_EC1.obj",
      "LAr EC1",
      0x19ccd2,
      undefined,
      true,
      false
    );
    this.eventDisplay.loadOBJGeometry(
      "assets/geometry/LAR_EC2.obj",
      "LAr EC2",
      0x19ccd2,
      undefined,
      true,
      false
    );
    this.eventDisplay.loadOBJGeometry(
      "assets/geometry/TileCal.obj",
      "Tile Cal",
      0xc14343,
      undefined,
      true,
      false
    );

    this.eventDisplay.getLoadingManager().addLoadListenerWithCheck(() => {
      this.loaded = true;
      // TODO
      // const stateManager = new StateManager();
      // stateManager.loadStateFromJSON(phoenixMenuConfig);
    });
  }
}
