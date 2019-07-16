document.querySelector('body,html').addEventListener('click', () => {
  console.log('ok');
});

// test babel preset
const julianHello = (name) => console.log(`hello ${name}`);
julianHello('Julian');