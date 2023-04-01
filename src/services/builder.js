function responseErrorInvalidBuilder(name) {
    return {
        statusCode: 400,
        message: `Invalid ${name}`,
        error: "Bad request",
    };
}

module.exports = responseErrorInvalidBuilder;
