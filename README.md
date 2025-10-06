# Aeron Chair Serial Decoder

A single-purpose web app that decodes Herman Miller Aeron chair serial numbers to reveal their complete configuration and specifications.

![Aeron Chair Serial Decoder](public/favicon.png)

## What It Does

Enter an Aeron chair serial number (found on a label underneath the seat) and the decoder will reveal:

- **Model** - Work Chair, Stool, ESD variant
- **Size** - A (Small), B (Medium), or C (Large)
- **Height Range** - Low, Standard, or High
- **Tilt** - Standard, Tilt Limiter, or Tilt Limiter + Seat Angle
- **Arms** - None, Fixed, Height-Adjustable, Pivot, or Fully Adjustable
- **Back Support** - Basic, PostureFit, Adjustable Lumbar, or PostureFit SL
- **Finishes** - Frame, Chassis, Base, and Armpad colors
- **Casters** - Type and floor compatibility

## How It Works

The decoder parses serial numbers by sequentially extracting configuration codes and validating them against data from the [Herman Miller Aeron Chairs Price Book](https://www.hermanmiller.com/content/dam/hermanmiller/documents/pricing/PB_AEN.pdf) (October 2025).

Serial numbers encode product configurations in a specific order:
```
AER1 B 2 3 D A LP VPR SNA SNA DC1 DVP
│    │ │ │ │ │ │  │   │   │   │   └─ Armpad finish
│    │ │ │ │ │ │  │   │   │   └───── Casters
│    │ │ │ │ │ │  │   │   └─────── Base finish
│    │ │ │ │ │ │  │   └─────────── Chassis finish
│    │ │ │ │ │ │  └─────────────── Frame finish
│    │ │ │ │ │ └────────────────── Back support
│    │ │ │ │ └──────────────────── Armpad upholstery
│    │ │ │ └────────────────────── Arms type
│    │ │ └──────────────────────── Tilt
│    │ └────────────────────────── Height adjustment
│    └──────────────────────────── Size
└────────────────────────────────── Model
```

The decoder handles:
- **Variable-length codes** (2-3 characters per field)
- **Size-dependent validation** (height ranges vary by chair size)
- **Conditional fields** (armpad finish only appears when arms are present)
- **Invalid combinations** (not all finish combinations are valid)

## Tech Stack

- **React 19** + **TypeScript** - UI framework
- **Vite** - Build tool and dev server
- **IBM Plex Sans** - Typography
- Minimalist design inspired by Vercel's aesthetic

## Development

Built entirely with [Claude Code](https://claude.com/claude-code) by Anthropic.

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Data Source

Configuration data extracted from the Herman Miller Aeron Chairs Price Book (10/25). Not affiliated with Herman Miller.

## License

MIT
