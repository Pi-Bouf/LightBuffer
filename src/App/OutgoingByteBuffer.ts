import {IDataType} from "./Interface/IDataType";
import {Types} from "./Enum/Types";

export class OutgoingByteBuffer {
    private _data: IDataType[];
    private _size: number;

    constructor() {
        this._data = [];
        this._size = 0;
    }

    writeByte(value: number, offset?: number) {
        this._data.push({type: Types.BYTE, value: value, offset: offset});
        this._size += 1;

        return this;
    }

    writeBoolean(value: boolean, offset?: number) {
        this._data.push({type: Types.BOOLEAN, value: value, offset: offset});
        this._size += 1;

        return this;
    }

    writeShort(value: number, offset?: number) {
        this._data.push({type: Types.SHORT, value: value, offset: offset});
        this._size += 2;

        return this;
    }

    writeLong(value: number, offset?: number) {
        this._data.push({type: Types.LONG, value: value, offset: offset});
        this._size += 8;

        return this;
    }

    writeInt(value: number, offset?: number) {
        this._data.push({type: Types.INT, value: value, offset: offset});
        this._size += 4;

        return this;
    }

    writeFloat(value: number, offset?: number) {
        this._data.push({type: Types.FLOAT, value: value, offset: offset});
        this._size += 4;

        return this;
    }

    writeDouble(value: number, offset?: number) {
        this._data.push({type: Types.DOUBLE, value: value, offset: offset});
        this._size += 8;

        return this;
    }

    writeChar(value: string, offset?: number) {
        this._data.push({type: Types.CHAR, value: value, offset: offset});
        this._size += 2;

        return this;
    }

    writeString(value: string, offset?: number) {
        let charCodes = this.stringToCharCodes(value);

        this._data.push({type: Types.STRING, value: charCodes, offset: offset});
        this._size += (charCodes.length * 2) + 2;

        return this;
    }

    commit(): ArrayBuffer {
        let buffer = new ArrayBuffer(this._size);
        let bufferSlot = 0;
        let view = new DataView(buffer);

        this._data.forEach(data => {
            switch (data.type) {
                case Types.BYTE:
                case Types.BOOLEAN:
                    view.setInt8(data.offset !== undefined ? data.offset : bufferSlot, data.value);
                    bufferSlot += data.offset !== undefined ? 0 : 1;
                    break;
                case Types.SHORT:
                    view.setInt16(data.offset !== undefined ? data.offset : bufferSlot, data.value);
                    bufferSlot += data.offset !== undefined ? 0 : 2;
                    break;
                case Types.LONG:
                    view.setBigInt64(data.offset !== undefined ? data.offset : bufferSlot, data.value);
                    bufferSlot += data.offset !== undefined ? 0 : 8;
                    break;
                case Types.INT:
                    view.setInt32(data.offset !== undefined ? data.offset : bufferSlot, data.value);
                    bufferSlot += data.offset !== undefined ? 0 : 4;
                    break;
                case Types.FLOAT:
                    view.setFloat32(data.offset !== undefined ? data.offset : bufferSlot, data.value);
                    bufferSlot += data.offset !== undefined ? 0 : 4;
                    break;
                case Types.DOUBLE:
                    view.setFloat64(data.offset !== undefined ? data.offset : bufferSlot, data.value);
                    bufferSlot += data.offset !== undefined ? 0 : 8;
                    break;
                case Types.CHAR:
                    view.setInt16(data.offset !== undefined ? data.offset : bufferSlot, (data.value as string).charCodeAt(0));
                    bufferSlot += data.offset !== undefined ? 0 : 2;
                    break;
                case Types.STRING:
                    let values = data.value as number[];
                    view.setInt16(bufferSlot, values.length);
                    bufferSlot += 2;

                    values.forEach(value => {
                        view.setUint8(bufferSlot, value);
                        bufferSlot += 1;
                    });
                    break;
            }
        });


        return buffer;
    }

    private stringToCharCodes(str: string): number[] {
        let charCodes: number[] = [];
        for (let offset = 0; offset < str.length; offset++) {
            let charcode = str.charCodeAt(offset);
            if (charcode < 0x80) {
                charCodes.push(charcode);
            } else if (charcode < 0x800) {
                charCodes.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
            } else if (charcode < 0xd800 || charcode >= 0xe000) {
                charCodes.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            } else {
                offset++;
                charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(offset) & 0x3ff));
                charCodes.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
        }

        return charCodes;
    }

    public get data(): IDataType[] {
        return this._data;
    }

    public get size(): number {
        return this._size;
    }
}