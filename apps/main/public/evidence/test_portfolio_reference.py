"""Executable checks for synthetic reference examples, not production claims."""
import unittest
from portfolio_reference import normalise, reconcile, valid_ean13, voice_route, translate_fixture


class ReferenceTests(unittest.TestCase):
    def test_normalisation(self):
        self.assertEqual(normalise("  ZAHRADNÍ   domek "), "zahradni domek")
        self.assertEqual(normalise(normalise("ALTÁN")), "altan")

    def test_unique_match(self):
        self.assertEqual(reconcile("Pergola Klasik", ["pergola klasik"])["status"], "matched")

    def test_ambiguous_match_requires_review(self):
        self.assertEqual(reconcile("Altán", ["altan", "ALTÁN"])["status"], "review")

    def test_unknown_record_is_not_matched(self):
        self.assertEqual(reconcile("Neznámý výrobek", ["altan"])["status"], "unmatched")

    def test_checksum(self):
        self.assertTrue(valid_ean13("4006381333931"))
        self.assertFalse(valid_ean13("4006381333932"))
        self.assertFalse(valid_ean13("400638133393"))
        self.assertFalse(valid_ean13("４００６３８１３３３９３１"))
        self.assertFalse(valid_ean13(None))

    def test_voice_escalation(self):
        self.assertEqual(voice_route("custom_quote", True), "human_handoff")
        self.assertEqual(voice_route("delivery", False), "human_handoff")
        self.assertEqual(voice_route("unknown", True), "human_handoff")
        self.assertEqual(voice_route("delivery", True), "bounded_knowledge_answer")

    def test_markup_attributes_and_placeholder(self):
        source = '<p class="product">Dřevěná pergola <strong>3 × 4 m</strong>. Doručení: {{delivery_days}}.</p>'
        output = translate_fixture(source, {"Dřevěná pergola ": "Wooden pergola ", ". Doručení: ": ". Delivery: "})
        self.assertEqual(output, '<p class="product">Wooden pergola <strong>3 × 4 m</strong>. Delivery: {{delivery_days}}.</p>')

    def test_translated_text_cannot_introduce_markup(self):
        self.assertEqual(translate_fixture("<p>Ahoj</p>", {"Ahoj": "<img src=x>"}), "<p>&lt;img src=x&gt;</p>")

    def test_protected_code_and_entities(self):
        source = '<code>Ahoj</code><p>Ahoj &amp; &#38;</p><!--note-->'
        self.assertEqual(translate_fixture(source, {"Ahoj": "Hello"}), '<code>Ahoj</code><p>Ahoj &amp; &#38;</p><!--note-->')


if __name__ == "__main__":
    unittest.main()
