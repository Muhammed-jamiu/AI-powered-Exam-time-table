from app.database.models import (
    Course,
    Venue,
    Invigilator,
    Timetable
)

TIME_SLOTS = [
    ("Monday", "9AM-12PM"),
    ("Monday", "3PM-6PM"),

    ("Tuesday", "9AM-12PM"),
    ("Tuesday", "3PM-6PM"),

    ("Wednesday", "9AM-12PM"),
    ("Wednesday", "3PM-6PM"),

    ("Thursday", "9AM-12PM"),
    ("Thursday", "3PM-6PM"),

    ("Friday", "9AM-12PM"),
    ("Friday", "3PM-6PM"),
]


def generate_exam_timetable(db):

    # clear old timetable
    db.query(Timetable).delete()
    db.commit()

    courses = db.query(Course).all()

    venues = db.query(Venue).all()

    invigilators = db.query(Invigilator).all()

    # largest venue first
    venues.sort(
        key=lambda v: v.capacity,
        reverse=True
    )

    slot_index = 0
    invigilator_index = 0

    generated = []

    for course in courses:

        remaining_students = course.student_count

        if slot_index >= len(TIME_SLOTS):
            break

        exam_day, exam_time = TIME_SLOTS[slot_index]

        for venue in venues:

            if remaining_students <= 0:
                break

            allocated = min(
                remaining_students,
                venue.capacity
            )

            invigilator = invigilators[
                invigilator_index %
                len(invigilators)
            ]

            timetable = Timetable(
                course_id=course.id,
                venue_id=venue.id,
                invigilator_id=invigilator.id,

                allocated_students=allocated,

                exam_day=exam_day,
                exam_time=exam_time,

                status="Scheduled"
            )

            db.add(timetable)

            generated.append(timetable)

            remaining_students -= allocated

            invigilator_index += 1

        slot_index += 1

    db.commit()

    return generated