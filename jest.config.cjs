module.exports = {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy", // CSS mock
    },
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"],
};
