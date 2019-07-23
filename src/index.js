let decimalSeparator, thousandsSeparator;

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
    }

    panTo(lat, lng) {
        this.map.panTo({ lat: stringToNum(lat), lng: stringToNum(lng) });
    }

    setCenter(lat, lng) {
        this.map.setCenter({ lat: stringToNum(lat), lng: stringToNum(lng) });
    }

    addMarker(lat, lng, title, infoText) {
        const marker = new google.maps.Marker({
            position: {
                lat: stringToNum(lat),
                lng: stringToNum(lng)
            },
            title,
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

    // Setters

    set_piZoom(value) {
        this.map.setZoom(value);
    }

    // Events

    onClick(event) {
        // console.log(event);
        this.fire('OnClick', [
            numToString(event.latLng.lat()),
            numToString(event.latLng.lng()),
            event.wa.clientX,
            event.wa.clientY
        ]);
    }

    onRightClick(event) {
        this.fire('OnRightClick', [
            numToString(event.latLng.lat()),
            numToString(event.latLng.lng()),
            event.wa.clientX,
            event.wa.clientY
        ]);
    }
}

export default global.WebGoogleMaps = WebGoogleMaps;