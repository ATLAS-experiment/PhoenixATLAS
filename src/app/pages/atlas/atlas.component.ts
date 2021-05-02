import { Component, OnInit } from '@angular/core';
import {
  Configuration,
  PhoenixLoader,
  PhoenixMenuNode,
  PresetView,
  StateManager,
} from 'phoenix-event-display';
import { EventDisplayService } from 'phoenix-ui-components';
import { environment } from '../../../environments/environment';
import eventConfig from '../../../event-config.json';
import phoenixMenuConfig from '../../../assets/files/config/atlas-config.json';

@Component({
  selector: 'atlas-experiment',
  templateUrl: './atlas.component.html',
  styleUrls: [],
})
export class ATLASComponent implements OnInit {
  phoenixMenuRoot = new PhoenixMenuNode('Phoenix Menu', 'phoenix-menu');
  loaded = false;
  loadingProgress = 0;

  constructor(private eventDisplay: EventDisplayService) {}

  ngOnInit() {
    let defaultEvent: { eventFile: string; eventType: string };
    if (environment?.singleEvent) {
      defaultEvent = eventConfig;
    } else {
      defaultEvent = {
        eventFile: 'assets/files/jive-xml/JiveXML_336567_2327102923.xml',
        eventType: 'jivexml',
      };
    }

    // Define the configuration
    const configuration: Configuration = {
      eventDataLoader: new PhoenixLoader(),
      presetViews: [
        new PresetView('Left View', [0, 0, -12000], 'left-cube'),
        new PresetView('Center View', [-500, 12000, 0], 'top-cube'),
        new PresetView('Right View', [0, 0, 12000], 'right-cube'),
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

    // Magnets + Support
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Barrel-Toroid.gltf',
      'Barrel Toroid',
      'Magnets',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/End-Cap-Toroid.gltf',
      'Endcap',
      'Magnets',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Feet.gltf',
      'Feet',
      'Magnets',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Warm-Structure.gltf',
      'Warm structure',
      'Magnets',
      1000,
      false
    );

    // LAr
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Lar-Barrel.gltf',
      'LAr Barrel',
      'Calorimeters',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Lar-EMEC.gltf',
      'LAr EC1',
      'Calorimeters',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Lar-FCAL.gltf',
      'LAr FCAL',
      'Calorimeters',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Lar-HEC.gltf',
      'LAr HEC',
      'Calorimeters',
      1000,
      false
    );

    // Tile
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Tile-Barrel.gltf',
      'Tile Cal',
      'Calorimeters',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Tile-End-Cap.gltf',
      'Tile Cal EC',
      'Calorimeters',
      1000,
      false
    );

    // Inner Detector
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Beam.gltf',
      'Beam',
      'Inner Detector',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Pixel.gltf',
      'Pixel',
      'Inner Detector',
      1000,
      true
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/SCT-BAR.gltf',
      'SCT',
      'Inner Detector',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/SCT-EC.gltf',
      'SCT Endcaps',
      'Inner Detector',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/TRT-BAR.gltf',
      'TRT',
      'Inner Detector',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/TRT-EC.gltf',
      'TRT Endcaps',
      'Inner Detector',
      1000,
      false
    );

    // Muons
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Extra-Wheel.gltf',
      'Extra wheel',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Big-Wheel.gltf',
      'Big wheel',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Outer-Wheel.gltf',
      'Outer Wheel',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Muon-Barrel-Inner.gltf',
      'Muon Barrel Inner',
      'Muon Spectrometer > Barrel',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Muon-Barrel-Middle.gltf',
      'Muon Barrel Middle',
      'Muon Spectrometer > Barrel',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Muon-Barrel-Outer.gltf',
      'Muon Barrel Outer',
      'Muon Spectrometer > Barrel',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Muon-Big-Wheel-MDT.gltf',
      'Big Wheel MDT ',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Small-Wheel-Chambers.gltf',
      'Small Wheel',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Small-Wheel-Hub.gltf',
      'Small Wheel Hub',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Small-Wheel-NJD.gltf',
      'Small Wheel Feet',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/TGC2.gltf',
      'TGC2',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/TGC3.gltf',
      'TGC3',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
    this.eventDisplay
      .getLoadingManager()
      .addProgressListener((progress) => (this.loadingProgress = progress));

    this.eventDisplay.getLoadingManager().addLoadListenerWithCheck(() => {
      this.loaded = true;
      const stateManager = new StateManager();
      stateManager.loadStateFromJSON(phoenixMenuConfig);
      this.eventDisplay.animateClippingWithCollision(10000);
    });
  }
}
