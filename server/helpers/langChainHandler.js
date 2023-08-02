require('dotenv').config();

const { OpenAI } = require('langchain/llms/openai');
const { SqlDatabase } = require('langchain/sql_db');
const { createSqlAgent, SqlToolkit } = require('langchain/agents/toolkits/sql');
const { DataSource } = require('typeorm');

const runQuery = async (input) => {
  //Connect to DataBase using TYPEORM
  const postGresDataSource = new DataSource({
    type: 'postgres',
    url: 'postgres://afegfjsf:ytDM_tenSXTMPOFRHsksQ8LijKtXLfws@stampy.db.elephantsql.com/afegfjsf',
  });

  //check if database connection works
  await postGresDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized');
    })
    .catch((err) => {
      console.log('There has been an err with connecting to database: ', err);
    });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: postGresDataSource,
  });

  //Temperature of 0 means that generally the same query produces the same answer
  const model = new OpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  //Connect db and model together
  const toolkit = new SqlToolkit(db, model);

  //creating an agent to create the queries
  const executor = createSqlAgent(model, toolkit);

  console.log(`Executing with the query: ${input}`);

  const result = await executor.call({ input });

  console.log(`Results: ${result.output}`);
  console.log(typeof result.output);
  const answer = result.output;
  console.log(
    `Got intermediate steps ${JSON.stringify(
      result.intermediateSteps,
      null,
      2
    )}`
  );

  await postGresDataSource.destroy();
  return answer;
};

// runQuery("What is Luke Skywalker's homeplanet?");

module.exports = runQuery;
