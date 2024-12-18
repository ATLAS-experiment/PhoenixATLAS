import { Component, OnInit } from '@angular/core';
import {
  Configuration,
  JiveXMLLoader,
  PhoenixMenuNode,
  PresetView,
  StateManager,
} from 'phoenix-event-display';
import { EventDataFormat, EventDataImportOption, EventDisplayService } from 'phoenix-ui-components';
import { environment } from '../../../environments/environment';
import { getUrlOptions } from '../../functions/url-options';
import eventConfig from '../../../event-config.json';
import phoenixMenuConfigR3 from '../../../assets/files/config/phoenix-config.json';
import phoenixMenuConfigR4 from '../../../assets/files/config/run4.json';

@Component({
  selector: 'atlas-experiment',
  templateUrl: './atlas.component.html',
  styleUrls: [],
})
export class ATLASComponent implements OnInit {
  apiURL = '../api/read-files.php';
  phoenixMenuRoot = new PhoenixMenuNode('Phoenix Menu', 'phoenix-menu');
  eventDataImportOptions: EventDataImportOption[] = [
    EventDataFormat.JSON,
    EventDataFormat.JIVEXML,
    EventDataFormat.ZIP,
  ];
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

    const urlOptions = getUrlOptions();


    // Define the configuration
    const configuration: Configuration = {
      eventDataLoader: new JiveXMLLoader([
        'CombinedMuonTracks',
        'MuonSpectrometerTracks',
        'Muons_xAOD',
      ]),
      presetViews: [
        new PresetView('Left View', [0, 0, -12000], [0, 0, 0], 'left-cube'),
        new PresetView('Center View', [-500, 12000, 0], [0, 0, 0], 'top-cube'),
        new PresetView('Right View', [0, 0, 12000], [0, 0, 0], 'right-cube'),
      ],
      defaultView: [4000, 0, 4000],
      // Set the phoenix menu to be used (defined above)
      phoenixMenuRoot: this.phoenixMenuRoot,
      // Default event data to fallback to if none given in URL
      // Do not set if there should be no event loaded by defaultF
      defaultEventFile: defaultEvent,
    };

    const theme = urlOptions.get('theme');
    if (theme){
      const choices = ['dark', 'light'];
      if (choices.includes(theme.toLocaleLowerCase())) {
        configuration.forceColourTheme=theme; 
      } else {
        console.log('Unknown theme ', theme)
      }
    }


    // Initialize the event display
    this.eventDisplay.init(configuration);

    // Load detector geometries
    let geometryVersion = urlOptions.get('geom');
    if (geometryVersion) {
      console.log('Trying to open geometry: ', geometryVersion);
    } else {
      console.log('Defaulting to run3 geometry');
      geometryVersion = 'run3Full';
    }

    let defaultConfig = phoenixMenuConfigR3;
    switch (geometryVersion) {
      case 'run2Simple':
      case 'simple':
        this.simpleGeometry();
        break;
      case 'run2':
      case 'run2Full':
        this.run2FullGeometry();
        break;
      case 'run3':
      case 'run3Full':
        this.run3FullGeometry();
        break;
      case 'run4':
      case 'run4Full':
        this.run4FullGeometry();
        defaultConfig = phoenixMenuConfigR4;
        break;
      default:
        console.log(
          'Unknown geometry key: ',
          geometryVersion,
          'No geometry shown!'
        );
        break;
    }

    this.eventDisplay
      .getLoadingManager()
      .addProgressListener((progress) => (this.loadingProgress = progress));

    this.eventDisplay.getLoadingManager().addLoadListenerWithCheck(() => {
      this.loaded = true;

      const urlConfig = urlOptions.get('config');

      if (!urlConfig) {
        const stateManager = new StateManager();
        stateManager.loadStateFromJSON(defaultConfig);
        this.eventDisplay.animateClippingWithCollision(10000);
      }
    });
  }

  private fullMagnetGeometry() {
    // Magnets + Support
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Barrel-Toroid.glb',
      'Barrel Toroid',
      'Magnets',
      1000,
      true
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
      true
    );
  }

  private fullCaloGeometry() {
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
  }

  private run2FullGeometry() {
    this.run3InnerDetector(); // Same as run-2
    this.fullCaloGeometry();
    this.run3MuonSpectrometer();
    this.fullMagnetGeometry();
    // We do not have the run-2 Muon geometry. :-(
  }

  private run3MuonSpectrometer() {
    this.muonSpectrometerBigWheel();
    this.muonSpectrometerBarrel();

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
  }

  private muonSpectrometerBarrel() {
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
  }

  private muonSpectrometerBigWheel() {
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
      'assets/geometry/Muon-Big-Wheel-MDT.gltf',
      'Big Wheel MDT ',
      'Muon Spectrometer > Endcaps',
      1000,
      false
    );
  }

  private run3InnerDetector() {
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
      true
    );
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/SCT-EC.gltf',
      'SCT Endcaps',
      'Inner Detector',
      1000,
      true
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
  }

  private simpleGeometry() {
    // Magnets + Support
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/Toroids_Simple.glb',
      'Barrel Toroid',
      undefined,
      1000,
      false
    );

    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/LArBarrel_Simple.glb',
      'LAr Barrel',
      undefined,
      1000,
      true
    );

    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/InnerDetector_Simple.glb',
      'Inner Detector',
      undefined,
      1000,
      true
    );
  }

  private run3FullGeometry() {
    // These aren't really changing
    this.fullMagnetGeometry();
    this.fullCaloGeometry();
    this.run3InnerDetector();
    this.run3MuonSpectrometer();
  }

  private run4FullGeometry() {
    this.itkGeometry();
    this.fullMagnetGeometry();
    this.fullCaloGeometry();
    this.run3MuonSpectrometer();
  }

  private itkGeometry() {
    this.eventDisplay.loadGLTFGeometry(
      'assets/geometry/run4/ITK.glb',
      undefined,
      'ITK',
      1000,
      false
    );
  }
}
