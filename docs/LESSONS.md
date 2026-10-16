# Lessons

Short review queue of reusable failure classes from merged wrightkit.dev work. Each entry names a prevention action and the evidence behind it. Promote an entry into a regression test, an owner contract, or an existing engineering standard, then remove it here. The procedure is the `wrightkit-retro` skill in `wrightkit/.agents`.

### A durable claim must be checked against its authority, not written from assumption

- **Rule:** Localized copy must not claim more than the canonical copy it translates; product claims are checked against what the product actually documents and ships before publishing.
- **Why:** zh-CN homepage copy overstated the English canonical it must stay aligned with — the agent skill described as built into Wright rather than published separately in wrightkit/skills, "deep" editor integration where the English says any LSP-speaking editor, a stronger false-positive promise. Review flagged six overclaims before merge.
- **Prevention home:** workspace documentation-synchronization invariant; reviewer entry point wrightkit/.github#83. Cross-repo class escalation: wrightkit/.github#99; same class decided in wrightkit/opy-rs#556.
- **Incidents:** [#25](https://github.com/wrightkit/wrightkit.dev/pull/25) — observed 2026-09-27
