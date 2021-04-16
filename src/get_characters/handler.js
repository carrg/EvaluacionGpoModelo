const { generateResponse } = require('../../utils/response')
const { getCharacters } = require('../../utils/axios_client')


module.exports.main = async event => {
    const { data } = await getCharacters();
    let statusCode = data == undefined || data == null ? 500 : 200;

    return generateResponse({
      statusCode: statusCode,
      body: data
    })
  };