export class Lightbuffer {
    private dataView: DataView;
    private offset = 0;

    private constructor(
        private arrayBuffer: ArrayBufferLike
    ) {
        this.dataView = new DataView(arrayBuffer);
    }

    public readByte(): number {
        return 0;
    }

    public readDouble(): number {
        return 0;
    }

    public readFloat(): number {
        return 0;
    }

    public readInt(): number {
        return 0;
    }

    public readInt8(): number {
        return 0;
    }

    public readInt16(): number {
        return 0;
    }

    public readInt32(): number {
        return 0;
    }

    public readInt64(): number {
        return 0;
    }

    public readLong(): number {
        return 0;
    }

    public readShort(): number {
        return 0;
    }

    public readString(): string {
        return "";
    }

    public readChar(): string {
        return "";
    }

    public readUint8(): number {
        return 0;
    }

    public readUint16(): number {
        return 0;
    }

    public readUint32(): number {
        return 0;
    }

    public readUint64(): number {
        return 0;
    }





    public static fromArrayBufferLike(arrayBuffer: ArrayBufferLike): Lightbuffer {
        return new Lightbuffer(arrayBuffer);
    }
}
