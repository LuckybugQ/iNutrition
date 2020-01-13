from exts import db

class Admin(db.Model):
    __tablename__ = 'admin'
    Adminaccount = db.Column(db.String(255, 'utf8_general_ci'), primary_key=True)
    Password = db.Column(db.String(255, 'utf8_general_ci'), nullable=False)

class Project(db.Model):
    __tablename__ = 'project'
    ID = db.Column(db.Integer, primary_key=True)
    SNo = db.Column(db.ForeignKey('student.SNo', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True)
    Project = db.Column(db.String(255))
    Award = db.Column(db.String(255))
    Code = db.Column(db.String(255))
    student = db.relationship('Student', primaryjoin='Project.SNo == Student.SNo', backref='projects')

class Student(db.Model):
    __tablename__ = 'student'
    SNo = db.Column(db.String(255, 'utf8_general_ci'), primary_key=True, index=True)
    Avatar = db.Column(db.String(255, 'utf8_general_ci'), index=True)
    SName = db.Column(db.String(255, 'utf8_general_ci'), nullable=False)
    Grade = db.Column(db.String(255, 'utf8_general_ci'), nullable=False)
    Group = db.Column(db.String(255, 'utf8_general_ci'), nullable=False)
    Telephone = db.Column(db.String(255, 'utf8_general_ci'))
    WeChat = db.Column(db.String(255, 'utf8_general_ci'))
    QQ = db.Column(db.String(255, 'utf8_general_ci'))
    MailBox = db.Column(db.String(255, 'utf8_general_ci'))
    Other = db.Column(db.String(255, 'utf8_general_ci'))
    Occupation = db.Column(db.String(255, 'utf8_general_ci'))
    WorkAddress = db.Column(db.String(255, 'utf8_general_ci'))
    Direction = db.Column(db.String(255, 'utf8_general_ci'))
