import webpack from "webpack";
import config from "../../webpack.config.dev.js";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

export default app => {
  // Run Webpack dev server in development mode
  if (process.env.NODE_ENV === "development") {
    const compiler = webpack(config);
    app.use(
      webpackDevMiddleware(compiler, {
        noInfo: false,
        colors: true,
        publicPath: config.output.publicPath,
        headers: { "Access-Control-Allow-Origin": "*" }
      })
    );
    app.use(webpackHotMiddleware(compiler));
  }
};
