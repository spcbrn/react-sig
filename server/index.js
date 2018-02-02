require('dotenv').config();

//------------DEPENDENCIES------------//

const express = require('express')
    , path = require('path')
    , services = require('./services');

const app = express();

//-----------------ENV----------------//

const port = process.env.PORT || 8042
    , app_url = process.env.REACT_APP_BASEURL;

//---------INITIALIZE SERVER----------//

const initialize_web_server = async (
    app, path, port
  ) => {
    const {

      //----------------REST----------------//

      load_app_module_rest

    } = services.init;

  app.listen(port, () => console.log(`serving port ${port}`));

  load_app_module_rest(app, path);
};

//----------------START---------------//

initialize_web_server(
  app, path, port
);
