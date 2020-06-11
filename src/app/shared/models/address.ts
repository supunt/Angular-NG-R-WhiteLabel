import { GoogleMapMarker } from './google-maps';


// -------------------------------------------------------------------------------------------------------------------
export enum PropertyType {
  House = 0,
  TownHouse,
  Unit,
  Apartment,
}

// -------------------------------------------------------------------------------------------------------------------
export function getPropertyTypeDisplay(type: PropertyType) {
  switch (type) {
    case PropertyType.House:
      return 'House'; break;
    case PropertyType.TownHouse:
      return 'Town House'; break;
    case PropertyType.Unit:
      return 'Unit'; break;
    case PropertyType.Apartment:
      return 'Apartment'; break;
  }
}

// -------------------------------------------------------------------------------------------------------------------
export enum PropertyState {
  Leased = 0,
  OwnerOccupied,
  OnSale,
  OpenForLease,
  UnderRenovation
}


// -------------------------------------------------------------------------------------------------------------------
export function getPropertyStateDisplay(type: PropertyState) {
  switch (type) {
    case PropertyState.Leased:
      return 'Leased'; break;
    case PropertyState.OwnerOccupied:
      return 'Owner Occupied'; break;
    case PropertyState.OnSale:
      return 'On Sale'; break;
    case PropertyState.OpenForLease:
      return 'Open For Lease'; break;
    case PropertyState.UnderRenovation:
      return 'Under Renovation'; break;
  }
}


// -------------------------------------------------------------------------------------------------------------------
export class Property implements GoogleMapMarker {
  public uuid: string;
  public label = '';
  public draggable = true;
  public address = '';
  public saved = false;
  public lat: number;
  public lng: number;
  public notes = '';
  public propertyType: PropertyType = null;
  public propertyState: PropertyState = null;
  public iconColor = 'red';
}


export function cloneProperty(orgProp: Property) {
  const locAddr = new Property();
  locAddr.uuid = orgProp.uuid;
  locAddr.label = orgProp.label;
  locAddr.draggable = orgProp.draggable;
  locAddr.address = orgProp.address;
  locAddr.lat = orgProp.lat;
  locAddr.lng = orgProp.lng;
  locAddr.propertyType = orgProp.propertyType;
  locAddr.propertyState = orgProp.propertyState;
  locAddr.saved = orgProp.saved;
  locAddr.iconColor = orgProp.iconColor;
  locAddr.notes = orgProp.notes;

  return locAddr;
}
