let search = document.getElementById('search');
let submit = document.getElementById('submit');
let cont = 0;

submit.addEventListener('click', cityApi);

async function cityApi() {
     cont++;
     const resp = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${search.value}&limit=5&appid=420e8796d619aa311486dc0a114a4b52`,
     );

     if (resp.status === 200) {
          const obj = await resp.json();

          if (obj.length > 0) {
               callApi(obj[0].lat, obj[0].lon);
          } else {
               alert('Cidade não encontrada!');
          }
     } else {
          alert('Erro ao buscar dados da cidade. Tente novamente.');
     }

     if (cont > 1) {
          clean();
          cont = 0;
     }
}

async function callApi(lat, lon) {
     const resp = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=420e8796d619aa311486dc0a114a4b52`,
     );

     if (resp.status === 200) {
          const obj = await resp.json();
          console.log(obj);
          informacoes(obj);
     }
}

function informacoes(obj) {
     let temp = document.getElementById('temp');
     let cond = document.getElementById('cond');
     let vel = document.getElementById('vel');
     let pais = document.getElementById('pais');
     let hor = document.getElementById('hor');

     temp.innerHTML += ' ' + converter(obj.main.temp) + '°C';
     cond.innerHTML += ' ' + obj.weather[0].main + ', ' + obj.weather[0].description;
     vel.innerHTML += ' ' + obj.wind.speed;
     pais.innerHTML += ' ' + obj.sys.country + ', ' + obj.name;
     hor.innerHTML += ' ' + converterHora(obj.dt, obj.timezone);
}

function converter(kelvin) {
     return Math.round(kelvin - 273);
}

function converterHora(dt, timezone) {
     const localhora = new Date((dt + timezone) * 1000);
     return localhora.toLocaleString('pt-BR', { timeZone: 'UTC' });
}

function clean() {
     let temp = document.getElementById('temp');
     let cond = document.getElementById('cond');
     let vel = document.getElementById('vel');
     let pais = document.getElementById('pais');
     let hor = document.getElementById('hor');

     temp.innerHTML = '🌡️ Temperatura atual (°C):';
     cond.innerHTML = '🌥️ Condições do tempo:';
     vel.innerHTML = '💨 Velocidade do vento (km/h):';
     pais.innerHTML = '🌎 País e cidade:';
     hor.innerHTML = '🕒 Horário local:';
}

console.log(cont);
