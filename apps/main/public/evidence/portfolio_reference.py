"""Synthetic portfolio reference examples, authored for the public walkthrough.
No network calls. No production credentials or customer data.
Run: python -m unittest test_portfolio_reference.py
"""
from html import escape
from html.parser import HTMLParser
import re
import unicodedata


def normalise(value):
    folded = unicodedata.normalize("NFKD", value.casefold())
    plain = "".join(char for char in folded if not unicodedata.combining(char))
    return " ".join(plain.split())


def reconcile(source, candidates):
    matches = [item for item in candidates if normalise(item) == normalise(source)]
    return {"status": "matched" if len(matches) == 1 else "review" if matches else "unmatched", "candidates": matches}


def valid_ean13(value):
    if not isinstance(value, str) or not re.fullmatch(r"[0-9]{13}", value):
        return False
    weighted = sum(int(digit) * (1 if index % 2 == 0 else 3) for index, digit in enumerate(value[:12]))
    return (10 - weighted % 10) % 10 == int(value[-1])


def voice_route(intent, verified_context=False):
    if intent == "custom_quote" or not verified_context:
        return "human_handoff"
    return "bounded_knowledge_answer" if intent == "delivery" else "human_handoff"


class TextNodeTranslator(HTMLParser):
    """Preserve source markup and attributes; translate only unprotected text.
    Synthetic dictionary translation. This is NOT a production LLM translator,
    HTML sanitiser, glossary engine, retry worker or catalogue API client.
    """
    def __init__(self, translations):
        super().__init__(convert_charrefs=False)
        self.translations = translations
        self.parts = []
        self.protected = []

    def handle_starttag(self, tag, attrs):
        self.parts.append(self.get_starttag_text())
        if tag in ("script", "style", "code", "pre"):
            self.protected.append(tag)

    def handle_startendtag(self, tag, attrs):
        self.parts.append(self.get_starttag_text())

    def handle_endtag(self, tag):
        self.parts.append(f"</{tag}>")
        if self.protected and self.protected[-1] == tag:
            self.protected.pop()

    def handle_data(self, value):
        if self.protected:
            self.parts.append(value)
            return
        for segment in re.split(r"(\{\{[^{}]+\}\})", value):
            if segment.startswith("{{") and segment.endswith("}}"):
                self.parts.append(segment)
            else:
                self.parts.append(escape(self.translations.get(segment, segment), quote=False))

    def handle_entityref(self, name):
        self.parts.append(f"&{name};")

    def handle_charref(self, name):
        self.parts.append(f"&#{name};")

    def handle_comment(self, data):
        self.parts.append(f"<!--{data}-->")


def translate_fixture(source, translations):
    parser = TextNodeTranslator(translations)
    parser.feed(source)
    parser.close()
    return "".join(parser.parts)


if __name__ == "__main__":
    candidates = ["pergola klasik", "zahradni domek", "altan", "ALTÁN"]
    print({name: reconcile(name, candidates) for name in ["Pergola Klasik", "Zahradní domek", "Altán", "Neznámý výrobek"]})
