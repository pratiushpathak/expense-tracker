const balance=document.getElementById('balance');
const money_plus=document.getElementById('money-plus');
const money_minus=document.getElementById('money-minus');
const list=document.getElementById('list');
const form=document.getElementById('form');
const text=document.getElementById('text');
const amount=document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transaction=dummyTransactions;
//add transaction
function addTransaction(e)
{
  e.preventDefault();
  if(text.value.trim()==='' || amount.value.trim()==='')
  {
  alert('plese add a text and ammount');
  }
  else
  {
    const transactions={
     id: generateID(),
     text:text.value,
     amount:+amount.value
    }
//  console.log(transaction)
transaction.push(transactions);

addTransactionDOM(transactions);
updateValues();
text.value='';
amount.value='';
  }

}
//generate random id
function generateID()
{
  return Math.floor(Math.random()*10000000)
}

//add transaction to DOM list
function addTransactionDOM(transaction){
  //get sighn
const sign=transaction.amount<0 ?'-' :'+';
const item=document.createElement('li');

//add class based on value // for border
item.classList.add(transaction.amount<0 ?'minus':'plus');
item.innerHTML=`
${transaction.text} <span>${sign} ${Math.abs(transaction.amount)} </span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
`
list.appendChild(item);
}

//update the balance income and expense
function updateValues()
{
  const amounts=transaction.map((transaction)=>{
       return  transaction.amount;
  });
  const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
  // console.log(total);
  const income=amounts.filter(item=>item>0)
               .reduce((acc,item)=>(acc+=item),0)
               .toFixed(2);

    // console.log(income);
    const expense=(amounts.filter(item=>item<0)
                  .reduce((acc,item)=>(acc+=item),0)*-1)
                  .toFixed(2);
    // console.log(expense)
    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;

}
// remove transaction by id
function removeTransaction(id)
{
  transaction=transaction.filter(transactions=> transactions.id !==id)
  init();
}


function init()
{
  list.innerHTML='';
  transaction.forEach(addTransactionDOM)
  updateValues();
}

init();

form.addEventListener('submit',addTransaction)
