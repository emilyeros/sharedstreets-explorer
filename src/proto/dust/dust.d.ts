import * as $protobuf from "protobufjs";

/** Properties of a MapDustTrace. */
export interface IMapDustTrace {

    /** MapDustTrace endId */
    endId?: (string|null);

    /** MapDustTrace startFraction */
    startFraction?: (number[]|null);

    /** MapDustTrace endFraction */
    endFraction?: (number[]|null);

    /** MapDustTrace lonlats */
    lonlats?: (number[]|null);
}

/** Represents a MapDustTrace. */
export class MapDustTrace implements IMapDustTrace {

    /**
     * Constructs a new MapDustTrace.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMapDustTrace);

    /** MapDustTrace endId. */
    public endId: string;

    /** MapDustTrace startFraction. */
    public startFraction: number[];

    /** MapDustTrace endFraction. */
    public endFraction: number[];

    /** MapDustTrace lonlats. */
    public lonlats: number[];

    /**
     * Creates a new MapDustTrace instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MapDustTrace instance
     */
    public static create(properties?: IMapDustTrace): MapDustTrace;

    /**
     * Encodes the specified MapDustTrace message. Does not implicitly {@link MapDustTrace.verify|verify} messages.
     * @param message MapDustTrace message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMapDustTrace, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MapDustTrace message, length delimited. Does not implicitly {@link MapDustTrace.verify|verify} messages.
     * @param message MapDustTrace message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMapDustTrace, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MapDustTrace message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MapDustTrace
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MapDustTrace;

    /**
     * Decodes a MapDustTrace message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MapDustTrace
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MapDustTrace;

    /**
     * Verifies a MapDustTrace message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MapDustTrace message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MapDustTrace
     */
    public static fromObject(object: { [k: string]: any }): MapDustTrace;

    /**
     * Creates a plain object from a MapDustTrace message. Also converts values to other types if specified.
     * @param message MapDustTrace
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MapDustTrace, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MapDustTrace to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MapDust. */
export interface IMapDust {

    /** MapDust startId */
    startId?: (string|null);

    /** MapDust traceData */
    traceData?: (IMapDustTrace[]|null);
}

/** Represents a MapDust. */
export class MapDust implements IMapDust {

    /**
     * Constructs a new MapDust.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMapDust);

    /** MapDust startId. */
    public startId: string;

    /** MapDust traceData. */
    public traceData: IMapDustTrace[];

    /**
     * Creates a new MapDust instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MapDust instance
     */
    public static create(properties?: IMapDust): MapDust;

    /**
     * Encodes the specified MapDust message. Does not implicitly {@link MapDust.verify|verify} messages.
     * @param message MapDust message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMapDust, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MapDust message, length delimited. Does not implicitly {@link MapDust.verify|verify} messages.
     * @param message MapDust message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMapDust, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MapDust message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MapDust
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MapDust;

    /**
     * Decodes a MapDust message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MapDust
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MapDust;

    /**
     * Verifies a MapDust message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MapDust message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MapDust
     */
    public static fromObject(object: { [k: string]: any }): MapDust;

    /**
     * Creates a plain object from a MapDust message. Also converts values to other types if specified.
     * @param message MapDust
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MapDust, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MapDust to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
