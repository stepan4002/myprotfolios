# Portfolio reference examples

These examples were written for the public portfolio walkthrough in October 2026. They use synthetic input. They are not exports of the original CADEMA, Upgates or catalogue production systems.

Download `portfolio_reference.py` and `test_portfolio_reference.py` into the same directory, then run:

```sh
python -m unittest test_portfolio_reference.py
```

Python 3 standard library only; no credentials, services or network access required.

What is checked:
- Czech/Slovak diacritic and whitespace normalisation, with ambiguous matches held for review.
- EAN-13 checksum validation. A valid check digit does not establish GS1 ownership or product authenticity.
- Known-context versus human-escalation decisions in a simplified voice-routing policy.
- Text-node translation preserving HTML attributes, placeholders, protected code and entities.
- Escaping translated output so it cannot introduce new HTML elements.

What is NOT demonstrated:
- Telephone calls, speech recognition, voice quality or latency.
- LLM translation quality, full HTML sanitisation, production retries/resume or glossary compliance.
- API authentication, shop write-back, original customer data or the historical migration match rate.

The browser examples use fixed fixtures and an approval-state simulation. A browser approval button is not proof of server-side production authorisation. Production writes need their own authenticated server-side approval boundary.
