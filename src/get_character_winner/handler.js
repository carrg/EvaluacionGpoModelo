const { generateResponse } = require('../../utils/response')
const { getCharacters } = require('../../utils/axios_client')

module.exports.main = async event => {
    let response, statusCode = 200
    try {
        if(!event) {
            throw new Error('Un evento es requerido');
        }

        const bodyJson = JSON.parse(event.body)
        if(!bodyJson) {
            throw new Error('Un body request es requerido');
        }

        const { characterA, characterB } = bodyJson
        if(!characterA || !characterB) {
            throw new Error('Los parametros characterA y characterB son requeridos');
        }

        const { data } = await getCharacters();
        if (!data)
        {
            throw new Error('No se pudo obtener la información de los personajes');
        }
    
        const respA = data.characters.find( x => x.id === characterA );
        if(!respA) {
            throw new Error(`No se encontró el personaje: ${characterA}`);
        }
        const respB = data.characters.find( x => x.id === characterB );
        if(!respB) {
            throw new Error(`No se encontró el personaje: ${characterB}`);
        }

        let chars = [
            {
                "id" : respA.id,
                "power" : Number(respA.health.replace(/,/g,''))  + (Number(respA.defense.replace(/,/g,'')) * 2) + (Number(respA.attack.replace(/,/g,'')) * 3)
            },
            {
                "id" : respB.id,
                "power" : Number(respB.health.replace(/,/g,''))  + (Number(respB.defense.replace(/,/g,'')) * 2) + (Number(respB.attack.replace(/,/g,'')) * 3)
            }
        ]
    
        const winner = chars.sort((a,b) => (a.power < b.power) ? 1 : ((b.power < a.power) ? -1 : 0))[0].id

        response = {
            winner
        }
    } catch (ex) {
        statusCode = 500
        response = {
            error: `${ex}`
        }
        console.log(`${ex}`)
    }
    
    return generateResponse({
      statusCode: statusCode,
      body: response
    })
  };