/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MapDustTrace = (function() {

    /**
     * Properties of a MapDustTrace.
     * @exports IMapDustTrace
     * @interface IMapDustTrace
     * @property {string|null} [endId] MapDustTrace endId
     * @property {Array.<number>|null} [startFraction] MapDustTrace startFraction
     * @property {Array.<number>|null} [endFraction] MapDustTrace endFraction
     * @property {Array.<number>|null} [lonlats] MapDustTrace lonlats
     */

    /**
     * Constructs a new MapDustTrace.
     * @exports MapDustTrace
     * @classdesc Represents a MapDustTrace.
     * @implements IMapDustTrace
     * @constructor
     * @param {IMapDustTrace=} [properties] Properties to set
     */
    function MapDustTrace(properties) {
        this.startFraction = [];
        this.endFraction = [];
        this.lonlats = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MapDustTrace endId.
     * @member {string} endId
     * @memberof MapDustTrace
     * @instance
     */
    MapDustTrace.prototype.endId = "";

    /**
     * MapDustTrace startFraction.
     * @member {Array.<number>} startFraction
     * @memberof MapDustTrace
     * @instance
     */
    MapDustTrace.prototype.startFraction = $util.emptyArray;

    /**
     * MapDustTrace endFraction.
     * @member {Array.<number>} endFraction
     * @memberof MapDustTrace
     * @instance
     */
    MapDustTrace.prototype.endFraction = $util.emptyArray;

    /**
     * MapDustTrace lonlats.
     * @member {Array.<number>} lonlats
     * @memberof MapDustTrace
     * @instance
     */
    MapDustTrace.prototype.lonlats = $util.emptyArray;

    /**
     * Creates a new MapDustTrace instance using the specified properties.
     * @function create
     * @memberof MapDustTrace
     * @static
     * @param {IMapDustTrace=} [properties] Properties to set
     * @returns {MapDustTrace} MapDustTrace instance
     */
    MapDustTrace.create = function create(properties) {
        return new MapDustTrace(properties);
    };

    /**
     * Encodes the specified MapDustTrace message. Does not implicitly {@link MapDustTrace.verify|verify} messages.
     * @function encode
     * @memberof MapDustTrace
     * @static
     * @param {IMapDustTrace} message MapDustTrace message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MapDustTrace.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.endId != null && message.hasOwnProperty("endId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.endId);
        if (message.startFraction != null && message.startFraction.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.startFraction.length; ++i)
                writer.double(message.startFraction[i]);
            writer.ldelim();
        }
        if (message.endFraction != null && message.endFraction.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (var i = 0; i < message.endFraction.length; ++i)
                writer.double(message.endFraction[i]);
            writer.ldelim();
        }
        if (message.lonlats != null && message.lonlats.length) {
            writer.uint32(/* id 4, wireType 2 =*/34).fork();
            for (var i = 0; i < message.lonlats.length; ++i)
                writer.double(message.lonlats[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified MapDustTrace message, length delimited. Does not implicitly {@link MapDustTrace.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MapDustTrace
     * @static
     * @param {IMapDustTrace} message MapDustTrace message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MapDustTrace.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MapDustTrace message from the specified reader or buffer.
     * @function decode
     * @memberof MapDustTrace
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MapDustTrace} MapDustTrace
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MapDustTrace.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MapDustTrace();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.endId = reader.string();
                break;
            case 2:
                if (!(message.startFraction && message.startFraction.length))
                    message.startFraction = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.startFraction.push(reader.double());
                } else
                    message.startFraction.push(reader.double());
                break;
            case 3:
                if (!(message.endFraction && message.endFraction.length))
                    message.endFraction = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.endFraction.push(reader.double());
                } else
                    message.endFraction.push(reader.double());
                break;
            case 4:
                if (!(message.lonlats && message.lonlats.length))
                    message.lonlats = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.lonlats.push(reader.double());
                } else
                    message.lonlats.push(reader.double());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MapDustTrace message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MapDustTrace
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MapDustTrace} MapDustTrace
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MapDustTrace.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MapDustTrace message.
     * @function verify
     * @memberof MapDustTrace
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MapDustTrace.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.endId != null && message.hasOwnProperty("endId"))
            if (!$util.isString(message.endId))
                return "endId: string expected";
        if (message.startFraction != null && message.hasOwnProperty("startFraction")) {
            if (!Array.isArray(message.startFraction))
                return "startFraction: array expected";
            for (var i = 0; i < message.startFraction.length; ++i)
                if (typeof message.startFraction[i] !== "number")
                    return "startFraction: number[] expected";
        }
        if (message.endFraction != null && message.hasOwnProperty("endFraction")) {
            if (!Array.isArray(message.endFraction))
                return "endFraction: array expected";
            for (var i = 0; i < message.endFraction.length; ++i)
                if (typeof message.endFraction[i] !== "number")
                    return "endFraction: number[] expected";
        }
        if (message.lonlats != null && message.hasOwnProperty("lonlats")) {
            if (!Array.isArray(message.lonlats))
                return "lonlats: array expected";
            for (var i = 0; i < message.lonlats.length; ++i)
                if (typeof message.lonlats[i] !== "number")
                    return "lonlats: number[] expected";
        }
        return null;
    };

    /**
     * Creates a MapDustTrace message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MapDustTrace
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MapDustTrace} MapDustTrace
     */
    MapDustTrace.fromObject = function fromObject(object) {
        if (object instanceof $root.MapDustTrace)
            return object;
        var message = new $root.MapDustTrace();
        if (object.endId != null)
            message.endId = String(object.endId);
        if (object.startFraction) {
            if (!Array.isArray(object.startFraction))
                throw TypeError(".MapDustTrace.startFraction: array expected");
            message.startFraction = [];
            for (var i = 0; i < object.startFraction.length; ++i)
                message.startFraction[i] = Number(object.startFraction[i]);
        }
        if (object.endFraction) {
            if (!Array.isArray(object.endFraction))
                throw TypeError(".MapDustTrace.endFraction: array expected");
            message.endFraction = [];
            for (var i = 0; i < object.endFraction.length; ++i)
                message.endFraction[i] = Number(object.endFraction[i]);
        }
        if (object.lonlats) {
            if (!Array.isArray(object.lonlats))
                throw TypeError(".MapDustTrace.lonlats: array expected");
            message.lonlats = [];
            for (var i = 0; i < object.lonlats.length; ++i)
                message.lonlats[i] = Number(object.lonlats[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a MapDustTrace message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MapDustTrace
     * @static
     * @param {MapDustTrace} message MapDustTrace
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MapDustTrace.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.startFraction = [];
            object.endFraction = [];
            object.lonlats = [];
        }
        if (options.defaults)
            object.endId = "";
        if (message.endId != null && message.hasOwnProperty("endId"))
            object.endId = message.endId;
        if (message.startFraction && message.startFraction.length) {
            object.startFraction = [];
            for (var j = 0; j < message.startFraction.length; ++j)
                object.startFraction[j] = options.json && !isFinite(message.startFraction[j]) ? String(message.startFraction[j]) : message.startFraction[j];
        }
        if (message.endFraction && message.endFraction.length) {
            object.endFraction = [];
            for (var j = 0; j < message.endFraction.length; ++j)
                object.endFraction[j] = options.json && !isFinite(message.endFraction[j]) ? String(message.endFraction[j]) : message.endFraction[j];
        }
        if (message.lonlats && message.lonlats.length) {
            object.lonlats = [];
            for (var j = 0; j < message.lonlats.length; ++j)
                object.lonlats[j] = options.json && !isFinite(message.lonlats[j]) ? String(message.lonlats[j]) : message.lonlats[j];
        }
        return object;
    };

    /**
     * Converts this MapDustTrace to JSON.
     * @function toJSON
     * @memberof MapDustTrace
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MapDustTrace.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MapDustTrace;
})();

$root.MapDust = (function() {

    /**
     * Properties of a MapDust.
     * @exports IMapDust
     * @interface IMapDust
     * @property {string|null} [startId] MapDust startId
     * @property {Array.<IMapDustTrace>|null} [traceData] MapDust traceData
     */

    /**
     * Constructs a new MapDust.
     * @exports MapDust
     * @classdesc Represents a MapDust.
     * @implements IMapDust
     * @constructor
     * @param {IMapDust=} [properties] Properties to set
     */
    function MapDust(properties) {
        this.traceData = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MapDust startId.
     * @member {string} startId
     * @memberof MapDust
     * @instance
     */
    MapDust.prototype.startId = "";

    /**
     * MapDust traceData.
     * @member {Array.<IMapDustTrace>} traceData
     * @memberof MapDust
     * @instance
     */
    MapDust.prototype.traceData = $util.emptyArray;

    /**
     * Creates a new MapDust instance using the specified properties.
     * @function create
     * @memberof MapDust
     * @static
     * @param {IMapDust=} [properties] Properties to set
     * @returns {MapDust} MapDust instance
     */
    MapDust.create = function create(properties) {
        return new MapDust(properties);
    };

    /**
     * Encodes the specified MapDust message. Does not implicitly {@link MapDust.verify|verify} messages.
     * @function encode
     * @memberof MapDust
     * @static
     * @param {IMapDust} message MapDust message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MapDust.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.startId != null && message.hasOwnProperty("startId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.startId);
        if (message.traceData != null && message.traceData.length)
            for (var i = 0; i < message.traceData.length; ++i)
                $root.MapDustTrace.encode(message.traceData[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MapDust message, length delimited. Does not implicitly {@link MapDust.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MapDust
     * @static
     * @param {IMapDust} message MapDust message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MapDust.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MapDust message from the specified reader or buffer.
     * @function decode
     * @memberof MapDust
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MapDust} MapDust
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MapDust.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MapDust();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.startId = reader.string();
                break;
            case 2:
                if (!(message.traceData && message.traceData.length))
                    message.traceData = [];
                message.traceData.push($root.MapDustTrace.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MapDust message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MapDust
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MapDust} MapDust
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MapDust.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MapDust message.
     * @function verify
     * @memberof MapDust
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MapDust.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.startId != null && message.hasOwnProperty("startId"))
            if (!$util.isString(message.startId))
                return "startId: string expected";
        if (message.traceData != null && message.hasOwnProperty("traceData")) {
            if (!Array.isArray(message.traceData))
                return "traceData: array expected";
            for (var i = 0; i < message.traceData.length; ++i) {
                var error = $root.MapDustTrace.verify(message.traceData[i]);
                if (error)
                    return "traceData." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MapDust message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MapDust
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MapDust} MapDust
     */
    MapDust.fromObject = function fromObject(object) {
        if (object instanceof $root.MapDust)
            return object;
        var message = new $root.MapDust();
        if (object.startId != null)
            message.startId = String(object.startId);
        if (object.traceData) {
            if (!Array.isArray(object.traceData))
                throw TypeError(".MapDust.traceData: array expected");
            message.traceData = [];
            for (var i = 0; i < object.traceData.length; ++i) {
                if (typeof object.traceData[i] !== "object")
                    throw TypeError(".MapDust.traceData: object expected");
                message.traceData[i] = $root.MapDustTrace.fromObject(object.traceData[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MapDust message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MapDust
     * @static
     * @param {MapDust} message MapDust
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MapDust.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.traceData = [];
        if (options.defaults)
            object.startId = "";
        if (message.startId != null && message.hasOwnProperty("startId"))
            object.startId = message.startId;
        if (message.traceData && message.traceData.length) {
            object.traceData = [];
            for (var j = 0; j < message.traceData.length; ++j)
                object.traceData[j] = $root.MapDustTrace.toObject(message.traceData[j], options);
        }
        return object;
    };

    /**
     * Converts this MapDust to JSON.
     * @function toJSON
     * @memberof MapDust
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MapDust.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MapDust;
})();

module.exports = $root;
