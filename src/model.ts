import {
  record,
  str,
  num,
  cycle,
  requiredNumber,
  requiredText,
  entries,
  timestamp,
  Feed,
  MINUTE,
  type Settings,
  type View,
} from "./lib.ts";

export class AppModel extends Feed {
  receive(value: unknown, now: number): void {
    const data = record(value);
    const items = entries(data.departures)
      .map((raw) => {
        const v = record(raw);
        const delay =
          v.delay_minutes === undefined ? 0 : requiredNumber(v.delay_minutes);
        if (delay < -120 || delay > 1440) throw new Error("Invalid delay");
        return {
          route: requiredText(v.route, 24),
          destination: requiredText(v.destination),
          departure: timestamp(v.departure),
          delay,
          cancelled: v.cancelled === true,
        };
      })
      .sort(
        (a, b) =>
          a.departure + a.delay * MINUTE - (b.departure + b.delay * MINUTE),
      );
    this.commit(
      items,
      now,
      data.updated_at === undefined ? now : data.updated_at,
    );
  }
  active(now: number): Settings[] {
    return this.items.filter(
      (v) => num(v, "departure") + num(v, "delay") * MINUTE >= now - 30000,
    );
  }
  key(key: string, delta: number, now: number): boolean {
    if (key === "wheel")
      this.selected = cycle(this.selected, delta, this.active(now).length);
    return false;
  }
  view(now: number): View {
    const list = this.active(now);
    if (!list.length)
      return this.feedView(
        str(this.settings, "stop_name"),
        "NO DEPARTURES",
        [],
        now,
      );
    const v = list[Math.min(this.selected, list.length - 1)];
    const wait = Math.max(
      0,
      num(v, "departure") + num(v, "delay") * MINUTE - now,
    );
    return this.feedView(
      str(this.settings, "stop_name"),
      str(v, "route") +
        " " +
        (v.cancelled ? "CANCELLED" : Math.ceil(wait / MINUTE) + " min"),
      [
        str(v, "destination"),
        num(v, "delay") ? "Delay " + num(v, "delay") + " min" : "On time",
      ],
      now,
      v.cancelled ? "#FF7777FF" : "#55DDFFFF",
    );
  }
}
