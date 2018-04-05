import destination from '@turf/destination';
import * as helpers from '@turf/helpers';
import envelope from '@turf/envelope';
import {Feature, Polygon, LineString} from 'geojson'
import { lineString } from '@turf/destination/node_modules/@turf/helpers';

export const getGeomUtils = ():GeomUtils => {

    if(window['geomUtils'] == undefined) {
        window['geomUtils'] = new GeomUtils();
    }

    return window['geomUtils'];
};

class GeomUtils {

    envelopeBufferFromPoint(point, radius):Feature<Polygon> {
        var nwPoint = destination(point, radius, 315, {'units':'meters'});
        var sePoint = destination(point, radius, 135, {'units':'meters'});
        return envelope(helpers.featureCollection([nwPoint, sePoint]));
    }   

    reverseLineString(line:Feature<LineString>):Feature<LineString> {
        var reverseLine:Feature<LineString> = JSON.parse(JSON.stringify(line))
        reverseLine.geometry.coordinates.reverse();
        return reverseLine;
    }
}
