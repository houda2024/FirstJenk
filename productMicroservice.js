const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const productProtoPath = "product.proto";
const productProtoDefinition = protoLoader.loadSync(productProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const productProto = grpc.loadPackageDefinition(productProtoDefinition).product;

const productService = {
  getProduct: (call, callback) => {
    const product = {
      produc_Id: call.request.product_id,
      title: "Fast Food",
      description: "This is an example Product.",
      price: 2000,
    };
    callback(null, { product });
  },
  searchProducts: (call, callback) => {
    const { query } = call.request;

    const products = [
      {
        id: "1",
        title: "Laptop ",
        description: "This is the first example Product.",
        price: 1200,
      },
      {
        id: "2",
        title: "Headphone",
        description: "This is the second example Product.",
        price: 2000,
      },
    ];
    callback(null, { products });
  },
};

const server = new grpc.Server();
server.addService(productProto.ProductService.service, productService);
const port = 50052;
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
      return;
    }

    console.log(`Server is running on port ${port}`);
    server.start();
  }
);

console.log(`Product microservice running on port ${port}`);
