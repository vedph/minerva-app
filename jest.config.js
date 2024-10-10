module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
};
