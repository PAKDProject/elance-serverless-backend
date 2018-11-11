class TableModel {
    userId: string;
    email: string;
    fName: string;
    lName: string;
    phone: string;
    dob: Date;
    summary: string;
    skills: Skill[];
    educationItems: EducationItem[];
    activeJobs: string[];
    jobHistory: string[];
    avatarUrl: string;
    backgroundUrl: string;
    socialLinks: SocialLink[];
    tagline: string;
    contacts: String[];
}

class Skill {
    title: string;
    description: string;
}

class EducationItem {
    degreeTitle: string;
    startYear: string;
    endYear: string;
    collegeName: string;
    grade: string;
    description: string;
}

class SocialLink {
    name: string;
    linkUrl: string;
}
