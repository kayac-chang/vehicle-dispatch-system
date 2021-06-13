import { getTaiwanDistricts } from "./third-party";

test("GET Taiwan districts from Open Source", async () => {
  const data = await getTaiwanDistricts();

  expect(data).not.toBeNull();
  expect(data).not.toBeUndefined();
  expect(data).not.toBeFalsy();
});
