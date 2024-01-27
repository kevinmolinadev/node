
const currentTicketLbl = document.querySelector('span');
const createTicketBtn  = document.querySelector('button');



async function getLastTicket() {
  const lastTicket = await fetch('http://localhost:3000/api/v1/tickets/last').then( resp => resp.json() );
  currentTicketLbl.innerText = lastTicket;
}

async function createTicket() {
  const newTicket = await fetch('http://localhost:3000/api/v1/tickets',{
    method: 'POST'
  }).then( resp => resp.json());

  currentTicketLbl.innerText = newTicket.number;
}



createTicketBtn.addEventListener('click', createTicket );


getLastTicket();



