import { guild } from '@guildxyz/sdk';

import { Database } from "@tableland/sdk";
const db = new Database();

async function getCollectionImage() {
  return '<svg width="480" height="480" enable-background="new 0 0 20 20" fill="#000000" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="480" height="480" fill="#fff"/>' +
    '<g id="color"><path fill="#FCEA2B" stroke="#FCEA2B" stroke-miterlimit="10" stroke-width="1.8" d="M36.1089,44.1242 c0,0,21.3368-0.7112,10.6684-20.6256c0,0-2.8449-7.8235-10.6684-7.8235c-2.2075,0-4.0187,0.5096-5.4973,1.2733 c-3.7618,1.9427-5.3718,5.5292-5.8823,6.5502C24.018,24.9211,13.3496,42.7018,36.1089,44.1242z"/>     <path fill="#F1B31C" stroke="none" d="M35.3719,30.6032c0,0,5.9251-0.2907,0,5.2324C35.3719,35.8356,29.4468,30.6032,35.3719,30.6032z"/>     <path fill="#FFFFFF" stroke="none" d="M61.6942,37.9501C61.6942,52.3371,50.0313,64,35.6443,64S9.5944,52.3371,9.5944,37.9501l7.4428,3.7214 l6.5125-4.6518l8.3732,5.5821l6.2024-5.5821l8.1758,4.7364l7.0199-5.6667L61.6942,37.9501z"/>     <path fill="#D0CFCE" stroke="none" d="M53.321,36.0894C51.3406,47.7279,46.2215,57.4929,35.6443,64c14.387,0,26.0499-11.663,26.0499-26.0499 L53.321,36.0894z"/>   </g>   <g id="hair"/>   <g id="skin"/>   <g id="skin-shadow"/>   <g id="line">     <circle cx="30.908" cy="26.3629" r="2.3682" fill="#000000" stroke="none"/>     <circle cx="40.3807" cy="26.3629" r="2.3682" fill="#000000" stroke="none"/>     <line x1="34.7963" x2="33.4334" y1="14.9035" y2="9.7857" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>     <line x1="36.8284" x2="36.8284" y1="15.7062" y2="12.1539" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>     <line x1="38.9992" x2="40.3807" y1="15.9035" y2="9.7857" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>     <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M35.3719,30.6032c0,0,5.9251-0.2907,0,5.2324C35.3719,35.8356,29.4468,30.6032,35.3719,30.6032z"/>     <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M49.7637,33.4191c0.0286-2.6167-0.8175-5.8717-2.9865-9.9204c0,0-2.8449-7.8235-10.6684-7.8235 c-2.2075,0-4.0187,0.5096-5.4973,1.2733c-3.7618,1.9427-5.3718,5.5292-5.8823,6.5502c-0.3479,0.6959-3.0787,5.3065-3.1133,10.0017"/>     <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M61.6942,37.9501C61.6942,52.3371,50.0313,64,35.6443,64S9.5944,52.3371,9.5944,37.9501l7.4428,3.7214l6.5125-4.6518l8.3732,5.5821 l6.2024-5.5821l8.1758,4.7364l7.0199-5.6667L61.6942,37.9501z"/>  </g>' +
    '<g fill="#000000" font-family="sans-serif" stroke-width=".41667">' +
    '<text x="20.960583" y="121.00983" font-size="16.667px" style="line-height:1.25" xml:space="preserve"><tspan x="20.960583" y="121.00983" stroke-width=".41667">DeFi-Pets</tspan></text>' +
    '<text x="21.505835" y="142.38661" font-size="11.111px" style="line-height:1.25" xml:space="preserve"><tspan x="21.505835" y="142.38661" font-size="11.111px" stroke-width=".41667">Educational Game</tspan></text>' +
    '<text x="21.505835" y="163.41194" font-size="11.111px" style="line-height:1.25" xml:space="preserve"><tspan x="21.505835" y="163.41194" font-size="11.111px" stroke-width=".41667">On-Chain Points</tspan></text>' +
    '</g>' +
    '</svg>'
}


export default async function handler(req, res) {
    const image = await getCollectionImage();

    const result = {
      name: 'DeFi Pets',
      description: `DeFi Educatinal Game with AI Pets`,
      image_data: image,
      external_url: 'https://krebit-challenge.vercel.app'
    };

    return res.json(result);
  

}
