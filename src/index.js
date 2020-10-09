let decimalSeparator, thousandsSeparator;

const showRouteActionDataFormat = {
    waypoints: [ df.tString ]
};

function stringToNum(string) {
    return df.sys.data.stringToNum(string, decimalSeparator, thousandsSeparator);
}

function numToString(num) {
    return df.sys.data.numToString(num, decimalSeparator);
}

class WebGoogleMaps extends df.WebBaseControl {
    constructor(sName, oParent) {
        super(sName, oParent);

        decimalSeparator = this.getWebApp().psDecimalSeparator;
        thousandsSeparator = this.getWebApp().psThousandsSeparator;

        // Server-side defined by cWebBaseControl, but client-side not so much...
        this.prop(df.tInt, "piMinHeight", 0);

        this.prop(df.tNumber, 'pnInitialCenterLat'); // will be string, DF bug
        this.prop(df.tNumber, 'pnInitialCenterLng'); // will be string, DF bug
        this.prop(df.tInt, 'piZoom');
        this.addSync('piZoom');

        this.event('OnClick');
        this.event('OnRightClick');
    }

    openHtml(aHtml) {
        super.openHtml(aHtml);
        aHtml.push(`<div id="${this._sControlId}" style="border: 1px solid black">`);
        aHtml.push('</div>');
    }

    afterRender() {
        this._eControl = df.dom.query(this._eElem, `#${this._sControlId}`);
        super.afterRender();
        this.initializeMap();
    }

    initializeMap() {
        this.map = new google.maps.Map(this._eControl, {
            center: {
                lat: stringToNum(this.pnInitialCenterLat),
                lng: stringToNum(this.pnInitialCenterLng)
            },
            zoom: this.piZoom
        });
        this.map.addListener('zoom_changed', () => {
            this.piZoom = this.map.getZoom();
        });
        this.map.addListener('click', this.onClick.bind(this));
        this.map.addListener('rightclick', this.onRightClick.bind(this));

        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(this.map);
    }

    panTo(lat, lng) {
        this.map.panTo({ lat: stringToNum(lat), lng: stringToNum(lng) });
    }

    setCenter(lat, lng) {
        this.map.setCenter({ lat: stringToNum(lat), lng: stringToNum(lng) });
    }

    addMarker(lat, lng, title, infoText, iconUrl) {
        const marker = new google.maps.Marker({
            position: {
                lat: stringToNum(lat),
                lng: stringToNum(lng)
            },
            title,
            icon: iconUrl,
            map: this.map
        });

        if (infoText) {
            const infoWindow = new google.maps.InfoWindow({
                content: infoText
            });
            marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
            });
        }
    }

    geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.map.setCenter({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                this.map.setZoom(17);
            });
        }
    }

    showRoute(origin, destination) {
        const waypoints = this._tActionData.c.length
            ? df.sys.vt.deserialize(this._tActionData, showRouteActionDataFormat).waypoints.map(location => ({ location }))
            : [];
        this.directionsService.route({ origin, destination, waypoints, travelMode: 'DRIVING' }, (result, status) => {
            if (status === 'OK') {
                this.directionsDisplay.setDirections(result);
            }
        });
    }

    // Setters

    set_piZoom(value) {
        this.map.setZoom(value);
    }

    // Events

    onClick(event) {
        const mouseEvent = Object.values(event).find(p => p instanceof window.MouseEvent);
        this.fire('OnClick', [
            numToString(event.latLng.lat()),
            numToString(event.latLng.lng()),
            mouseEvent.clientX,
            mouseEvent.clientY
        ]);
    }

    onRightClick(event) {
        const mouseEvent = Object.values(event).find(p => p instanceof window.MouseEvent);
        this.fire('OnRightClick', [
            numToString(event.latLng.lat()),
            numToString(event.latLng.lng()),
            mouseEvent.clientX,
            mouseEvent.clientY
        ]);
    }
}

export default global.WebGoogleMaps = WebGoogleMaps;