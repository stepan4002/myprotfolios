"""Build the public, one-page CV from the website's shared profile."""
from pathlib import Path
import json
from html import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

repo = Path(__file__).resolve().parents[1]
profile = json.loads((repo/'apps/main/src/data/profile.json').read_text(encoding='utf-8'))
out = repo/'apps/main/public/downloads/Nikolas-Stepan-CV.pdf'
out.parent.mkdir(parents=True, exist_ok=True)
ink = colors.HexColor('#17213b')
blue = colors.HexColor('#1F3FBB')
styles = {
 'name': ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=27,leading=31,textColor=ink,spaceAfter=6),
 'role': ParagraphStyle('role',fontName='Helvetica',fontSize=12,leading=16,textColor=blue,spaceAfter=9),
 'body': ParagraphStyle('body',fontName='Helvetica',fontSize=9.5,leading=13.5,textColor=ink,spaceAfter=7),
 'section': ParagraphStyle('section',fontName='Helvetica-Bold',fontSize=10,leading=14,textColor=blue,spaceBefore=12,spaceAfter=7),
 'small': ParagraphStyle('small',fontName='Helvetica',fontSize=8.5,leading=12,textColor=ink,spaceAfter=5),
}
story=[]
def p(text,style='body'):story.append(Paragraph(text,styles[style]))
def section(text):p(text.upper(),'section')
p(escape(profile['name']),'name')
p(escape(profile['title']),'role')
p(f"{escape(profile['location'])} | <link href=\"mailto:{profile['email']}\">{profile['email']}</link>",'small')
p('<link href="https://nikolasstepan.com">nikolasstepan.com</link> | <link href="https://github.com/stepan4002">GitHub: stepan4002</link> | <link href="https://www.linkedin.com/in/nikolas-stepan-545417221/">LinkedIn</link>','small')
story.append(Spacer(1,5));story.append(HRFlowable(width='100%',thickness=.7,color=blue))
section('Profile & delivery approach')
p(escape(profile['summary']))
p(escape(profile['arrangements']))
section('Selected delivery work')
for title, text, slug in [
 ('CADEMA Voice Agent','Designed a Czech-language enquiry workflow around third-party telephony and speech services, constrained delivery information and escalation for custom quotations.','cadema-voice-agent'),
 ('Upgates AI Translator','AI-assisted application delivery connecting catalogue APIs, HTML-aware translation and an operator review step before write-back.','upgates-translator'),
 ('Catalogue Automation','Workflow design for catalogue normalisation, identifier validation and migration. The existing project record describes a 314-SKU scope.','catalogue-migration'),
 ('CADEMA Configurator','Connected configurable product state, synchronised 2D/3D views, live pricing, PDF quotations and shareable configuration state.','cadema-configurator')]:
 p(f'<b>{title}</b> - {text} <link color="#1F3FBB" href="https://nikolasstepan.com/work/{slug}">Technical walkthrough</link>')
section('Operating background')
p('<b>CADEMA:</b> founder/co-founder experience translating customer, quoting and fulfilment needs into systems requirements. <b>Gemcraft / GemArt:</b> commercial operations and workflow automation. <b>TCS Hungary:</b> French- and English-language enterprise service-desk support.')
section('Tools & implementation context')
p('Claude Code and AI-assisted implementation; Python / FastAPI; TypeScript / React / Next.js; REST APIs and webhooks; n8n; Docker; Vercel; Playwright. Core contribution: requirements, architecture, orchestration, integration, testing and deployment.')
section('Education & languages')
p(escape(profile['education']))
p(' | '.join(escape(item['name'])+' - '+escape(item['level']) for item in profile['languages']))
p('Detailed contribution statements, architecture walkthroughs and clearly labelled reference examples are available in the linked portfolio case studies.','small')
SimpleDocTemplate(str(out),pagesize=A4,rightMargin=43,leftMargin=43,topMargin=38,bottomMargin=32,title='Nikolas Stepan - AI Solutions Engineer',author='Nikolas Stepan').build(story)
print(out)
