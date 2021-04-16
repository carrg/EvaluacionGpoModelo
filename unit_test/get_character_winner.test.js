
const axios = require('axios');
const { getCharacters } = require('../utils/axios_client');
const { main } = require('../src/get_character_winner/handler');
const { expect } = require('@jest/globals');

jest.mock('axios');
jest.mock('../utils/axios_client');

beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
});

const event = {
    event: {
        body : '{ "characterA": "vegeta", "characterB": "goku" }'
    },
};

const characters = {
    "data": {
        "characters": [
            {
            "id": "goku",
            "name": "Goku",
            "race": "Saiyan",
            "gender": "Male",
            "bio": "Goku, born Kakarot, is a male Saiyan and the main protagonist of the Dragon Ball series. Goku is a Saiyan originally sent to Earth as an infant with the mission to destroy its people. However, an accident alters his memory, allowing him to grow up to become Earth's greatest defender and the informal leader of the Dragon Team. He constantly strives and trains to be the greatest warrior possible, which has kept the Earth and the universe safe from destruction many times.",
            "health": "500,000",
            "attack": "50,000",
            "defense": "50,000",
            "kiRestoreSpeed": "50,000",
            "abilities": [
                "Super Saiyan Transformations",
                "Super Kamehameha",
                "Super Dragon Fist"
            ],
            "img": "assets/goku.png"
            },
            {
            "id": "vegeta",
            "name": "Vegeta",
            "race": "Saiyan",
            "gender": "Male",
            "bio": "Vegeta is the Prince of an extraterrestrial race of warriors known as the Saiyans just like the series' protagonist, Goku. Vegeta is extremely vain and proud, constantly referring to his heritage throughout the series. He believes he should be regarded as the strongest fighter in the Universe and becomes obsessed with surpassing Goku after fighting him. After his loss to Goku and the Z fighters, Vegeta later reluctantly unites with the heroes to thwart greater threats to the universe. Throughout the series, Vegeta's role changes from villain to antihero and later as one of the heroes, while remaining a rival to Goku. Vegeta's character, particularly his personality, has been well received. He is one of the Dragon Ball franchise's most popular characters.",
            "health": "490,000",
            "attack": "49,000",
            "defense": "49,000",
            "kiRestoreSpeed": "49,000",
            "abilities": [
                "Super Saiyan Transformations",
                "Final Flash",
                "Big Bang Attack"
            ],
            "img": "assets/vegeta.png"
            }
        ]
    }
}

describe('Prueba de Character Winner', () => {
    it('Probando datos requeridos', async () => {
        axios.get.mockResolvedValue(characters)
        getCharacters.mockResolvedValue(characters)
        expect(await main()).toEqual({"body": "{\"error\":\"Error: Un evento es requerido\"}", "headers": {"Access-Control-Allow-Credentials": true, "Access-Control-Allow-Origin": "*"}, "statusCode": 500})
    });

    it('Probando caso de exito', async () => {
        axios.get.mockResolvedValue(characters)
        getCharacters.mockResolvedValue(characters)
        const res = await main(event.event)
        expect(res.body).toEqual(JSON.stringify({winner: "goku"}))
        expect(typeof(res.body)).toBe('string')
        expect(res.statusCode).toEqual(200)
    });
  });