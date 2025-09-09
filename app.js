import { getCategories } from "./controllers.js"
import { getTrees } from "./controllers.js"

let trees = []
let filteredTrees = []
let cart = []


function renderTrees(list) {
  const treeContainer = document.getElementById("tree-cards")
  
  treeContainer.innerHTML = list.map((tree, index) =>{ const shortDesc = tree.description.length > 60 
      ? tree.description.slice(0, 60) + '...' 
      : tree.description 
      return `
    <div data-id="${tree.id}" class="card1 h-full md:h-[400px]  w-[100%] rounded-[10px] text-center bg-white flex flex-col justify-between p-5">
      <div class="images h-[150px] flex justify-center items-center rounded-[10px] w-full mb-2">
        <img class="h-full w-full cursor-pointer object-cover" src=${tree.image} alt="">
      </div>
      <div   class="content text-left w-full ">
        <h3 class="md:text-[16px] text-[18px] font-semibold">${tree.name}</h3>
        <p class="md:text-[12px] text-[15px] ">${shortDesc}</p>
      </div>
      <div class="tags-price flex justify-between items-center mt-1 md:mt-2 mb-3">
        <span class="bg-[#DCFCE7] text-[14px] font-semibold text-[#15803D] px-2 py-1 rounded-[20px]">${tree.category}</span>
        <span class="text-[#1F2937] text-[16px] font-bold">৳${tree.price}</span>
      </div>
      <div  class="flex justify-between items-center">
        <button data-index=${index} class="btn1 add-to-cart cursor-pointer bg-[#15803D] w-full text-white px-3 py-[8px] rounded-[30px]">Add to Cart</button>
      </div>
    </div>
  `}).join("")
  document.querySelectorAll(".add-to-cart").forEach(async btn => {
    btn.addEventListener("click", () => {
      const tree = list[btn.dataset.index]
      cart.push(tree)
      renderCart()
    })
  })


  document.querySelectorAll(".card1").forEach(card => {
    card.addEventListener("click", async(e) => {
      if (e.target.classList.contains("add-to-cart")) return
      const id = card.getAttribute("data-id")
     await openModal(id)
    })
  })
}

let totalPrice = 0
const totalPriceSpan = document.querySelector(".totalPrice")
totalPriceSpan.innerHTML = `৳${totalPrice}`


function renderCart() {
  const cartContainer = document.getElementById("cart-container")
  cartContainer.innerHTML = cart.map((tree,index) => `
     <div class="card-cart bg-[#F0FDF4] p-2 rounded-[10px] flex justify-between items-center">
                            <div class="text flex flex-col gap-1">
                                <span class="text-[14px] text-[#1F2937] font-semibold">${tree.name}</span>
                                <span class="text-[15px] text-[#1F2937] font-light">৳${tree.price}</span>
                            </div>
                            <button data-index=${index}   class="btn remove-btn ml-2 cursor-pointer text-[14px] text-[#1F2937] font-bold">
                                &#10005;
                            </button>
                        </div> `).join("")

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      console.log(cart)
      console.log(btn.dataset.index)

      cart.splice(btn.dataset.index , 1)
      renderCart()
    })

  })
  totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0)
 totalPriceSpan.innerHTML = `৳${totalPrice}`
}



async function loadTrees() {
  const treeContainer = document.getElementById("tree-cards")
  treeContainer.innerHTML = `<div id="loader" class="col-span-3 text-center text-[#15803D] font-bold">Loading trees...</div>` 

  trees = await getTrees()
  filteredTrees = trees
  renderTrees(filteredTrees)
}


async function loadCategories() {
  const categories = await getCategories()
  const categoryContainer = document.getElementById("categories")
  const treeContainer = document.getElementById("tree-cards")
  categoryContainer.innerHTML = `
    <li class="text-[16px] bg-[#15803D] py-1 duration-[0.2s] text-white cursor-pointer px-3 rounded-[5px]" data-category="All">
      All Trees
    </li>
    ${categories.map(cat => `
      <li class="text-[16px] hover:bg-[#15803D] active py-1 duration-[0.2s] hover:text-white cursor-pointer px-3 rounded-[5px]" 
          data-category="${cat.category_name}" data-id="${cat.id}">
        ${cat.category_name}
      </li>
    `).join("")}
  `


  categoryContainer.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {

      const category = li.getAttribute("data-category")
      const id = li.getAttribute("data-id")
      treeContainer.innerHTML = `<div id="loader" class="col-span-3 text-center text-[#15803D] font-bold">Loading trees...</div>` 

        categoryContainer.querySelectorAll("li").forEach(el => {
        el.classList.remove("bg-[#15803D]", "text-white")
      })


      li.classList.add("bg-[#15803D]", "text-white")
      
      setTimeout(async() => {

        if (category === "All") {
          renderTrees(trees)
        } else {
          const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        const data = await res.json()
        filteredTrees = data.plants
        renderTrees(filteredTrees)
        }
      }, 200);
    })
  })
}




async function openModal(id) {
  const modal = document.getElementById("treeModal")
  const modalContent = document.getElementById("modalContent")

  // Fetch tree details
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
  const data = await res.json()
  console.log(data)
  const tree = data.plants 
 

  modalContent.innerHTML = `
    <img src="${tree.image}" class="w-full h-[200px] object-cover rounded mb-4" />
    <h2 class="text-xl font-bold mb-2">${tree.name}</h2>
    <div class="text-gray-700 mb-2">${tree.description}</div>
    <div class="text-sm text-gray-500 mb-2"><strong>Category:</strong> ${tree.category}</div>
    <p class="text-lg font-bold text-[#15803D]">৳${tree.price}</p>
    <button class="bg-[#15803D] closeModal text-white px-4 py-2 rounded-lg mt-4">Close</button>
  `

  modal.classList.remove("hidden")
  document.querySelector(".closeModal").addEventListener("click", () => {
    document.getElementById("treeModal").classList.add("hidden")
  })
}


loadTrees()
loadCategories()
