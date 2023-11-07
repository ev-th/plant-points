/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import createFetchMock from "vitest-fetch-mock";
import { beforeEach } from "vitest";
import { vi } from "vitest";

import resetDb from "./resetDb";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

beforeEach(async () => {
  await resetDb();
});
