export default function authorMiddleware(req, res, next) {
  var send = res.json;
  res.json = function (body) {
    // It might be a little tricky here, because send supports a variety of arguments, and you have to make sure you support all of them!
    // Do something with the body...
    send.call(this, {
      author: {
        name: "Michael",
        lastname: "Vargas",
      },
      ...body,
    });
  };
  next();
}
