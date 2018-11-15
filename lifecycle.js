let event = true;
class Lifecycle {

    // Handles the Config event for the motion sensor.
   static handleConfig(event) {
        if (!event.config) {
          throw new Error('No config section set in request.');
        }
        let config = {};
        const phase = event.phase;
        const pageId = event.pageId;
        const settings = event.config;
        switch (phase) {
          case 'INITIALIZE':
            config.initialize = createConfigInitializeSetting();
            console.log(config.initialize);
            break;
          case 'PAGE':
            config.page = createConfigPage(pageId, settings);
            console.log(config.page);
            break;
          default:
            throw new Error(`Unsupported config phase: ${phase}`);
            //break;
        }
        return config;
      }
    

      static createConfigInitializeSetting() {
        return {
            name: 'Turn a light on when a trigger occurs',
            description: 'Turn a light on when a trigger occurs',
            id: 'app',
            permissions:['l:devices'],
            firstPageId: '1'
          }
      }

      static createConfigPage(pageId, settings) {
        if (pageId !== '1') {
            throw new Error(`Unsupported page name: ${pageId}`);
          }
          return {
            pageId: '1',
            name: 'Some page name',
            nextPageId: null,
            previousPageId: null,
            complete: true, // last page
            sections: [
              {
                name: 'When this opens...',
                settings: [
                  {
                    id: 'contactSensor',
                    name: 'Which contact sensor?',
                    description: 'Tap to set',
                    type: 'DEVICE',
                    required: true,
                    multiple: false,
                    capabilities: ['contactSensor'],
                    permissions: ['r'] // need read permission to create subscriptions!
                  }
                ]
              },
              {
                name: 'When motion is detected',
                settings: [
                  {
                    id: 'motionSensor',
                    name: 'Which motion sensor?',
                    description: 'Tap to set',
                    type: 'DEVICE',
                    required: true,
                    multiple: false,
                    capabilities: ['motionSensor'],
                    permissions: ['r']
                  }
                ]
              }
            ]
          };
      }




}
module.exports = Lifecycle;