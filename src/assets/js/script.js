import $ from 'jquery';

document.querySelector('body,html').addEventListener('click', () => {
  console.log('ok');
});

// test babel preset
const julianHello = (name) => console.log(`hello ${name}`);
julianHello('Julian');

// test js
$('[rel="js-julian"]').on('click', () => console.log('kick'));