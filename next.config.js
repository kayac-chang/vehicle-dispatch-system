module.exports = {
  env: {
    NEXT_PUBLIC_KHH_API: process.env.NEXT_PUBLIC_KHH_API,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
