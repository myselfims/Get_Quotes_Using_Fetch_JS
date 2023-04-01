
var audio




function GetQuote() {
  try {
    audio.pause()
  } catch { }
  document.getElementsByTagName('button')[0].innerHTML = 'Fetching...';
  const p = fetch('https://api.quotable.io/random')
  p.then((response) => {
    return response.json()
  }).then((resp) => {
    document.getElementById('quote').innerHTML = resp['content'];
    document.getElementById('author').innerHTML = resp['author'];
    document.getElementsByTagName('button')[0].innerHTML = 'Get Quote';

  })
}

function GetFact() {
  try {
    audio.pause()
  } catch { }
  document.getElementsByTagName('button')[1].innerHTML = 'Fetching...';

  const p = fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
  p.then((response) => {
    return response.json()
  }).then((resp) => {
    document.getElementById('quote').innerHTML = resp['text'];
    document.getElementById('author').innerHTML = resp['author'];
    document.getElementsByTagName('button')[1].innerHTML = 'Get Fact';

  })
}


function GetHadith() {
  try {
    audio.pause()
  } catch { }
  document.getElementsByTagName('button')[2].innerHTML = 'Fetching...';
  const p = fetch('https://api.sunnah.com/v1/hadiths/random', { headers: { 'x-api-key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk' } })
  p.then((response) => {
    return response.json()
  }).then((resp) => {
    console.log(resp)
    // document.getElementById('quote').innerHTML = resp['englishText'];
    // document.getElementById('author').innerHTML = resp['author'];
    // document.getElementsByTagName('button')[2].innerHTML = 'Get Hadith';

  })
}



var ayah = 0


function GetSurah() {
  try {
    audio.pause()
  } catch { }
  document.getElementsByTagName('button')[2].innerHTML = 'Fetching...';
  let s = String(Math.random() * 144);
  let surah = fetch(`https://api.alquran.cloud/v1/surah/${s}/ar.alafasy`)
  surah.then((res) => {
    console.log(res)
    return res.json()
  }).then((resp) => {

    document.getElementById('author').innerHTML = resp.data['englishName'];

    PlayAudio(resp)
    document.getElementsByTagName('button')[2].innerHTML = 'Get Surah';
  })
}

function PlayAudio(resp) {
  try {
    console.log('playing...')
    document.getElementById('quote').innerHTML = resp.data['ayahs'][ayah].text;
    audio = new Audio(resp.data['ayahs'][ayah].audio);
    audio.play()
    ayah = ayah + 1;
    audio.onended = () => {
      PlayAudio(resp)
    }
  } catch { ayah = 0 }
}