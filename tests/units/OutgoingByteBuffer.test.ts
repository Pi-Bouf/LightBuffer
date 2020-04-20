import {OutgoingByteBuffer} from "../../src/App";
import {expect} from "chai";
import {Types} from "../../src/App/Enum/Types";

describe("[u] Outgoing ByteBuffer tests", () => {
    var outgoingByteBuffer: OutgoingByteBuffer;

    beforeEach(() => {
        outgoingByteBuffer = new OutgoingByteBuffer();
    });

    it("Int", () => {
        outgoingByteBuffer.writeInt(1).writeInt(2).writeInt(3, 4).writeInt(9999999);

        expect(outgoingByteBuffer.size).is.eq(16);
        expect(JSON.stringify(outgoingByteBuffer.data)).is.eq(JSON.stringify(
            [
                {type: Types.INT, value: 1},
                {type: Types.INT, value: 2},
                {type: Types.INT, value: 3, offset: 4},
                {type: Types.INT, value: 9999999}
            ]
        ));
    });

    it("Short", () => {
        outgoingByteBuffer.writeShort(1).writeShort(2, 0).writeShort(3).writeShort(65536);

        expect(outgoingByteBuffer.size).is.eq(8);
        expect(JSON.stringify(outgoingByteBuffer.data)).is.eq(JSON.stringify(
            [
                {type: Types.SHORT, value: 1},
                {type: Types.SHORT, value: 2, offset: 0},
                {type: Types.SHORT, value: 3},
                {type: Types.SHORT, value: 65536}
            ]
        ));
    });

    it("Boolean", () => {
        outgoingByteBuffer.writeBoolean(true).writeBoolean(false, 0).writeBoolean(true).writeBoolean(false);

        expect(outgoingByteBuffer.size).is.eq(4);
        expect(JSON.stringify(outgoingByteBuffer.data)).is.eq(JSON.stringify(
            [
                {type: Types.BOOLEAN, value: true},
                {type: Types.BOOLEAN, value: false, offset: 0},
                {type: Types.BOOLEAN, value: true},
                {type: Types.BOOLEAN, value: false}
            ]
        ));
    });

    it("Byte", () => {
        outgoingByteBuffer.writeByte(1).writeByte(2).writeByte(9, 1).writeByte(0);

        expect(outgoingByteBuffer.size).is.eq(4);
        expect(JSON.stringify(outgoingByteBuffer.data)).is.eq(JSON.stringify(
            [
                {type: Types.BYTE, value: 1},
                {type: Types.BYTE, value: 2},
                {type: Types.BYTE, value: 9, offset: 1},
                {type: Types.BYTE, value: 0}
            ]
        ));
    });

    it("Float", () => {
        outgoingByteBuffer.writeFloat(1.23).writeFloat(54.677).writeFloat(1000.0001, 1).writeFloat(0);

        expect(outgoingByteBuffer.size).is.eq(16);
        expect(JSON.stringify(outgoingByteBuffer.data)).is.eq(JSON.stringify(
            [
                {type: Types.FLOAT, value: 1.23},
                {type: Types.FLOAT, value: 54.677},
                {type: Types.FLOAT, value: 1000.0001, offset: 1},
                {type: Types.FLOAT, value: 0}
            ]
        ));
    });

    it("Double", () => {
        outgoingByteBuffer.writeDouble(1.23).writeDouble(54.677).writeDouble(1000.0001, 1).writeDouble(0);

        expect(outgoingByteBuffer.size).is.eq(32);
        expect(JSON.stringify(outgoingByteBuffer.data)).is.eq(JSON.stringify(
            [
                {type: Types.DOUBLE, value: 1.23},
                {type: Types.DOUBLE, value: 54.677},
                {type: Types.DOUBLE, value: 1000.0001, offset: 1},
                {type: Types.DOUBLE, value: 0}
            ]
        ));
    });

    it("Char", () => {
        outgoingByteBuffer.writeChar("Z").writeChar("O").writeChar("B").writeChar("!", 2);

        expect(outgoingByteBuffer.size).is.eq(8);
        expect(JSON.stringify(outgoingByteBuffer.data)).is.eq(JSON.stringify(
            [
                {type: Types.CHAR, value: "Z"},
                {type: Types.CHAR, value: "O"},
                {type: Types.CHAR, value: "B"},
                {type: Types.CHAR, value: "!", offset: 2},
            ]
        ));
    });

    it("String", () => {
        outgoingByteBuffer.writeString("coucou");

        expect(outgoingByteBuffer.size).is.eq(14);
        expect(JSON.stringify(outgoingByteBuffer.data)).is.eq(JSON.stringify(
            [
                {type: Types.STRING, value: "coucou"},
            ]
        ));
    });
});