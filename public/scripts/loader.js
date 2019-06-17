// var loaderOpts = {
//     baseUrl: 'https://lex-web-ui-codebuilddeploy-xzwefq23l-webappbucket-b0p6g3qizxqp.s3.amazonaws.com/',
//     shouldLoadConfigFromEvent: true,
//     configEventTimeoutInMs: 3000,
//   };
// var loader = new ChatBotUiLoader.IframeLoader(loaderOpts);
// loader.load()
//       .catch(function (error) { console.error(error); });

// var chatbotUiConfig = {
//     ui: {
//         parentOrigin: "localhost:5000/gestionBots/",

//     },
//     iframe: {
//         iframeOrigin: "https://lex-web-ui-codebuilddeploy-xzwefq23l-webappbucket-b0p6g3qizxqp.s3.amazonaws.com",
//         shouldLoadIframeMinimized: true,
//         iframeSrcPath: "/index.html#/?lexWebUiEmbed=true"
//       }
//     };
    
//     // pass chatbot UI config to load function
//     loader.load(chatbotUiConfig)
//     // returns a promise that is resolved once the chatbot UI is loaded
//     .then(function () {
//         console.log('chatbot UI loaded');
//     })
//     .catch(function (error) {
//         console.error('chatbot UI failed to load', error);
//     });
var loaderOptions = {
    // you can put the chatbot UI config in a JSON file
    baseUrl: 'https://s3.amazonaws.com/lex-web-ui-test1-codebuilddeploy-epb-webappbucket-hze194jyx4yv/',
    configUrl: 'lex-web-ui-loader-config.json',

    // the full page chatbot UI that will be iframed
    // iframeSrcPath: './chatbot-index.html#/?lexWebUiEmbed=true'
  };

  // The following statement instantiates the IframeLoader
  var iframeLoader = new ChatBotUiLoader.IframeLoader(loaderOptions);

  // chatbot UI config
  // The loader can also obtain these values from other sources such
  // as a JSON file or events. The configUrl variable in the
  // loaderOptions above can be used to put these config values in a file
  // instead of explicitly passing it as an argument.
  var chatbotUiConfig = {
    ui: {
      // origin of the parent site where you are including the chatbot UI
      // set to window.location.origin since hosting on same site
      parentOrigin: 'localhost:5000/gestionBots/',
    },
    iframe: {
      // origin hosting the HTML file that will be embedded in the iframe
      // set to window.location.origin since hosting on same site
      iframeOrigin: 'https://lex-web-ui-test1-codebuilddeploy-epb-webappbucket-hze194jyx4yv.s3.amazonaws.com',
      iframeSrcPath: "/index.html#/?lexWebUiEmbed=true"
    },
    cognito: {
      // Your Cognito Pool Id - this is required to provide AWS credentials
      poolId: 'us-east-1:078a2865-c497-4f53-b3d3-a8b29b718751'
    },
    lex: {
      // Lex Bot Name in your account
      botName: 'DocOrderPizzaBot'
    }
  };

  // Call the load function which returns a promise that is resolved
  // once the component is loaded or is rejected if there is an error
  iframeLoader.load(chatbotUiConfig)
    .then(function () {
      console.log('iframe loaded');
    })
    .catch(function (err) {
      console.error(err);
    });