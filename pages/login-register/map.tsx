import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import the mapbox-gl styles so that the map is displayed correctly

function MapBox() {
    // this is where the map instance will be stored after initialization
    const [map, setMap] = React.useState<mapboxgl.Map>();

    // React ref to store a reference to the DOM node that will be used
    // as a required parameter `container` when initializing the mapbox-gl
    // will contain `null` by default
    const mapNode = React.useRef(null);

    React.useEffect(() => {
        const node = mapNode.current;
        // if the window object is not found, that means
        // the component is rendered on the server
        // or the dom node is not initialized, then return early
        if (typeof window === "undefined" || node === null) return;

        // otherwise, create a map instance
        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: "pk.eyJ1IjoiaGllcHRyYW5oZyIsImEiOiJjbGZpMHloNWgwYmtjM3FxZ3FydjZnamJrIn0.XNKsOlDxRMaFOOF8NlKDlA",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [105.85, 21.01],
            // center: [104.989085, 22.809296],
            zoom: 10,
        });

        const marker = new mapboxgl.Marker({
            anchor: "bottom",
            offset: [0, -10],
            color: 'red',
        });

        marker.setLngLat([105.85, 21.01]);
        // marker.setLngLat([104.989085, 22.809296]);

        // add the marker to the map
        
        setMap(mapboxMap);
        marker.addTo(mapboxMap);

        return () => {
            marker.remove();
            mapboxMap.remove();
        };
    }, []);

    return <div ref={mapNode} style={{ marginTop: 50, width: "50%", height: "50%" }} />;
}

export default MapBox;