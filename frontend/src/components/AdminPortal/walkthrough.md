# Walkthrough - Rebuilt Modular Admin Landing Portal

This walkthrough documents the rebuilt admin landing page (`AdminLanding.jsx`) control-deck style portal, implemented across exactly 24 Git commits.

## Summary of Rebuilt Subcomponents (under `components/AdminPortal/`)

1. **`PortalHeader.jsx`**:
   - Contains a stateful network latency polling timer updating every 2 seconds.
   - Dynamically checks the mock threat override state and flashes a red alert badge when a simulated breach occurs.

2. **`SystemMetrics.jsx`**:
   - CPU LOAD: Animated vertical sparkline load history that updates every 1.5 seconds.
   - MEM LOAD: Stateful memory load tracker fluctuating subtly every 3 seconds with dynamic bar graphs and active memory ratios.
   - DB STORAGE: Storage status checks reporting database latency.

3. **`ServiceControlGrid.jsx`**:
   - Interactive overrides switches (Maintenance Mode, Telemetry Stream, MFA Verification, Rate-Limit Bypass).
   - Custom active border glows and animation pulses for active overrides.

4. **`LiveLogTerminal.jsx`**:
   - Interactive diagnostic prompt allowing users to enter CLI commands.
   - Supported commands: `/help` (list commands), `/status` (ping nodes/db health), `/sysinfo` (check runtime details), and `/clear` (flush buffer).
   - Shell history: Tracks submitted commands, enabling users to press **ArrowUp** and **ArrowDown** keys to cycle history inputs.

5. **`AccessHandshake.jsx`**:
   - Standard email/password credential fields.
   - Interactive 3x4 secure PIN-pad keypad with dot indicators and remaining digit tracking status.
   - Integrated with AuthContext API login triggers and toast notifications.

6. **`SecurityAlertBanner.jsx`**:
   - Integrated threat level dashboard tracker.
   - Includes a simulator button enabling administrators to trigger/reset a critical mock security override warning.
