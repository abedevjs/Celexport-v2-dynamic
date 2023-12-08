// import '@babel/polyfill';
// import 'core-js/stable'
import 'regenerator-runtime/runtime';


import { postMessage, postQuote } from './axios';
import { init, quoteData } from './scriptQuote';

// console.log('hello from index');

const modallForm = document.querySelector('.modal__form');
const formContainer = document.querySelector('.formContainer')

const fullName = document.getElementById('fullName');
const companyName = document.getElementById('companyName');
const email = document.getElementById('email');
const sample = document.getElementById('sample');

if (modallForm) modallForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    await postMessage(fullName.value, companyName.value, email.value, sample.value);
});

if (formContainer) formContainer.addEventListener('submit', async (e) => {
    e.preventDefault();

    // await postQuote(quoteData);
    init();
});