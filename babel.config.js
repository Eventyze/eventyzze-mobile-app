module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      // generatorOpts: {
      //   maxSize: 2 * 1024 * 1024, // 2MB instead of default 500KB
      // }
    };
  };