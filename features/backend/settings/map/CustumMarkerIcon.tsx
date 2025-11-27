import { Icon } from "leaflet";

export const customIcon = new Icon({
  iconUrl: "/icons/marker-icon.png",
  shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
