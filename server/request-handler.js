/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var http = require('http');
const { Readable } = require('stream');

class ReadableStream extends Readable {
  constructor(options) {
    // Calls the stream.Readable(options) constructor
    super(options);
    this.messages = {
      results: [],
    };
    this.objIDCounter = 0;
  }

  read() {
    console.log(JSON.stringify(this.messages));
    return JSON.stringify(this.messages);
  }

  update({ username, roomname, text }) {
    this.objIDCounter++;
    let objectId = this.objIDCounter;
    this.messages.results.push({ username, roomname, text, objectId });
    console.log(this.messages);
  }
}

const NodeStream = new ReadableStream();

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log(
    'Serving request type ' + request.method + ' for url ' + request.url
  );

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10, // Seconds.
  };
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // if (request.method === 'OPTIONS') {
  //   response.writeHead(http.StatusOK);
  // }

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  // response.end(`response ${Object.keys(response)}`);
  // response.end(
  //   `response status code: ${response.statusCode} | request type: ${
  //     request.method
  //   } | request URL: ${request.url}`
  // );

  //? things to account for:
  //! incorrect URL return a 404
  if (!request.url.includes('classes/messages')) {
    statusCode = 404;
    response.writeHead(statusCode, headers);
  } else {
    //! correct URL:
    if (request.method === 'GET') {
      //! GET requests return our messages object set statusCode to 200
      statusCode = 200;
      // response.writeHead(statusCode, headers);
      // request.on('data', (chunk) => {
      //   NodeStream.read();
      // });
    } else if (request.method === 'POST') {
      //! POST request add new data to our messages object set statusCode to 200
      statusCode = 201;
      // response.writeHead(statusCode, headers);
      request.on('data', (chunk) => {
        NodeStream.update(JSON.parse(chunk));
      });
    }
  }

  response.writeHead(statusCode, headers);
  response.end(NodeStream.read());
  // NodeStream.read();
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

exports.requestHandler = requestHandler;
