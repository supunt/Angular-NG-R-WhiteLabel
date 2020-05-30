export interface LatLong {
  lat: number;
  lng: number;
}

// -------------------------------------------------------------------------------------------------------------------
export interface GoogleMapMarker extends LatLong {
  uuid: string;
  label?: string;
  draggable: boolean;
  address?: string;
  saved: boolean;
  iconColor: string;
}

// -------------------------------------------------------------------------------------------------------------------
export interface UsersMarker extends GoogleMapMarker {
  saved: boolean;
}

// -------------------------------------------------------------------------------------------------------------------
export interface GoolgPlacePrediction {
  description: string;
  place_id: string;
}
