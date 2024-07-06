import React from "react";
import { AsyncResult, Awaiting, Failure, Success } from "@tactics/js-monad";

interface GeolocationState {
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface Position {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

interface PositionError {
  code: number;
  message: string;
}

export function useGeolocation(
  options: GeolocationOptions = {},
): AsyncResult<GeolocationState> {
  const [state, setState] = React.useState<AsyncResult<GeolocationState>>(
    new Awaiting(),
  );
  const optionsRef = React.useRef<GeolocationOptions>(options);

  React.useEffect(() => {
    const onEvent = ({ coords, timestamp }: Position) => {
      setState(
        Success.of({
          timestamp,
          latitude: coords.latitude,
          longitude: coords.longitude,
          altitude: coords.altitude,
          accuracy: coords.accuracy,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed,
        }),
      );
    };

    const onEventError = (error: PositionError) => {
      setState(Failure.dueTo(error.message, String(error.code)));
    };

    const { enableHighAccuracy, timeout, maximumAge } = optionsRef.current;

    navigator.geolocation.getCurrentPosition(onEvent, onEventError, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    });

    const watchId = navigator.geolocation.watchPosition(onEvent, onEventError, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
}
