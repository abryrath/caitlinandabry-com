//import '//'

import { createClient as GoogleMapsClient } from '@google/maps';
import GoogleMapsLoader from 'google-maps';

const latLng = {
    uptown: {
        lat: 35.227865400,
        lng: -80.841657200,
    },
    dilworth: {
        lat: 0,
        lng: 0,
    },
};

class Map
{
    constructor(node) {
        this.element = node;
        
        this.data = JSON.parse(document.querySelector('[data-map-places]').dataset.mapPlaces);
        this.markers = [];
        this.options = {
            zoom: 12,
            center: latLng.uptown,
        };
        
        GoogleMapsLoader.KEY = 'AIzaSyDrh4JkgNYXZRNcEF4lK84CU3h8c0PQXVI';
        GoogleMapsLoader.VERSION = 'weekly';
        GoogleMapsLoader.LIBRARIES = ['places', 'geometry'];
        
        GoogleMapsLoader.load(google => {
            this.map = new google.maps.Map(this.element, this.options);
            this.placesService = new google.maps.places.PlacesService(this.map);

            if (this.data) {
                this.getData(this.data);
            }
        });

        GoogleMapsLoader.onLoad(this.onLoad.bind(this));
    }

    getData(data) {
        data.forEach(place => {
            // console.log(place);
            const request = {
                query: place.address,
                fields: ['photos', 'name', 'rating', 'formatted_address', 'opening_hours', 'geometry'],
            };
            this.placesService.findPlaceFromQuery(request, this.placesCallback.bind(this));
        });
    }

    placesCallback(results, status) {
        GoogleMapsLoader.load(google => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
                this.createMarkers(results);
                
            }
        });
    }

    createMarkers(places) {
        GoogleMapsLoader.load(google => {
            places.forEach(place => {
                this.bounds = this.bounds || new google.maps.LatLngBounds();
        
                const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: this.map,
                    title: place.name,
                });
    
                const content = `
                <div class="Map-infoWindow">
                    <h3>${place.name}</h3>
                    <div class="Map-infoWindow--rating">Rating: ${place.rating}</div>
                    <div class="Map-infoWindow--open">${place.opening_hours.open_now ? 'Open Now' : 'Closed'}</div>
                    <a class="Map-infoWindow--directions" target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.formatted_address)}">${place.formatted_address}</a>
                    <div class="Map-infoWindow--image">
                        <img src="${place.photos[0].getUrl()}">
                    </div>
                </div>
                `;
                const infoWindow = new google.maps.InfoWindow({
                    content
                });

                marker.addListener('click', () => infoWindow.open(this.map, marker));

                this.markers.push(marker);
                this.bounds.extend(place.geometry.location);
            });

            this.fit();
        });
    }

    removeMarkers() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.bounds = null;
    }

    onLoad() {
        window.map = this;
        return;
    }

    fit() {
        this.map.fitBounds(this.bounds);
    }

    center(area) {
        let center = {};
        switch (area) {
            case 'uptown':
                center = latLng.uptown;
                break;
            case 'dilworth':
            default:
                center = latLng.dilworth;
        }
        this.map.setCenter(center);
    }
}

export const onInit = () => {
    const map = document.querySelector('[data-map]');
    if (map) {
        new Map(map);
    }
};