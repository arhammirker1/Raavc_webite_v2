declare namespace L {
  interface Map {
    setView(center: [number, number], zoom: number): Map;
    invalidateSize(): Map;
    removeLayer(layer: any): Map;
  }

  interface TileLayer {
    addTo(map: Map): TileLayer;
  }

  interface Marker {
    addTo(map: Map): Marker;
    bindPopup(content: string): Marker;
    openPopup(): Marker;
  }

  function map(container: string | HTMLElement, options?: any): Map;
  function tileLayer(urlTemplate: string, options?: any): TileLayer;
  function marker(latlng: [number, number], options?: any): Marker;
}

declare var L: typeof L;
