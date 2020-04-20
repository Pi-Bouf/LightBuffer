import {OutgoingByteBuffer} from "../../src/App";
import {expect} from "chai";

describe("[u] Outgoing ByteBuffer tests", () => {
    it("Int", () => {
        let outgoingByteBuffer = new OutgoingByteBuffer().writeString("coucou")
        let arrayBuffer = outgoingByteBuffer.commit();

        console.log(arrayBuffer);
        // 00 06 63 6f 75 63 6f 75 00 00 00 00 00 00
        // 0, 6, 99, 111, 117, 99, 111, 117, 0, 0, 0, 0, 0, 0, 0, 0]
    });
});