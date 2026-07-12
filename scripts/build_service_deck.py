"""Generate a professional Service Deck PDF for direct-client outreach."""
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak,
    Image as RLImage
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "downloads", "Gaurav-Vishvakarma-Service-Deck.pdf")

# ---- Brand colors ----
ACCENT = colors.HexColor("#0284c7")
DARK = colors.HexColor("#0f172a")
MUTED = colors.HexColor("#475569")
BG_SOFT = colors.HexColor("#f1f5f9")

styles = getSampleStyleSheet()

def make_style(name, **k):
    base = k.pop("parent", styles["Normal"])
    return ParagraphStyle(name, parent=base, **k)

STY_TITLE = make_style("Title", fontName="Helvetica-Bold", fontSize=28, leading=32,
                       textColor=DARK, spaceAfter=6)
STY_SUB = make_style("Sub", fontName="Helvetica", fontSize=13, leading=16,
                     textColor=ACCENT, spaceAfter=18)
STY_H1 = make_style("H1", fontName="Helvetica-Bold", fontSize=18, leading=22,
                    textColor=DARK, spaceAfter=8, spaceBefore=6)
STY_H2 = make_style("H2", fontName="Helvetica-Bold", fontSize=13, leading=16,
                    textColor=ACCENT, spaceAfter=4)
STY_BODY = make_style("Body", fontName="Helvetica", fontSize=10.5, leading=15,
                      textColor=DARK, alignment=TA_LEFT, spaceAfter=6)
STY_BULLET = make_style("Bullet", fontName="Helvetica", fontSize=10.5, leading=15,
                        textColor=DARK, leftIndent=14, bulletIndent=0, spaceAfter=3)
STY_MUTED = make_style("Muted", fontName="Helvetica-Oblique", fontSize=9.5, leading=13,
                       textColor=MUTED, spaceAfter=6)
STY_HERO = make_style("Hero", fontName="Helvetica-Bold", fontSize=32, leading=38,
                      textColor=colors.white, alignment=TA_LEFT)
STY_HERO_SUB = make_style("HeroSub", fontName="Helvetica", fontSize=13, leading=18,
                          textColor=colors.HexColor("#e0f2fe"), alignment=TA_LEFT)


def cover_flow():
    story = []
    # Cover banner
    banner = Table([[Paragraph(
        "<b>GAURAV KUMAR VISHVAKARMA</b><br/>"
        "<font size='16' color='#e0f2fe'>Independent Data Analyst &amp; Power BI Consultant</font>",
        STY_HERO)]],
        colWidths=[16*cm], rowHeights=[5.5*cm])
    banner.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), ACCENT),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("LEFTPADDING", (0,0), (-1,-1), 24),
        ("RIGHTPADDING", (0,0), (-1,-1), 24),
    ]))
    story.append(banner)
    story.append(Spacer(1, 0.6*cm))
    story.append(Paragraph(
        "<b>Service Deck</b> · 2026 Edition", STY_SUB))
    story.append(Paragraph(
        "This deck outlines what I do, how I engage with clients, and the transparent pricing "
        "for each type of engagement. Everything below reflects <b>real, delivered work</b> — "
        "no fluff, no fake case studies.",
        STY_BODY))
    story.append(Spacer(1, 0.5*cm))

    # Snapshot table
    snapshot = [
        ["Experience", "4+ years — enterprise analytics"],
        ["Delivered", "200+ enterprise reporting solutions"],
        ["Efficiency Impact", "45% average time saved in reporting"],
        ["Quality Standard", "99.5% data-accuracy enforcement"],
        ["Sectors", "Media Intelligence · Financial Services · Consulting"],
        ["Locations", "Bengaluru, India — serving EU / US / APAC"],
    ]
    t = Table(snapshot, colWidths=[4.5*cm, 11.5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (0,-1), BG_SOFT),
        ("TEXTCOLOR", (0,0), (0,-1), ACCENT),
        ("FONTNAME", (0,0), (0,-1), "Helvetica-Bold"),
        ("FONTNAME", (1,0), (1,-1), "Helvetica"),
        ("FONTSIZE", (0,0), (-1,-1), 10.5),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("LINEBELOW", (0,0), (-1,-2), 0.5, colors.HexColor("#e2e8f0")),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.8*cm))

    # Contact row
    contact = Table([[
        Paragraph("<b>Email</b><br/>gauravkumarvishwakarma@gmail.com", STY_BODY),
        Paragraph("<b>Phone / WhatsApp</b><br/>+91-8130676651", STY_BODY),
        Paragraph("<b>Portfolio</b><br/>iamgaurav.netlify.app", STY_BODY),
    ]], colWidths=[5.5*cm, 5.5*cm, 5*cm])
    contact.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), BG_SOFT),
        ("BOX", (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("TOPPADDING", (0,0), (-1,-1), 10),
        ("BOTTOMPADDING", (0,0), (-1,-1), 10),
    ]))
    story.append(contact)
    return story


def services_flow():
    story = [PageBreak(),
             Paragraph("Services &amp; Engagement Models", STY_H1),
             Paragraph("Six engagement types — pick what fits, or mix them.", STY_MUTED),
             Spacer(1, 0.3*cm)]

    services = [
        ("Power BI Dashboard Build", "$800 – $2,800", "3 days – 2 weeks",
         "Custom dashboards with DAX, drill-through, slicers, RLS. Perfect for executive reporting."),
        ("SQL &amp; ETL Automation", "$1,000 – $5,000", "1 – 3 weeks",
         "Automated data pipelines, query optimisation, reporting workflows."),
        ("Monthly Retainer  ★ Most Popular", "$1,200 – $1,700 / mo", "20 hrs / month",
         "Ongoing BI support — dashboard updates, new reports, quick fixes, training."),
        ("Power BI Training (1:1 or Team)", "$80 – $120 / hr", "Flexible",
         "DAX, data modelling, dashboard design, best practices. 16-hr full course also available."),
        ("Data Quality Audit", "$600 – $1,500", "3 – 7 days",
         "Deep-dive audit of pipelines + validation framework recommendations."),
        ("Analytics Consulting", "$80 – $120 / hr", "Hourly",
         "Strategic advisory on BI architecture, tool selection, team upskilling."),
    ]
    header = ["Service", "Price (USD)", "Timeline", "What You Get"]
    rows = [header]
    for s in services:
        rows.append([Paragraph(f"<b>{s[0]}</b>", STY_BODY),
                     Paragraph(s[1], STY_BODY),
                     Paragraph(s[2], STY_BODY),
                     Paragraph(s[3], STY_BODY)])
    t = Table(rows, colWidths=[5*cm, 3.4*cm, 2.6*cm, 5*cm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), ACCENT),
        ("TEXTCOLOR", (0,0), (-1,0), colors.white),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,0), 10.5),
        ("ALIGN", (0,0), (-1,0), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, BG_SOFT]),
        ("BOX", (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ("LINEBELOW", (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph(
        "<b>Payment terms:</b> 50% upfront, 50% on delivery. International transfers via Wise, "
        "Payoneer or SEPA. Local (India) via UPI / NEFT. Retainer clients billed monthly.",
        STY_BODY))
    return story


def process_flow():
    story = [PageBreak(),
             Paragraph("How I Work — 5 Steps", STY_H1),
             Paragraph("Every engagement follows the same clean process.", STY_MUTED),
             Spacer(1, 0.3*cm)]

    steps = [
        ("1. Free Discovery Call (20 min)",
         "You describe the challenge — Excel mess, slow reporting, dashboard needs. "
         "I ask targeted questions to scope the work. No pitch, no pressure."),
        ("2. Written Scope + Fixed-Price Quote (24 hrs)",
         "You get a one-page document: deliverables, timeline, cost, tools. Approve or negotiate."),
        ("3. Kick-off &amp; Data Access",
         "50% deposit paid. Data access set up on YOUR cloud (SharePoint, Drive, S3). "
         "Mutual NDA signed if required."),
        ("4. Build in Sprints with Demos",
         "I build iteratively. You see progress every 2–3 days via short Loom demos. "
         "Feedback goes straight back into the build — no long silences."),
        ("5. Handoff + 14-Day Warranty",
         "Final delivery includes documentation, walkthrough video, and 14-day fix warranty. "
         "Retainer can start immediately if ongoing support is needed."),
    ]
    for title, body in steps:
        story.append(Paragraph(title, STY_H2))
        story.append(Paragraph(body, STY_BODY))
        story.append(Spacer(1, 0.15*cm))

    story.append(Spacer(1, 0.4*cm))
    story.append(Paragraph("Why Direct Engagement (Not Platforms)", STY_H1))
    for pt in [
        "<b>No 15–20% platform fees</b> — savings pass to you as better rates or more scope.",
        "<b>Direct communication</b> — WhatsApp / email / call, no ticket queues.",
        "<b>Long-term partnership</b> — you own the code, docs and dashboards.",
        "<b>Faster turnaround</b> — no proposal bidding wars, straight to work.",
        "<b>Custom pricing</b> — fixed-price, hourly, or retainer — your call.",
    ]:
        story.append(Paragraph("• " + pt, STY_BULLET))
    return story


def experience_flow():
    story = [PageBreak(),
             Paragraph("Track Record", STY_H1)]

    rows = [
        [Paragraph("<b>Acuity Knowledge Partners</b><br/><font color='#475569' size='9'>Data Analyst · Jun 2022 – Jul 2025</font>", STY_BODY),
         Paragraph("Market Research &amp; Employer Branding reports for 200+ enterprise clients. "
                   "Automated 96+ reports/week across 15 sources (248 metrics), 96.2% success rate. "
                   "45% manual reduction, 99.5% accuracy.", STY_BODY)],
        [Paragraph("<b>ShowTime Consulting</b><br/><font color='#475569' size='9'>Data Analyst · Sep 2021 – Jun 2022</font>", STY_BODY),
         Paragraph("Political campaign analytics — election data processing, gram-panchayat-wise "
                   "voter analysis, Power BI dashboards for 15+ stakeholders. Sentiment models "
                   "(Logistic Regression, MLP, Decision Trees) — 93% influencer detection accuracy.", STY_BODY)],
        [Paragraph("<b>Innodatatics.ai</b><br/><font color='#475569' size='9'>Data Science Intern · Mar 2021 – Sep 2021</font>", STY_BODY),
         Paragraph("Food Recommender (ALS + PySpark + Streamlit — 28% engagement lift). "
                   "OCR (PyTorch + LaTeX). Face Recognition (OpenCV — 98% accuracy).", STY_BODY)],
        [Paragraph("<b>Independent Consultant</b><br/><font color='#475569' size='9'>Aug 2025 – Present</font>", STY_BODY),
         Paragraph("European &amp; global clients via direct engagement + Freelancer.com. "
                   "Latest engagement: Power BI enhancement + training for SaaS Supply Chain Manager "
                   "(sprint tracking, drill-through pages, conditional formatting).", STY_BODY)],
    ]
    t = Table(rows, colWidths=[5*cm, 11*cm])
    t.setStyle(TableStyle([
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("BOTTOMPADDING", (0,0), (-1,-1), 10),
        ("TOPPADDING", (0,0), (-1,-1), 10),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("BOX", (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ("LINEBELOW", (0,0), (-1,-2), 0.5, colors.HexColor("#e2e8f0")),
        ("BACKGROUND", (0,0), (0,-1), BG_SOFT),
    ]))
    story.append(t)

    story.append(Spacer(1, 0.6*cm))
    story.append(Paragraph("Stack &amp; Tools", STY_H1))
    tools = ("Power BI · DAX · Power Query · Tableau · Looker Studio · Alteryx · "
             "SQL Server · MySQL · Snowflake · Python · Pandas · NumPy · PySpark · "
             "Streamlit · Flask · Excel (Power Pivot, Power Query) · Git · Azure basics")
    story.append(Paragraph(tools, STY_BODY))
    return story


def cta_flow():
    story = [PageBreak(),
             Paragraph("Ready to Start?", STY_H1),
             Spacer(1, 0.3*cm)]
    story.append(Paragraph(
        "The fastest way to know if we're a fit is a <b>free 20-min discovery call</b>. "
        "You describe your data challenge, I give an honest opinion on whether I can help, "
        "and if so — a scope and quote within 24 hours. No sales pitch, no pressure.",
        STY_BODY))
    story.append(Spacer(1, 0.4*cm))

    box = Table([[
        Paragraph(
            "<b><font size='14'>Book a Discovery Call</font></b><br/><br/>"
            "<b>Email:</b> gauravkumarvishwakarma@gmail.com<br/>"
            "<b>WhatsApp:</b> +91-8130676651<br/>"
            "<b>Portfolio:</b> iamgaurav.netlify.app<br/>"
            "<b>LinkedIn:</b> linkedin.com/in/gauravkumarvishwakarma",
            make_style("CTA", fontName="Helvetica", fontSize=11.5,
                       leading=17, textColor=colors.white, alignment=TA_LEFT))
    ]], colWidths=[16*cm], rowHeights=[6*cm])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), ACCENT),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("LEFTPADDING", (0,0), (-1,-1), 24),
        ("RIGHTPADDING", (0,0), (-1,-1), 24),
    ]))
    story.append(box)

    story.append(Spacer(1, 0.6*cm))
    story.append(Paragraph(
        "Thank you for taking the time. Even if we don't work together, I'm happy to "
        "point you in the right direction — that's how partnerships start.",
        STY_MUTED))
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph("— Gaurav", STY_H2))
    return story


def build():
    doc = SimpleDocTemplate(
        OUT, pagesize=A4,
        leftMargin=1.5*cm, rightMargin=1.5*cm,
        topMargin=1.5*cm, bottomMargin=1.5*cm,
        title="Gaurav Vishvakarma — Service Deck",
        author="Gaurav Kumar Vishvakarma",
        subject="Freelance Data Analyst & Power BI Consultant — Service Deck 2026",
    )
    story = []
    story += cover_flow()
    story += services_flow()
    story += process_flow()
    story += experience_flow()
    story += cta_flow()
    doc.build(story)
    size = os.path.getsize(OUT)
    print(f"✅ Service Deck built: {OUT} ({size/1024:.1f} KB)")


if __name__ == "__main__":
    build()
