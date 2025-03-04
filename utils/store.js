import Writeable from './writeable.js';

export const store = {
  // Implement your own variables here
  currency: new Writeable( 'USD' ),
  status: new Writeable( null ),
  units: new Writeable( null )
};

// Then in your module
// import {store} from './util/store.js';
