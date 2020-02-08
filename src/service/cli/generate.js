'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MOCKS_FILE = `mocks.json`;
const TITLES_PATH = `./data/titles.txt`;
const CATEGORIES_PATH = `./data/categories.txt`;
const SENTENCES_PATH = `./data/sentences.txt`;

const PublicInterval = {
  min: new Date().getMonth() - 2,
  max: new Date().getMonth(),
};

const getRandomDate = (minMonth, maxMonth) => {
  const date = new Date().setMonth(getRandomInt(minMonth, maxMonth));
  return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`;
};

const generatePublications = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(1).join(` `),
    createdDate: getRandomDate(PublicInterval.min, PublicInterval.max),
    category: [categories[getRandomInt(0, categories.length - 1)]],
  }))
);

const readFile = async (filePath) => {
  try {
    const text = await fs.readFile(filePath, `utf8`);

    return text.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const publicationCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const titles = await readFile(TITLES_PATH);
    const categories = await readFile(CATEGORIES_PATH);
    const sentences = await readFile(SENTENCES_PATH);
    const content = JSON.stringify(generatePublications(publicationCount, titles, categories, sentences));

    try {
      await fs.writeFile(MOCKS_FILE, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {

      console.error(chalk.red(err));
    }
  }
};
