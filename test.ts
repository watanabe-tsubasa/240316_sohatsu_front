const main = async () => {
  const res = await fetch('https://script.google.com/macros/s/AKfycbwL7KsaGeeFmhxN4LfTpjltiy_Ir1xiZ0HE-d7LZZPPcMLjLPdrLYm1-ii9a0u595nm/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "message": '4549414082166'
    })
  })
  const data = await res.text();
  console.log(data);
};

main();