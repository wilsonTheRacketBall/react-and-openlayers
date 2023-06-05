import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OpenLayersMap from '../OpenLayersMap';
import axios from 'axios';
import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// mock openlayers
jest.mock('ol/Map');
jest.mock('ol/View');
jest.mock('ol/Overlay');
jest.mock('ol/layer/Tile');
jest.mock('ol/source/OSM');

describe('OpenLayersMap', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: { display_name: "Test location" } });

    (Map as jest.Mock).mockImplementation(() => {
      return {
        on: jest.fn((event, handler) => handler({ coordinate: [0, 0] })),
      };
    });
    (Overlay as jest.Mock).mockImplementation(() => {
      return {
        setPosition: jest.fn(),
      };
    });
    (View as jest.Mock).mockImplementation(() => { return {}; });
    (TileLayer as jest.Mock).mockImplementation(() => { return {}; });
    (OSM as jest.Mock).mockImplementation(() => { return {}; });
  });

  afterEach(() => {
    mockedAxios.get.mockReset();
  });

  test('renders OpenLayersMap component', () => {
    render(<OpenLayersMap />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  test('renders OpenLayersMap component without errors and handles click events', () => {
    render(<OpenLayersMap />);
    const mapElement = screen.getByTestId('map');
    fireEvent.click(mapElement);

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(Overlay).toHaveBeenCalled();
  });
});
