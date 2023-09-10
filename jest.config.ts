export default {
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
},
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: "jsdom",
}