const fs = require('fs');
const env = `export const environment = {
   production: true, 
   hostDirfApi: '${process.env.DIRF_DIRFPORTALLEGAISAPI_BACK_SERVICE_HOST}',
   portDirApi: '${process.env.DIRF_DIRFPORTALLEGAISPI_BACK_SERVICE_PORT}',
   hostMenuApi: '${process.env.PORTAL_LEGAIS_REGULATORIOS_SERVER_SERVICE_HOST}',
   portMenuApi: '${process.env.PORTAL_LEGAIS_REGULATORIOS_SERVER_SERVICE_PORT}'
}`
fs.writeFile('src/environments/environment.prod.ts', env, (err, result) => {
   if(err){
      console.log('Falha ao escrever arquivo');
   }
});