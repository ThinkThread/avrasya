const mockData = JSON.stringify({ foo: "bar" });

const httpMock = {
  createServer: jest.fn(),
  IncomingMessage: jest.fn(function () {
    this.bodyData = mockData;
    return {
      once: jest.fn((event, callback) => {
        if (event === "data") {
          callback(this.bodyData);
        }
      }),
    };
  }),
  ServerResponse: jest.fn(() => ({
    writeHead: jest.fn(),
    write: jest.fn(),
    end: jest.fn(),
  })),
};

export = httpMock;
