import assert from "node:assert/strict";
import test from "node:test";
import schema from "../src/appmeta/settings.json" with { type: "json" };
import { AppModel } from "../src/model.ts";
import { schemaDefaults, type Settings } from "../src/lib.ts";
const NOW = 1700000000000;
const make = (values: Settings = {}, saved: Settings = {}, now = NOW) =>
  new AppModel({ ...schemaDefaults(schema.fields), ...values }, saved, now);

test("departures sort by actual delayed time across midnight", () => {
  const a = make();
  a.receive(
    {
      departures: [
        {
          route: "A",
          destination: "X",
          departure: NOW + 60000,
          delay_minutes: 5,
        },
        { route: "B", destination: "Y", departure: NOW + 120000 },
      ],
    },
    NOW,
  );
  assert.equal(a.items[0].route, "B");
});
test("cancelled departures remain visibly labelled", () => {
  const a = make();
  a.receive(
    {
      departures: [
        {
          route: "7",
          destination: "Center",
          departure: NOW + 60000,
          cancelled: true,
        },
      ],
    },
    NOW,
  );
  assert.match(a.view(NOW).value, /CANCELLED/);
});
