import MadrassatiModule from 'madrassati_module';

export default class ContentRenderer extends MadrassatiModule {
  get rendererComponent() {
    return null;
  }
  loadDirectionalCSS(direction) {
    return this.Madrassati.loadDirectionalCSS(this, direction);
  }
}
