// ============================================================
// Этап 0.3b — Асинхронность: базовые упражнения (ещё раз с самых основ)
// ============================================================
//
// Этот файл — тренировка с самых азов. 
// Не спеши, прочитай задание и напиши решение.
//
// ============================================================

// ============================================================
// БЛОК 1: new Promise вручную
// ============================================================

/**
 * Задание 1: Простейший Promise
 * 
 * Создай функцию makePromise, которая возвращает Promise<number>
 * с числом 42. Promise должен выполниться мгновенно (без setTimeout).
 * 
 * Сигнатура: () => Promise<number>
 * 
 * Подсказка: return new Promise(resolve => resolve(42))
 */
function makePromise(): Promise<number> {
  return new Promise(resolve => resolve (42))
}

/**
 * Задание 2: Promise с ошибкой
 * 
 * Создай функцию rejectPromise, которая возвращает Promise<string>,
 * но сразу выбрасывает ошибку с текстом "Something went wrong".
 * 
 * Сигнатура: () => Promise<string>
 * 
 * Подсказка: return new Promise((_, reject) => reject(new Error(...)))
 */
function rejectPromise(): Promise<string> {
    return new Promise ((_, reject) => reject(new Error ("Something went wrong")))
}

/**
 * Задание 3: Promise с setTimeout
 * 
 * Создай функцию delayedMessage, которая принимает строку message
 * и число ms. Возвращает Promise<string> с этой строкой через ms миллисекунд.
 * 
 * Сигнатура: (message: string, ms: number) => Promise<string>
 * 
 * Пример:
 *   const msg = await delayedMessage("Привет", 1000);
 *   console.log(msg); // "Привет" (через 1 секунду)
 */
function delayedMessage(message: string, ms: number): Promise<string> {
  return new Promise (resolve => setTimeout(() => {
    resolve(message)
  }, ms))
}

// ============================================================
// БЛОК 2: async/await
// ============================================================

/**
 * Задание 4: async функция, возвращающая число
 * 
 * Напиши async функцию getFavoriteNumber, которая возвращает 7.
 * 
 * Сигнатура: () => Promise<number>
 * 
 * Подсказка: async function + return 7
 */
async function getFavoriteNumber(): Promise<number> {
  return new Promise(resolve => {
    resolve(7)
  })
}

/**
 * Задание 5: await с простым Promise
 * 
 * Напиши async функцию waitAndDouble, которая:
 * 1. Принимает число n
 * 2. Ждёт 500 мс (используй delay из предыдущего файла)
 * 3. Возвращает n * 2
 * 
 * Сигнатура: (n: number) => Promise<number>
 */
// Импортируем delay из 03-async
// Если не получается импортировать — просто скопируй сюда функцию delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

async function waitAndDouble(n: number): Promise<number> {
  await delay(500);
  return n*2
}

/**
 * Задание 6: await с ошибкой
 * 
 * Напиши async функцию tryDivide, которая:
 * 1. Принимает a (number) и b (number)
 * 2. Если b === 0 — выбрасывает ошибку "Division by zero"
 * 3. Иначе — возвращает a / b
 * 
 * Сигнатура: (a: number, b: number) => Promise<number>
 */
async function tryDivide(a: number, b: number): Promise<number> {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a/b
}

// ============================================================
// БЛОК 3: try/catch
// ============================================================

/**
 * Задание 7: Поймать ошибку
 * 
 * Напиши async функцию safeDivide, которая:
 * 1. Вызывает tryDivide(a, b)
 * 2. Если успех — возвращает строку "Result: {число}"
 * 3. Если ошибка — возвращает строку "Error: {текст ошибки}"
 * 
 * Сигнатура: (a: number, b: number) => Promise<string>
 * 
 * Пример:
 *   await safeDivide(10, 2) // "Result: 5"
 *   await safeDivide(10, 0) // "Error: Division by zero"
 */
async function safeDivide(a: number, b: number): Promise<string> {
  try {
    return (`Result: ${await tryDivide(a, b)}`) 
  }
  catch (error) {
    return (`Error: ${(error as Error).message}`)
  }
}

/**
 * Задание 8: Обработать несколько операций
 * 
 * Напиши функцию processNumbers, которая:
 * 1. Принимает массив чисел
 * 2. Для каждого числа вызывает waitAndDouble
 * 3. Если в любой операции ошибка — возвращает { success: false, error: message }
 * 4. Если всё успешно — возвращает { success: true, results: number[] }
 * 
 * Сигнатура: (numbers: number[]) => Promise<{ success: boolean; results?: number[]; error?: string }>
 * 
 * Подсказка: Promise.all(numbers.map(n => waitAndDouble(n))) + try/catch
 */
async function processNumbers(numbers: number[]): Promise<{ success: boolean; results?: number[]; error?: string }> {
    
    try {
        return {
            success: true,
            results: await Promise.all(numbers.map(n => waitAndDouble(n)))
        }
    }
    catch (error) {
        return {
            success: false,
            error: (error as Error).message
        }
    }
}

// ============================================================
// БЛОК 4: Цепочка async функций
// ============================================================

/**
 * Задание 9: Шаги приготовления
 * 
 * Представь, что мы готовим заказ. Каждый шаг занимает время.
 * 
 * Напиши функцию prepareOrder, которая:
 * 1. Принимает название блюда (string)
 * 2. Ждёт 300 мс — "готовим ингредиенты"
 * 3. Ждёт 500 мс — "готовим блюдо"
 * 4. Ждёт 200 мс — "упаковываем"
 * 5. Возвращает строку "Блюдо '{название}' готово!"
 * 
 * Сигнатура: (dishName: string) => Promise<string>
 * 
 * Подсказка: используй await delay(...) несколько раз подряд
 */
async function prepareOrder(dishName: string): Promise<string> {
    console.log(await delayedMessage("готовим ингридиенты", 300))
    console.log(await delayedMessage("готовим блюдо", 500))
    console.log(await delayedMessage("упаковываем", 200))

    return `Блюдо ${dishName} готово!`
}

/**
 * Задание 10: Параллельное приготовление
 * 
 * Напиши функцию prepareMultipleOrders, которая:
 * 1. Принимает массив названий блюд
 * 2. Готовит их ВСЕ ПАРАЛЛЕЛЬНО (через prepareOrder)
 * 3. Возвращает массив результатов
 * 
 * Сигнатура: (dishes: string[]) => Promise<string[]>
 * 
 * Подсказка: Promise.all(dishes.map(d => prepareOrder(d)))
 */
async function prepareMultipleOrders(dishes: string[]): Promise<string[]> {
    return Promise.all(dishes.map(dish => prepareOrder(dish)))
}

// ============================================================
// ТЕСТЫ
// ============================================================

(async () => {
  console.log("\n=== БЛОК 1: new Promise ===");
  
  console.log("Задание 1 (makePromise):");
  console.log(await makePromise()); // 42

  console.log("\nЗадание 2 (rejectPromise):");
  try {
    await rejectPromise();
  } catch (e) {
    console.log("Поймали:", (e as Error).message); // "Something went wrong"
  }

  console.log("\nЗадание 3 (delayedMessage):");
  console.time("msg");
  const msg = await delayedMessage("Привет!", 500);
  console.timeEnd("msg");
  console.log(msg); // "Привет!" (через ~500 мс)

  console.log("\n=== БЛОК 2: async/await ===");

  console.log("Задание 4 (getFavoriteNumber):");
  console.log(await getFavoriteNumber()); // 7

  console.log("\nЗадание 5 (waitAndDouble):");
  console.time("double");
  const doubled = await waitAndDouble(5);
  console.timeEnd("double");
  console.log("5 * 2 =", doubled); // 10

  console.log("\nЗадание 6 (tryDivide):");
  console.log("10 / 2 =", await tryDivide(10, 2));
  try {
    await tryDivide(10, 0);
  } catch (e) {
    console.log("Ошибка:", (e as Error).message);
  }

  console.log("\n=== БЛОК 3: try/catch ===");

  console.log("Задание 7 (safeDivide):");
  console.log(await safeDivide(10, 2)); // "Result: 5"
  console.log(await safeDivide(10, 0)); // "Error: Division by zero"

  console.log("\nЗадание 8 (processNumbers):");
  console.log(await processNumbers([1, 2, 3])); // { success: true, results: [2, 4, 6] }

  console.log("\n=== БЛОК 4: Цепочка ===");

  console.log("Задание 9 (prepareOrder):");
  console.time("order");
  const result = await prepareOrder("Паста");
  console.timeEnd("order");
  console.log(result); // "Блюдо 'Паста' готово!"

  console.log("\nЗадание 10 (prepareMultipleOrders):");
  console.time("multi");
  const results = await prepareMultipleOrders(["Паста", "Пицца", "Салат"]);
  console.timeEnd("multi");
  console.log(results);
  // ["Блюдо 'Паста' готово!", "Блюдо 'Пицца' готово!", "Блюдо 'Салат' готово!"]
  // Должно выполниться быстрее, чем 3 последовательных заказа (300+500+200 = 1000 мс * 3 = 3 сек)
  // А параллельно ~1000 мс всего
})();