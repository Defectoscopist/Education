// ============================================================
// Этап 0.3c — Асинхронность: продвинутые задания
// Практика, приближенная к реальному бэкенду
// ============================================================

// ============================================================
// ТЕОРИЯ: ещё раз про async/await и Promise
// ============================================================
//
// 1. async function ВСЕГДА возвращает Promise.
//    Если ты пишешь return 7, TypeScript сам сделает Promise.resolve(7).
//    Не нужно писать return new Promise(resolve => resolve(7)) внутри async.
//
// 2. _ (подчёркивание) — это "мне не нужен этот параметр".
//    new Promise((resolve, reject) => ...) даёт две функции.
//    Если нужна только reject — пишем (_, reject)
//    Если нужна только resolve — пишем resolve => (можно без _)
//
// 3. new Promise((reject) => reject(new Error(...))) — НЕ сработает!
//    Первый параметр Promise — это resolve, второй — reject.
//    Если указать один параметр — это будет resolve.
//    Ошибка попадёт в resolve, и Promise выполнится успешно!
//
// ============================================================

// Вспомогательная функция delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

// ============================================================
// КОНТЕКСТ: интернет-магазин (продолжение)
// ============================================================

type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

type User = {
  id: number;
  name: string;
  balance: number; // в копейках
};

// База данных (в реальности тут была бы БД)
const db: { products: Product[]; users: User[] } = {
  products: [
    { id: 1, name: "Футболка", price: 1500, inStock: true },
    { id: 2, name: "Джинсы", price: 5000, inStock: true },
    { id: 3, name: "Кроссовки", price: 8000, inStock: false },
    { id: 4, name: "Кепка", price: 800, inStock: true },
    { id: 5, name: "Носки", price: 300, inStock: true },
  ],
  users: [
    { id: 1, name: "Анна", balance: 10000 },
    { id: 2, name: "Борис", balance: 500 },
    { id: 3, name: "Вика", balance: 20000 },
  ],
};

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (их не нужно менять)
// ============================================================

async function findProductById(id: number): Promise<Product> {
  await delay(300);
  const product = db.products.find(p => p.id === id);
  if (!product) throw new Error(`Product ${id} not found`);
  return product;
}

async function findUserById(id: number): Promise<User> {
  await delay(200);
  const user = db.users.find(u => u.id === id);
  if (!user) throw new Error(`User ${id} not found`);
  return user;
}

// ============================================================
// ЗАДАНИЯ
// ============================================================

/**
 * Задание 1: Проверка баланса
 * 
 * Напиши функцию checkBalance, которая:
 * 1. Принимает userId (number) и сумму покупки в копейках (number)
 * 2. Находит пользователя через findUserById
 * 3. Если баланс пользователя меньше суммы покупки — выбрасывает ошибку
 *    "Insufficient balance for user ${name}"
 * 4. Если хватает — возвращает { name, balance, canBuy: true }
 * 
 * Сигнатура: (userId: number, cost: number) => Promise<{ name: string; balance: number; canBuy: boolean }>
 */
async function checkBalance(userId: number, cost: number): Promise<{ name: string; balance: number; canBuy: boolean }> {
  // TODO
  throw new Error("Not implemented");
}

/**
 * Задание 2: Достать товары с проверкой
 * 
 * Напиши функцию getProductsSafe, которая:
 * 1. Принимает массив id товаров
 * 2. Загружает их параллельно через findProductById
 * 3. Ловит ошибки через try/catch
 * 4. Если успех — возвращает { success: true, products: Product[] }
 * 5. Если ошибка — возвращает { success: false, error: string, products: Product[] }
 *    (в products — те товары, которые успели загрузиться до ошибки)
 * 
 * ПОДСКАЗКА: Обычный Promise.all не подойдёт — если один упадёт, упадут все.
 * Используй Promise.allSettled() вместо Promise.all():
 *   https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
 * 
 * Promise.allSettled возвращает массив объектов:
 *   { status: "fulfilled", value: Product } или { status: "rejected", reason: Error }
 * 
 * Сигнатура: (ids: number[]) => Promise<{ success: boolean; error?: string; products: Product[] }>
 * 
 * Пример:
 *   await getProductsSafe([1, 999, 2])
 *   // { success: false, error: "Product 999 not found", products: [Product1, Product2] }
 */
async function getProductsSafe(ids: number[]): Promise<{ success: boolean; error?: string; products: Product[] }> {
  // TODO: используй Promise.allSettled
  throw new Error("Not implemented");
}

/**
 * Задание 3: Оформление заказа (полный процесс)
 * 
 * Напиши функцию placeOrder, которая:
 * 1. Принимает userId (number) и массив { productId: number; quantity: number }
 * 2. Загружает пользователя (findUserById)
 * 3. Загружает ВСЕ товары параллельно (findProductById для каждого)
 * 4. Проверяет, что все товары в наличии (inStock === true)
 *    Если нет — выбросить ошибку "Product ${name} is out of stock"
 * 5. Считает общую стоимость (цена × quantity по каждому)
 * 6. Проверяет, хватает ли баланса (используй checkBalance)
 * 7. Если всё ок — возвращает { user, items, total, success: true }
 * 
 * Сигнатура: (userId: number, items: { productId: number; quantity: number }[]) => Promise<{
 *   user: User;
 *   items: Product[];
 *   total: number;
 *   success: boolean;
 * }>
 * 
 * ВАЖНО: Задания 3 использует внутри себя задания 1!
 * Если задание 1 не сделано — задание 3 не заработает.
 */
async function placeOrder(
  userId: number,
  items: { productId: number; quantity: number }[]
): Promise<{
  user: User;
  items: Product[];
  total: number;
  success: boolean;
}> {
  // TODO
  throw new Error("Not implemented");
}

/**
 * Задание 4: Обработка нескольких заказов последовательно
 * 
 * Напиши функцию processOrdersSequential, которая:
 * 1. Принимает массив заказов (каждый: { userId, items })
 * 2. Обрабатывает их ПОСЛЕДОВАТЕЛЬНО (один за другим)
 * 3. Возвращает массив результатов
 * 4. Если один заказ упал с ошибкой — записываем ошибку и продолжаем
 * 
 * Сигнатура: (orders: { userId: number; items: { productId: number; quantity: number }[] }[]) =>
 *   Promise<({ success: true; user: User; items: Product[]; total: number } | { success: false; error: string })[]>
 * 
 * Подсказка: for...of + try/catch + push в массив результатов
 */
async function processOrdersSequential(
  orders: { userId: number; items: { productId: number; quantity: number }[] }[]
): Promise<({ success: true; user: User; items: Product[]; total: number } | { success: false; error: string })[]> {
  // TODO
  throw new Error("Not implemented");
}

/**
 * Задание 5: Обработка нескольких заказов параллельно
 * 
 * Напиши функцию processOrdersParallel, которая:
 * 1. Делает то же самое, что и задание 4
 * 2. НО обрабатывает заказы ПАРАЛЛЕЛЬНО
 * 3. Использует Promise.allSettled (аналогично заданию 2)
 * 
 * ❓ Вопрос: чем отличаются результаты заданий 4 и 5 по времени?
 * 
 * Сигнатура: (orders: { userId: number; items: { productId: number; quantity: number }[] }[]) =>
 *   Promise<({ success: true; user: User; items: Product[]; total: number } | { success: false; error: string })[]>
 */
async function processOrdersParallel(
  orders: { userId: number; items: { productId: number; quantity: number }[] }[]
): Promise<({ success: true; user: User; items: Product[]; total: number } | { success: false; error: string })[]> {
  // TODO: используй placeOrder + Promise.allSettled
  throw new Error("Not implemented");
}

/**
 * Задание 6: Ретраи (повторные попытки)
 * 
 * Напиши функцию fetchWithRetry, которая:
 * 1. Принимает id товара и число попыток (maxAttempts)
 * 2. Пытается вызвать findProductById(id)
 * 3. Если успех — возвращает Product
 * 4. Если ошибка И попытки не закончились — ждёт 200 мс и повторяет
 * 5. Если ошибка И попытки закончились — выбрасывает ошибку
 * 
 * Сигнатура: (id: number, maxAttempts: number) => Promise<Product>
 * 
 * Подсказка: цикл for с try/catch внутри
 */
async function fetchWithRetry(id: number, maxAttempts: number): Promise<Product> {
  // TODO
  throw new Error("Not implemented");
}


// ============================================================
// ТЕСТЫ
// ============================================================

(async () => {
  console.log("\n=== Задание 1: checkBalance ===");
  try {
    const result = await checkBalance(1, 5000);
    console.log("Баланс Анны:", result); // { name: "Анна", balance: 10000, canBuy: true }
  } catch (e) {
    console.log("Ошибка:", (e as Error).message);
  }

  try {
    await checkBalance(2, 1000);
  } catch (e) {
    console.log("Ошибка Бориса (ожидаемо):", (e as Error).message); // "Insufficient balance for user Борис"
  }

  console.log("\n=== Задание 2: getProductsSafe ===");
  const safeResult = await getProductsSafe([1, 999, 2]);
  console.log("Результат:", safeResult);
  // { success: false, error: "Product 999 not found", products: [Футболка, Джинсы] }

  console.log("\n=== Задание 3: placeOrder ===");
  try {
    const order = await placeOrder(1, [
      { productId: 1, quantity: 2 },
      { productId: 4, quantity: 1 },
    ]);
    console.log("Заказ Анны:", order);
    // total = 1500*2 + 800*1 = 3800, успех
  } catch (e) {
    console.log("Ошибка:", (e as Error).message);
  }

  console.log("\n=== Задания 4 и 5: processOrders ===");
  const testOrders = [
    { userId: 1, items: [{ productId: 1, quantity: 1 }] },
    { userId: 3, items: [{ productId: 2, quantity: 2 }] },
    { userId: 1, items: [{ productId: 3, quantity: 1 }] }, // 3 — нет в наличии
  ];

  console.time("sequential");
  const seqResult = await processOrdersSequential(testOrders);
  console.timeEnd("sequential");
  console.log("Последовательно:", seqResult);

  console.time("parallel");
  const parResult = await processOrdersParallel(testOrders);
  console.timeEnd("parallel");
  console.log("Параллельно:", parResult);

  console.log("\n=== Задание 6: fetchWithRetry ===");
  console.log("Успех с 1-й попытки:", await fetchWithRetry(1, 3)); // найдёт сразу
  try {
    await fetchWithRetry(999, 2); // 2 попытки, обе неудачные
  } catch (e) {
    console.log("Не нашли после 2 попыток:", (e as Error).message);
  }
})();