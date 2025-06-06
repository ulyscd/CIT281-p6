/*
CIT 281 Lab 7
Ulys Chauncey Drumrongthai
*/

class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

function throwGenericError() {
    throw new Error("Generic error");
}

function throwCustomError() {
    throw new CustomError("Custom error");
}

try {
    console.log("Trying for a generic error:");
    throwGenericError();
} catch (err) {
    console.log("Caught the error:", err.name, "-", err.message);
} finally {
    console.log("Finally: Generic Error!");
}

try {
    console.log("Trying for a custom error:");
    throwCustomError();
} catch (err) {
    console.log("Caught the error:", err.name, "-", err.message);
} finally {
    console.log("Finally: Custom Error!");
}