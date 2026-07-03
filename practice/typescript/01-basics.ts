// ============================================================
// Этап 0.1 — TypeScript Fundamentals
// Контекст: E-commerce (корзина, товары, скидки)
// ============================================================

// ------------------- 1. Базовые типы -----------------------

/**
 * Задание 1: Опиши тип Product (товар):
 * - id: число
 * - name: строка
 * - price: число (цена в копейках/центах, чтобы избежать проблем с float)
 * - inStock: булево (есть ли на складе)
 * - categoryId?: число (необязательное поле — категория)
 * - createdAt: Date
 */


type Product = {
    id: number
    name: string
    price: number
    inStock: boolean
    categoryID?: number
    createdAt: Date
    deletedAt?: Date
}

// Исправь тип CartItem так, чтобы quantity был обязательным,
// но не мог быть меньше 1
type CartItem = {
  product: Product;
  quantity: number; // TODO: сделать так, чтобы quantity был > 0
};

// ------------------- 2. Union и Literal типы -------------------

/**
 * Задание 2: Создай тип OrderStatus — это union строковых литералов:
 * "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
 */

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"

// Создай тип Order на основе OrderStatus

type Order = {
    id: number
    items: CartItem[]
    status: OrderStatus
    total: number
    createdAt: Date
    deletedAt?: Date
}

// ------------------- 3. Функции -----------------------------

/**
 * Задание 3: Напиши функцию calculateCartTotal
 * Принимает массив CartItem, возвращает общую сумму в копейках.
 * 
 * Сигнатура: (items: CartItem[]) => number
 * 
 * Подсказка: используй reduce
 */


function calculateCartTotal (items: CartItem[]) : number {
    return items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
}

/**
 * Задание 4: Напиши функцию filterAvailableProducts
 * Принимает массив Product, возвращает только те, что inStock === true
 * 
 * Сигнатура: (products: Product[]) => Product[]
 */
function filterAvailableProducts(products: Product[]): Product[] {
  return products.filter(product => product.inStock)
}

/**
 * Задание 5: Напиши функцию getProductsByCategory
 * Принимает массив Product и categoryId (число|undefined)
 * Если categoryId === undefined — вернуть все продукты
 * Иначе — отфильтровать по categoryId
 * 
 * Сигнатура: (products: Product[], categoryId?: number) => Product[]
 */
function getProductsByCategory(products: Product[], categoryId?: number): Product[] {
  
  if (categoryId === undefined) return products

  return products.filter(product => product.categoryID === categoryId)
}

/**
 * Задание 6: Напиши функцию sortProductsByPrice
 * Принимает массив Product и direction ("asc" | "desc")
 * Возвращает отсортированную копию (не мутировать оригинал!)
 * 
 * Сигнатура: (products: Product[], direction: "asc" | "desc") => Product[]
 */
function sortProductsByPrice(products: Product[], direction: "asc" | "desc"): Product[] {
    if (direction == "asc") {
        return [...products].sort((a, b) => a.price - b.price)
    }
    return [...products].sort((a, b) => b.price - a.price)
}

// ------------------- 4. Async/Await -------------------------

/**
 * Задание 7: Напиши асинхронную функцию fetchProduct
 * Которая "имитирует" запрос к БД — через setTimeout возвращает Product
 * 
 * Сигнатура: (id: number) => Promise<Product>
 * 
 * Если id <= 0 — выбросить ошибку "Invalid product ID"
 */

    // id: number
    // name: string
    // price: number
    // inStock: boolean
    // categoryID?: number
    // createdAt: Date
    // deletedAt?: Date

async function fetchProduct(id: number): Promise<Product> {
  // TODO: реализовать имитацию:
  // 1. Проверить что id > 0, иначе throw new Error("Invalid product id")
  // 2. Создать fakeProduct с переданным id
  // 3. Обернуть в setTimeout (используй new Promise)
  // 4. Вернуть Product
  if (id <= 0) throw new Error("Not implemented");

  const fakeProduct: Product = {
    id,
    name: "testname" + id,
    price: 5000,
    inStock: true,
    createdAt: new Date()
  }
  const result = await new Promise<Product>((resolve) => {
    setTimeout(() => {
      resolve(fakeProduct)
    }, 1000)
  })

  return result
}

/**
 * Задание 8: Напиши функцию fetchMultipleProducts
 * Принимает массив id, загружает их параллельно (Promise.all)
 * Возвращает массив Product
 * 
 * Сигнатура: (ids: number[]) => Promise<Product[]>
 */
async function fetchMultipleProducts(ids: number[]): Promise<Product[]> {
  // TODO: реализовать через Promise.all

  const promises = ids.map(id => fetchProduct(id))
  return Promise.all(promises)
}

// ============================================================
// ТЕСТЫ (можно запустить через `npx tsx practice/typescript/01-basics.ts`)
// ============================================================

// Если хочешь проверить себя — раскомментируй и запусти
// console.log(calculateCartTotal([
//   { product: { id: 1, name: "Футболка", price: 1500, inStock: true, createdAt: new Date() }, quantity: 2 },
//   { product: { id: 2, name: "Джинсы", price: 5000, inStock: true, createdAt: new Date() }, quantity: 1 },
// ]));
// Должно быть: 8000

// console.log(filterAvailableProducts([
//   { id: 1, name: "A", price: 100, inStock: true, createdAt: new Date() },
//   { id: 2, name: "B", price: 200, inStock: false, createdAt: new Date() },
// ]));
// Должно быть: [{ id: 1, name: "A", price: 100, inStock: true, ... }]