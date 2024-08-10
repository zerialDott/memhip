const dataBase = [{
    name: 'perro 1',
    url:'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
},{
    name: 'perro 2',
    url: 'https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
},{
    name: 'perro 3',
    url: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
},{
    name:'perro 4',
    url: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
},{
    name: 'perro 5',
    url:'https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
}
,{
    name:'perro 6',
    url:'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
}
,{
    name:'perro 7',
    url:'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
}
,{
    name:'perro 8',
    url:'https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
}
]

let cards= []

dataBase.forEach(item=>{
    for(let i = 0; i<2; i++){
        cards.push(item)
    }
})

function shuffle(arr) {
    let m = arr.lenght
    while (m) {
        const i = Math.floor(Math.random()*m--)
        [arr[m],arr[i]= [arr[i],arr[m]]]
    }
}
shuffle(cards)

const parent = document.querySelector('ul');

dataBase.forEach(item => {
    for (let i = 0; i < 2; i++) {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.name;
        img.style.width = '80px';
        img.style.height = '80px';

        const back = document.createElement('div');
        back.style.position = 'absolute';
        back.style.width = '80px';
        back.style.height = '80px';
        back.className = 'back'; 

        const cardContainer = document.createElement('div');
        cardContainer.style.position = 'relative';
        cardContainer.style.width = '80px';
        cardContainer.style.height = '80px';

        cardContainer.appendChild(img);
        cardContainer.appendChild(back);

        li.appendChild(cardContainer);
        parent.appendChild(li);
    }
});

parent.addEventListener('click', (e) => {
    const listItem = e.target.closest('li');
    if (listItem) {
        listItem.classList.toggle('flip');
    }
});
