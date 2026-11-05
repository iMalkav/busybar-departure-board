# Data source

Source URL returns departures with absolute timestamps. Delay is a signed number of minutes; cancellations remain visible until their departure time has passed.

Source responses use application/json and must fit within 24 KiB. Access tokens use the Authorization: Bearer header.

## Response example

```json
{
  "departures": [
    {
      "route": "7",
      "destination": "Central Station",
      "departure": 4102444800000,
      "delay_minutes": 3,
      "cancelled": false
    }
  ]
}
```

Feeds may include updated_at in Unix milliseconds or ISO 8601 with a timezone. Older snapshots are ignored. A newer empty list clears the list. Maximum list size is 32 entries.

## Serve your own JSON

Run python examples/serve.py --host 0.0.0.0 on a computer or home server. Set Source URL to that host LAN address on port 8765. Edit the JSON file to publish new values, or choose another file with --file. FEED_TOKEN optionally enables Bearer authentication. The --writable option allows PUT updates. This example serves metadata only; playback commands need the adapter described above.
