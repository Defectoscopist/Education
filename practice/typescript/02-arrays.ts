// ============================================================
// Этап 0.2 — Массивы: map, filter, reduce, sort, find
// Контекст: E-commerce
// ============================================================
//
// ТЕОРИЯ (прочитай перед заданиями)
// ============================================================
//
// 1. Что такое callback (колбэк)?
//    Это функция, которую передают в другую функцию как аргумент.
//    Пример:
//      function greet(name) { return "Привет, " + name; }
//      ["Анна", "Борис"].map(greet) // ["Привет, Анна", "Привет, Борис"]
//    greet — это callback, который мы передали в .map()
//
// 2. .map() — преобразует каждый элемент массива
//    Было:  [1, 2, 3]
//    Стало: [10, 20, 30]  (каждый умножили на 10)
//    const result = array.map(element => element * 10)
//
// 3. .filter() — оставляет только те элементы, которые подходят
//    Было:  [1, 2, 3, 4, 5]
//    Стало: [2, 4]  (только чётные)
//    const result = array.filter(element => element % 2 === 0)
//
// 4. .reduce() — "схлопывает" массив в одно значение
//    Было:  [1, 2, 3, 4]
//    Стало: 10  (сумма всех чисел)
//    const result = array.reduce((accumulator, current) => accumulator + current, 0)
//    accumulator — это "накопленное значение" (бежит по массиву)
//    current — текущий элемент
//    0 — начальное значение accumulator
//
// 5. .sort() — сортирует массив
//    По умолчанию сортирует как строки: [1, 2, 10] → [1, 10, 2] (так как "10" < "2")
//    Поэтому нужна функция сравнения:
//      array.sort((a, b) => a - b)  // по возрастанию
//      array.sort((a, b) => b - a)  // по убыванию
//    Если a - b < 0 → a станет раньше b
//    Если a - b > 0 → b станет раньше a
//    Если a - b = 0 → порядок не меняется
//
//    ВАЖНО: .sort() МЕНЯЕТ исходный массив!
//    Чтобы не менять: [...array].sort(...)
//
// 6. .find() — находит ПЕРВЫЙ элемент, подходящий под условие
//    Было:  [{id: 1}, {id: 2}, {id: 3}]
//    Ищем:  element => element.id === 2
//    Нашли: {id: 2}
//    Если не нашли — вернёт undefined
//
// 7. Spread-оператор [...array]
//    Создаёт КОПИЮ массива. Нужен, чтобы не менять оригинал.
//    const copy = [...original]
//    copy.sort(...) — меняется копия, оригинал остаётся как был
//
// ============================================================

import { acceptLanguage } from "next/dist/server/accept-header";

// ============================================================
// ПРИМЕРЫ (запусти и посмотри, как работают)
// ============================================================

const numbers = [5, 2, 8, 1, 9, 3];

// Пример .map()
const doubled = numbers.map(n => n * 2);
console.log("map (умножить на 2):", doubled); // [10, 4, 16, 2, 18, 6]

// Пример .filter()
const bigNumbers = numbers.filter(n => n > 4);
console.log("filter (> 4):", bigNumbers); // [5, 8, 9]

// Пример .reduce()
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("reduce (сумма):", sum); // 28

// Пример .sort() с копией
const sortedAsc = [...numbers].sort((a, b) => a - b);
console.log("sort asc:", sortedAsc); // [1, 2, 3, 5, 8, 9]
console.log("оригинал не изменился:", numbers); // [5, 2, 8, 1, 9, 3]

// Пример .find()
const firstBig = numbers.find(n => n > 4);
console.log("find (> 4):", firstBig); // 5 (первый подходящий)

// ============================================================
// ТОВАРЫ ДЛЯ ЗАДАНИЙ
// ============================================================

type Product = {
  id: number;
  name: string;
  price: number; // в копейках
  inStock: boolean;
  category: string;
  rating: number; // от 1 до 5
};

const products: Product[] = [
  { id: 1, name: "Футболка", price: 1500, inStock: true, category: "Одежда", rating: 4.5 },
  { id: 2, name: "Джинсы", price: 5000, inStock: true, category: "Одежда", rating: 4.2 },
  { id: 3, name: "Кроссовки", price: 8000, inStock: false, category: "Обувь", rating: 4.8 },
  { id: 4, name: "Кепка", price: 800, inStock: true, category: "Одежда", rating: 3.9 },
  { id: 5, name: "Носки", price: 300, inStock: true, category: "Одежда", rating: 4.0 },
  { id: 6, name: "Рюкзак", price: 3500, inStock: false, category: "Аксессуары", rating: 4.6 },
  { id: 7, name: "Часы", price: 12000, inStock: true, category: "Аксессуары", rating: 4.9 },
];

// ============================================================
// ЗАДАНИЯ
// ============================================================

/**
 * Задание 1: .map()
 * 
 * Создай массив строк — названия товаров с ценой в рублях.
 * Формат: "Футболка — 15 руб."
 * 
 * Подсказка: цена в копейках, 1500 копеек = 15 рублей
 * 
 * Сигнатура: (products: Product[]) => string[]
 */
function formatProductNames(products: Product[]): string[] {
    return products.map(product => product.name + " - " + product.price/100 + " руб.")
}

/**
 * Задание 2: .filter()
 * 
 * Верни только те товары, которые:
 * - Есть в наличии (inStock === true)
 * - И стоят не дороже 5000 копеек (50 рублей)
 * 
 * Сигнатура: (products: Product[]) => Product[]
 */
function getAffordableAvailableProducts(products: Product[]): Product[] {
    return products.filter(product => product.inStock === true && product.price <= 5000)
}

/**
 * Задание 3: .reduce()
 * 
 * Посчитай общую стоимость ВСЕХ товаров на складе.
 * Учитывай только те, что в наличии (inStock === true).
 * 
 * Сигнатура: (products: Product[]) => number
 */
function calculateTotalStockValue(products: Product[]): number {
  return products
    .filter(product => product.inStock)
    .reduce((acc, cur) => acc + cur.price, 0)
}

/**
 * Задание 4: .sort()
 * 
 * Отсортируй товары по рейтингу (от высокого к низкому).
 * НЕ мутируй оригинальный массив.
 * 
 * Сигнатура: (products: Product[]) => Product[]
 */
function sortByRatingDesc(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.rating - a.rating)
}

/**
 * Задание 5: .find()
 * 
 * Найди первый товар, у которого рейтинг >= 4.5 И цена < 10000 копеек.
 * 
 * Сигнатура: (products: Product[]) => Product | undefined
 */
function findBestValueProduct(products: Product[]): Product | undefined {
    return products.find(product => product.rating >= 4.5 && product.price < 10000)
}

/**
 * Задание 6: Комбинация методов
 * 
 * Верни массив названий (только строки) товаров категории "Одежда",
 * которые есть в наличии, отсортированных по цене (от дешёвых к дорогим).
 * 
 * Сигнатура: (products: Product[]) => string[]
 * 
 * Подсказка: .filter() → .sort() → .map()
 */
function getAvailableClothingNamesSortedByPrice(products: Product[]): string[] {
    return products
        .filter(product => product.category === "Одежда")
        .sort((a,b) => a.price - b.price)
        .map(product => product.name)
}

/**
 * Задание 7: reduce (продвинутый)
 * 
 * Сгруппируй товары по категориям.
 * Результат: объект, где ключ — название категории, значение — массив товаров
 * 
 * Пример:
 * {
 *   "Одежда": [{ id: 1, name: "Футболка", ... }, { id: 2, name: "Джинсы", ... }],
 *   "Обувь": [{ id: 3, name: "Кроссовки", ... }],
 *   ...
 * }
 * 
 * Сигнатура: (products: Product[]) => Record<string, Product[]>
 * 
 * Подсказка: reduce с аккумулятором-объектом
 *   acc — это {} (пустой объект)
 *   На каждом шаге: берём category товара, если такой ключ уже есть — добавляем,
 *   если нет — создаём пустой массив и добавляем
 */
function groupByCategory(products: Product[]): Record<string, Product[]> {
    
    return products.reduce((acc, cur) => {

        const category = cur.category

        if (!acc[category]) {
            acc [category] = []
        }

        acc[category].push(cur)

        return acc

    }, {} as Record<string, Product[]>)
}

// ============================================================
// ТЕСТЫ (раскомментируй, чтобы проверить)
// ============================================================

console.log("=== Задание 1: formatProductNames ===");
console.log(formatProductNames(products));
// ["Футболка — 15 руб.", "Джинсы — 50 руб.", ...]

console.log("\n=== Задание 2: getAffordableAvailableProducts ===");
console.log(getAffordableAvailableProducts(products));
// Только Футболка, Кепка, Носки (в наличии и <= 5000)

console.log("\n=== Задание 3: calculateTotalStockValue ===");
console.log(calculateTotalStockValue(products));
// 1500 + 5000 + 800 + 300 + 12000 = 19600

console.log("\n=== Задание 4: sortByRatingDesc ===");
console.log(sortByRatingDesc(products).map(p => p.name + " " + p.rating));
// Часы 4.9, Кроссовки 4.8, Рюкзак 4.6, Футболка 4.5, ...

console.log("\n=== Задание 5: findBestValueProduct ===");
console.log(findBestValueProduct(products));
// Футболка (рейтинг 4.5, цена 1500)

console.log("\n=== Задание 6: getAvailableClothingNamesSortedByPrice ===");
console.log(getAvailableClothingNamesSortedByPrice(products));
// ["Носки", "Кепка", "Футболка", "Джинсы"]

// console.log("\n=== Задание 7: groupByCategory ===");
// console.log(groupByCategory(products));
// // { "Одежда": [...], "Обувь": [...], "Аксессуары": [...] }