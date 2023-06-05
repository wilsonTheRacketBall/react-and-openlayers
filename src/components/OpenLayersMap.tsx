import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat, toLonLat } from 'ol/proj';
import axios from 'axios';

const OpenLayersMap: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const popupDiv = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (targetRef.current && popupDiv.current && !mapRef.current) {
      const popup = new Overlay({
        element: popupDiv.current,
        positioning: 'bottom-center',
        stopEvent: false,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

      // separate map ref to target ref to avoid multiple map rendering
      // https://stackoverflow.com/questions/73441404/open-layer-renders-map-component-twice-in-react
      mapRef.current = new Map({
        target: targetRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
        overlays: [popup],
      });

      mapRef.current.on('singleclick', async (evt) => {
        const [longitude, latitude] = toLonLat(evt.coordinate);

        try {
          const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const displayName = res.data.display_name;
          if (displayName) {
            popupDiv.current!.innerHTML = displayName;
            popup.setPosition(evt.coordinate);
          } else {
            popup.setPosition(undefined);
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  }, []);


  return (
    <div
      ref={targetRef}
      data-testid="map"
      className='h-[calc(100vh-40px)] m-5'
    >
      <div
        ref={popupDiv}
        className="bg-white text-gray-900 rounded-lg shadow-sm p-2 break-words max-w-xs shadow-sm ol-popup"
      />
    </div>
  );
}

export default OpenLayersMap;
