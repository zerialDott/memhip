// const listItems =document.querySelectorAll("li")

// listItems.forEach((item)=>{
//     item.addEventListener('click',(e)=>{
//         e.target.classList.toggle('highlight')
//     })
// })

const listParent = document.querySelector('ul')

listParent.addEventListener('click',(e)=>{
    const listItem = e.target.closest('li')
    if (listItem) {
        listItem.classList.toggle('highlight')
    }
})