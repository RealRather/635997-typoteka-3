'use strict';

const express = require(`express`);
const mainRoutes = require(`./routes/main-routes`);
const articlesRoutes = require(`./routes/articles-routes`);

const PORT = 8080;

const app = express();

app.use(`/`, mainRoutes);
app.use(`/articles`, articlesRoutes);
app.listen(PORT);
