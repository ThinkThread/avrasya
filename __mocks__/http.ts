const httpMock = {
  IncomingMessage: jest.fn(),
  ServerResponse: jest.fn(() => ({
    writeHead: jest.fn(),
    write: jest.fn(),
    end: jest.fn(),
  })),
};

export = httpMock;
