import cbor from "cbor";

export const decodeCbor = async (cborData) => {
  try {
    const cborBuffer = Buffer.from(cborData, "base64");
    const decodedData = await cbor.decode(cborBuffer, (value, tag) => {
      console.log(tag);
      if (tag === 30) {
        console.error(value);
        return new Date(value);
      }
      return value;
    });
    return decodedData;
  } catch (error) {
    console.error("Error decoding CBOR:", error);
  }
};

export const decodeCborX = async (cborData) => {
  try {
    const cborDataBuffer = Buffer.from(cborData, "hex");
    const decodedData = await decode(cborDataBuffer);
    console.log("Decoded CBOR data:", decodedData);
  } catch (error) {
    console.error("Error decoding CBOR:", error);
  }
};
