// ============================================================
// Этап 0.3 — Асинхронность: Promise, async, await, setTimeout
// Контекст: E-commerce (имитация запросов к БД)
// ============================================================
//
// ТЕОРИЯ
// ============================================================
//
// 1. Что такое "синхронный" код?
//    Код выполняется строка за строкой, сверху вниз.
//    Пока строка не закончится — следующая не начнётся.
//
//    console.log("1");
//    console.log("2");
//    console.log("3");
//    // Вывод: 1, 2, 3  (всё по порядку)
//
// 2. В чём проблема?
//    Представь, что строчка "достать товар из БД" занимает 100 мс.
//    Если ждать каждую строчку — приложение зависнет.
//    Решение: НЕ ждать, а сказать "сходи в БД, когда ответишь — вызови меня".
//
// 3. Promise (Обещание) — это коробка, в которой будет значение "потом"
//
//    const promise = new Promise<string>((resolve) => {
//      resolve("Привет через секунду");
//    });
//
//    У Promise есть 3 состояния:
//    - Pending (ожидание) — ещё не выполнилось
//    - Fulfilled (выполнено) — успешно, есть результат
//    - Rejected (отклонено) — ошибка
//
// 4. .then() — "когда Promise выполнится, сделай это"
//
//    promise.then((value) => {
//      console.log(value); // "Привет через секунду"
//    });
//
// 5. async/await — это "синтаксический сахар" над .then()
//
//    async function getMessage() {
//      const value = await promise;  // ждём, пока Promise не выполнится
//      console.log(value);
//    }
//
//    await МОЖНО использовать ТОЛЬКО внутри async function.
//    async function ВСЕГДА возвращает Promise.
//
// 6. setTimeout(fn, ms) — выполнить функцию через ms миллисекунд
//
//    setTimeout(() => {
//      console.log("Прошла 1 секунда");
//    }, 1000);
//
//    setTimeout НЕ возвращает Promise, он использует callback.
//    Поэтому чтобы "завернуть" setTimeout в Promise:
//
//    await new Promise((resolve) => {
//      setTimeout(() => resolve("готово"), 1000);
//    });
//
// 7. Promise.all() — запустить несколько Promise параллельно
//
//    const [user, product] = await Promise.all([
//      fetchUser(1),
//      fetchProduct(5),
//    ]);
//    // Оба запроса выполняются одновременно
//    // Ждём, пока оба не завершатся
//
// 8. try/catch — ловим ошибки в асинхронном коде
//
//    try {
//      const product = await fetchProduct(-1);
//    } catch (error) {
//      console.error("Ошибка:", error.message);
//    }
//
//    Если внутри промиса вызвать reject() или throw new Error(),
//    то await выбросит исключение, которое ловится в catch.
//
// ============================================================

// ============================================================
// ПРИМЕРЫ (запусти и посмотри)
// ============================================================

// Пример 1: простой Promise с setTimeout
console.log("Старт");

const waitPromise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Прошло 2 секунды");
  }, 2000);
});

// Используем .then()
waitPromise.then((message) => {
  console.log("1. .then():", message);
});

// Пример 2: async/await
async function waitExample() {
  const message = await waitPromise;  // ждём тот же промис
  console.log("2. await:", message);
}

waitExample();

console.log("Финиш (это выполнится ДО того, как сработает setTimeout)");
// Вывод:
//   Старт
//   Финиш (это выполнится ДО того, как сработает setTimeout)
//   1. .then(): Прошло 2 секунды
//   2. await: Прошло 2 секунды

// Пример 3: ошибка и try/catch
async function failingFunction() {
  throw new Error("Что-то пошло не так!");
}

async function runWithError() {
  try {
    await failingFunction();
  } catch (error) {
    console.error("Поймали ошибку:", (error as Error).message);
  }
}

// ============================================================
// ТОВАРЫ ДЛЯ ЗАДАНИЙ
// ============================================================

type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  createdAt: Date;
};

type User = {
  id: number;
  name: string;
  email: string;
};

// ============================================================
// ЗАДАНИЯ
// ============================================================

/**
 * Задание 1: Простой Promise с setTimeout
 * 
 * Напиши функцию delay, которая принимает миллисекунды (ms)
 * и возвращает Promise, который резолвится через ms миллисекунд.
 * 
 * Сигнатура: (ms: number) => Promise<void>
 * 
 * Пример:
 *   await delay(1000);  // ждёт 1 секунду
 *   console.log("Прошла секунда");
 * 
 * Подсказка: new Promise(resolve => setTimeout(resolve, ms))
 */
function delay(ms: number): Promise<void> {
  // TODO: вернуть Promise с setTimeout
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}


/**
 * Задание 2: Имитация запроса к БД
 * 
 * Напиши функцию findProductById, которая:
 * 1. "Идёт в БД" (задержка 500 мс через delay из задания 1)
 * 2. Ищет товар по id в массиве products ниже
 * 3. Если нашла — возвращает Product
 * 4. Если НЕ нашла — выбрасывает ошибку "Product with id ${id} not found"
 * 
 * Сигнатура: (id: number) => Promise<Product>
 * 
 * Подсказка: await delay(500); потом products.find(p => p.id === id);
 *            если не нашли — throw new Error(...)
 */

const dbProducts: Product[] = [
  { id: 1, name: "Футболка", price: 1500, inStock: true, createdAt: new Date() },
  { id: 2, name: "Джинсы", price: 5000, inStock: true, createdAt: new Date() },
  { id: 3, name: "Кроссовки", price: 8000, inStock: false, createdAt: new Date() },
  { id: 4, name: "Кепка", price: 800, inStock: true, createdAt: new Date() },
];

async function findProductById(id: number): Promise<Product> {
  // TODO: реализовать
  await delay(500)

  const foundProduct = dbProducts.find(product => product.id === id)

  if (!foundProduct) {
    throw new Error(`Product N ${id} not found`);
  }
  
  return foundProduct
}

/**
 * Задание 3: Параллельные запросы
 * 
 * Напиши функцию findMultipleProducts, которая:
 * 1. Принимает массив id
 * 2. Загружает их ПАРАЛЛЕЛЬНО через findProductById
 * 3. Возвращает массив найденных товаров
 * 
 * Сигнатура: (ids: number[]) => Promise<Product[]>
 * 
 * Подсказка: Promise.all(ids.map(id => findProductById(id)))
 */
async function findMultipleProducts(ids: number[]): Promise<Product[]> {
  // TODO: реализовать
  return Promise.all(ids.map(id => findProductById(id)));
}

/**
 * Задание 4: Последовательные запросы (для сравнения)
 * 
 * Напиши функцию findMultipleProductsSequential, которая:
 * 1. Принимает массив id
 * 2. Загружает их ПОСЛЕДОВАТЕЛЬНО (один за другим)
 * 3. Возвращает массив найденных товаров
 * 
 * Сигнатура: (ids: number[]) => Promise<Product[]>
 * 
 * Подсказка: for...of цикл с await внутри
 * 
 * ❓ Вопрос: что быстрее — задание 3 или задание 4?
 *    Ответ запиши в комментарии.
 */
async function findMultipleProductsSequential(ids: number[]): Promise<Product[]> {
  // TODO: реализовать
  //return await Promise.all(ids.reduce((acc, cur) => {}), {} as Promise<Product>)
  const found_products: Product[] = []

  for (const id of ids) {
    found_products.push(await findProductById(id))
  }

  return found_products
}


/**
 * Задание 5: Обработка ошибок
 * 
 * Напиши функцию safeFindProduct, которая:
 * 1. Вызывает findProductById(id)
 * 2. Если успех — возвращает { success: true, product }
 * 3. Если ошибка — возвращает { success: false, error: message }
 * 
 * Сигнатура: (id: number) => Promise<{ success: boolean; product?: Product; error?: string }>
 * 
 * Подсказка: try { ... } catch { ... }
 */
async function safeFindProduct(id: number): Promise<{ success: boolean; product?: Product; error?: string }> {
  // TODO: реализовать
  try {
    const product = await findProductById(id)
    return {
      success: true,
      product
    }
  }
  catch (error){
    return {
      success: false,
      error: (error as Error).message
    }
  }
}

/**
 * Задание 6: Таймаут для запроса
 * 
 * Напиши функцию findProductWithTimeout, которая:
 * 1. Вызывает findProductById(id)
 * 2. НО если прошло больше maxMs миллисекунд — возвращает ошибку "Timeout"
 * 
 * Сигнатура: (id: number, maxMs: number) => Promise<Product>
 * 
 * Подсказка: Promise.race([findProductById(id), delay(maxMs).then(() => throw ...)])
 *            Promise.race возвращает результат первого завершившегося промиса
 * 
 * Дополнительно: прочитай про Promise.race() в документации
 */
async function findProductWithTimeout(id: number, maxMs: number): Promise<Product> {
  return Promise.race([
    findProductById(id),
    delay(maxMs).then(() => {throw new Error("Timeout")})])
  // TODO: реализовать через Promise.race  
}

/**
 * Задание 7: Комбинация всего
 * 
 * Напиши функцию processOrder, которая:
 * 1. Принимает массив { productId: number; quantity: number }
 * 2. Загружает все товары ПАРАЛЛЕЛЬНО
 * 3. Проверяет, что все товары в наличии (inStock === true)
 *    Если хотя бы одного нет в наличии — выбросить ошибку "Product ${name} is out of stock"
 * 4. Считает общую сумму (цена × количество по каждому)
 * 5. Возвращает { items, total, count }
 * 
 * Сигнатура: (items: { productId: number; quantity: number }[]) => Promise<{
 *   items: Product[];
 *   total: number;
 *   count: number;
 * }>
 */
async function processOrder(items: { productId: number; quantity: number }[]): Promise<{

  items: Product[];
  total: number;
  count: number;
}> {

  const products = await findMultipleProducts(items.map(item => item.productId))

  for (const product of products) {
    if (!product.inStock) throw new Error (`Prodict with id ${product.id} out of stock`)
  }

  const total = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId)!;
    return sum += product.price * item.quantity
  }, 0)
  return {
    items: products,
    total,
    count: products.length
  }
}

// ============================================================
// ТЕСТЫ (раскомментируй, чтобы проверить)
// ============================================================

// (async () => {
//   console.log("\n=== Задание 1: delay ===");
//   console.time("delay");
//   await delay(1000);
//   console.timeEnd("delay"); // должно быть ~1000 ms
// 
//   console.log("\n=== Задание 2: findProductById ===");
//   const product = await findProductById(1);
//   console.log("Найден:", product.name);
// 
//   try {
//     await findProductById(999);
//   } catch (e) {
//     console.log("Ошибка поймана:", (e as Error).message);
//   }
// 
//   console.log("\n=== Задание 3: findMultipleProducts ===");
//   console.time("parallel");
//   const parallelResult = await findMultipleProducts([1, 2, 3]);
//   console.timeEnd("parallel");
//   console.log("Найдено:", parallelResult.length);
// 
//   console.log("\n=== Задание 4: findMultipleProductsSequential ===");
//   console.time("sequential");
//   const sequentialResult = await findMultipleProductsSequential([1, 2, 3]);
//   console.timeEnd("sequential");
//   console.log("Найдено:", sequentialResult.length);
// 
//   console.log("\n=== Задание 5: safeFindProduct ===");
//   const result1 = await safeFindProduct(1);
//   console.log("Успех:", result1);
//   const result2 = await safeFindProduct(999);
//   console.log("Ошибка:", result2);
// 
//   console.log("\n=== Задание 6: findProductWithTimeout ===");
//   try {
//     await findProductWithTimeout(1, 100); // таймаут 100 мс, запрос 500 мс
//   } catch (e) {
//     console.log("Ожидаемый таймаут:", (e as Error).message);
//   }
// 
//   console.log("\n=== Задание 7: processOrder ===");
//   const order = await processOrder([
//     { productId: 1, quantity: 2 },
//     { productId: 2, quantity: 1 },
//   ]);
//   console.log("Заказ:", order);
//   // { items: [Футболка, Джинсы], total: 1500*2 + 5000*1 = 8000, count: 2 }
// 
//   try {
//     await processOrder([{ productId: 3, quantity: 1 }]); // 3 — нет в наличии
//   } catch (e) {
//     console.log("Ошибка (ожидаемо):", (e as Error).message);
//   }
// })();