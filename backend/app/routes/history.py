from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from openpyxl import Workbook

from app.database.db import get_db
from app.database.models import (
    TimetableHistory,
    Timetable,
    Course,
    Venue,
    Invigilator
)

from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph,
)

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors

import os

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/")
def get_history(db: Session = Depends(get_db)):
    return (
        db.query(TimetableHistory)
        .order_by(TimetableHistory.generated_at.desc())
        .all()
    )


@router.delete("/{history_id}")
def delete_history(
    history_id: int,
    db: Session = Depends(get_db)
):

    history = (
        db.query(TimetableHistory)
        .filter(TimetableHistory.id == history_id)
        .first()
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail="History not found"
        )

    db.delete(history)

    db.commit()

    return {
        "message": "History deleted successfully"
    }


@router.get("/{history_id}/pdf")
def export_pdf(
    history_id: int,
    db: Session = Depends(get_db)
):

    history = (
        db.query(TimetableHistory)
        .filter(TimetableHistory.id == history_id)
        .first()
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail="History not found"
        )

    timetable = (
        db.query(
            Timetable,
            Course,
            Venue,
            Invigilator
        )
        .join(
            Course,
            Timetable.course_id == Course.id
        )
        .join(
            Venue,
            Timetable.venue_id == Venue.id
        )
        .join(
            Invigilator,
            Timetable.invigilator_id == Invigilator.id
        )
        .all()
    )

    filename = f"Exam_Timetable_{history.id}.pdf"

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "<b>AI EXAM TIMETABLE SYSTEM</b>",
            styles["Title"]
        )
    )

    elements.append(
        Paragraph(
            f"<b>Department:</b> {history.department}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"<b>Semester:</b> {history.semester}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"<b>Session:</b> {history.session}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            "<br/><br/>",
            styles["Normal"]
        )
    )

    data = [[
        "Course",
        "Title",
        "Venue",
        "Invigilator",
        "Students",
        "Day",
        "Time"
    ]]

    for t, c, v, i in timetable:

        data.append([
            c.course_code,
            c.course_title,
            v.name,
            i.name,
            str(t.allocated_students),
            t.exam_day,
            t.exam_time,
        ])

    table = Table(data)

    table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
        ])
    )

    elements.append(table)

    doc.build(elements)

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename=filename
    )

@router.get("/{history_id}/excel")
def export_excel(
    history_id: int,
    db: Session = Depends(get_db)
):

    history = (
        db.query(TimetableHistory)
        .filter(TimetableHistory.id == history_id)
        .first()
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail="History not found"
        )

    timetable = (
        db.query(
            Timetable,
            Course,
            Venue,
            Invigilator
        )
        .join(
            Course,
            Timetable.course_id == Course.id
        )
        .join(
            Venue,
            Timetable.venue_id == Venue.id
        )
        .join(
            Invigilator,
            Timetable.invigilator_id == Invigilator.id
        )
        .all()
    )

    workbook = Workbook()

    sheet = workbook.active

    sheet.title = "Exam Timetable"

    # Heading

    sheet.append(["AI EXAM TIMETABLE SYSTEM"])
    sheet.append([])

    sheet.append(["Department", history.department])
    sheet.append(["Semester", history.semester])
    sheet.append(["Session", history.session])
    sheet.append([])

    # Table Header

    sheet.append([
        "Course Code",
        "Course Title",
        "Department",
        "Level",
        "Venue",
        "Capacity",
        "Invigilator",
        "Allocated Students",
        "Exam Day",
        "Exam Time",
        "Status"
    ])

    for t, c, v, i in timetable:

        sheet.append([
            c.course_code,
            c.course_title,
            c.department,
            c.level,
            v.name,
            v.capacity,
            i.name,
            t.allocated_students,
            t.exam_day,
            t.exam_time,
            t.status
        ])

    filename = f"Exam_Timetable_{history.id}.xlsx"

    workbook.save(filename)

    return FileResponse(
        path=filename,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename=filename
    )