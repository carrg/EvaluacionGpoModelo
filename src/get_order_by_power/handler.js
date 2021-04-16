const { generateResponse } = require('../../utils/response')
const { getCharacters } = require('../../utils/axios_client')

module.exports.main = async event => {
    let response, statusCode = 200

    try {
      const body = JSON.parse(event.body)
      if(!event.body) {
        throw new Error('Es necesario un body request');
      }
  
      const { data } = await getCharacters();
      if (!data)
      {
          throw new Error('No se pudo obtener la información de los personajes');
      }
  
      let listPower = []
  
      body.forEach(element => {
          const char = data.characters.find( x => x.id === element );
          if (char)
          {
            const healthNumber = Number(char.health.replace(/,/g,''))
            const attackNumber = Number(char.attack.replace(/,/g,''))
            const defenseNumber = Number(char.defense.replace(/,/g,''))
    
            listPower.push({
                "id" : char.id,
                "power" : healthNumber  + (defenseNumber * 2) + (attackNumber * 3)
            })
          }
      });

      response = listPower.sort((a,b) => (a.power < b.power) ? 1 : ((b.power < a.power) ? -1 : 0))
    } catch (ex) {
      statusCode = 500
      response = `${ex}`
      console.log(`${ex}`)
    }

    return generateResponse({
      statusCode: 200,
      body: response
    })
  };