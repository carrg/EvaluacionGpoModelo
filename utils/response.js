function generateResponse (responseOptions = {}) {
    const response = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    }
    if (responseOptions.error) {
        response.statusCode = 500
        response.body = JSON.stringify(responseOptions.error)
    }
    if (responseOptions.statusCode) {
        response.statusCode = responseOptions.statusCode
    }
    if (responseOptions.body) {
        response.body = JSON.stringify(responseOptions.body)
    }

    return response
}

function handleValidationError (error) {
    const errorDetail = error.details.map((detail) => {
        return {
            error: 'Validation error',
            message: detail.message.replace(/"/g, ''),
        }
    })
    console.error(errorDetail)
    return generateResponse({
        statusCode: 400,
        body: { error: errorDetail },
    })
}

module.exports = {
    generateResponse,
    handleValidationError,
}
