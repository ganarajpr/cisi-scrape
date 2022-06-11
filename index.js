const axios = require('axios');


const run = async () => {
    const resp = await axios.post('https://www.indus.epigraphica.de/searchtext.php', {
        vidtext: '1',
        
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic aWNpdDpzZWFsMTIz',
            'Cookie': 'indususer=icit; induspasswort=seal123',
            'Origin': 'https://www.indus.epigraphica.de',
            'Referer': 'https://www.indus.epigraphica.de/menue_search.php',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        },

    });
    console.log(resp.data);
};


run();
