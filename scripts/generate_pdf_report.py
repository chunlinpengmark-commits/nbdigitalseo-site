#!/usr/bin/env python3
"""
PDF Marketing Report Generator
Generates a professional, visually polished PDF marketing report
with score gauges, bar charts, comparison tables, findings, and action plans.
"""

import json
import math
import sys
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.graphics.shapes import Drawing, Circle, Wedge, String, Line, Rect
from reportlab.graphics.charts.barcharts import HorizontalBarChart
from reportlab.graphics import renderPDF

# Color palette
COLORS = {
    "primary": colors.HexColor("#1B2A4A"),
    "accent": colors.HexColor("#2D5BFF"),
    "highlight": colors.HexColor("#FF6B35"),
    "success": colors.HexColor("#00C853"),
    "warning": colors.HexColor("#FFB300"),
    "danger": colors.HexColor("#FF1744"),
    "light_bg": colors.HexColor("#F5F7FA"),
    "body_text": colors.HexColor("#2C3E50"),
    "secondary_text": colors.HexColor("#7F8C9B"),
    "border": colors.HexColor("#E0E6ED"),
    "white": colors.white,
}


def score_color(score):
    if score >= 80:
        return COLORS["success"]
    elif score >= 60:
        return COLORS["accent"]
    elif score >= 40:
        return COLORS["warning"]
    else:
        return COLORS["danger"]


def score_grade(score):
    if score >= 93:
        return "A+"
    elif score >= 85:
        return "A"
    elif score >= 78:
        return "B+"
    elif score >= 70:
        return "B"
    elif score >= 63:
        return "C+"
    elif score >= 55:
        return "C"
    elif score >= 45:
        return "D"
    else:
        return "F"


def score_label(score):
    if score >= 85:
        return "Excellent"
    elif score >= 70:
        return "Good"
    elif score >= 55:
        return "Average"
    elif score >= 40:
        return "Below Avg"
    else:
        return "Critical"


def severity_color(severity):
    mapping = {
        "Critical": COLORS["danger"],
        "High": COLORS["highlight"],
        "Medium": COLORS["warning"],
        "Low": COLORS["accent"],
    }
    return mapping.get(severity, COLORS["secondary_text"])


def draw_score_gauge(score, size=200):
    """Draw a circular score gauge."""
    d = Drawing(size, size + 30)
    cx, cy = size / 2, size / 2 + 15
    radius = size / 2 - 15
    color = score_color(score)
    grade = score_grade(score)

    # Background circle
    d.add(Circle(cx, cy, radius, fillColor=COLORS["light_bg"], strokeColor=COLORS["border"], strokeWidth=2))

    # Score arc
    if score > 0:
        start_angle = 90
        extent = -3.6 * score
        d.add(Wedge(cx, cy, radius, start_angle, start_angle + extent,
                     fillColor=None, strokeColor=color, strokeWidth=8,
                     radius1=radius - 4))

    # Inner circle (white)
    d.add(Circle(cx, cy, radius - 12, fillColor=COLORS["white"], strokeColor=None))

    # Score text
    d.add(String(cx, cy + 10, str(score), fontSize=42, fontName="Helvetica-Bold",
                 fillColor=COLORS["primary"], textAnchor="middle"))
    d.add(String(cx, cy - 10, "/100", fontSize=14, fontName="Helvetica",
                 fillColor=COLORS["secondary_text"], textAnchor="middle"))
    d.add(String(cx, cy - 30, f"Grade: {grade}", fontSize=16, fontName="Helvetica-Bold",
                 fillColor=color, textAnchor="middle"))

    return d


def draw_bar_chart(categories):
    """Draw a horizontal bar chart of category scores."""
    d = Drawing(500, 220)

    names = list(categories.keys())
    scores = [categories[n]["score"] for n in names]

    # Draw bars manually for better control
    bar_height = 22
    gap = 8
    left_margin = 180
    bar_max_width = 280
    y_start = 190

    for i, (name, score) in enumerate(zip(names, scores)):
        y = y_start - i * (bar_height + gap)
        color = score_color(score)

        # Label
        d.add(String(left_margin - 8, y + 5, name, fontSize=9, fontName="Helvetica",
                     fillColor=COLORS["body_text"], textAnchor="end"))

        # Background bar
        d.add(Rect(left_margin, y, bar_max_width, bar_height,
                   fillColor=COLORS["light_bg"], strokeColor=COLORS["border"], strokeWidth=0.5))

        # Score bar
        bar_width = (score / 100) * bar_max_width
        d.add(Rect(left_margin, y, bar_width, bar_height,
                   fillColor=color, strokeColor=None))

        # Score label
        d.add(String(left_margin + bar_width + 8, y + 5, f"{score}/100",
                     fontSize=9, fontName="Helvetica-Bold",
                     fillColor=COLORS["body_text"], textAnchor="start"))

    return d


def build_cover_page(data, styles):
    """Build cover page elements."""
    elements = []

    # Title
    title_style = ParagraphStyle(
        "CoverTitle", parent=styles["Heading1"],
        fontSize=28, leading=34, textColor=COLORS["primary"],
        alignment=TA_CENTER, spaceAfter=6
    )
    elements.append(Spacer(1, 0.5 * inch))
    elements.append(Paragraph("Marketing Audit Report", title_style))

    # Subtitle
    subtitle_style = ParagraphStyle(
        "CoverSubtitle", parent=styles["Normal"],
        fontSize=14, leading=18, textColor=COLORS["secondary_text"],
        alignment=TA_CENTER, spaceAfter=4
    )
    elements.append(Paragraph(data["brand_name"], subtitle_style))

    # URL and date
    meta_style = ParagraphStyle(
        "CoverMeta", parent=styles["Normal"],
        fontSize=10, leading=14, textColor=COLORS["secondary_text"],
        alignment=TA_CENTER, spaceAfter=2
    )
    elements.append(Paragraph(data["url"], meta_style))
    elements.append(Paragraph(data["date"], meta_style))
    elements.append(Spacer(1, 0.3 * inch))

    # Score gauge
    gauge = draw_score_gauge(data["overall_score"])
    gauge_table = Table([[gauge]], colWidths=[500])
    gauge_table.setStyle(TableStyle([("ALIGN", (0, 0), (-1, -1), "CENTER")]))
    elements.append(gauge_table)
    elements.append(Spacer(1, 0.3 * inch))

    # Executive summary
    summary_title = ParagraphStyle(
        "SummaryTitle", parent=styles["Heading2"],
        fontSize=14, textColor=COLORS["primary"],
        alignment=TA_CENTER, spaceAfter=8
    )
    elements.append(Paragraph("Executive Summary", summary_title))

    summary_style = ParagraphStyle(
        "Summary", parent=styles["Normal"],
        fontSize=10, leading=15, textColor=COLORS["body_text"],
        alignment=TA_LEFT, leftIndent=30, rightIndent=30, spaceAfter=12
    )
    elements.append(Paragraph(data["executive_summary"], summary_style))

    return elements


def build_scores_page(data, styles):
    """Build score breakdown page."""
    elements = []
    elements.append(PageBreak())

    # Page title
    page_title = ParagraphStyle(
        "PageTitle", parent=styles["Heading1"],
        fontSize=22, leading=28, textColor=COLORS["primary"],
        spaceAfter=16
    )
    elements.append(Paragraph("Score Breakdown", page_title))

    # Bar chart
    chart = draw_bar_chart(data["categories"])
    chart_table = Table([[chart]], colWidths=[520])
    chart_table.setStyle(TableStyle([("ALIGN", (0, 0), (-1, -1), "CENTER")]))
    elements.append(chart_table)
    elements.append(Spacer(1, 0.3 * inch))

    # Score table
    header = ["Category", "Score", "Weight", "Status"]
    table_data = [header]
    for name, info in data["categories"].items():
        score = info["score"]
        label = score_label(score)
        table_data.append([name, f"{score}/100", info["weight"], label])

    # Add total row
    table_data.append(["OVERALL", f"{data['overall_score']}/100", "100%", score_label(data["overall_score"])])

    t = Table(table_data, colWidths=[200, 80, 60, 80])
    style_commands = [
        ("BACKGROUND", (0, 0), (-1, 0), COLORS["primary"]),
        ("TEXTCOLOR", (0, 0), (-1, 0), COLORS["white"]),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("ALIGN", (1, 0), (-1, -1), "CENTER"),
        ("GRID", (0, 0), (-1, -1), 0.5, COLORS["border"]),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [COLORS["white"], COLORS["light_bg"]]),
        ("BACKGROUND", (0, -1), (-1, -1), COLORS["primary"]),
        ("TEXTCOLOR", (0, -1), (-1, -1), COLORS["white"]),
        ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]

    # Color-code status cells
    for i, (name, info) in enumerate(data["categories"].items(), 1):
        color = score_color(info["score"])
        style_commands.append(("TEXTCOLOR", (3, i), (3, i), color))
        style_commands.append(("FONTNAME", (3, i), (3, i), "Helvetica-Bold"))

    t.setStyle(TableStyle(style_commands))
    elements.append(t)

    return elements


def build_findings_page(data, styles):
    """Build key findings page."""
    elements = []
    elements.append(PageBreak())

    page_title = ParagraphStyle(
        "PageTitle", parent=styles["Heading1"],
        fontSize=22, leading=28, textColor=COLORS["primary"],
        spaceAfter=16
    )
    elements.append(Paragraph("Key Findings", page_title))

    finding_style = ParagraphStyle(
        "Finding", parent=styles["Normal"],
        fontSize=9, leading=13, textColor=COLORS["body_text"],
    )

    header = ["Severity", "Finding"]
    table_data = [header]
    for f in data.get("findings", []):
        finding_para = Paragraph(f["finding"], finding_style)
        table_data.append([f["severity"], finding_para])

    if len(table_data) > 1:
        t = Table(table_data, colWidths=[70, 420])
        style_commands = [
            ("BACKGROUND", (0, 0), (-1, 0), COLORS["primary"]),
            ("TEXTCOLOR", (0, 0), (-1, 0), COLORS["white"]),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, 0), 10),
            ("GRID", (0, 0), (-1, -1), 0.5, COLORS["border"]),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [COLORS["white"], COLORS["light_bg"]]),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ]

        # Color-code severity
        for i, f in enumerate(data.get("findings", []), 1):
            color = severity_color(f["severity"])
            style_commands.append(("TEXTCOLOR", (0, i), (0, i), color))
            style_commands.append(("FONTNAME", (0, i), (0, i), "Helvetica-Bold"))

        t.setStyle(TableStyle(style_commands))
        elements.append(t)

    return elements


def build_action_plan_page(data, styles):
    """Build prioritized action plan page."""
    elements = []
    elements.append(PageBreak())

    page_title = ParagraphStyle(
        "PageTitle", parent=styles["Heading1"],
        fontSize=22, leading=28, textColor=COLORS["primary"],
        spaceAfter=16
    )
    elements.append(Paragraph("Prioritized Action Plan", page_title))

    section_title = ParagraphStyle(
        "SectionTitle", parent=styles["Heading2"],
        fontSize=14, leading=18, textColor=COLORS["primary"],
        spaceBefore=12, spaceAfter=8
    )

    item_style = ParagraphStyle(
        "ActionItem", parent=styles["Normal"],
        fontSize=9, leading=13, textColor=COLORS["body_text"],
        leftIndent=20, spaceBefore=4, spaceAfter=4
    )

    sections = [
        ("Quick Wins (This Week)", data.get("quick_wins", []), COLORS["success"]),
        ("Medium-Term (1-3 Months)", data.get("medium_term", []), COLORS["accent"]),
        ("Strategic (3-6 Months)", data.get("strategic", []), COLORS["highlight"]),
    ]

    for title, items, color in sections:
        # Section header with colored bar
        header_data = [[Paragraph(f"<font color='white'><b>{title}</b></font>",
                                  ParagraphStyle("h", fontSize=11, textColor=COLORS["white"]))]]
        ht = Table(header_data, colWidths=[490])
        ht.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), color),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ]))
        elements.append(ht)

        for i, item in enumerate(items, 1):
            elements.append(Paragraph(f"<b>{i}.</b> {item}", item_style))
        elements.append(Spacer(1, 8))

    return elements


def build_competitors_page(data, styles):
    """Build competitor comparison page."""
    competitors = data.get("competitors", [])
    if not competitors:
        return []

    elements = []
    elements.append(PageBreak())

    page_title = ParagraphStyle(
        "PageTitle", parent=styles["Heading1"],
        fontSize=22, leading=28, textColor=COLORS["primary"],
        spaceAfter=16
    )
    elements.append(Paragraph("Competitive Landscape", page_title))

    cell_style = ParagraphStyle(
        "Cell", parent=styles["Normal"],
        fontSize=8, leading=11, textColor=COLORS["body_text"],
    )

    # Build header
    header = ["Factor", data["brand_name"]]
    for c in competitors[:3]:
        header.append(c["name"])

    rows = ["positioning", "pricing", "social_proof", "content"]
    row_labels = ["Positioning", "Pricing", "Social Proof", "Content"]

    client_data = data.get("client_profile", {})

    table_data = [header]
    for row_key, row_label in zip(rows, row_labels):
        row = [row_label]
        row.append(Paragraph(client_data.get(row_key, "—"), cell_style))
        for c in competitors[:3]:
            row.append(Paragraph(c.get(row_key, "—"), cell_style))
        table_data.append(row)

    col_count = len(header)
    col_width = 490 / col_count
    t = Table(table_data, colWidths=[col_width] * col_count)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), COLORS["primary"]),
        ("TEXTCOLOR", (0, 0), (-1, 0), COLORS["white"]),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("GRID", (0, 0), (-1, -1), 0.5, COLORS["border"]),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [COLORS["white"], COLORS["light_bg"]]),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 1), (0, -1), 9),
    ]))
    elements.append(t)

    return elements


def build_methodology_page(styles):
    """Build methodology page."""
    elements = []
    elements.append(PageBreak())

    page_title = ParagraphStyle(
        "PageTitle", parent=styles["Heading1"],
        fontSize=22, leading=28, textColor=COLORS["primary"],
        spaceAfter=16
    )
    elements.append(Paragraph("Methodology", page_title))

    body_style = ParagraphStyle(
        "MethodBody", parent=styles["Normal"],
        fontSize=9, leading=14, textColor=COLORS["body_text"],
        spaceAfter=10
    )

    elements.append(Paragraph(
        "This marketing audit evaluates six core dimensions of digital marketing effectiveness. "
        "Each category is scored 0-100 based on industry benchmarks, best practices, and competitive analysis. "
        "The overall score is a weighted average reflecting each category's relative impact on revenue.",
        body_style
    ))

    # Weights table
    weights_data = [
        ["Category", "Weight", "Measures"],
        ["Content & Messaging", "25%", "Copy quality, value proposition, headline clarity, CTA text, brand voice"],
        ["Conversion Optimization", "20%", "Social proof, form design, CTA placement, objection handling, urgency"],
        ["SEO & Discoverability", "20%", "Title tags, meta descriptions, schema, internal linking, page speed"],
        ["Competitive Positioning", "15%", "Differentiation, pricing clarity, comparison content, market awareness"],
        ["Brand & Trust", "10%", "Design quality, trust badges, security indicators, professional appearance"],
        ["Growth & Strategy", "10%", "Lead capture, email marketing, content strategy, acquisition channels"],
    ]

    t = Table(weights_data, colWidths=[140, 50, 300])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), COLORS["primary"]),
        ("TEXTCOLOR", (0, 0), (-1, 0), COLORS["white"]),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("FONTSIZE", (0, 1), (-1, -1), 8),
        ("GRID", (0, 0), (-1, -1), 0.5, COLORS["border"]),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [COLORS["white"], COLORS["light_bg"]]),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    elements.append(t)

    elements.append(Spacer(1, 0.3 * inch))

    # Score interpretation
    elements.append(Paragraph("<b>Score Interpretation</b>", body_style))
    interp_data = [
        ["Score Range", "Grade", "Meaning"],
        ["85-100", "A", "Excellent — minor optimizations only"],
        ["70-84", "B", "Good — clear opportunities for improvement"],
        ["55-69", "C", "Average — significant gaps to address"],
        ["40-54", "D", "Below average — major overhaul needed"],
        ["0-39", "F", "Critical — fundamental marketing issues"],
    ]

    t2 = Table(interp_data, colWidths=[80, 50, 360])
    t2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), COLORS["primary"]),
        ("TEXTCOLOR", (0, 0), (-1, 0), COLORS["white"]),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("FONTSIZE", (0, 1), (-1, -1), 8),
        ("GRID", (0, 0), (-1, -1), 0.5, COLORS["border"]),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [COLORS["white"], COLORS["light_bg"]]),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    elements.append(t2)

    elements.append(Spacer(1, 0.5 * inch))

    footer_style = ParagraphStyle(
        "Footer", parent=styles["Normal"],
        fontSize=8, leading=12, textColor=COLORS["secondary_text"],
        alignment=TA_CENTER
    )
    elements.append(Paragraph("Generated by AI Marketing Suite for Claude Code", footer_style))

    return elements


def add_page_footer(canvas, doc):
    """Add footer to each page."""
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(COLORS["secondary_text"])
    canvas.drawString(inch, 0.5 * inch, f"Marketing Audit Report — {doc.title}")
    canvas.drawRightString(letter[0] - inch, 0.5 * inch, f"Page {doc.page}")
    # Top line
    canvas.setStrokeColor(COLORS["border"])
    canvas.setLineWidth(0.5)
    canvas.line(inch, letter[1] - 0.5 * inch, letter[0] - inch, letter[1] - 0.5 * inch)
    # Bottom line
    canvas.line(inch, 0.65 * inch, letter[0] - inch, 0.65 * inch)
    canvas.restoreState()


def generate_report(data, output_path):
    """Generate the full PDF report."""
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        title=data.get("brand_name", "Marketing Audit"),
    )

    styles = getSampleStyleSheet()
    elements = []

    # Page 1: Cover
    elements.extend(build_cover_page(data, styles))

    # Page 2: Score Breakdown
    elements.extend(build_scores_page(data, styles))

    # Page 3: Key Findings
    elements.extend(build_findings_page(data, styles))

    # Page 4: Action Plan
    elements.extend(build_action_plan_page(data, styles))

    # Page 5: Competitors (optional)
    elements.extend(build_competitors_page(data, styles))

    # Final: Methodology
    elements.extend(build_methodology_page(styles))

    doc.build(elements, onFirstPage=add_page_footer, onLaterPages=add_page_footer)
    print(f"Report generated: {output_path}")


def main():
    if len(sys.argv) < 2:
        # Demo mode
        print("Usage: python generate_pdf_report.py <json_file> [output.pdf]")
        print("Running in demo mode...")
        data = {
            "url": "https://example.com",
            "date": datetime.now().strftime("%B %d, %Y"),
            "brand_name": "Sample Company",
            "overall_score": 62,
            "executive_summary": "This is a sample report demonstrating the PDF generation capabilities.",
            "categories": {
                "Content & Messaging": {"score": 68, "weight": "25%"},
                "Conversion Optimization": {"score": 52, "weight": "20%"},
                "SEO & Discoverability": {"score": 74, "weight": "20%"},
                "Competitive Positioning": {"score": 48, "weight": "15%"},
                "Brand & Trust": {"score": 70, "weight": "10%"},
                "Growth & Strategy": {"score": 55, "weight": "10%"},
            },
            "findings": [
                {"severity": "Critical", "finding": "Sample critical finding"},
                {"severity": "High", "finding": "Sample high finding"},
            ],
            "quick_wins": ["Sample quick win 1", "Sample quick win 2"],
            "medium_term": ["Sample medium-term item"],
            "strategic": ["Sample strategic item"],
        }
        generate_report(data, "MARKETING-REPORT-sample.pdf")
        return

    json_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else "MARKETING-REPORT.pdf"

    with open(json_path, "r") as f:
        data = json.load(f)

    generate_report(data, output_path)


if __name__ == "__main__":
    main()
