import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const BAR_ITEMS: Array<{
  name: string; price: number; weight?: string; description?: string;
  badge?: string; img?: string; category: string;
}> = [
  // Авторские
  { name: "Эль Чоко",     price: 540, badge: "Стронг",     category: "authored", description: "Настой смородины дополняется шоколадным ликёром, а всё это подчёркивается освежающими оттенками мартини фиеро и биттера", img: "https://picsum.photos/seed/elchoko/400/300" },
  { name: "Бали Цар",     price: 540, badge: "Стронг",     category: "authored", description: "Яркий вишнёвый вкус и аромат с нотками миндаля, сладостью мартини фиеро и лёгкой горчинкой", img: "https://picsum.photos/seed/balitzar/400/300" },
  { name: "Чойс Бойз",    price: 540, badge: "Стронг",     category: "authored", description: "Дикое сочетание арктической тинктуры со сладостью можжевелового ликёра, ароматом ели и горечью абсента", img: "https://picsum.photos/seed/choiceboys/400/300" },
  { name: "Гуччи",        price: 540, badge: "Саур",       category: "authored", description: "Бархатный коктейль с ярким вкусом манго, сбалансированный сладостью рома, терпкостью текилы и горечью водки и джина", img: "https://picsum.photos/seed/guccisour/400/300" },
  { name: "Хани Мани",    price: 540, badge: "Саур",       category: "authored", description: "Изысканный коктейль на основе медового виски с добавлением ликёра бузины", img: "https://picsum.photos/seed/honeymoney/400/300" },
  { name: "Авеллино",     price: 540, badge: "Саур",       category: "authored", description: "Кисло-сладкий коктейль с тонким ароматом лета. Дынная настойка с тибетской ромашкой в сочетании с ликёром юдзу и мусом из зелёного чая", img: "https://picsum.photos/seed/avellino/400/300" },
  { name: "Вэри Бэрри",   price: 540, badge: "Хайбол",    category: "authored", description: "Настой лесных ягод в сочетании с джином и ягодной содовой", img: "https://picsum.photos/seed/veryberry/400/300" },
  { name: "Советский",    price: 540, badge: "Хайбол",    category: "authored", description: "Освежающий и лёгкий: цитрусовая кислинка, сладость груши и травянистые ноты джина", img: "https://picsum.photos/seed/sovetsky/400/300" },
  { name: "Павалло",      price: 540, badge: "Хайбол",    category: "authored", description: "Тропическое сочетание наливки из личи с апельсином и содовой из соцветий пассифлоры", img: "https://picsum.photos/seed/pavallo/400/300" },
  { name: "Ловеррис",     price: 540, badge: "Баблс",     category: "authored", description: "Сладость ягод ежевики, цветочные ноты лаванды и освежающая лёгкость игристого вина", img: "https://picsum.photos/seed/loveris/400/300" },
  { name: "Глория",       price: 540, badge: "Баблс",     category: "authored", description: "Аромат розового персика с жасмином и кислинка просекко", img: "https://picsum.photos/seed/gloria/400/300" },
  { name: "Лампоне",      price: 540, badge: "Баблс",     category: "authored", description: "Новый взгляд на классическое сочетание малины, лайма и мяты", img: "https://picsum.photos/seed/lampone/400/300" },
  { name: "Деликат",      price: 540, badge: "Милк панч",  category: "authored", description: "Необычное сочетание ореховых нот кокоса и миндаля со сдержанной сладостью томатной воды", img: "https://picsum.photos/seed/delikat/400/300" },
  { name: "Флай зе Скай", price: 540, badge: "Милк панч",  category: "authored", description: "Настой груши с ароматом ликёра банан-бузина и лёгкой кислинкой", img: "https://picsum.photos/seed/flythesky/400/300" },
  { name: "Лав из…",      price: 540, badge: "Шорт",      category: "authored", description: "Микс банана, клубники и ванили напоминает аромат той самой жвачки из детства", img: "https://picsum.photos/seed/lovefrom/400/300" },
  { name: "Фреш мулл",    price: 540, badge: "Шорт",      category: "authored", description: "Свежий взгляд на всем известный Московский мул", img: "https://picsum.photos/seed/freshmull/400/300" },
  // Коктейли
  { name: "Мартини фиеро & тоник", weight: "400 мл", price: 570, category: "cocktails" },
  { name: "Лонг-айленд айс ти",    weight: "400 мл", price: 590, category: "cocktails" },
  { name: "Тропический айс ти",    weight: "400 мл", price: 590, category: "cocktails" },
  { name: "Босфорд-тоник",         weight: "400 мл", price: 590, category: "cocktails" },
  { name: "Окхард дайкири",        weight: "150 мл", price: 590, category: "cocktails" },
  { name: "Окхард Колада",         weight: "300 мл", price: 590, category: "cocktails" },
  { name: "Май тай",               weight: "400 мл", price: 590, category: "cocktails" },
  { name: "Зомби",                 weight: "400 мл", price: 590, category: "cocktails" },
  { name: "Мартини Негрони",       weight: "300 мл", price: 590, category: "cocktails" },
  { name: "Аперол спритц",         weight: "300 мл", price: 590, category: "cocktails" },
  { name: "Олд фешн",              weight: "300 мл", price: 590, category: "cocktails" },
  { name: "Маргарита",             weight: "150 мл", price: 590, category: "cocktails" },
  { name: "Белый русский",         weight: "300 мл", price: 590, category: "cocktails" },
  { name: "Пенициллин",            weight: "300 мл", price: 650, category: "cocktails" },
  { name: "Виски сауэр",           weight: "300 мл", price: 590, category: "cocktails" },
  // Шоты
  { name: "Б-52",               weight: "50 мл", price: 450, category: "shots" },
  { name: "Облака",             weight: "50 мл", price: 450, category: "shots" },
  { name: "Мираж",              weight: "50 мл", price: 450, category: "shots" },
  { name: "Боярский",           weight: "50 мл", price: 280, category: "shots" },
  { name: "Ярославская собака", weight: "50 мл", price: 220, category: "shots" },
  { name: "Окхард шот",         weight: "50 мл", price: 450, category: "shots" },
  // Настойки
  { name: "Лесные ягоды",      weight: "40 мл", price: 200, category: "tinctures" },
  { name: "Арктическая",       weight: "40 мл", price: 200, category: "tinctures" },
  { name: "Дыня-ромашка",      weight: "40 мл", price: 200, category: "tinctures" },
  { name: "Малиновая мята",    weight: "40 мл", price: 200, category: "tinctures" },
  { name: "Вишня-чабрец",      weight: "40 мл", price: 200, category: "tinctures" },
  { name: "Лимон-лайм",        weight: "40 мл", price: 200, category: "tinctures" },
  { name: "Сливочная коровка", weight: "40 мл", price: 200, category: "tinctures" },
  { name: "Личи-апельсин",     weight: "40 мл", price: 200, category: "tinctures" },
  // Пиво
  { name: "Abbe brune",            weight: "300 / 500 мл", price: 410, description: "500 мл — 470 ₽ · Тёмный эль в бельгийском стиле",      badge: "Бочковое",   category: "beer" },
  { name: "Spaten",                weight: "300 / 500 мл", price: 410, description: "500 мл — 470 ₽ · Светлый лагер в немецком стиле",       badge: "Бочковое",   category: "beer" },
  { name: "Amberweiss",            weight: "300 / 500 мл", price: 410, description: "500 мл — 470 ₽ · Светлое пшеничное нефильтрованное",    badge: "Бочковое",   category: "beer" },
  { name: "El capulco",            weight: "400 мл",       price: 470, description: "Светлый лагер в мексиканском стиле",                    badge: "Бутылочное", category: "beer" },
  { name: "Hoegaarden Cherry",     weight: "440 мл",       price: 470, description: "Вишнёвый бланш в бельгийском стиле",                   badge: "Бутылочное", category: "beer" },
  { name: "Stella Artois безалк.", weight: "440 мл",       price: 470, description: "Светлый безалкогольный лагер",                          badge: "Бутылочное", category: "beer" },
  { name: "Бабл бир манго",        weight: "400 мл",       price: 500, description: "Фруктовые шарики в сочетании с солодовым напитком",     badge: "Бабл бир",   category: "beer" },
  { name: "Бабл бир вишня",        weight: "400 мл",       price: 500, description: "Фруктовые шарики в сочетании с солодовым напитком",     badge: "Бабл бир",   category: "beer" },
  { name: "Бабл бир кокос",        weight: "400 мл",       price: 500, description: "Фруктовые шарики в сочетании с солодовым напитком",     badge: "Бабл бир",   category: "beer" },
  // Виски
  { name: "Monkey Shoulder",     weight: "40 мл", price: 780, badge: "Шотландия", category: "whisky" },
  { name: "William Lawson's",    weight: "40 мл", price: 450, badge: "Шотландия", category: "whisky" },
  { name: "Dewar's White Label", weight: "40 мл", price: 480, badge: "Шотландия", category: "whisky" },
  { name: "Dewar's 8 Caribbean", weight: "40 мл", price: 500, badge: "Шотландия", category: "whisky" },
  { name: "Dewar's 12",          weight: "40 мл", price: 530, badge: "Шотландия", category: "whisky" },
  { name: "Jameson",             weight: "40 мл", price: 530, badge: "Ирландия",  category: "whisky" },
  { name: "Hinch",               weight: "40 мл", price: 780, badge: "Ирландия",  category: "whisky" },
  { name: "Jack Daniel's",       weight: "40 мл", price: 650, badge: "Америка",   category: "whisky" },
  { name: "Old Virginia",        weight: "40 мл", price: 450, badge: "Америка",   category: "whisky" },
  // Крепкие
  { name: "Ararat cherry",      weight: "40 мл", price: 390, badge: "Коньяк",  category: "spirits" },
  { name: "Ararat apricot",     weight: "40 мл", price: 390, badge: "Коньяк",  category: "spirits" },
  { name: "Ararat koffee",      weight: "40 мл", price: 390, badge: "Коньяк",  category: "spirits" },
  { name: "Ararat 3",           weight: "40 мл", price: 390, badge: "Коньяк",  category: "spirits" },
  { name: "Ararat 5",           weight: "40 мл", price: 430, badge: "Коньяк",  category: "spirits" },
  { name: "Torres 5",           weight: "40 мл", price: 450, badge: "Коньяк",  category: "spirits" },
  { name: "Hennessy VS",        weight: "40 мл", price: 600, badge: "Коньяк",  category: "spirits" },
  { name: "Hennessy VSOP",      weight: "40 мл", price: 800, badge: "Коньяк",  category: "spirits" },
  { name: "Baron Otard VS",     weight: "40 мл", price: 550, badge: "Коньяк",  category: "spirits" },
  { name: "Baron Otard VSOP",   weight: "40 мл", price: 750, badge: "Коньяк",  category: "spirits" },
  { name: "Olmeca Silver",      weight: "40 мл", price: 450, badge: "Текила",  category: "spirits" },
  { name: "Olmeca Gold",        weight: "40 мл", price: 470, badge: "Текила",  category: "spirits" },
  { name: "Gintl",              weight: "40 мл", price: 360, badge: "Джин",    category: "spirits" },
  { name: "Bombay Sapphire",    weight: "40 мл", price: 450, badge: "Джин",    category: "spirits" },
  { name: "Bosford",            weight: "40 мл", price: 360, badge: "Джин",    category: "spirits" },
  { name: "Oakheart Original",  weight: "40 мл", price: 380, badge: "Ром",     category: "spirits" },
  { name: "El Boko White",      weight: "40 мл", price: 350, badge: "Ром",     category: "spirits" },
  { name: "El Boko Black",      weight: "40 мл", price: 350, badge: "Ром",     category: "spirits" },
  { name: "Ярославская мягкая", weight: "40 мл", price: 250, badge: "Водка",   category: "spirits" },
  { name: "Tolga",              weight: "40 мл", price: 290, badge: "Водка",   category: "spirits" },
  { name: "Beringoff",          weight: "40 мл", price: 330, badge: "Водка",   category: "spirits" },
  { name: "Grey Goose",         weight: "40 мл", price: 490, badge: "Водка",   category: "spirits" },
  { name: "Martini Fiero",      weight: "40 мл", price: 280, badge: "Вермут",  category: "spirits" },
  { name: "Martini Rosso",      weight: "40 мл", price: 280, badge: "Вермут",  category: "spirits" },
  { name: "Martini Bianco",     weight: "40 мл", price: 280, badge: "Вермут",  category: "spirits" },
  { name: "Martini Extra Dry",  weight: "40 мл", price: 280, badge: "Вермут",  category: "spirits" },
  { name: "Branca Menta",       weight: "40 мл", price: 430, badge: "Ликёр",   category: "spirits" },
  { name: "Fernet-Branca",      weight: "40 мл", price: 430, badge: "Ликёр",   category: "spirits" },
  { name: "Jägermeister",       weight: "40 мл", price: 430, badge: "Ликёр",   category: "spirits" },
  { name: "Cointreau",          weight: "40 мл", price: 430, badge: "Ликёр",   category: "spirits" },
  { name: "Kahlua",             weight: "40 мл", price: 430, badge: "Ликёр",   category: "spirits" },
  { name: "Aperol",             weight: "40 мл", price: 430, badge: "Ликёр",   category: "spirits" },
  { name: "Martini Reserva Bitter", weight: "40 мл", price: 430, badge: "Ликёр", category: "spirits" },
  { name: "Sambuca",            weight: "40 мл", price: 430, badge: "Ликёр",   category: "spirits" },
  { name: "Absinthe",           weight: "40 мл", price: 430, badge: "Ликёр",   category: "spirits" },
  // Вино
  { name: "CURICANO",                  weight: "750 мл", price: 2500, description: "Чили · Совиньон блан · Сухое",           badge: "Белое",      category: "wine" },
  { name: "Chateau Tamagne Delicate",  weight: "750 мл", price: 2600, description: "Россия · Бианка / Шардоне · Сухое",      badge: "Белое",      category: "wine" },
  { name: "ZB Riesling",              weight: "750 мл", price: 2600, description: "Россия · Рислинг · Полусухое",            badge: "Белое",      category: "wine" },
  { name: "Whistling Track",          weight: "750 мл", price: 3700, description: "Новая Зеландия · Совиньон блан · Сухое",  badge: "Белое",      category: "wine" },
  { name: "Puente Sur",               weight: "750 мл", price: 2500, description: "Аргентина · Каберне Совиньон · Полусухое", badge: "Красное",   category: "wine" },
  { name: "Black Falls Creek",        weight: "750 мл", price: 2500, description: "ЮАР · Пинотаж · Сухое",                  badge: "Красное",    category: "wine" },
  { name: "Twin Rivers",              weight: "750 мл", price: 3700, description: "Австралия · Шираз · Полусухое",           badge: "Красное",    category: "wine" },
  { name: "Chateau Tamagne Delicate (розовое)", weight: "750 мл", price: 2600, description: "Россия · Бианка / Шардоне · Сухое", badge: "Розовое", category: "wine" },
  { name: "Prosecco Tintonelli DOC",  weight: "750 мл", price: 3500, description: "Италия · Глера · Сухое",                  badge: "Игристое",  category: "wine" },
  { name: "Martini Asti DOCG",        weight: "750 мл", price: 3900, description: "Италия · Мускат белый · Сладкое",         badge: "Игристое",  category: "wine" },
  { name: "Martini Prosecco DOC",     weight: "750 мл", price: 3900, description: "Италия · Глера · Сухое",                  badge: "Игристое",  category: "wine" },
  { name: "Martini Rosé DOC",         weight: "750 мл", price: 3900, description: "Италия · Глера / Пино Неро · Сухое",      badge: "Игристое",  category: "wine" },
  { name: "Bourgeois Prosecco Style", weight: "750 мл", price: 2250, description: "Россия · Сухое",                          badge: "Игристое",  category: "wine" },
  { name: "Puente Sur (бокал)",       weight: "150 мл", price: 500,  description: "Аргентина · Полусухое · Красное",         badge: "По бокалу", category: "wine" },
  { name: "CURICANO (бокал)",         weight: "150 мл", price: 500,  description: "Чили · Совиньон блан · Белое",            badge: "По бокалу", category: "wine" },
  { name: "Bourgeois (бокал)",        weight: "150 мл", price: 450,  description: "Россия · Игристое",                       badge: "По бокалу", category: "wine" },
  // Безалкогольное
  { name: "Бар Коктейль",        weight: "500 мл", price: 200, description: "Негазированная артезианская вода",  badge: "Вода",      category: "nonalc" },
  { name: "Dausuz",              weight: "500 мл", price: 280, description: "Стекло · газ / негаз · Кавказ",    badge: "Вода",      category: "nonalc" },
  { name: "Rich Cola",           weight: "330 мл", price: 250,                                                   badge: "Софт",      category: "nonalc" },
  { name: "Rich Tonic",          weight: "330 мл", price: 250,                                                   badge: "Софт",      category: "nonalc" },
  { name: "Добрый апельсин",     weight: "250 мл", price: 200,                                                   badge: "Софт",      category: "nonalc" },
  { name: "Добрый лимон-лайм",   weight: "250 мл", price: 200,                                                   badge: "Софт",      category: "nonalc" },
  { name: "Burn",                weight: "330 мл", price: 250,                                                   badge: "Энергетик", category: "nonalc" },
  { name: "Фреш апельсин",       weight: "250 мл", price: 450,                                                   badge: "Фреш",      category: "nonalc" },
  { name: "Фреш грейпфрут",      weight: "250 мл", price: 450,                                                   badge: "Фреш",      category: "nonalc" },
  { name: "Фреш яблоко",         weight: "250 мл", price: 450,                                                   badge: "Фреш",      category: "nonalc" },
  { name: "Фреш морковь",        weight: "250 мл", price: 450,                                                   badge: "Фреш",      category: "nonalc" },
  { name: "Лайм-мята",           weight: "400 мл", price: 380, description: "1 л — 680 ₽",                      badge: "Лимонад",   category: "nonalc" },
  { name: "Грейпфрут-перец",     weight: "400 мл", price: 380, description: "1 л — 680 ₽",                      badge: "Лимонад",   category: "nonalc" },
  { name: "Апероль спритц (лим)",weight: "400 мл", price: 380, description: "1 л — 680 ₽",                      badge: "Лимонад",   category: "nonalc" },
  { name: "Кавказский мулл",     weight: "400 мл", price: 380, description: "1 л — 680 ₽",                      badge: "Лимонад",   category: "nonalc" },
  { name: "Манго-ваниль",        weight: "450 мл", price: 400,                                                   badge: "Бабл ти",   category: "nonalc" },
  { name: "Клубника-шоколад",    weight: "450 мл", price: 400,                                                   badge: "Бабл ти",   category: "nonalc" },
  { name: "Черника-малина",      weight: "450 мл", price: 400,                                                   badge: "Бабл ти",   category: "nonalc" },
  { name: "Ванильный",           weight: "300 мл", price: 390,                                                   badge: "Милкшейк",  category: "nonalc" },
  { name: "Малиновый",           weight: "300 мл", price: 390,                                                   badge: "Милкшейк",  category: "nonalc" },
  { name: "Шоколадный",          weight: "300 мл", price: 390,                                                   badge: "Милкшейк",  category: "nonalc" },
  // Горячие
  { name: "Кения",               weight: "1 л",    price: 550, badge: "Чай классика",  category: "hotdrinks" },
  { name: "Иван-чай",            weight: "1 л",    price: 550, badge: "Чай классика",  category: "hotdrinks" },
  { name: "Сенча",               weight: "1 л",    price: 550, badge: "Чай классика",  category: "hotdrinks" },
  { name: "Молочный улун",       weight: "1 л",    price: 550, badge: "Чай классика",  category: "hotdrinks" },
  { name: "Наглый фрукт",        weight: "1 л",    price: 550, badge: "Чай классика",  category: "hotdrinks" },
  { name: "Таёжный сбор",        weight: "1 л",    price: 550, badge: "Чай домашний",  category: "hotdrinks" },
  { name: "Горы Алтая",          weight: "1 л",    price: 550, badge: "Чай домашний",  category: "hotdrinks" },
  { name: "Горная лаванда",      weight: "1 л",    price: 550, badge: "Чай домашний",  category: "hotdrinks" },
  { name: "Марокканская мята",   weight: "1 л",    price: 550, badge: "Чай домашний",  category: "hotdrinks" },
  { name: "Тибетская ромашка",   weight: "1 л",    price: 550, badge: "Чай домашний",  category: "hotdrinks" },
  { name: "Облепиха",            weight: "300 мл", price: 390, badge: "Нечайный чай",  category: "hotdrinks" },
  { name: "Брусника-имбирь",     weight: "300 мл", price: 390, badge: "Нечайный чай",  category: "hotdrinks" },
  { name: "Клубника-чили",       weight: "300 мл", price: 390, badge: "Нечайный чай",  category: "hotdrinks" },
  { name: "Малина-можжевельник", weight: "300 мл", price: 390, badge: "Нечайный чай",  category: "hotdrinks" },
  { name: "Эспрессо",                              price: 200, badge: "Кофе",           category: "hotdrinks" },
  { name: "Двойной эспрессо",                      price: 250, badge: "Кофе",           category: "hotdrinks" },
  { name: "Американо",                             price: 200, badge: "Кофе",           category: "hotdrinks" },
  { name: "Капучино",                              price: 300, badge: "Кофе",           category: "hotdrinks" },
  { name: "Латте",                                 price: 300, badge: "Кофе",           category: "hotdrinks" },
  { name: "Раф",                                   price: 300, badge: "Кофе",           category: "hotdrinks" },
  { name: "Матча латте",                           price: 300, badge: "Кофе",           category: "hotdrinks", description: "Альтернативное молоко +100 ₽" },
];

const KITCHEN_ITEMS: Array<{
  name: string; price: number; weight?: string; description?: string; badge?: string; category: string;
}> = [
  // На компанию
  { name: "Сет настоек",            weight: "8 шт",      price: 1450, description: "Все вкусы в одном предложении",                                            category: "sharing" },
  { name: "Братц шот-сет",          weight: "4 шт",      price: 750,  description: "Клоэ, Банни Бу, Ясмин, Кул Кэт",                                          category: "sharing" },
  { name: "Игривый сет",            weight: "5 бокалов", price: 2550, description: "Игристое и яркая подача",                                                  category: "sharing" },
  { name: "Сет «Хорошая компания»", weight: "540 г",     price: 850,  description: "Сырные палочки, стрипсы, крылья, картофельные шарики + 2 соуса",           category: "sharing" },
  { name: "Гриль-сет",              weight: "780 г",     price: 995,  description: "Колбаски, гренки, луковые кольца, крылья + 2 соуса",                       category: "sharing" },
  { name: "Пивная тарелка",         weight: "530 г",     price: 595,  description: "Гренки, фри, стрипсы + соус чесночный",                                    category: "sharing" },
  { name: "Сет «Картофельный»",     weight: "600 г",     price: 600,  description: "Хашбрауны, фри, дольки, конусы и батат фри + 3 соуса",                     category: "sharing" },
  { name: "Смэш-бургер сет",        weight: "600 г",     price: 990,  description: "Классический, сырный и пикантный",                                          category: "sharing" },
  // Горячее
  { name: "Треска под устрично-сливочным соусом", weight: "150 г", price: 690, description: "Треска на подушке из соуса, помидоры черри и микрозелень", badge: "новинка", category: "hot" },
  { name: "Томлёные рёбра под соусом барбекю",    weight: "260 г", price: 720, description: "Свиные рёбрышки, помидоры черри, микрозелень", badge: "новинка", category: "hot" },
  { name: "Гриль-колбаски «Баварские» (свинина)", weight: "250 г", price: 445, description: "2 колбаски с деревенским картофелем, квашеной капустой и барбекю-соусом", category: "hot" },
  { name: "Гриль-колбаски «Баварские» (говядина)",weight: "250 г", price: 490, description: "2 колбаски с деревенским картофелем, квашеной капустой и барбекю-соусом", category: "hot" },
  { name: "Куриные крылья",                       weight: "400 г", price: 590, description: "Баффало (острые) или Азиатские (сладкие). Подаются с морковью, сельдереем и соусом", category: "hot" },
  { name: "Грудка на гриле с овощами в темпуре",  weight: "350 г", price: 595, description: "Филе курицы с овощами в хрустящей темпуре, соусы гриль и терияки", category: "hot" },
  { name: "Свинина BBQ",                          weight: "300 г", price: 690, description: "Сочный стейк из шеи, обжаренный до корочки, с дымным соусом барбекю", category: "hot" },
  { name: "Чикен-кеса с чеддером",                weight: "200 г", price: 395, description: "Кесадилья с курицей, чеддером, помидорами, соусом цезарь и острыми перчиками", category: "hot" },
  { name: "Карри-чикен «Сливочный Бангкок»",      weight: "300 г", price: 445, description: "Курица в хрустящей панировке с овощами и мягким сливочно-карри соусом", category: "hot" },
  { name: "«Коктейль» бургер с говядиной",        weight: "340 г", price: 590, description: "Котлета из говядины, чеддер, томаты, луковое варенье, корнишоны, салат айсберг. С картофелем фри", category: "hot" },
  { name: "Смэш-бургер",                          weight: "200 г", price: 380, description: "Классический / Сырный / Пикантный. В комбо за 990 ₽", category: "hot" },
  // Стритфуд
  { name: "Крабовые крокеты",                         weight: "200 г", price: 375, category: "streetfood" },
  { name: "Сырные шарики",                            weight: "130 г", price: 400, category: "streetfood" },
  { name: "Куриные стрипсы",                          weight: "150 г", price: 400, category: "streetfood" },
  { name: "Гренки чесночные",                         weight: "220 г", price: 220, category: "streetfood" },
  { name: "Мидии сливочные",                          weight: "400 г", price: 650, category: "streetfood" },
  { name: "Мидии в запечённом сырно-сметанном соусе", weight: "250 г", price: 575, description: "С сыром гауда, сметаной, укропом и соусом терияки", category: "streetfood" },
  { name: "Камамбер запечёный",                       weight: "280 г", price: 780, description: "С томатами, брускетами и брусничным соусом", category: "streetfood" },
  { name: "Кольца кальмара",                          weight: "180 г", price: 400, category: "streetfood" },
  { name: "Креветки в панировке",                     weight: "130 г", price: 400, category: "streetfood" },
  { name: "Фиш & Чипс",                              weight: "300 г", price: 495, description: "Филе трески, картофель фри, соус тар-тар", category: "streetfood" },
  // Салаты
  { name: "Цезарь с курицей",            weight: "210 г", price: 550, category: "salads" },
  { name: "Цезарь с креветками",         weight: "200 г", price: 650, category: "salads" },
  { name: "Салат с баклажанами и фетой", weight: "245 г", price: 380, description: "Обжаренные баклажаны, черри, сыр фета, сладкий чили и кунжут", category: "salads" },
  { name: "Фермерский",                  weight: "210 г", price: 375, description: "Огурцы, помидоры и красный лук с деревенским маслом прямого отжима", category: "salads" },
  { name: "Коул Слоу",                   weight: "240 г", price: 175, category: "salads" },
  { name: "Осуми",                       weight: "220 г", price: 380, description: "Пекинская капуста, огурцы, морковь, курица, креветки и заправка с икрой тобито", badge: "вернули!", category: "salads" },
  // Холодные закуски
  { name: "Ростбиф",          weight: "90 г",  price: 495, description: "Говядина с бальзамическим соусом", category: "cold" },
  { name: "Крепкое застолье", weight: "330 г", price: 450, description: "Сельдь слабой соли с картофелем и маринованным луком", category: "cold" },
  { name: "Сырное плато",     weight: "250 г", price: 550, description: "Пармезан, чеддер, бри, дорблю, моцарелла + соус брусника", category: "cold" },
  { name: "Домашнее сало",    weight: "195 г", price: 395, description: "Пять тостов с деревенским салом, подаётся с хреном", category: "cold" },
  { name: "Цезарь сэндвич",   weight: "200 г", price: 450, description: "Вкус легендарного цезаря с курицей в формате сытного сэндвича", badge: "новинка", category: "cold" },
  // Супы
  { name: "Солянка по-домашнему", weight: "300 г", price: 450, category: "soups" },
  { name: "Том Ям",               weight: "450 г", price: 650, category: "soups" },
  // Паста
  { name: "Карбонара",                     weight: "280 г", price: 545, category: "pasta" },
  { name: "Феттучини с курицей и грибами", weight: "300 г", price: 545, category: "pasta" },
  { name: "Паста с креветками и шпинатом", weight: "300 г", price: 590, category: "pasta" },
  { name: "Сырная паста",                  weight: "300 г", price: 495, category: "pasta" },
  // Пицца
  { name: "Сырная",          weight: "390 г", price: 595, category: "pizza" },
  { name: "Маргарита",       weight: "440 г", price: 595, category: "pizza" },
  { name: "Пепперони",       weight: "440 г", price: 595, category: "pizza" },
  { name: "Ветчина — грибы", weight: "470 г", price: 595, category: "pizza" },
  { name: "Мясная",          weight: "510 г", price: 595, category: "pizza" },
  // Гарниры
  { name: "Картофель фри",               weight: "150 г", price: 225, category: "sides" },
  { name: "Картофельные дольки",         weight: "150 г", price: 225, category: "sides" },
  { name: "Рис с овощами WOK",           weight: "100 г", price: 190, category: "sides" },
  { name: "Батат фри с пармезаном",      weight: "150 г", price: 290, category: "sides" },
  { name: "Хашбрауны со сметаной 3 шт", weight: "180 г", price: 250, category: "sides" },
  // Десерты
  { name: "Наполеон",                    weight: "130 г", price: 370, description: "Коржи из слоёного теста и крем на белом шоколаде", category: "desserts" },
  { name: "Медовик",                     weight: "130 г", price: 370, description: "На натуральном мёде с нежным сметанным кремом", category: "desserts" },
  { name: "Сникерс",                     weight: "130 г", price: 370, description: "Легендарный вкус + авторское видение", category: "desserts" },
  { name: "Шоколадный фондан",           weight: "190 г", price: 425, description: "Горячий кекс с жидкой лавой внутри, подаётся с мороженым", category: "desserts" },
  { name: "Шарик ванильного мороженого", weight: "50 г",  price: 150, category: "desserts" },
];

const SEED_POSTS = [
  {
    slug: "leto-2025-terrasa",
    title: "Летняя терраса открыта",
    excerpt: "Летняя терраса бара Коктейль в центре Ярославля снова работает. Приходи вечером — свежий воздух, коктейли и живая музыка.",
    date: "2025-05-15",
    category: "news",
    tag: "Терраса",
    img: "https://picsum.photos/seed/terrasa2025/800/500",
    content: `Летняя терраса бара Коктейль открыта с 15 мая и будет работать до конца сентября.\n\nТерраса расположена прямо в центре Ярославля на улице Кирова. Идеальное место, чтобы провести вечер после работы или встретиться с друзьями в выходной.\n\n**Что ждёт на террасе:**\n\n- Полное меню бара и кухни\n- DJ-сеты по пятницам и субботам с 22:00\n- Специальные летние коктейли от наших барменов\n- Работаем круглосуточно — хоть в 3 ночи, хоть утром\n\nДля бронирования столика на террасе звоните: +7 (4852) 33-73-56 или пишите в Telegram.`,
  },
  {
    slug: "novoe-menju-vesna-2025",
    title: "Обновили меню: весна 2025",
    excerpt: "В баре появились новые авторские коктейли весенней линейки. Рассказываем, что попробовать в первую очередь.",
    date: "2025-03-20",
    category: "news",
    tag: "Меню",
    img: "https://picsum.photos/seed/newmenu2025/800/500",
    content: `Весной мы обновили карту авторских коктейлей. Бармены поработали над новыми вкусами и представляют шесть новых позиций.\n\n**Новинки весны:**\n\n**Авеллино** — кисло-сладкий коктейль с дынной настойкой, ликёром юдзу и мусом из зелёного чая. Лёгкий, свежий, летний.\n\n**Лав из…** — банан, клубника, ваниль. Вкус той самой жвачки из детства — в бокале.\n\n**Флай зе Скай** — настой груши, ликёр банан-бузина, лёгкая кислинка. Воздушный и ароматный.\n\nВсе авторские коктейли — 540 ₽. Приходи попробовать!`,
  },
  {
    slug: "dj-noch-8-marta",
    title: "DJ-ночь 8 марта — было жарко",
    excerpt: "В баре прошла одна из лучших вечеринок сезона. DJ Forma отыграл сет до 6 утра — публика не расходилась.",
    date: "2025-03-09",
    category: "news",
    tag: "Вечеринка",
    img: "https://picsum.photos/seed/djnight8march/800/500",
    content: `8 марта в баре Коктейль прошла DJ-ночь с резидентом Forma. Гости пришли к 22:00 и не расходились до самого утра.\n\nТанцпол был заполнен с первого трека. В программе — хаус, техно и неожиданные переходы, которые держали зал в тонусе всю ночь.\n\nБармены подготовили специальные розовые коктейли к 8 марта: Ловеррис (ежевика + лаванда + просекко) разошёлся в первые два часа.\n\n**Следующая DJ-ночь** — каждую пятницу и субботу с 22:00. Вход свободный.`,
  },
  {
    slug: "schastlivye-chasy-obnovlenie",
    title: "Счастливые часы теперь каждый день",
    excerpt: "Расширяем счастливые часы: скидка 20% на все коктейли и пиво теперь действует с понедельника по пятницу с 16:00 до 20:00.",
    date: "2025-02-01",
    category: "news",
    tag: "Акция",
    img: "https://picsum.photos/seed/happyhour2025/800/500",
    content: `С февраля 2025 года счастливые часы в баре Коктейль действуют каждый будний день с 16:00 до 20:00.\n\n**Скидка 20%** распространяется на всё меню коктейлей и пива — без исключений, включая авторские позиции.\n\nЛучшее время, чтобы заглянуть после работы и попробовать новинки сезона по приятной цене.\n\nЖдём тебя с понедельника по пятницу, ул. Кирова, 5/23, 2-й этаж. Работаем круглосуточно.`,
  },
  {
    slug: "kak-vybrat-kokteyl",
    title: "Как выбрать коктейль: гид от наших барменов",
    excerpt: "Не знаешь, что заказать? Бармены бара Коктейль рассказывают, как ориентироваться в меню и найти свой идеальный напиток.",
    date: "2025-04-10",
    category: "article",
    tag: "Гид",
    img: "https://picsum.photos/seed/cocktailguide/800/500",
    content: `Зайти в бар и растеряться перед меню — нормально. Особенно если коктейлей больше сорока. Наши бармены составили простой гид, который поможет сделать выбор.\n\n## Определись со вкусом\n\nДля начала ответь на простой вопрос: ты хочешь что-то сладкое, кислое, горькое или крепкое?\n\n**Любишь сладкое** → Баблс-категория (игристые, лёгкие) или Милк панч. Попробуй «Ловеррис» — ежевика, лаванда и просекко.\n\n**Любишь кислинку** → Саур. «Гуччи» с манго и текилой или «Авеллино» с дынной настойкой.\n\n**Хочешь что-то крепкое** → Стронг. «Чойс Бойз» с арктической тинктурой и абсентом — для смелых.\n\n**Предпочитаешь лёгкое и освежающее** → Хайбол. «Вэри Бэрри» — ягоды, джин, содовая.\n\n## Спроси бармена\n\nБармены бара Коктейль — профессионалы с многолетним опытом. Просто скажи, что любишь и чего хочешь избежать — они предложат вариант, который точно понравится. Не стесняйся.\n\n## Классика vs авторские\n\nКлассические коктейли — проверенные рецепты. Мартини Негрони, Маргарита, Аперол Спритц — всегда предсказуемо хороши.\n\nАвторские — это эксперимент. Наши бармены создают их с нуля, используя нестандартные сочетания. Если хочешь удивить себя — бери авторский.\n\n## Не бойся экспериментировать\n\nЗаказал — не понравилось? Такое бывает. Скажи бармену — подберём замену. Главное, чтобы вечер удался.\n\nЖдём тебя в баре Коктейль, ул. Кирова, 5/23, Ярославль. Работаем круглосуточно.`,
  },
  {
    slug: "top-5-mest-dlya-svidaniya-yaroslavl",
    title: "Топ-5 мест для свидания в центре Ярославля",
    excerpt: "Планируешь особенный вечер? Собрали лучшие места для романтического свидания в центре Ярославля — от набережной до уютных баров.",
    date: "2025-03-05",
    category: "article",
    tag: "Ярославль",
    img: "https://picsum.photos/seed/yaroslavldate/800/500",
    content: `Ярославль — один из красивейших городов Золотого кольца. И центр города идеально подходит для романтического вечера. Вот пять мест, где точно будет здорово.\n\n## 1. Бар Коктейль — ул. Кирова, 5/23\n\nНачнём с любимого. Бар Коктейль работает в Ярославле с 1996 года и умеет создавать атмосферу. Приглушённый свет, живая музыка, авторские коктейли — всё, что нужно для особенного вечера.\n\nЛетом — терраса с видом на центр города. Бронируйте стол заранее: +7 (4852) 33-73-56.\n\n## 2. Набережная Волги\n\nПрогуляйтесь по набережной перед или после ужина. Вид на Волгу, исторические здания, огни города — классическая романтика.\n\n## 3. Богоявленская площадь\n\nВ тёплое время года здесь работают кафе прямо на площади. Атмосфера центра старого города.\n\n## 4. Стрелка\n\nМесто слияния Волги и Которосли — один из самых живописных уголков Ярославля. Отличное место для вечерней прогулки.\n\n## 5. Губернаторский сад\n\nОдин из старейших парков города. Уютно, зелено, тихо — хорошая альтернатива шумным заведениям.\n\n---\n\nПланируешь особенный вечер? Забронируй стол в баре Коктейль — мы поможем сделать его незабываемым.`,
  },
  {
    slug: "istoriya-bara-kokteyl",
    title: "История бара Коктейль: почти 30 лет в центре Ярославля",
    excerpt: "Как небольшое заведение на Кирова стало одним из самых известных баров города. Рассказываем историю с 1996 года.",
    date: "2025-01-15",
    category: "article",
    tag: "История",
    img: "https://picsum.photos/seed/barhistory1996/800/500",
    content: `В 1996 году на улице Кирова в центре Ярославля открылся небольшой бар. Никто тогда не знал, что через почти три десятилетия он станет одним из самых известных заведений города.\n\n## Начало: 1996 год\n\nБар Коктейль открылся в самом центре Ярославля — на втором этаже дома 5/23 по улице Кирова. Небольшое пространство, атмосферный интерьер, хорошая музыка. Сразу стало понятно: это место особенное.\n\nВ 90-е такие заведения были редкостью. Коктейль-культура только начинала появляться в российских городах, и бар Коктейль оказался одним из первопроходцев в Ярославле.\n\n## 2000-е: рост и DJ-сеты\n\nС годами бар рос. Появились DJ-сеты по выходным, расширилось меню. Заведение стало точкой притяжения ярославской молодёжи — сюда приходили после работы, праздновали дни рождения, встречали рассвет.\n\n## 2010-е: летняя терраса\n\nОткрытие летней террасы стало новой страницей в истории бара. Сидеть на открытом воздухе в центре Ярославля с хорошим коктейлем — сложно придумать что-то лучше летним вечером.\n\n## Сегодня\n\nПочти 30 лет спустя бар Коктейль работает круглосуточно, 24/7. Рейтинг 4.9 на 2ГИС, более 2900 отзывов. Команда профессиональных барменов, авторские коктейли, живая музыка.\n\nВсё так же — ул. Кирова, 5/23, 2-й этаж. Приходи.`,
  },
];

const SEED_SETTINGS = [
  { key: "hours", value: "Круглосуточно, 24/7" },
  { key: "address", value: "ул. Кирова, 5/23, 2-й этаж, Ярославль, 150000" },
  { key: "phone", value: "+7 (4852) 33-73-56" },
  { key: "telegram", value: "t.me/kokteilbar" },
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL не задан. Создайте файл .env.local");
    process.exit(1);
  }

  const sql = neon(url);
  const db = drizzle(sql, { schema });

  console.log("Очищаем таблицы...");
  await db.delete(schema.menuItems);
  await db.delete(schema.posts);
  await db.delete(schema.settings);

  console.log(`Вставляем ${BAR_ITEMS.length} позиций бара...`);
  for (let i = 0; i < BAR_ITEMS.length; i += 50) {
    const batch = BAR_ITEMS.slice(i, i + 50).map((item, idx) => ({
      ...item,
      section: "bar" as const,
      position: i + idx,
      active: true,
    }));
    await db.insert(schema.menuItems).values(batch);
  }

  console.log(`Вставляем ${KITCHEN_ITEMS.length} позиций кухни...`);
  for (let i = 0; i < KITCHEN_ITEMS.length; i += 50) {
    const batch = KITCHEN_ITEMS.slice(i, i + 50).map((item, idx) => ({
      ...item,
      section: "kitchen" as const,
      position: i + idx,
      active: true,
    }));
    await db.insert(schema.menuItems).values(batch);
  }

  console.log(`Вставляем ${SEED_POSTS.length} постов...`);
  await db.insert(schema.posts).values(
    SEED_POSTS.map((p) => ({ ...p, published: true }))
  );

  console.log(`Вставляем ${SEED_SETTINGS.length} настроек...`);
  await db.insert(schema.settings).values(SEED_SETTINGS);

  console.log("Готово!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
