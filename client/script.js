import bot from './assets/bot.svg';
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// a function to load our messages

function loader (element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    //update the text content
    element.textContent += '.';

    //reset when we have 3 dots on the loading indicator
    if(element.textContent === '...'){
      element.textContent = '';
    }

  }, 300);
}

//handles typing of text returned by the AI
function typeText(element, text){
  let index = 0;

  let interval = setInterval(()=> {
    if(index < text.length) {
      element.innerHTML += text.charAt(index);
      index ++ ;
    } else {
      clearInterval(interval);
    }
  }, 20)

}

//generate a unique id for every single message
function generateUniqueId() {
  const timestamp =Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${{timestamp}}-${{hexadecimalString}}`;
}

//chat stripe
function chatStripe (isAi, value, uniqueId){
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div className="profile">
            <img 
              src="${isAi ? bot: user}" 
              alt="${isAi ? 'bot':'user'}"
            />
          </div>
          <div class="message" id=${uniqueId}>${value}>
          </div>
        </div>
      </div>
    `
  )
}

//handle submit fn - hanle ai generated response
const handleSubmit = async (e) => {
  e.preventDefault(); //prevents page reload
  
  const data = new FormData(form);

  //user's chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  //AI's chat stripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  //as ai types, we need to see the message in view
  chatContainer.scrollTop = chatContainer.scrollHeight;

  //
  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e)=> {
  if(e.keyCode === 13) { //13 is the keyboard enter btn
    handleSubmit(e);
  } 
});
