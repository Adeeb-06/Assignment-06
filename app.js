import { getCategories } from "./controllers.js"
import { getTrees } from "./controllers.js"


// console.log(categories)


async function loadCategories() {

    const categories = await getCategories()
    const categoryContainer = document.getElementById("categories")

    categoryContainer.innerHTML = `
            <li class="text-[16px] bg-[#15803D] py-1 duration-[0.2s] text-white cursor-pointer px-3 rounded-[5px] ">
                All Trees
            </li>
            ${categories.map(category => `
                <li class="text-[16px] hover:bg-[#15803D] py-1 duration-[0.2s] hover:text-white cursor-pointer px-3 rounded-[5px] ">
                    ${category.category_name}
                </li>`).join("")}
        `

}


async function loadTrees() {
    const trees = await getTrees()
    const treeContainer = document.getElementById("tree-cards")
 console.log(trees)
   treeContainer.innerHTML = `
  ${trees.map(tree => `
    <div class="card1 rounded-[10px] text-center bg-white flex flex-col justify-between p-5">
      <div class="image h-[150px] flex justify-center items-center rounded-[10px] w-full mb-2">
        <img class="h-full w-full object-cover" src="assets/about.png" alt="">
      </div>
      <div class="content text-left w-full flex-1">
        <h3 class="text-[16px] font-semibold">${tree.name}</h3>
        <p class="text-[12px]">${tree.description}</p>
      </div>
      <div class="tags-price flex justify-between items-center mt-2 mb-3">
        <span class="bg-[#DCFCE7] text-[14px] font-semibold text-[#15803D] px-2 py-1 rounded-[20px]">${tree.category}</span>
        <span class="text-[#1F2937] text-[16px] font-bold">৳${tree.price}</span>
      </div>
      <div class="btn w-full">
        <button class="btn1 cursor-pointer bg-[#15803D] w-full text-white px-3 py-[8px] rounded-[30px]">Add to Cart</button>
      </div>
    </div>
  `).join("")}
`

}


loadCategories()
loadTrees()