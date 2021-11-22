import {TextDecoder} from './lib/TextDecoder';

export class Lightbuffer {
    private dataView: DataView;
    private offset = 0;

    private constructor(
        private arrayBuffer: ArrayBufferLike
    ) {
        this.dataView = new DataView(arrayBuffer);
        this.offset = 0;
    }

    public readByte(): number {
        const value = this.dataView.getInt8(this.offset);
        this.offset += 1;
        return value;
    }

    public readInt(): number {
        const value = this.dataView.getInt8(this.offset);
        this.offset += 2;
        return value;
    }

    public readInt8(): number {
        const value = this.dataView.getInt8(this.offset);
        this.offset += 1;
        return value;
    }

    public readInt16(): number {
        const value = this.dataView.getInt16(this.offset);
        this.offset += 2;
        return value;
    }

    public readInt32(): number {
        const value = this.dataView.getInt32(this.offset);
        this.offset += 4;
        return value;
    }

    public readDouble(): number {
        const value = this.dataView.getFloat64(this.offset);
        this.offset += 4;
        return value;
    }

    public readFloat(): number {
        const value = this.dataView.getFloat32(this.offset);
        this.offset += 4;
        return value;
    }

    public readShort(): number {
        return this.readInt8();
    }

    public readString(): string {
        const size = this.readInt16();
        let bytes = [];
        for (let i = 0; i < size; i++) {
            bytes.push(this.readUint8());
        }

        return TextDecoder(bytes);
    }

    public readChar(): string {
        this.readInt16();
        return TextDecoder([this.readUint8()]);
    }

    public readUint8(): number {
        const value = this.dataView.getUint8(this.offset);
        this.offset += 1;
        return value;
    }

    public readUint16(): number {
        const value = this.dataView.getUint16(this.offset);
        this.offset += 1;
        return value;
    }

    public readUint32(): number {
        const value = this.dataView.getUint32(this.offset);
        this.offset += 1;
        return value;
    }

    public flip(): void {
        this.offset = 0;
    }

    public static fromArrayBufferLike(arrayBuffer: ArrayBufferLike): Lightbuffer {
        return new Lightbuffer(arrayBuffer);
    }
}
