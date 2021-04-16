const axios = require('axios');

async function getCharacters()
{
    try {
        const response = await axios.get(process.env.HOST_CHARACTERS);
        return response
      } catch (error) {
        return error
      }
}

async function pruebaUno()
{
    return 1
}

module.exports = { getCharacters, pruebaUno }