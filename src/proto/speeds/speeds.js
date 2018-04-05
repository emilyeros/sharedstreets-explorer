/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * PeriodSize enum.
 * @exports PeriodSize
 * @enum {string}
 * @property {number} OneSecond=0 OneSecond value
 * @property {number} FiveSeconds=1 FiveSeconds value
 * @property {number} TenSeconds=2 TenSeconds value
 * @property {number} FifteenSeconds=3 FifteenSeconds value
 * @property {number} ThirtySeconds=4 ThirtySeconds value
 * @property {number} OneMinute=5 OneMinute value
 * @property {number} FiveMinutes=6 FiveMinutes value
 * @property {number} TenMinutes=7 TenMinutes value
 * @property {number} FifteenMinutes=8 FifteenMinutes value
 * @property {number} ThirtyMinutes=9 ThirtyMinutes value
 * @property {number} OneHour=10 OneHour value
 * @property {number} OneDay=11 OneDay value
 * @property {number} OneWeek=12 OneWeek value
 * @property {number} OneMonth=13 OneMonth value
 * @property {number} OneYear=14 OneYear value
 */
$root.PeriodSize = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "OneSecond"] = 0;
    values[valuesById[1] = "FiveSeconds"] = 1;
    values[valuesById[2] = "TenSeconds"] = 2;
    values[valuesById[3] = "FifteenSeconds"] = 3;
    values[valuesById[4] = "ThirtySeconds"] = 4;
    values[valuesById[5] = "OneMinute"] = 5;
    values[valuesById[6] = "FiveMinutes"] = 6;
    values[valuesById[7] = "TenMinutes"] = 7;
    values[valuesById[8] = "FifteenMinutes"] = 8;
    values[valuesById[9] = "ThirtyMinutes"] = 9;
    values[valuesById[10] = "OneHour"] = 10;
    values[valuesById[11] = "OneDay"] = 11;
    values[valuesById[12] = "OneWeek"] = 12;
    values[valuesById[13] = "OneMonth"] = 13;
    values[valuesById[14] = "OneYear"] = 14;
    return values;
})();

$root.TemporalPeriod = (function() {

    /**
     * Properties of a TemporalPeriod.
     * @exports ITemporalPeriod
     * @interface ITemporalPeriod
     * @property {PeriodSize|null} [periodSize] TemporalPeriod periodSize
     * @property {number|Long|null} [periodOffset] TemporalPeriod periodOffset
     */

    /**
     * Constructs a new TemporalPeriod.
     * @exports TemporalPeriod
     * @classdesc Represents a TemporalPeriod.
     * @implements ITemporalPeriod
     * @constructor
     * @param {ITemporalPeriod=} [properties] Properties to set
     */
    function TemporalPeriod(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TemporalPeriod periodSize.
     * @member {PeriodSize} periodSize
     * @memberof TemporalPeriod
     * @instance
     */
    TemporalPeriod.prototype.periodSize = 0;

    /**
     * TemporalPeriod periodOffset.
     * @member {number|Long} periodOffset
     * @memberof TemporalPeriod
     * @instance
     */
    TemporalPeriod.prototype.periodOffset = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new TemporalPeriod instance using the specified properties.
     * @function create
     * @memberof TemporalPeriod
     * @static
     * @param {ITemporalPeriod=} [properties] Properties to set
     * @returns {TemporalPeriod} TemporalPeriod instance
     */
    TemporalPeriod.create = function create(properties) {
        return new TemporalPeriod(properties);
    };

    /**
     * Encodes the specified TemporalPeriod message. Does not implicitly {@link TemporalPeriod.verify|verify} messages.
     * @function encode
     * @memberof TemporalPeriod
     * @static
     * @param {ITemporalPeriod} message TemporalPeriod message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TemporalPeriod.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.periodSize != null && message.hasOwnProperty("periodSize"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.periodSize);
        if (message.periodOffset != null && message.hasOwnProperty("periodOffset"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.periodOffset);
        return writer;
    };

    /**
     * Encodes the specified TemporalPeriod message, length delimited. Does not implicitly {@link TemporalPeriod.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TemporalPeriod
     * @static
     * @param {ITemporalPeriod} message TemporalPeriod message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TemporalPeriod.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TemporalPeriod message from the specified reader or buffer.
     * @function decode
     * @memberof TemporalPeriod
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TemporalPeriod} TemporalPeriod
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TemporalPeriod.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TemporalPeriod();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.periodSize = reader.int32();
                break;
            case 2:
                message.periodOffset = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TemporalPeriod message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TemporalPeriod
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TemporalPeriod} TemporalPeriod
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TemporalPeriod.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TemporalPeriod message.
     * @function verify
     * @memberof TemporalPeriod
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TemporalPeriod.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.periodSize != null && message.hasOwnProperty("periodSize"))
            switch (message.periodSize) {
            default:
                return "periodSize: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                break;
            }
        if (message.periodOffset != null && message.hasOwnProperty("periodOffset"))
            if (!$util.isInteger(message.periodOffset) && !(message.periodOffset && $util.isInteger(message.periodOffset.low) && $util.isInteger(message.periodOffset.high)))
                return "periodOffset: integer|Long expected";
        return null;
    };

    /**
     * Creates a TemporalPeriod message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TemporalPeriod
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TemporalPeriod} TemporalPeriod
     */
    TemporalPeriod.fromObject = function fromObject(object) {
        if (object instanceof $root.TemporalPeriod)
            return object;
        var message = new $root.TemporalPeriod();
        switch (object.periodSize) {
        case "OneSecond":
        case 0:
            message.periodSize = 0;
            break;
        case "FiveSeconds":
        case 1:
            message.periodSize = 1;
            break;
        case "TenSeconds":
        case 2:
            message.periodSize = 2;
            break;
        case "FifteenSeconds":
        case 3:
            message.periodSize = 3;
            break;
        case "ThirtySeconds":
        case 4:
            message.periodSize = 4;
            break;
        case "OneMinute":
        case 5:
            message.periodSize = 5;
            break;
        case "FiveMinutes":
        case 6:
            message.periodSize = 6;
            break;
        case "TenMinutes":
        case 7:
            message.periodSize = 7;
            break;
        case "FifteenMinutes":
        case 8:
            message.periodSize = 8;
            break;
        case "ThirtyMinutes":
        case 9:
            message.periodSize = 9;
            break;
        case "OneHour":
        case 10:
            message.periodSize = 10;
            break;
        case "OneDay":
        case 11:
            message.periodSize = 11;
            break;
        case "OneWeek":
        case 12:
            message.periodSize = 12;
            break;
        case "OneMonth":
        case 13:
            message.periodSize = 13;
            break;
        case "OneYear":
        case 14:
            message.periodSize = 14;
            break;
        }
        if (object.periodOffset != null)
            if ($util.Long)
                (message.periodOffset = $util.Long.fromValue(object.periodOffset)).unsigned = true;
            else if (typeof object.periodOffset === "string")
                message.periodOffset = parseInt(object.periodOffset, 10);
            else if (typeof object.periodOffset === "number")
                message.periodOffset = object.periodOffset;
            else if (typeof object.periodOffset === "object")
                message.periodOffset = new $util.LongBits(object.periodOffset.low >>> 0, object.periodOffset.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a TemporalPeriod message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TemporalPeriod
     * @static
     * @param {TemporalPeriod} message TemporalPeriod
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TemporalPeriod.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.periodSize = options.enums === String ? "OneSecond" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.periodOffset = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.periodOffset = options.longs === String ? "0" : 0;
        }
        if (message.periodSize != null && message.hasOwnProperty("periodSize"))
            object.periodSize = options.enums === String ? $root.PeriodSize[message.periodSize] : message.periodSize;
        if (message.periodOffset != null && message.hasOwnProperty("periodOffset"))
            if (typeof message.periodOffset === "number")
                object.periodOffset = options.longs === String ? String(message.periodOffset) : message.periodOffset;
            else
                object.periodOffset = options.longs === String ? $util.Long.prototype.toString.call(message.periodOffset) : options.longs === Number ? new $util.LongBits(message.periodOffset.low >>> 0, message.periodOffset.high >>> 0).toNumber(true) : message.periodOffset;
        return object;
    };

    /**
     * Converts this TemporalPeriod to JSON.
     * @function toJSON
     * @memberof TemporalPeriod
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TemporalPeriod.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TemporalPeriod;
})();

$root.WeeklyCycle = (function() {

    /**
     * Properties of a WeeklyCycle.
     * @exports IWeeklyCycle
     * @interface IWeeklyCycle
     * @property {number|null} [year] WeeklyCycle year
     * @property {number|null} [month] WeeklyCycle month
     * @property {number|null} [day] WeeklyCycle day
     * @property {PeriodSize|null} [periodSize] WeeklyCycle periodSize
     */

    /**
     * Constructs a new WeeklyCycle.
     * @exports WeeklyCycle
     * @classdesc Represents a WeeklyCycle.
     * @implements IWeeklyCycle
     * @constructor
     * @param {IWeeklyCycle=} [properties] Properties to set
     */
    function WeeklyCycle(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WeeklyCycle year.
     * @member {number} year
     * @memberof WeeklyCycle
     * @instance
     */
    WeeklyCycle.prototype.year = 0;

    /**
     * WeeklyCycle month.
     * @member {number} month
     * @memberof WeeklyCycle
     * @instance
     */
    WeeklyCycle.prototype.month = 0;

    /**
     * WeeklyCycle day.
     * @member {number} day
     * @memberof WeeklyCycle
     * @instance
     */
    WeeklyCycle.prototype.day = 0;

    /**
     * WeeklyCycle periodSize.
     * @member {PeriodSize} periodSize
     * @memberof WeeklyCycle
     * @instance
     */
    WeeklyCycle.prototype.periodSize = 0;

    /**
     * Creates a new WeeklyCycle instance using the specified properties.
     * @function create
     * @memberof WeeklyCycle
     * @static
     * @param {IWeeklyCycle=} [properties] Properties to set
     * @returns {WeeklyCycle} WeeklyCycle instance
     */
    WeeklyCycle.create = function create(properties) {
        return new WeeklyCycle(properties);
    };

    /**
     * Encodes the specified WeeklyCycle message. Does not implicitly {@link WeeklyCycle.verify|verify} messages.
     * @function encode
     * @memberof WeeklyCycle
     * @static
     * @param {IWeeklyCycle} message WeeklyCycle message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WeeklyCycle.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.year != null && message.hasOwnProperty("year"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.year);
        if (message.month != null && message.hasOwnProperty("month"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.month);
        if (message.day != null && message.hasOwnProperty("day"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.day);
        if (message.periodSize != null && message.hasOwnProperty("periodSize"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.periodSize);
        return writer;
    };

    /**
     * Encodes the specified WeeklyCycle message, length delimited. Does not implicitly {@link WeeklyCycle.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WeeklyCycle
     * @static
     * @param {IWeeklyCycle} message WeeklyCycle message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WeeklyCycle.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WeeklyCycle message from the specified reader or buffer.
     * @function decode
     * @memberof WeeklyCycle
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WeeklyCycle} WeeklyCycle
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WeeklyCycle.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WeeklyCycle();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.year = reader.uint32();
                break;
            case 2:
                message.month = reader.uint32();
                break;
            case 3:
                message.day = reader.uint32();
                break;
            case 4:
                message.periodSize = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a WeeklyCycle message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WeeklyCycle
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WeeklyCycle} WeeklyCycle
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WeeklyCycle.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WeeklyCycle message.
     * @function verify
     * @memberof WeeklyCycle
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WeeklyCycle.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.year != null && message.hasOwnProperty("year"))
            if (!$util.isInteger(message.year))
                return "year: integer expected";
        if (message.month != null && message.hasOwnProperty("month"))
            if (!$util.isInteger(message.month))
                return "month: integer expected";
        if (message.day != null && message.hasOwnProperty("day"))
            if (!$util.isInteger(message.day))
                return "day: integer expected";
        if (message.periodSize != null && message.hasOwnProperty("periodSize"))
            switch (message.periodSize) {
            default:
                return "periodSize: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                break;
            }
        return null;
    };

    /**
     * Creates a WeeklyCycle message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WeeklyCycle
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WeeklyCycle} WeeklyCycle
     */
    WeeklyCycle.fromObject = function fromObject(object) {
        if (object instanceof $root.WeeklyCycle)
            return object;
        var message = new $root.WeeklyCycle();
        if (object.year != null)
            message.year = object.year >>> 0;
        if (object.month != null)
            message.month = object.month >>> 0;
        if (object.day != null)
            message.day = object.day >>> 0;
        switch (object.periodSize) {
        case "OneSecond":
        case 0:
            message.periodSize = 0;
            break;
        case "FiveSeconds":
        case 1:
            message.periodSize = 1;
            break;
        case "TenSeconds":
        case 2:
            message.periodSize = 2;
            break;
        case "FifteenSeconds":
        case 3:
            message.periodSize = 3;
            break;
        case "ThirtySeconds":
        case 4:
            message.periodSize = 4;
            break;
        case "OneMinute":
        case 5:
            message.periodSize = 5;
            break;
        case "FiveMinutes":
        case 6:
            message.periodSize = 6;
            break;
        case "TenMinutes":
        case 7:
            message.periodSize = 7;
            break;
        case "FifteenMinutes":
        case 8:
            message.periodSize = 8;
            break;
        case "ThirtyMinutes":
        case 9:
            message.periodSize = 9;
            break;
        case "OneHour":
        case 10:
            message.periodSize = 10;
            break;
        case "OneDay":
        case 11:
            message.periodSize = 11;
            break;
        case "OneWeek":
        case 12:
            message.periodSize = 12;
            break;
        case "OneMonth":
        case 13:
            message.periodSize = 13;
            break;
        case "OneYear":
        case 14:
            message.periodSize = 14;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a WeeklyCycle message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WeeklyCycle
     * @static
     * @param {WeeklyCycle} message WeeklyCycle
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WeeklyCycle.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.year = 0;
            object.month = 0;
            object.day = 0;
            object.periodSize = options.enums === String ? "OneSecond" : 0;
        }
        if (message.year != null && message.hasOwnProperty("year"))
            object.year = message.year;
        if (message.month != null && message.hasOwnProperty("month"))
            object.month = message.month;
        if (message.day != null && message.hasOwnProperty("day"))
            object.day = message.day;
        if (message.periodSize != null && message.hasOwnProperty("periodSize"))
            object.periodSize = options.enums === String ? $root.PeriodSize[message.periodSize] : message.periodSize;
        return object;
    };

    /**
     * Converts this WeeklyCycle to JSON.
     * @function toJSON
     * @memberof WeeklyCycle
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WeeklyCycle.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return WeeklyCycle;
})();

$root.SpeedHistogram = (function() {

    /**
     * Properties of a SpeedHistogram.
     * @exports ISpeedHistogram
     * @interface ISpeedHistogram
     * @property {Array.<number>|null} [speedBin] SpeedHistogram speedBin
     * @property {Array.<number>|null} [observationCount] SpeedHistogram observationCount
     */

    /**
     * Constructs a new SpeedHistogram.
     * @exports SpeedHistogram
     * @classdesc Represents a SpeedHistogram.
     * @implements ISpeedHistogram
     * @constructor
     * @param {ISpeedHistogram=} [properties] Properties to set
     */
    function SpeedHistogram(properties) {
        this.speedBin = [];
        this.observationCount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SpeedHistogram speedBin.
     * @member {Array.<number>} speedBin
     * @memberof SpeedHistogram
     * @instance
     */
    SpeedHistogram.prototype.speedBin = $util.emptyArray;

    /**
     * SpeedHistogram observationCount.
     * @member {Array.<number>} observationCount
     * @memberof SpeedHistogram
     * @instance
     */
    SpeedHistogram.prototype.observationCount = $util.emptyArray;

    /**
     * Creates a new SpeedHistogram instance using the specified properties.
     * @function create
     * @memberof SpeedHistogram
     * @static
     * @param {ISpeedHistogram=} [properties] Properties to set
     * @returns {SpeedHistogram} SpeedHistogram instance
     */
    SpeedHistogram.create = function create(properties) {
        return new SpeedHistogram(properties);
    };

    /**
     * Encodes the specified SpeedHistogram message. Does not implicitly {@link SpeedHistogram.verify|verify} messages.
     * @function encode
     * @memberof SpeedHistogram
     * @static
     * @param {ISpeedHistogram} message SpeedHistogram message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedHistogram.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.speedBin != null && message.speedBin.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (var i = 0; i < message.speedBin.length; ++i)
                writer.uint32(message.speedBin[i]);
            writer.ldelim();
        }
        if (message.observationCount != null && message.observationCount.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.observationCount.length; ++i)
                writer.uint32(message.observationCount[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified SpeedHistogram message, length delimited. Does not implicitly {@link SpeedHistogram.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SpeedHistogram
     * @static
     * @param {ISpeedHistogram} message SpeedHistogram message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedHistogram.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SpeedHistogram message from the specified reader or buffer.
     * @function decode
     * @memberof SpeedHistogram
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SpeedHistogram} SpeedHistogram
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedHistogram.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpeedHistogram();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.speedBin && message.speedBin.length))
                    message.speedBin = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.speedBin.push(reader.uint32());
                } else
                    message.speedBin.push(reader.uint32());
                break;
            case 2:
                if (!(message.observationCount && message.observationCount.length))
                    message.observationCount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.observationCount.push(reader.uint32());
                } else
                    message.observationCount.push(reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SpeedHistogram message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SpeedHistogram
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SpeedHistogram} SpeedHistogram
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedHistogram.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SpeedHistogram message.
     * @function verify
     * @memberof SpeedHistogram
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SpeedHistogram.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.speedBin != null && message.hasOwnProperty("speedBin")) {
            if (!Array.isArray(message.speedBin))
                return "speedBin: array expected";
            for (var i = 0; i < message.speedBin.length; ++i)
                if (!$util.isInteger(message.speedBin[i]))
                    return "speedBin: integer[] expected";
        }
        if (message.observationCount != null && message.hasOwnProperty("observationCount")) {
            if (!Array.isArray(message.observationCount))
                return "observationCount: array expected";
            for (var i = 0; i < message.observationCount.length; ++i)
                if (!$util.isInteger(message.observationCount[i]))
                    return "observationCount: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a SpeedHistogram message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SpeedHistogram
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SpeedHistogram} SpeedHistogram
     */
    SpeedHistogram.fromObject = function fromObject(object) {
        if (object instanceof $root.SpeedHistogram)
            return object;
        var message = new $root.SpeedHistogram();
        if (object.speedBin) {
            if (!Array.isArray(object.speedBin))
                throw TypeError(".SpeedHistogram.speedBin: array expected");
            message.speedBin = [];
            for (var i = 0; i < object.speedBin.length; ++i)
                message.speedBin[i] = object.speedBin[i] >>> 0;
        }
        if (object.observationCount) {
            if (!Array.isArray(object.observationCount))
                throw TypeError(".SpeedHistogram.observationCount: array expected");
            message.observationCount = [];
            for (var i = 0; i < object.observationCount.length; ++i)
                message.observationCount[i] = object.observationCount[i] >>> 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a SpeedHistogram message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SpeedHistogram
     * @static
     * @param {SpeedHistogram} message SpeedHistogram
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SpeedHistogram.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.speedBin = [];
            object.observationCount = [];
        }
        if (message.speedBin && message.speedBin.length) {
            object.speedBin = [];
            for (var j = 0; j < message.speedBin.length; ++j)
                object.speedBin[j] = message.speedBin[j];
        }
        if (message.observationCount && message.observationCount.length) {
            object.observationCount = [];
            for (var j = 0; j < message.observationCount.length; ++j)
                object.observationCount[j] = message.observationCount[j];
        }
        return object;
    };

    /**
     * Converts this SpeedHistogram to JSON.
     * @function toJSON
     * @memberof SpeedHistogram
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SpeedHistogram.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SpeedHistogram;
})();

$root.SpeedHistogramByPeriod = (function() {

    /**
     * Properties of a SpeedHistogramByPeriod.
     * @exports ISpeedHistogramByPeriod
     * @interface ISpeedHistogramByPeriod
     * @property {Array.<number>|null} [periodOffset] SpeedHistogramByPeriod periodOffset
     * @property {Array.<ISpeedHistogram>|null} [histogram] SpeedHistogramByPeriod histogram
     */

    /**
     * Constructs a new SpeedHistogramByPeriod.
     * @exports SpeedHistogramByPeriod
     * @classdesc Represents a SpeedHistogramByPeriod.
     * @implements ISpeedHistogramByPeriod
     * @constructor
     * @param {ISpeedHistogramByPeriod=} [properties] Properties to set
     */
    function SpeedHistogramByPeriod(properties) {
        this.periodOffset = [];
        this.histogram = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SpeedHistogramByPeriod periodOffset.
     * @member {Array.<number>} periodOffset
     * @memberof SpeedHistogramByPeriod
     * @instance
     */
    SpeedHistogramByPeriod.prototype.periodOffset = $util.emptyArray;

    /**
     * SpeedHistogramByPeriod histogram.
     * @member {Array.<ISpeedHistogram>} histogram
     * @memberof SpeedHistogramByPeriod
     * @instance
     */
    SpeedHistogramByPeriod.prototype.histogram = $util.emptyArray;

    /**
     * Creates a new SpeedHistogramByPeriod instance using the specified properties.
     * @function create
     * @memberof SpeedHistogramByPeriod
     * @static
     * @param {ISpeedHistogramByPeriod=} [properties] Properties to set
     * @returns {SpeedHistogramByPeriod} SpeedHistogramByPeriod instance
     */
    SpeedHistogramByPeriod.create = function create(properties) {
        return new SpeedHistogramByPeriod(properties);
    };

    /**
     * Encodes the specified SpeedHistogramByPeriod message. Does not implicitly {@link SpeedHistogramByPeriod.verify|verify} messages.
     * @function encode
     * @memberof SpeedHistogramByPeriod
     * @static
     * @param {ISpeedHistogramByPeriod} message SpeedHistogramByPeriod message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedHistogramByPeriod.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.periodOffset != null && message.periodOffset.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (var i = 0; i < message.periodOffset.length; ++i)
                writer.uint32(message.periodOffset[i]);
            writer.ldelim();
        }
        if (message.histogram != null && message.histogram.length)
            for (var i = 0; i < message.histogram.length; ++i)
                $root.SpeedHistogram.encode(message.histogram[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SpeedHistogramByPeriod message, length delimited. Does not implicitly {@link SpeedHistogramByPeriod.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SpeedHistogramByPeriod
     * @static
     * @param {ISpeedHistogramByPeriod} message SpeedHistogramByPeriod message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedHistogramByPeriod.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SpeedHistogramByPeriod message from the specified reader or buffer.
     * @function decode
     * @memberof SpeedHistogramByPeriod
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SpeedHistogramByPeriod} SpeedHistogramByPeriod
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedHistogramByPeriod.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpeedHistogramByPeriod();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.periodOffset && message.periodOffset.length))
                    message.periodOffset = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.periodOffset.push(reader.uint32());
                } else
                    message.periodOffset.push(reader.uint32());
                break;
            case 2:
                if (!(message.histogram && message.histogram.length))
                    message.histogram = [];
                message.histogram.push($root.SpeedHistogram.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SpeedHistogramByPeriod message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SpeedHistogramByPeriod
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SpeedHistogramByPeriod} SpeedHistogramByPeriod
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedHistogramByPeriod.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SpeedHistogramByPeriod message.
     * @function verify
     * @memberof SpeedHistogramByPeriod
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SpeedHistogramByPeriod.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.periodOffset != null && message.hasOwnProperty("periodOffset")) {
            if (!Array.isArray(message.periodOffset))
                return "periodOffset: array expected";
            for (var i = 0; i < message.periodOffset.length; ++i)
                if (!$util.isInteger(message.periodOffset[i]))
                    return "periodOffset: integer[] expected";
        }
        if (message.histogram != null && message.hasOwnProperty("histogram")) {
            if (!Array.isArray(message.histogram))
                return "histogram: array expected";
            for (var i = 0; i < message.histogram.length; ++i) {
                var error = $root.SpeedHistogram.verify(message.histogram[i]);
                if (error)
                    return "histogram." + error;
            }
        }
        return null;
    };

    /**
     * Creates a SpeedHistogramByPeriod message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SpeedHistogramByPeriod
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SpeedHistogramByPeriod} SpeedHistogramByPeriod
     */
    SpeedHistogramByPeriod.fromObject = function fromObject(object) {
        if (object instanceof $root.SpeedHistogramByPeriod)
            return object;
        var message = new $root.SpeedHistogramByPeriod();
        if (object.periodOffset) {
            if (!Array.isArray(object.periodOffset))
                throw TypeError(".SpeedHistogramByPeriod.periodOffset: array expected");
            message.periodOffset = [];
            for (var i = 0; i < object.periodOffset.length; ++i)
                message.periodOffset[i] = object.periodOffset[i] >>> 0;
        }
        if (object.histogram) {
            if (!Array.isArray(object.histogram))
                throw TypeError(".SpeedHistogramByPeriod.histogram: array expected");
            message.histogram = [];
            for (var i = 0; i < object.histogram.length; ++i) {
                if (typeof object.histogram[i] !== "object")
                    throw TypeError(".SpeedHistogramByPeriod.histogram: object expected");
                message.histogram[i] = $root.SpeedHistogram.fromObject(object.histogram[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a SpeedHistogramByPeriod message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SpeedHistogramByPeriod
     * @static
     * @param {SpeedHistogramByPeriod} message SpeedHistogramByPeriod
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SpeedHistogramByPeriod.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.periodOffset = [];
            object.histogram = [];
        }
        if (message.periodOffset && message.periodOffset.length) {
            object.periodOffset = [];
            for (var j = 0; j < message.periodOffset.length; ++j)
                object.periodOffset[j] = message.periodOffset[j];
        }
        if (message.histogram && message.histogram.length) {
            object.histogram = [];
            for (var j = 0; j < message.histogram.length; ++j)
                object.histogram[j] = $root.SpeedHistogram.toObject(message.histogram[j], options);
        }
        return object;
    };

    /**
     * Converts this SpeedHistogramByPeriod to JSON.
     * @function toJSON
     * @memberof SpeedHistogramByPeriod
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SpeedHistogramByPeriod.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SpeedHistogramByPeriod;
})();

$root.SpeedSummary = (function() {

    /**
     * Properties of a SpeedSummary.
     * @exports ISpeedSummary
     * @interface ISpeedSummary
     * @property {number|null} [meanSpead] SpeedSummary meanSpead
     * @property {Array.<number>|null} [percentile] SpeedSummary percentile
     * @property {Array.<number>|null} [observationCount] SpeedSummary observationCount
     */

    /**
     * Constructs a new SpeedSummary.
     * @exports SpeedSummary
     * @classdesc Represents a SpeedSummary.
     * @implements ISpeedSummary
     * @constructor
     * @param {ISpeedSummary=} [properties] Properties to set
     */
    function SpeedSummary(properties) {
        this.percentile = [];
        this.observationCount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SpeedSummary meanSpead.
     * @member {number} meanSpead
     * @memberof SpeedSummary
     * @instance
     */
    SpeedSummary.prototype.meanSpead = 0;

    /**
     * SpeedSummary percentile.
     * @member {Array.<number>} percentile
     * @memberof SpeedSummary
     * @instance
     */
    SpeedSummary.prototype.percentile = $util.emptyArray;

    /**
     * SpeedSummary observationCount.
     * @member {Array.<number>} observationCount
     * @memberof SpeedSummary
     * @instance
     */
    SpeedSummary.prototype.observationCount = $util.emptyArray;

    /**
     * Creates a new SpeedSummary instance using the specified properties.
     * @function create
     * @memberof SpeedSummary
     * @static
     * @param {ISpeedSummary=} [properties] Properties to set
     * @returns {SpeedSummary} SpeedSummary instance
     */
    SpeedSummary.create = function create(properties) {
        return new SpeedSummary(properties);
    };

    /**
     * Encodes the specified SpeedSummary message. Does not implicitly {@link SpeedSummary.verify|verify} messages.
     * @function encode
     * @memberof SpeedSummary
     * @static
     * @param {ISpeedSummary} message SpeedSummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedSummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.meanSpead != null && message.hasOwnProperty("meanSpead"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.meanSpead);
        if (message.percentile != null && message.percentile.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.percentile.length; ++i)
                writer.uint32(message.percentile[i]);
            writer.ldelim();
        }
        if (message.observationCount != null && message.observationCount.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (var i = 0; i < message.observationCount.length; ++i)
                writer.uint32(message.observationCount[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified SpeedSummary message, length delimited. Does not implicitly {@link SpeedSummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SpeedSummary
     * @static
     * @param {ISpeedSummary} message SpeedSummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedSummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SpeedSummary message from the specified reader or buffer.
     * @function decode
     * @memberof SpeedSummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SpeedSummary} SpeedSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedSummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpeedSummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.meanSpead = reader.uint32();
                break;
            case 2:
                if (!(message.percentile && message.percentile.length))
                    message.percentile = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.percentile.push(reader.uint32());
                } else
                    message.percentile.push(reader.uint32());
                break;
            case 3:
                if (!(message.observationCount && message.observationCount.length))
                    message.observationCount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.observationCount.push(reader.uint32());
                } else
                    message.observationCount.push(reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SpeedSummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SpeedSummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SpeedSummary} SpeedSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedSummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SpeedSummary message.
     * @function verify
     * @memberof SpeedSummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SpeedSummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.meanSpead != null && message.hasOwnProperty("meanSpead"))
            if (!$util.isInteger(message.meanSpead))
                return "meanSpead: integer expected";
        if (message.percentile != null && message.hasOwnProperty("percentile")) {
            if (!Array.isArray(message.percentile))
                return "percentile: array expected";
            for (var i = 0; i < message.percentile.length; ++i)
                if (!$util.isInteger(message.percentile[i]))
                    return "percentile: integer[] expected";
        }
        if (message.observationCount != null && message.hasOwnProperty("observationCount")) {
            if (!Array.isArray(message.observationCount))
                return "observationCount: array expected";
            for (var i = 0; i < message.observationCount.length; ++i)
                if (!$util.isInteger(message.observationCount[i]))
                    return "observationCount: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a SpeedSummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SpeedSummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SpeedSummary} SpeedSummary
     */
    SpeedSummary.fromObject = function fromObject(object) {
        if (object instanceof $root.SpeedSummary)
            return object;
        var message = new $root.SpeedSummary();
        if (object.meanSpead != null)
            message.meanSpead = object.meanSpead >>> 0;
        if (object.percentile) {
            if (!Array.isArray(object.percentile))
                throw TypeError(".SpeedSummary.percentile: array expected");
            message.percentile = [];
            for (var i = 0; i < object.percentile.length; ++i)
                message.percentile[i] = object.percentile[i] >>> 0;
        }
        if (object.observationCount) {
            if (!Array.isArray(object.observationCount))
                throw TypeError(".SpeedSummary.observationCount: array expected");
            message.observationCount = [];
            for (var i = 0; i < object.observationCount.length; ++i)
                message.observationCount[i] = object.observationCount[i] >>> 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a SpeedSummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SpeedSummary
     * @static
     * @param {SpeedSummary} message SpeedSummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SpeedSummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.percentile = [];
            object.observationCount = [];
        }
        if (options.defaults)
            object.meanSpead = 0;
        if (message.meanSpead != null && message.hasOwnProperty("meanSpead"))
            object.meanSpead = message.meanSpead;
        if (message.percentile && message.percentile.length) {
            object.percentile = [];
            for (var j = 0; j < message.percentile.length; ++j)
                object.percentile[j] = message.percentile[j];
        }
        if (message.observationCount && message.observationCount.length) {
            object.observationCount = [];
            for (var j = 0; j < message.observationCount.length; ++j)
                object.observationCount[j] = message.observationCount[j];
        }
        return object;
    };

    /**
     * Converts this SpeedSummary to JSON.
     * @function toJSON
     * @memberof SpeedSummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SpeedSummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SpeedSummary;
})();

$root.SpeedSummaryByPeriod = (function() {

    /**
     * Properties of a SpeedSummaryByPeriod.
     * @exports ISpeedSummaryByPeriod
     * @interface ISpeedSummaryByPeriod
     * @property {Array.<number>|null} [periodOffset] SpeedSummaryByPeriod periodOffset
     * @property {Array.<ISpeedSummary>|null} [speedSummary] SpeedSummaryByPeriod speedSummary
     */

    /**
     * Constructs a new SpeedSummaryByPeriod.
     * @exports SpeedSummaryByPeriod
     * @classdesc Represents a SpeedSummaryByPeriod.
     * @implements ISpeedSummaryByPeriod
     * @constructor
     * @param {ISpeedSummaryByPeriod=} [properties] Properties to set
     */
    function SpeedSummaryByPeriod(properties) {
        this.periodOffset = [];
        this.speedSummary = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SpeedSummaryByPeriod periodOffset.
     * @member {Array.<number>} periodOffset
     * @memberof SpeedSummaryByPeriod
     * @instance
     */
    SpeedSummaryByPeriod.prototype.periodOffset = $util.emptyArray;

    /**
     * SpeedSummaryByPeriod speedSummary.
     * @member {Array.<ISpeedSummary>} speedSummary
     * @memberof SpeedSummaryByPeriod
     * @instance
     */
    SpeedSummaryByPeriod.prototype.speedSummary = $util.emptyArray;

    /**
     * Creates a new SpeedSummaryByPeriod instance using the specified properties.
     * @function create
     * @memberof SpeedSummaryByPeriod
     * @static
     * @param {ISpeedSummaryByPeriod=} [properties] Properties to set
     * @returns {SpeedSummaryByPeriod} SpeedSummaryByPeriod instance
     */
    SpeedSummaryByPeriod.create = function create(properties) {
        return new SpeedSummaryByPeriod(properties);
    };

    /**
     * Encodes the specified SpeedSummaryByPeriod message. Does not implicitly {@link SpeedSummaryByPeriod.verify|verify} messages.
     * @function encode
     * @memberof SpeedSummaryByPeriod
     * @static
     * @param {ISpeedSummaryByPeriod} message SpeedSummaryByPeriod message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedSummaryByPeriod.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.periodOffset != null && message.periodOffset.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (var i = 0; i < message.periodOffset.length; ++i)
                writer.uint32(message.periodOffset[i]);
            writer.ldelim();
        }
        if (message.speedSummary != null && message.speedSummary.length)
            for (var i = 0; i < message.speedSummary.length; ++i)
                $root.SpeedSummary.encode(message.speedSummary[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SpeedSummaryByPeriod message, length delimited. Does not implicitly {@link SpeedSummaryByPeriod.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SpeedSummaryByPeriod
     * @static
     * @param {ISpeedSummaryByPeriod} message SpeedSummaryByPeriod message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedSummaryByPeriod.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SpeedSummaryByPeriod message from the specified reader or buffer.
     * @function decode
     * @memberof SpeedSummaryByPeriod
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SpeedSummaryByPeriod} SpeedSummaryByPeriod
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedSummaryByPeriod.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpeedSummaryByPeriod();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.periodOffset && message.periodOffset.length))
                    message.periodOffset = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.periodOffset.push(reader.uint32());
                } else
                    message.periodOffset.push(reader.uint32());
                break;
            case 3:
                if (!(message.speedSummary && message.speedSummary.length))
                    message.speedSummary = [];
                message.speedSummary.push($root.SpeedSummary.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SpeedSummaryByPeriod message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SpeedSummaryByPeriod
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SpeedSummaryByPeriod} SpeedSummaryByPeriod
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedSummaryByPeriod.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SpeedSummaryByPeriod message.
     * @function verify
     * @memberof SpeedSummaryByPeriod
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SpeedSummaryByPeriod.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.periodOffset != null && message.hasOwnProperty("periodOffset")) {
            if (!Array.isArray(message.periodOffset))
                return "periodOffset: array expected";
            for (var i = 0; i < message.periodOffset.length; ++i)
                if (!$util.isInteger(message.periodOffset[i]))
                    return "periodOffset: integer[] expected";
        }
        if (message.speedSummary != null && message.hasOwnProperty("speedSummary")) {
            if (!Array.isArray(message.speedSummary))
                return "speedSummary: array expected";
            for (var i = 0; i < message.speedSummary.length; ++i) {
                var error = $root.SpeedSummary.verify(message.speedSummary[i]);
                if (error)
                    return "speedSummary." + error;
            }
        }
        return null;
    };

    /**
     * Creates a SpeedSummaryByPeriod message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SpeedSummaryByPeriod
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SpeedSummaryByPeriod} SpeedSummaryByPeriod
     */
    SpeedSummaryByPeriod.fromObject = function fromObject(object) {
        if (object instanceof $root.SpeedSummaryByPeriod)
            return object;
        var message = new $root.SpeedSummaryByPeriod();
        if (object.periodOffset) {
            if (!Array.isArray(object.periodOffset))
                throw TypeError(".SpeedSummaryByPeriod.periodOffset: array expected");
            message.periodOffset = [];
            for (var i = 0; i < object.periodOffset.length; ++i)
                message.periodOffset[i] = object.periodOffset[i] >>> 0;
        }
        if (object.speedSummary) {
            if (!Array.isArray(object.speedSummary))
                throw TypeError(".SpeedSummaryByPeriod.speedSummary: array expected");
            message.speedSummary = [];
            for (var i = 0; i < object.speedSummary.length; ++i) {
                if (typeof object.speedSummary[i] !== "object")
                    throw TypeError(".SpeedSummaryByPeriod.speedSummary: object expected");
                message.speedSummary[i] = $root.SpeedSummary.fromObject(object.speedSummary[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a SpeedSummaryByPeriod message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SpeedSummaryByPeriod
     * @static
     * @param {SpeedSummaryByPeriod} message SpeedSummaryByPeriod
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SpeedSummaryByPeriod.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.periodOffset = [];
            object.speedSummary = [];
        }
        if (message.periodOffset && message.periodOffset.length) {
            object.periodOffset = [];
            for (var j = 0; j < message.periodOffset.length; ++j)
                object.periodOffset[j] = message.periodOffset[j];
        }
        if (message.speedSummary && message.speedSummary.length) {
            object.speedSummary = [];
            for (var j = 0; j < message.speedSummary.length; ++j)
                object.speedSummary[j] = $root.SpeedSummary.toObject(message.speedSummary[j], options);
        }
        return object;
    };

    /**
     * Converts this SpeedSummaryByPeriod to JSON.
     * @function toJSON
     * @memberof SpeedSummaryByPeriod
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SpeedSummaryByPeriod.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SpeedSummaryByPeriod;
})();

$root.SharedStreetsWeeklySpeeds = (function() {

    /**
     * Properties of a SharedStreetsWeeklySpeeds.
     * @exports ISharedStreetsWeeklySpeeds
     * @interface ISharedStreetsWeeklySpeeds
     * @property {string|null} [referenceId] SharedStreetsWeeklySpeeds referenceId
     * @property {PeriodSize|null} [periodSize] SharedStreetsWeeklySpeeds periodSize
     * @property {boolean|null} [scaledCounts] SharedStreetsWeeklySpeeds scaledCounts
     * @property {number|Long|null} [referenceLength] SharedStreetsWeeklySpeeds referenceLength
     * @property {number|null} [numberOfBins] SharedStreetsWeeklySpeeds numberOfBins
     * @property {Array.<number>|null} [binPosition] SharedStreetsWeeklySpeeds binPosition
     * @property {Array.<ISpeedHistogramByPeriod>|null} [speedsByPeriod] SharedStreetsWeeklySpeeds speedsByPeriod
     * @property {Array.<ISpeedSummaryByPeriod>|null} [speedSummaryByPeriod] SharedStreetsWeeklySpeeds speedSummaryByPeriod
     */

    /**
     * Constructs a new SharedStreetsWeeklySpeeds.
     * @exports SharedStreetsWeeklySpeeds
     * @classdesc Represents a SharedStreetsWeeklySpeeds.
     * @implements ISharedStreetsWeeklySpeeds
     * @constructor
     * @param {ISharedStreetsWeeklySpeeds=} [properties] Properties to set
     */
    function SharedStreetsWeeklySpeeds(properties) {
        this.binPosition = [];
        this.speedsByPeriod = [];
        this.speedSummaryByPeriod = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SharedStreetsWeeklySpeeds referenceId.
     * @member {string} referenceId
     * @memberof SharedStreetsWeeklySpeeds
     * @instance
     */
    SharedStreetsWeeklySpeeds.prototype.referenceId = "";

    /**
     * SharedStreetsWeeklySpeeds periodSize.
     * @member {PeriodSize} periodSize
     * @memberof SharedStreetsWeeklySpeeds
     * @instance
     */
    SharedStreetsWeeklySpeeds.prototype.periodSize = 0;

    /**
     * SharedStreetsWeeklySpeeds scaledCounts.
     * @member {boolean} scaledCounts
     * @memberof SharedStreetsWeeklySpeeds
     * @instance
     */
    SharedStreetsWeeklySpeeds.prototype.scaledCounts = false;

    /**
     * SharedStreetsWeeklySpeeds referenceLength.
     * @member {number|Long} referenceLength
     * @memberof SharedStreetsWeeklySpeeds
     * @instance
     */
    SharedStreetsWeeklySpeeds.prototype.referenceLength = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * SharedStreetsWeeklySpeeds numberOfBins.
     * @member {number} numberOfBins
     * @memberof SharedStreetsWeeklySpeeds
     * @instance
     */
    SharedStreetsWeeklySpeeds.prototype.numberOfBins = 0;

    /**
     * SharedStreetsWeeklySpeeds binPosition.
     * @member {Array.<number>} binPosition
     * @memberof SharedStreetsWeeklySpeeds
     * @instance
     */
    SharedStreetsWeeklySpeeds.prototype.binPosition = $util.emptyArray;

    /**
     * SharedStreetsWeeklySpeeds speedsByPeriod.
     * @member {Array.<ISpeedHistogramByPeriod>} speedsByPeriod
     * @memberof SharedStreetsWeeklySpeeds
     * @instance
     */
    SharedStreetsWeeklySpeeds.prototype.speedsByPeriod = $util.emptyArray;

    /**
     * SharedStreetsWeeklySpeeds speedSummaryByPeriod.
     * @member {Array.<ISpeedSummaryByPeriod>} speedSummaryByPeriod
     * @memberof SharedStreetsWeeklySpeeds
     * @instance
     */
    SharedStreetsWeeklySpeeds.prototype.speedSummaryByPeriod = $util.emptyArray;

    /**
     * Creates a new SharedStreetsWeeklySpeeds instance using the specified properties.
     * @function create
     * @memberof SharedStreetsWeeklySpeeds
     * @static
     * @param {ISharedStreetsWeeklySpeeds=} [properties] Properties to set
     * @returns {SharedStreetsWeeklySpeeds} SharedStreetsWeeklySpeeds instance
     */
    SharedStreetsWeeklySpeeds.create = function create(properties) {
        return new SharedStreetsWeeklySpeeds(properties);
    };

    /**
     * Encodes the specified SharedStreetsWeeklySpeeds message. Does not implicitly {@link SharedStreetsWeeklySpeeds.verify|verify} messages.
     * @function encode
     * @memberof SharedStreetsWeeklySpeeds
     * @static
     * @param {ISharedStreetsWeeklySpeeds} message SharedStreetsWeeklySpeeds message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SharedStreetsWeeklySpeeds.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.referenceId != null && message.hasOwnProperty("referenceId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.referenceId);
        if (message.periodSize != null && message.hasOwnProperty("periodSize"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.periodSize);
        if (message.scaledCounts != null && message.hasOwnProperty("scaledCounts"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.scaledCounts);
        if (message.referenceLength != null && message.hasOwnProperty("referenceLength"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.referenceLength);
        if (message.numberOfBins != null && message.hasOwnProperty("numberOfBins"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.numberOfBins);
        if (message.binPosition != null && message.binPosition.length) {
            writer.uint32(/* id 6, wireType 2 =*/50).fork();
            for (var i = 0; i < message.binPosition.length; ++i)
                writer.uint32(message.binPosition[i]);
            writer.ldelim();
        }
        if (message.speedsByPeriod != null && message.speedsByPeriod.length)
            for (var i = 0; i < message.speedsByPeriod.length; ++i)
                $root.SpeedHistogramByPeriod.encode(message.speedsByPeriod[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.speedSummaryByPeriod != null && message.speedSummaryByPeriod.length)
            for (var i = 0; i < message.speedSummaryByPeriod.length; ++i)
                $root.SpeedSummaryByPeriod.encode(message.speedSummaryByPeriod[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SharedStreetsWeeklySpeeds message, length delimited. Does not implicitly {@link SharedStreetsWeeklySpeeds.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SharedStreetsWeeklySpeeds
     * @static
     * @param {ISharedStreetsWeeklySpeeds} message SharedStreetsWeeklySpeeds message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SharedStreetsWeeklySpeeds.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SharedStreetsWeeklySpeeds message from the specified reader or buffer.
     * @function decode
     * @memberof SharedStreetsWeeklySpeeds
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SharedStreetsWeeklySpeeds} SharedStreetsWeeklySpeeds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SharedStreetsWeeklySpeeds.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SharedStreetsWeeklySpeeds();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.referenceId = reader.string();
                break;
            case 2:
                message.periodSize = reader.int32();
                break;
            case 3:
                message.scaledCounts = reader.bool();
                break;
            case 4:
                message.referenceLength = reader.uint64();
                break;
            case 5:
                message.numberOfBins = reader.uint32();
                break;
            case 6:
                if (!(message.binPosition && message.binPosition.length))
                    message.binPosition = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.binPosition.push(reader.uint32());
                } else
                    message.binPosition.push(reader.uint32());
                break;
            case 7:
                if (!(message.speedsByPeriod && message.speedsByPeriod.length))
                    message.speedsByPeriod = [];
                message.speedsByPeriod.push($root.SpeedHistogramByPeriod.decode(reader, reader.uint32()));
                break;
            case 8:
                if (!(message.speedSummaryByPeriod && message.speedSummaryByPeriod.length))
                    message.speedSummaryByPeriod = [];
                message.speedSummaryByPeriod.push($root.SpeedSummaryByPeriod.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SharedStreetsWeeklySpeeds message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SharedStreetsWeeklySpeeds
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SharedStreetsWeeklySpeeds} SharedStreetsWeeklySpeeds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SharedStreetsWeeklySpeeds.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SharedStreetsWeeklySpeeds message.
     * @function verify
     * @memberof SharedStreetsWeeklySpeeds
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SharedStreetsWeeklySpeeds.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.referenceId != null && message.hasOwnProperty("referenceId"))
            if (!$util.isString(message.referenceId))
                return "referenceId: string expected";
        if (message.periodSize != null && message.hasOwnProperty("periodSize"))
            switch (message.periodSize) {
            default:
                return "periodSize: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                break;
            }
        if (message.scaledCounts != null && message.hasOwnProperty("scaledCounts"))
            if (typeof message.scaledCounts !== "boolean")
                return "scaledCounts: boolean expected";
        if (message.referenceLength != null && message.hasOwnProperty("referenceLength"))
            if (!$util.isInteger(message.referenceLength) && !(message.referenceLength && $util.isInteger(message.referenceLength.low) && $util.isInteger(message.referenceLength.high)))
                return "referenceLength: integer|Long expected";
        if (message.numberOfBins != null && message.hasOwnProperty("numberOfBins"))
            if (!$util.isInteger(message.numberOfBins))
                return "numberOfBins: integer expected";
        if (message.binPosition != null && message.hasOwnProperty("binPosition")) {
            if (!Array.isArray(message.binPosition))
                return "binPosition: array expected";
            for (var i = 0; i < message.binPosition.length; ++i)
                if (!$util.isInteger(message.binPosition[i]))
                    return "binPosition: integer[] expected";
        }
        if (message.speedsByPeriod != null && message.hasOwnProperty("speedsByPeriod")) {
            if (!Array.isArray(message.speedsByPeriod))
                return "speedsByPeriod: array expected";
            for (var i = 0; i < message.speedsByPeriod.length; ++i) {
                var error = $root.SpeedHistogramByPeriod.verify(message.speedsByPeriod[i]);
                if (error)
                    return "speedsByPeriod." + error;
            }
        }
        if (message.speedSummaryByPeriod != null && message.hasOwnProperty("speedSummaryByPeriod")) {
            if (!Array.isArray(message.speedSummaryByPeriod))
                return "speedSummaryByPeriod: array expected";
            for (var i = 0; i < message.speedSummaryByPeriod.length; ++i) {
                var error = $root.SpeedSummaryByPeriod.verify(message.speedSummaryByPeriod[i]);
                if (error)
                    return "speedSummaryByPeriod." + error;
            }
        }
        return null;
    };

    /**
     * Creates a SharedStreetsWeeklySpeeds message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SharedStreetsWeeklySpeeds
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SharedStreetsWeeklySpeeds} SharedStreetsWeeklySpeeds
     */
    SharedStreetsWeeklySpeeds.fromObject = function fromObject(object) {
        if (object instanceof $root.SharedStreetsWeeklySpeeds)
            return object;
        var message = new $root.SharedStreetsWeeklySpeeds();
        if (object.referenceId != null)
            message.referenceId = String(object.referenceId);
        switch (object.periodSize) {
        case "OneSecond":
        case 0:
            message.periodSize = 0;
            break;
        case "FiveSeconds":
        case 1:
            message.periodSize = 1;
            break;
        case "TenSeconds":
        case 2:
            message.periodSize = 2;
            break;
        case "FifteenSeconds":
        case 3:
            message.periodSize = 3;
            break;
        case "ThirtySeconds":
        case 4:
            message.periodSize = 4;
            break;
        case "OneMinute":
        case 5:
            message.periodSize = 5;
            break;
        case "FiveMinutes":
        case 6:
            message.periodSize = 6;
            break;
        case "TenMinutes":
        case 7:
            message.periodSize = 7;
            break;
        case "FifteenMinutes":
        case 8:
            message.periodSize = 8;
            break;
        case "ThirtyMinutes":
        case 9:
            message.periodSize = 9;
            break;
        case "OneHour":
        case 10:
            message.periodSize = 10;
            break;
        case "OneDay":
        case 11:
            message.periodSize = 11;
            break;
        case "OneWeek":
        case 12:
            message.periodSize = 12;
            break;
        case "OneMonth":
        case 13:
            message.periodSize = 13;
            break;
        case "OneYear":
        case 14:
            message.periodSize = 14;
            break;
        }
        if (object.scaledCounts != null)
            message.scaledCounts = Boolean(object.scaledCounts);
        if (object.referenceLength != null)
            if ($util.Long)
                (message.referenceLength = $util.Long.fromValue(object.referenceLength)).unsigned = true;
            else if (typeof object.referenceLength === "string")
                message.referenceLength = parseInt(object.referenceLength, 10);
            else if (typeof object.referenceLength === "number")
                message.referenceLength = object.referenceLength;
            else if (typeof object.referenceLength === "object")
                message.referenceLength = new $util.LongBits(object.referenceLength.low >>> 0, object.referenceLength.high >>> 0).toNumber(true);
        if (object.numberOfBins != null)
            message.numberOfBins = object.numberOfBins >>> 0;
        if (object.binPosition) {
            if (!Array.isArray(object.binPosition))
                throw TypeError(".SharedStreetsWeeklySpeeds.binPosition: array expected");
            message.binPosition = [];
            for (var i = 0; i < object.binPosition.length; ++i)
                message.binPosition[i] = object.binPosition[i] >>> 0;
        }
        if (object.speedsByPeriod) {
            if (!Array.isArray(object.speedsByPeriod))
                throw TypeError(".SharedStreetsWeeklySpeeds.speedsByPeriod: array expected");
            message.speedsByPeriod = [];
            for (var i = 0; i < object.speedsByPeriod.length; ++i) {
                if (typeof object.speedsByPeriod[i] !== "object")
                    throw TypeError(".SharedStreetsWeeklySpeeds.speedsByPeriod: object expected");
                message.speedsByPeriod[i] = $root.SpeedHistogramByPeriod.fromObject(object.speedsByPeriod[i]);
            }
        }
        if (object.speedSummaryByPeriod) {
            if (!Array.isArray(object.speedSummaryByPeriod))
                throw TypeError(".SharedStreetsWeeklySpeeds.speedSummaryByPeriod: array expected");
            message.speedSummaryByPeriod = [];
            for (var i = 0; i < object.speedSummaryByPeriod.length; ++i) {
                if (typeof object.speedSummaryByPeriod[i] !== "object")
                    throw TypeError(".SharedStreetsWeeklySpeeds.speedSummaryByPeriod: object expected");
                message.speedSummaryByPeriod[i] = $root.SpeedSummaryByPeriod.fromObject(object.speedSummaryByPeriod[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a SharedStreetsWeeklySpeeds message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SharedStreetsWeeklySpeeds
     * @static
     * @param {SharedStreetsWeeklySpeeds} message SharedStreetsWeeklySpeeds
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SharedStreetsWeeklySpeeds.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.binPosition = [];
            object.speedsByPeriod = [];
            object.speedSummaryByPeriod = [];
        }
        if (options.defaults) {
            object.referenceId = "";
            object.periodSize = options.enums === String ? "OneSecond" : 0;
            object.scaledCounts = false;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.referenceLength = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.referenceLength = options.longs === String ? "0" : 0;
            object.numberOfBins = 0;
        }
        if (message.referenceId != null && message.hasOwnProperty("referenceId"))
            object.referenceId = message.referenceId;
        if (message.periodSize != null && message.hasOwnProperty("periodSize"))
            object.periodSize = options.enums === String ? $root.PeriodSize[message.periodSize] : message.periodSize;
        if (message.scaledCounts != null && message.hasOwnProperty("scaledCounts"))
            object.scaledCounts = message.scaledCounts;
        if (message.referenceLength != null && message.hasOwnProperty("referenceLength"))
            if (typeof message.referenceLength === "number")
                object.referenceLength = options.longs === String ? String(message.referenceLength) : message.referenceLength;
            else
                object.referenceLength = options.longs === String ? $util.Long.prototype.toString.call(message.referenceLength) : options.longs === Number ? new $util.LongBits(message.referenceLength.low >>> 0, message.referenceLength.high >>> 0).toNumber(true) : message.referenceLength;
        if (message.numberOfBins != null && message.hasOwnProperty("numberOfBins"))
            object.numberOfBins = message.numberOfBins;
        if (message.binPosition && message.binPosition.length) {
            object.binPosition = [];
            for (var j = 0; j < message.binPosition.length; ++j)
                object.binPosition[j] = message.binPosition[j];
        }
        if (message.speedsByPeriod && message.speedsByPeriod.length) {
            object.speedsByPeriod = [];
            for (var j = 0; j < message.speedsByPeriod.length; ++j)
                object.speedsByPeriod[j] = $root.SpeedHistogramByPeriod.toObject(message.speedsByPeriod[j], options);
        }
        if (message.speedSummaryByPeriod && message.speedSummaryByPeriod.length) {
            object.speedSummaryByPeriod = [];
            for (var j = 0; j < message.speedSummaryByPeriod.length; ++j)
                object.speedSummaryByPeriod[j] = $root.SpeedSummaryByPeriod.toObject(message.speedSummaryByPeriod[j], options);
        }
        return object;
    };

    /**
     * Converts this SharedStreetsWeeklySpeeds to JSON.
     * @function toJSON
     * @memberof SharedStreetsWeeklySpeeds
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SharedStreetsWeeklySpeeds.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SharedStreetsWeeklySpeeds;
})();

module.exports = $root;
