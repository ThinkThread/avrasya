const fsMock = {
  readFileSync: jest.fn(),
  createReadStream: jest.fn(),
};

export = fsMock;
