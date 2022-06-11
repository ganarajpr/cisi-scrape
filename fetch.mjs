import fetch from 'node-fetch';
import tabletojson, { Tabletojson } from 'tabletojson';
import fs from 'fs';

const fetchId = async (id) => {
  const response = await fetch("https://www.indus.epigraphica.de/searchtext.php", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "authorization": "Basic aWNpdDpzZWFsMTIz",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "frame",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": "indususer=icit; induspasswort=seal123",
      "Referer": "https://www.indus.epigraphica.de/menue_quicksearch.php",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `textoutput=yes&vregion%5B0%5D=-1&vtime%5B0%5D=-1&vmintree=&vmaxtree=&vminindex=&vmaxindex=&vconnectmin=&vconnectmax=&vstdconnectmin=&vstdconnectmax=&tablegrid=no&vidtext=${id}&vcisi=&vm77id=&vexcavation=&vexcaidno=&vmuseum=&vsites%5B%5D=-1&vreference=&varea=&vsection=&vblock=&vhouse=&vtypes%5B%5D=%25&vboss%5B%5D=%25&vmaterial=%25&vshape=%25&vcolor=%25&vsymbol%5B%5D=%25&vcultobject%5B%5D=%25&vtext=&classid=%25&vminlength=&vmaxlength=&vcomplete=%25&vdirection=%25&veqtextparts=%3D&vnotextparts=%25&vtextalignment=%25&vsignheight=%25&vicitgroups%5B%5D=-1&vorderby=site%2Ctype%2CIDicit&voutput=htmlshort&m77idoutput=yes&excavationoutput=yes&museumoutput=yes&regionoutput=yes&locationoutput=yes&timeoutput=yes&artefactdetailsoutput=yes&iconographyoutput=yes&dimensionsoutput=yes&textdetailsoutput=yes&textstyleoutput=yes&notesoutput=yes&referenceoutput=yes`,
    "method": "POST"
  });
  const data = await response.text();
  return Tabletojson.convert(data);
};

const run = async () => {
  const allData = [];
  const start = 5501;
  const end = 6000;
  for (let i = start; i <= end; i++) {
    try {
      const resp = await fetchId(i);
      const data = resp[0][0];
      data['ID'] = i;
      allData.push(data);
      console.log("finished", i);
    } catch (error) {
      console.log(error);
    }
  }
  let data = JSON.stringify(allData);
  fs.writeFileSync(`indus-${start}-${end}.json`, data);
};

run();
