const axios = require('axios');

function delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

PORTS = [3000, 3001]

async function sendRequest(){
  while(true){
    const random = Math.floor(Math.random() * PORTS.length);
    //const URL = `http://localhost:${PORTS[random]}/api/v1/count`
    const URL = `http://localhost:8080/api/v1/count`
    const res = await axios.post(URL);
    // __AUTO_GENERATED_PRINT_VAR_START__
    console.debug("sendRequest res: ", res['data']); // __AUTO_GENERATED_PRINT_VAR_END__
    await delay(100);
  }
}

sendRequest();
