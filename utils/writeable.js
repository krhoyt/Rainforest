export default class Writeable {
  constructor( value ) {
    this.value = value;
    this.listeners = [];
  }

  get() {
    return this.value;
  }

  set( value ) {
    if( this.value !== value ) {
      this.value = value;
      this.dispatch( this.value );
    }
  }

  subscribe( callback ) {
    this.listeners.push( callback );
    this.dispatch( this.value );
  }

  dispatch( evt ) {
    for( let h = 0; h < this.listeners.length; h++ ) {
      this.listeners[h]( evt );
    }
  }      
}
