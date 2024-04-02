import 'dotenv/config';
import { Database } from "@tableland/sdk";
const db = new Database();

const getPetImage = async (pet) => {

  const egg = '<g id="color"><path fill="#fff" d="M36,64c12.8581,0,20.9609-11.9773,20.9609-26.1572,0-14.6517-8.4161-29.8428-20.9609-29.8428S15.0391,23.1911,15.0391,37.8428c0,14.1799,8.1028,26.1572,20.9609,26.1572Z"/><path fill="#d0cfce" d="M56.96,37.84c0,14.18-8.1,26.16-20.96,26.16s-20.96-11.98-20.96-26.16c2.8265,16.4205,17.6473,18.9809,26.64,12.4926,9.6972-6.9967,12.8887-31.6694-.01-41.2326,9.34,3.73,15.29,16.4301,15.29,28.7401h0Z"/></g><g id="line">  <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M36,64c12.8581,0,20.9609-11.9773,20.9609-26.1572,0-14.6517-8.4161-29.8428-20.9609-29.8428S15.0391,23.1911,15.0391,37.8428c0,14.1799,8.1028,26.1572,20.9609,26.1572Z"/></g>';
  const hatch = '<g id="color"><path fill="#FCEA2B" stroke="#FCEA2B" stroke-miterlimit="10" stroke-width="1.8" d="M36.1089,44.1242 c0,0,21.3368-0.7112,10.6684-20.6256c0,0-2.8449-7.8235-10.6684-7.8235c-2.2075,0-4.0187,0.5096-5.4973,1.2733 c-3.7618,1.9427-5.3718,5.5292-5.8823,6.5502C24.018,24.9211,13.3496,42.7018,36.1089,44.1242z"/>     <path fill="#F1B31C" stroke="none" d="M35.3719,30.6032c0,0,5.9251-0.2907,0,5.2324C35.3719,35.8356,29.4468,30.6032,35.3719,30.6032z"/>     <path fill="#FFFFFF" stroke="none" d="M61.6942,37.9501C61.6942,52.3371,50.0313,64,35.6443,64S9.5944,52.3371,9.5944,37.9501l7.4428,3.7214 l6.5125-4.6518l8.3732,5.5821l6.2024-5.5821l8.1758,4.7364l7.0199-5.6667L61.6942,37.9501z"/>     <path fill="#D0CFCE" stroke="none" d="M53.321,36.0894C51.3406,47.7279,46.2215,57.4929,35.6443,64c14.387,0,26.0499-11.663,26.0499-26.0499 L53.321,36.0894z"/>   </g>   <g id="hair"/>   <g id="skin"/>   <g id="skin-shadow"/>   <g id="line">     <circle cx="30.908" cy="26.3629" r="2.3682" fill="#000000" stroke="none"/>     <circle cx="40.3807" cy="26.3629" r="2.3682" fill="#000000" stroke="none"/>     <line x1="34.7963" x2="33.4334" y1="14.9035" y2="9.7857" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>     <line x1="36.8284" x2="36.8284" y1="15.7062" y2="12.1539" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>     <line x1="38.9992" x2="40.3807" y1="15.9035" y2="9.7857" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>     <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M35.3719,30.6032c0,0,5.9251-0.2907,0,5.2324C35.3719,35.8356,29.4468,30.6032,35.3719,30.6032z"/>     <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M49.7637,33.4191c0.0286-2.6167-0.8175-5.8717-2.9865-9.9204c0,0-2.8449-7.8235-10.6684-7.8235 c-2.2075,0-4.0187,0.5096-5.4973,1.2733c-3.7618,1.9427-5.3718,5.5292-5.8823,6.5502c-0.3479,0.6959-3.0787,5.3065-3.1133,10.0017"/>     <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M61.6942,37.9501C61.6942,52.3371,50.0313,64,35.6443,64S9.5944,52.3371,9.5944,37.9501l7.4428,3.7214l6.5125-4.6518l8.3732,5.5821 l6.2024-5.5821l8.1758,4.7364l7.0199-5.6667L61.6942,37.9501z"/>  </g>';
  const baby = '<g id="color">     <path fill="#fcea2b" stroke="#fcea2b" stroke-miterlimit="10" stroke-width="1.8" d="m36,32c8.2843,0,12.8894,5.3033,15,11,1.5787,4.2609-5.4843,11.7165-15.0067,11.0122-9.3743-.6933-16.1286-5.0122-14.9933-11.0122,1.1294-5.9692,6.7157-11,15-11Z"/>     <path fill="#fcea2b" d="m42.25,36c2,9,9,9,9,9,2-6-6-11-6-11,7-6,1-10,1-10,0-10-10.375-11-10.375-11-10.375,2-9.625,11-9.625,11-6,4,.625,9.75.625,9.75,0,0-7.625,4.25-5.625,11.25,0,0,8,0,8-9"/>     <path fill="#f1b31c" d="m36.6219,26.6032s5.9251-.2907,0,5.2324c0,0-5.9251-5.2324,0-5.2324Z"/>   </g>   <g id="line">     <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m23,49s4.7974,5.0246,13.48,5.0122c8.52-.0122,12.52-5.0122,12.52-5.0122"/>     <line x1="33.625" x2="31.125" y1="13.5" y2="11.625" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>     <line x1="35.125" x2="34.125" y1="12.875" y2="10.75" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>     <line x1="37.125" x2="37.25" y1="13.25" y2="10" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>     <polyline fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="31.5958 53.7306 30.625 58.25 27.5 60"/>     <line x1="33.5" x2="30.625" y1="59" y2="58.25" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>     <polyline fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="39.9042 53.7306 40.875 58.25 44 60"/>     <line x1="38" x2="40.875" y1="59" y2="58.25" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>     <circle cx="32.25" cy="23" r="2"/>     <circle cx="40.25" cy="23" r="2"/>     <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m36.3719,26.6032s5.9132-.2907,0,5.2324c0,0-5.9132-5.2324,0-5.2324Z"/>     <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m42,36c2,9,9,9,9,9,2-6-6-11-6-11,7-6,1-10,1-10,0-10-10.375-11-10.375-11-10.375,2-9.625,11-9.625,11-6,4,.625,9.75.625,9.75,0,0-7.625,4.25-5.625,11.25,0,0,8,0,8-9"/>   </g>';
  const adult = ' <g id="color">     <path fill="#EA5A47" d="M44.62,26.25c0,0,4.375-7.25,2.375-8.25s-5,1-5,1s2-7-2-7s-5,4-5,4s-1.457-8.296-7-6c-3.464,1.435-5,5,0,15"/>     <path fill="#FFFFFF" d="M21,35c0,0,4-11,15-11s15,11,15,11c15,28-15,29-15,29S6,63,21,35z"/>     <path fill="#F1B31C" d="M36,43c0,0,18-1,0,18C36,61,18,43,36,43z"/>   </g>   <g id="line">     <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M44.46,26.25c0,0,4.375-7.25,2.375-8.25s-5,1-5,1s2-7-2-7s-5,4-5,4s-1.457-8.296-7-6c-3.464,1.435-5,5,0,15"/>     <circle cx="27" cy="39" r="2"/>     <circle cx="45" cy="39" r="2"/>     <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M36.02,43c0,0,18-1,0,18C36.02,61,18.02,43,36.02,43z"/>     <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M21,35c0,0,4-11,15-11s15,11,15,11c15,28-15,29-15,29S6,63,21,35z"/>   </g>';
  const dead = '<g id="line-supplement" transform="matrix(1.165 0 0 1.165 -5.868 -5.359)">     <polygon fill="none" stroke="#000" stroke-linejoin="round" stroke-width="2" points="52.11 48.61 51.44 56 47.58 52.3 50.12 56 54.5 56 57.29 49.9 53.38 56"/>     <polygon fill="none" stroke="#000" stroke-linejoin="round" stroke-width="2" points="19.77 48.62 20.44 56.01 24.31 52.32 21.76 56.01 17.38 56.01 14.59 49.91 18.51 56.01"/>   </g>   <g id="color">     <path fill="#9b9b9a" d="m55.21 59.88h-38.42a1.164 1.164 0 0 1-1.165-1.165v-27.39a20.38 20.38 0 0 1 40.75 0v27.39a1.165 1.165 0 0 1-1.165 1.165z"/>     <path fill="#3f3f3f" d="m36 10.95a20.37 20.37 0 0 0-3.935 0.3893 20.4 20.4 0 0 1 16.44 19.99v28.55h6.706a1.165 1.165 0 0 0 1.165-1.165v-27.39a20.4 20.4 0 0 0-20.38-20.38z"/>     <path fill="#5c9e31" d="m56.31 61.04h-3.787a1.167 1.167 0 0 1-0.9591-0.5028l-2.971-4.301a1.165 1.165 0 0 1 1.763-1.505l2.759 2.635 0.5642-6.2a1.165 1.165 0 0 1 1.115-1.058 1.142 1.142 0 0 1 1.193 0.968l0.9647 5.641 2.936-4.574a1.165 1.165 0 0 1 2.04 1.114l-3.254 7.103a1.165 1.165 0 0 1-1.059 0.6802h-1.305z"/>     <path fill="#5c9e31" d="m15.69 61.05h-1.305a1.165 1.165 0 0 1-1.059-0.6803l-3.253-7.103a1.165 1.165 0 0 1 2.04-1.114l2.936 4.576 0.9648-5.644a1.165 1.165 0 0 1 2.308 0.09098l0.5643 6.2 2.758-2.634a1.165 1.165 0 0 1 1.763 1.504l-2.971 4.301a1.167 1.167 0 0 1-0.959 0.5028h-1.524a0.036 0.036 0 0 0-0.01596 0z"/>   </g>   <g id="line">     <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.33" d="m16.79 47.51v-16.19a19.21 19.21 0 0 1 19.21-19.21v0a19.21 19.21 0 0 1 19.21 19.21v16.19"/>     <line x1="25.99" x2="46.01" y1="30.35" y2="30.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.33"/>     <line x1="25.99" x2="46.01" y1="35.57" y2="35.57" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.33"/>     <line x1="30.75" x2="41.25" y1="44.39" y2="44.39" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.33"/>   </g>';

  //Change icon based on evolution stage or health
  let image = egg;
  if (pet.evolutionStage == 1) image = hatch;
  if (pet.evolutionStage == 2) image = baby;
  if (pet.evolutionStage == 3) image = adult;
  if (pet.health == 0) image = dead;

  return '<svg width="480" height="480" enable-background="new 0 0 20 20" fill="#000000" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="480" height="480" fill="#fff"/>' +
    image +
    '<g fill="#000000" font-family="sans-serif" stroke-width=".41667">' +
    '<text x="20.960583" y="121.00983" font-size="16.667px" style="line-height:1.25" xml:space="preserve"><tspan x="20.960583" y="121.00983" stroke-width=".41667">Name: ' + pet.name + '</tspan></text>' +
    '<text x="21.505835" y="142.38661" font-size="11.111px" style="line-height:1.25" xml:space="preserve"><tspan x="21.505835" y="142.38661" font-size="11.111px" stroke-width=".41667">Points: ' + pet.points + '</tspan></text>' +
    '<text x="21.505835" y="163.41194" font-size="11.111px" style="line-height:1.25" xml:space="preserve"><tspan x="21.505835" y="163.41194" font-size="11.111px" stroke-width=".41667">Health: ' + pet.health + '</tspan></text>' +
    '</g>' +
    '</svg>'
}

const getPet = async (tokenId) => {
  const root = `SELECT * FROM ${process.env.TABLELAND_NAME}`;
  const where = `WHERE id = '${tokenId}'`;
  const statement = `${root} ${where}`;
  const pets = await db.prepare(statement).all();
  console.log('pets from db:', pets);
  if (pets.results.length > 0) {
    return pets.results[0];
  }
}


export default async function handler(req, res) {
  const { tokenId } = req.query;
  /*
  let tokenNumber = '0';
  if (isNaN(Number(tokenId))) {
    tokenNumber = ethers.BigNumber.from('0x' + tokenId).toString();
  }*/

  const pet = await getPet(tokenId);

  if (pet) {
    const image = await getPetImage(pet);

    const result = {
      name: pet.name,
      description: `DeFi Pets #${tokenId}`,
      image_data: image,
      external_url: 'https://krebit-challenge.vercel.app?tokenId=${tokenId}',
      attributes: [
        { trait_type: 'Owner', value: pet.owner },
        { trait_type: 'Points', value: pet.points },
        { trait_type: 'Stage', value: pet.evolutionStage },
        { trait_type: 'Health', value: pet.health }
      ]
    };

    return res.json(result);
  } else {
    res.json({});

  }

}
