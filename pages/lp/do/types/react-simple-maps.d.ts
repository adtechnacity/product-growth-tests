declare module "react-simple-maps" {
  import { ReactNode, CSSProperties } from "react";

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }
  export function ComposableMap(props: ComposableMapProps): JSX.Element;

  interface ZoomableGroupProps {
    zoom?: number;
    center?: [number, number];
    onMoveEnd?: (data: { coordinates: [number, number]; zoom: number }) => void;
    children?: ReactNode;
  }
  export function ZoomableGroup(props: ZoomableGroupProps): JSX.Element;

  interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: GeoFeature[] }) => ReactNode;
  }
  interface GeoFeature {
    rsmKey: string;
    [key: string]: unknown;
  }
  export function Geographies(props: GeographiesProps): JSX.Element;

  interface GeographyProps {
    geography: GeoFeature;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: CSSProperties;
      hover?: CSSProperties;
      pressed?: CSSProperties;
    };
  }
  export function Geography(props: GeographyProps): JSX.Element;

  interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
  }
  export function Marker(props: MarkerProps): JSX.Element;

  interface LineProps {
    coordinates?: [number, number][];
    from?: [number, number];
    to?: [number, number];
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    strokeLinecap?: string;
    fill?: string;
    opacity?: number;
  }
  export function Line(props: LineProps): JSX.Element;
}
