const categories = []



export const getCategories = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/categories")
        const data = await res.json()
        categories.push(...data.categories) // add items
        // console.log(categories)
       return categories
    } catch (error) {
        console.log(error)
    }
}

const trees =[]

export const getTrees = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/plants")
        const data = await res.json()
        trees.push(...data.plants) 
        // console.log(trees)
        return trees
    } catch (error) {
        console.log(error)
    }
}


getTrees()
// console.log(trees)