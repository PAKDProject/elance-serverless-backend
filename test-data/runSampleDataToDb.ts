import { DynamoDB } from 'aws-sdk'


let db = new DynamoDB({
    region: "eu-west-1"
})

let arr = [
    {
        "id": "sad34324-d73fsadas-DAB4GSUS-b801-42069LOL",
        "entity": "user",
        "email": "johnsmith418@email.com",
        "fName": "John",
        "lName": "Smith",
        "dob": "1970-01-01T00:00:00.000Z",
        "summary": "I love Angular and Python. HTML is the most advanced thing i know!",
        "educationItems": [{
            "degreeTitle": "BSc Hons in Computing",
            "startYear": "2016",
            "endYear": "2020",
            "collegeName": "IT Sligo",
            "grade": "A+",
            "description": "Angular JavaScript Python sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros."
        },
        {
            "degreeTitle": "BSc Hons in Computer Science",
            "startYear": "2020",
            "endYear": "2023",
            "collegeName": "IT Sligo",
            "grade": "D-",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros."
        },
        {
            "degreeTitle": "Phd in Business",
            "startYear": "2014",
            "endYear": "2016",
            "collegeName": "IT Sligo",
            "grade": "C",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros."
        }
        ],
        "organisations": [{
            "orgName": "Facebook",
            "email": "zuck@facebook.com",
            "tagline": "### This is Facebook ",
            "websiteUrl": "facebook.com",
            "adminUser": {
                "id": "sad34324-d73fsadas-DAB4GSUS-b801-42069LOL",
                "entity": "user",
                "email": "johnsmith@email.com"
            }
        }],
        "skills": [{
            "skillTitle": "C#",
            "category": "Software"
        },
        {
            "skillTitle": "Python",
            "category": "Software"
        },
        {
            "skillTitle": "HTML",
            "category": "Software"
        }
        ],
        "avatarUrl": "null",
        "backgroundUrl": "null",
        "socialLinks": [{
            "imageUrl": "http://logo.clearbit.com/github.com",
            "url": "http://github.com"
        },
        {
            "imageUrl": "http://logo.clearbit.com/facebook.com",
            "url": "http://facebook.com"
        },
        {
            "imageUrl": "http://logo.clearbit.com/twitter.com",
            "url": "http://twitter.com"
        },
        {
            "imageUrl": "http://logo.clearbit.com/gitlab.com",
            "url": "http://gitlab.com"
        }
        ],
        "tagline": "Software Developer",
        "contacts": [{
            "id": "0e9c26d6-3da5-416c-a2c6-c45b02c4d5b5",
            "entity": "user",
            "fName": "Florentia",
            "lName": "Goss",
            "email": "fgoss4@washingtonpost.com",
            "dob": "10/02/2012",
            "tagline": "Right-sized"
        }],
        "profileCards": [{
            "title": "About Me",
            "type": "bio"
        },
        {
            "title": "Education",
            "type": "edu"
        },
        {
            "title": "Skills",
            "type": "skills"
        },
        {
            "title": "Job History",
            "type": "jobs"
        },
        {
            "title": "Custom Card 1",
            "type": "custom",
            "content": "Custom card body with <h1>MARKDOWN</h1>"
        }
        ],
        "jobHistory": [{
            "id": "0a7d3ef1-00da-4bb9-9d10-61695207f8ca",
            "entity": "job",
            "title": "Product Engineer",
            "employerID": "d813c1eb-d73f-482f-b801-9519b664e706",
            "employerName": "Wordware",
            "description": "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
            "datePosted": "1907-09-08T00:25:21.000Z",
            "dateAccepted": "1906-09-08T00:25:21.000Z",
            "payment": 5629,
            "progress": 100,
            "tags": [{
                "skillTitle": "Business Skills"
            },
            {
                "skillTitle": "C#"
            },
            {
                "skillTitle": "JavaScript"
            },
            {
                "skillTitle": "HTML"
            }
            ]
        },
        {
            "id": "0a7d3ef1-00da-4bb9-9d10-sdadsadasd",
            "entity": "job",
            "title": "Angular Application",
            "employerID": "d813c1eb-d73f-482f-b801-ddddddd",
            "employerName": "Facebook",
            "description": "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
            "datePosted": "1907-09-08T00:25:21.000Z",
            "dateAccepted": "1906-09-08T00:25:21.000Z",
            "payment": 6969,
            "progress": 100,
            "tags": [{
                "skillTitle": "Angular"
            },
            {
                "skillTitle": "Python"
            },
            {
                "skillTitle": "JavaScript"
            },
            {
                "skillTitle": "HTML"
            }
            ]
        }
        ],
        "postedJobs": [{
            "id": "0b9931fe-8dd6-467b-97c9-d7c77d9d3509",
            "entity": "job",
            "title": "VP Marketing",
            "employerName": "John Smith",
            "dateDue": "05/21/2019",
            "employerID": "sad34324-d73fsadas-DAB4GSUS-b801-42069LOL"
        }],
        "activeJobs": [{
            "id": "93a3de47-7bc4-4c91-8963-6e478fc125e5",
            "entity": "job",
            "title": "Senior Quality Engineer",
            "employerName": "Paul Kratz",
            "employerID": "d813c1eb-d73f-482f-b801-9519b664e706",
            "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
            "datePosted": "09/09/2017",
            "dateDue": "05/21/2019",
            "progress": 0
        }]
    },
    {
        "id": "d813c1eb-d73f-482f-b801-9519b664e706",
        "entity": "user",
        "email": "paulkratz@elance.site",
        "fName": "paul",
        "lName": "kratz",
        "dob": "18-12-1995",
        "summary": "Me llamo Paulo, donde esta la mantequilla.",
        "skills": [{
            "skillTitle": "Java",
            "category": "Software"
        },
        {
            "skillTitle": "FORTRAN",
            "category": "Software"
        }
        ],
        "educationItems": [{
            "degreeTitle": "Honours Computing",
            "startYear": "2016",
            "endYear": "2020",
            "collegeName": "IT Sligo",
            "grade": "1st Hons",
            "description": "4 years of padraig"
        }],
        "profileCards": [{
            "title": "About Me",
            "type": "bio"
        },
        {
            "title": "Education",
            "type": "edu"
        },
        {
            "title": "Skills",
            "type": "skills"
        },
        {
            "title": "Job History",
            "type": "jobs"
        },
        {
            "title": "Custom Card 1",
            "type": "custom",
            "content": "Custom card body with <h1>MARKDOWN</h1>"
        }
        ],
        "avatarUrl": "www.facebook/paul",
        "backgroundUrl": "background.png",
        "socialLinks": [{
            "imageUrl": "github",
            "url": "http://github.com"
        },
        {
            "imageUrl": "facebook",
            "url": "http://facebook.com"
        },
        {
            "imageUrl": "twitter",
            "url": "http://twitter.com"
        },
        {
            "imageUrl": "linkedin",
            "url": "http://linkedin.com"
        }
        ],
        "tagline": "My name a paul",
        "postedJobs": [{
            "id": "93a3de47-7bc4-4c91-8963-6e478fc125e5",
            "entity": "job",
            "title": "Senior Quality Engineer",
            "employerName": "Paul Kratz",
            "employerID": "d813c1eb-d73f-482f-b801-9519b664e706",
            "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
            "datePosted": "09/09/2017",
            "dateDue": "05/21/2019",
            "progress": 0
        }],
        "activeJobs": []
    },
    {
        "id": "sad34324-d73fsadas-DAB4SATAN-b801-42069LOL",
        "entity": "user",
        "email": "killiankelly@elance.site",
        "fName": "killian",
        "lName": "kelly",
        "dob": "15-09-1998",
        "summary": "Me llamo Killiana, donde esta la mantequilla.",
        "skills": [{
            "skillTitle": "C#",
            "category": "Software"
        },
        {
            "skillTitle": "Python",
            "category": "Software"
        },
        {
            "skillTitle": "HTML",
            "category": "Software"
        }
        ],
        "educationItems": [{
            "degreeTitle": "Honours Computing",
            "startYear": "2016",
            "endYear": "2020",
            "collegeName": "IT Sligo",
            "grade": "1st Hons",
            "description": "4 years of padraig"
        }],
        "avatarUrl": "www.facebook/killian",
        "backgroundUrl": "background.png",
        "profileCards": [{
            "title": "About Me",
            "type": "bio"
        },
        {
            "title": "Education",
            "type": "edu"
        },
        {
            "title": "Skills",
            "type": "skills"
        },
        {
            "title": "Custom Card 1",
            "type": "custom",
            "content": "Custom card body with <h1>MARKDOWN</h1>"
        }
        ],
        "tagline": "My name a killian"
    },
    {
        "id": "c4041af3-edb5-4a4c-8e8a-f5d8c489a955",
        "entity": "user",
        "fName": "Nina",
        "lName": "Williams",
        "email": "dblaney0@oaic.gov.au",
        "dob": "11/03/2018",
        "tagline": "foreground"
    }, {
        "id": "a0a34fda-56ed-4006-b789-dfbf870c0eb2",
        "entity": "user",
        "fName": "Anna",
        "lName": "Williams",
        "email": "lspeare1@tiny.cc",
        "dob": "19/09/2018",
        "tagline": "real-time"
    }, {
        "id": "eabfc682-964a-48b5-8353-811776c7cf4a",
        "entity": "user",
        "fName": "Josie",
        "lName": "Rizal",
        "email": "srivel2@1und1.de",
        "dob": "15/11/2017",
        "tagline": "policy"
    }, {
        "id": "f9d1acf7-b38a-4d1c-8b40-b30283e69d51",
        "entity": "user",
        "fName": "Lili",
        "lName": "DeRochefort",
        "email": "aollett3@prweb.com",
        "dob": "15/05/2018",
        "tagline": "strategy"
    }, {
        "id": "0e9c26d6-3da5-416c-a2c6-c45b02c4d5b5",
        "entity": "user",
        "fName": "Florentia",
        "lName": "Goss",
        "email": "fgoss4@washingtonpost.com",
        "dob": "10/02/2012",
        "tagline": "Right-sized"
    }, {
        "id": "43797031-ef40-4fdc-9df0-0b0f0737986a",
        "entity": "user",
        "fName": "Julia",
        "lName": "Chang",
        "email": "dtongue5@elegantthemes.com",
        "dob": "15/01/2016",
        "tagline": "background"
    }, {
        "id": "a64998d6-cb0e-466d-a487-51c6ea4ef2ba",
        "entity": "user",
        "fName": "Gabrielle",
        "lName": "Eilers",
        "email": "geilers6@addtoany.com",
        "dob": "19/02/2013",
        "tagline": "system engine"
    }, {
        "id": "1b2d5544-8b04-4a5b-ac5a-5d443a2edbb6",
        "entity": "user",
        "fName": "Barbaraanne",
        "lName": "O'Collopy",
        "email": "bocollopy7@usnews.com",
        "dob": "19/10/2014",
        "tagline": "Pre-emptive"
    }, {
        "id": "1cf746d0-572f-43ad-9b24-6400003f036b",
        "entity": "user",
        "fName": "Sol",
        "lName": "Beinisch",
        "email": "sbeinisch8@ow.ly",
        "dob": "06/02/2018",
        "tagline": "productivity"
    }, {
        "id": "9a8d57dc-ceee-4765-b25b-b99ac02f614d",
        "entity": "user",
        "fName": "Dolli",
        "lName": "Bowers",
        "email": "dbowers9@tmall.com",
        "dob": "03/09/2014",
        "tagline": "intranet"
    }, {
        "id": "e30ac3f8-574f-4c0e-bd47-08e057ec7b2a",
        "entity": "user",
        "fName": "Barny",
        "lName": "Zanni",
        "email": "bzannia@fotki.com",
        "dob": "08/08/2011",
        "tagline": "contextually-based"
    }, {
        "id": "1e6dc15f-090c-4624-880e-94b94b4dae43",
        "entity": "user",
        "fName": "Celestyna",
        "lName": "Fletcher",
        "email": "cfletcherb@com.com",
        "dob": "23/12/2013",
        "tagline": "fault-tolerant"
    }, {
        "id": "5027174b-09d2-4875-a6ba-42840f79d18d",
        "entity": "user",
        "fName": "Dalt",
        "lName": "Dollman",
        "email": "ddollmanc@miibeian.gov.cn",
        "dob": "07/09/2017",
        "tagline": "Graphical User Interface"
    }, {
        "id": "b9934e85-92d5-4358-81da-b1131b56b9e2",
        "entity": "user",
        "fName": "Blaire",
        "lName": "Kidson",
        "email": "bkidsond@bloglovin.com",
        "dob": "30/06/2013",
        "tagline": "zero tolerance"
    }, {
        "id": "62948686-c1fd-4c43-a22e-0658282d578d",
        "entity": "user",
        "fName": "Janeen",
        "lName": "Bines",
        "email": "jbinese@apple.com",
        "dob": "05/03/2018",
        "tagline": "attitude"
    }, {
        "id": "8bb9c76c-552d-486c-891b-bf587867dc0e",
        "entity": "user",
        "fName": "Giacinta",
        "lName": "Needs",
        "email": "gneedsf@un.org",
        "dob": "31/05/2017",
        "tagline": "portal"
    }, {
        "id": "fe998039-e634-4812-ae38-a01db87c8fb0",
        "entity": "user",
        "fName": "Sigvard",
        "lName": "Redmell",
        "email": "sredmellg@soup.io",
        "dob": "19/03/2012",
        "tagline": "Progressive"
    }, {
        "id": "abf4195f-c0c8-4f35-b09b-2877d8e80d50",
        "entity": "user",
        "fName": "Cordie",
        "lName": "Tothe",
        "email": "ctotheh@edublogs.org",
        "dob": "19/09/2017",
        "tagline": "database"
    }, {
        "id": "a53e9af3-54a8-40ee-92a3-7f1394509b81",
        "entity": "user",
        "fName": "Gaby",
        "lName": "Moens",
        "email": "gmoensi@ehow.com",
        "dob": "25/01/2016",
        "tagline": "responsive"
    }, {
        "id": "05a7479a-8745-421c-8ebb-25a451fda1ca",
        "entity": "user",
        "fName": "Chickie",
        "lName": "Claesens",
        "email": "cclaesensj@woothemes.com",
        "dob": "19/10/2011",
        "tagline": "project"
    },
    {
        "id": "0b9931fe-8dd6-467b-97c9-d7c77d9d3509",
        "entity": "job",
        "title": "VP Marketing",
        "employerName": "John Smith",
        "dateDue": "05/21/2019",
        "employerID": "sad34324-d73fsadas-DAB4GSUS-b801-42069LOL",
        "description": "Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
        "datePosted": "10/14/2017",
        "payment": 30000,
        "tags": [{
            "skillTitle": "Marketing"
        },
        {
            "skillTitle": "Business Skills"
        }
        ],
        "applicants": [{
            "id": "d813c1eb-d73f-482f-b801-9519b664e706",
            "entity": "user",
            "email": "paulkratz@paul.com",
            "fName": "paul",
            "lName": "kratz"
        }]
    },
    {
        "id": "93a3de47-7bc4-4c91-8963-6e478fc125e5",
        "entity": "job",
        "title": "Senior Quality Engineer",
        "employerName": "Tazz",
        "employerID": "77b3e033-c63f-4ae9-ba4a-37a5af01c378",
        "location": "Indonesia",
        "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
        "datePosted": "09/09/2017",
        "payment": 23141,
        "dateDue": "05/21/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "Angular"
        },
        {
            "skillTitle": "Python"
        },
        {
            "skillTitle": "JavaScript"
        },
        {
            "skillTitle": "HTML"
        }
        ]
    },
    {
        "id": "3b774947-f361-4b62-b994-e9a84a99d863",
        "entity": "job",
        "title": "Structural Analysis Engineer",
        "employerName": "Oodoo",
        "employerID": "55db8acd-4206-474d-9752-ffcb63eba269",
        "location": "China",
        "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
        "datePosted": "08/23/2017",
        "payment": 37919,
        "dateDue": "09/06/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "Angular"
        },
        {
            "skillTitle": "TypeScript"
        },
        {
            "skillTitle": "JavaScript"
        },
        {
            "skillTitle": "Nodejs"
        }
        ]
    },
    {
        "id": "9eeba864-b8ea-4ea8-9803-7ec67d04501e",
        "entity": "job",
        "title": "Professor",
        "employerName": "Reallinks",
        "employerID": "1c255b71-87f5-4961-ba59-8516abae65dc",
        "location": "China",
        "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        "datePosted": "02/16/2018",
        "payment": 6737,
        "dateDue": "05/19/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "F#"
        },
        {
            "skillTitle": "Python"
        },
        {
            "skillTitle": "CSS"
        },
        {
            "skillTitle": "SASS"
        }
        ]
    },
    {
        "id": "3fe577fb-4680-4c64-a962-86059699781c",
        "entity": "job",
        "title": "Pharmacist",
        "employerName": "Gabspot",
        "employerID": "2c3b090f-6618-4a6a-8264-6e879c26e364",
        "location": "Indonesia",
        "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
        "datePosted": "02/12/2018",
        "payment": 18634,
        "dateDue": "10/08/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "Lua"
        },
        {
            "skillTitle": "R"
        },
        {
            "skillTitle": "Agile"
        },
        {
            "skillTitle": "Kanban"
        }
        ]
    },
    {
        "id": "eb61f947-19fe-409f-af60-508223e104c7",
        "entity": "job",
        "title": "Budget/Accounting Analyst I",
        "employerName": "Shuffletag",
        "employerID": "75d42b3e-1e9b-409c-95c5-4d552045bafc",
        "location": "Greece",
        "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
        "datePosted": "08/05/2017",
        "payment": 9370,
        "dateDue": "03/03/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "React"
        },
        {
            "skillTitle": "C++"
        },
        {
            "skillTitle": "C"
        },
        {
            "skillTitle": "Perl"
        }
        ]
    },
    {
        "id": "8af15026-44ae-4ad3-b7ef-8b1c33d514ae",
        "entity": "job",
        "title": "Office Assistant IV",
        "employerName": "Gigazoom",
        "employerID": "943a65c9-a1ec-4c41-a48a-b8b4c9174a9f",
        "location": "Portugal",
        "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        "datePosted": "05/09/2017",
        "payment": 15630,
        "dateDue": "03/10/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "FORTRAN"
        },
        {
            "skillTitle": "COBOL"
        },
        {
            "skillTitle": "C"
        },
        {
            "skillTitle": "C++"
        }
        ]
    },
    {
        "id": "ee62cad5-eaa6-4ea7-9c3f-4220d335959e",
        "entity": "job",
        "title": "VP Product Management",
        "employerName": "Oyonder",
        "employerID": "390713af-02bc-4f78-a714-e045c29f1a46",
        "location": "Portugal",
        "description": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
        "datePosted": "02/06/2018",
        "payment": 9185,
        "dateDue": "04/17/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "Rust"
        },
        {
            "skillTitle": "Go"
        },
        {
            "skillTitle": "JavaScript"
        },
        {
            "skillTitle": "HTML"
        }
        ]
    },
    {
        "id": "aacb1696-5a67-4071-983b-fea3dc66239f",
        "entity": "job",
        "title": "Senior Financial Analyst",
        "employerName": "Babbleblab",
        "employerID": "831508a6-c586-478c-a302-fb7963ee4f43",
        "location": "Guatemala",
        "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "datePosted": "03/13/2017",
        "payment": 8115,
        "dateDue": "10/04/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "Polymer"
        },
        {
            "skillTitle": "Vue"
        },
        {
            "skillTitle": "Angular"
        },
        {
            "skillTitle": "React"
        }
        ]
    },
    {
        "id": "13993944-0ba5-42e3-96f3-c53ca0cc8f66",
        "entity": "job",
        "title": "Executive Secretary",
        "employerName": "Buzzdog",
        "employerID": "b39421d3-2fd1-40af-b54e-04c845bcf5d6",
        "location": "China",
        "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        "datePosted": "12/20/2017",
        "payment": 46211,
        "dateDue": "05/30/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "JSON"
        },
        {
            "skillTitle": "Lua"
        },
        {
            "skillTitle": "SQL"
        },
        {
            "skillTitle": "MongoDB"
        }
        ]
    },
    {
        "id": "1abc8837-344c-4f0e-adbb-559ea1d111a8",
        "entity": "job",
        "title": "Account Representative IV",
        "employerName": "Layo",
        "employerID": "6cef7918-0deb-4387-97b3-8bebca196569",
        "location": "China",
        "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "datePosted": "02/14/2018",
        "payment": 44371,
        "dateDue": "09/09/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "COBOL"
        },
        {
            "skillTitle": "Assembly"
        },
        {
            "skillTitle": "Monogame"
        },
        {
            "skillTitle": "F#"
        }
        ]
    },
    {
        "id": "6d7430dc-171d-4451-b6ad-9b478818481a",
        "entity": "job",
        "title": "Help Desk Technician",
        "employerName": "Ntags",
        "employerID": "7bd3b6e0-6913-42d0-9495-2b2c13f72d55",
        "location": "Poland",
        "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        "datePosted": "06/06/2017",
        "payment": 44525,
        "dateDue": "02/22/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "Monogame"
        },
        {
            "skillTitle": "Unity"
        },
        {
            "skillTitle": "SignalR"
        },
        {
            "skillTitle": "HTML"
        }
        ]
    },
    {
        "id": "0643ee1d-b679-4827-a8ec-bf10c6c474d8",
        "entity": "job",
        "title": "Structural Engineer",
        "employerName": "Janyx",
        "employerID": "f704cc33-129a-49ac-a449-75f004eadd57",
        "location": "China",
        "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "datePosted": "06/12/2017",
        "payment": 19108,
        "dateDue": "06/22/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": ".NET"
        },
        {
            "skillTitle": "MVC"
        },
        {
            "skillTitle": "Agile"
        },
        {
            "skillTitle": "ASP"
        }
        ]
    },
    {
        "id": "137068d0-c82a-458c-998d-5d8e94aac185",
        "entity": "job",
        "title": "Research Nurse",
        "employerName": "Fatz",
        "employerID": "3db62473-a828-4021-a601-678903373fb9",
        "location": "Indonesia",
        "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        "datePosted": "10/23/2017",
        "payment": 42810,
        "dateDue": "05/27/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "Lua"
        },
        {
            "skillTitle": "Python"
        },
        {
            "skillTitle": "JavaScript"
        },
        {
            "skillTitle": "HTML"
        }
        ]
    },
    {
        "id": "1e74026b-a511-4963-8621-b20263c82452",
        "entity": "job",
        "title": "Actuary",
        "employerName": "Tagtune",
        "employerID": "03cf8916-d7ca-4192-943b-65aff3ec3a23",
        "location": "Russia",
        "description": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
        "datePosted": "09/06/2017",
        "payment": 47789,
        "dateDue": "02/24/2019",
        "progress": 0,
        "tags": [{
            "skillTitle": "Angular"
        },
        {
            "skillTitle": "TypeScript"
        },
        {
            "skillTitle": "NodeJs"
        },
        {
            "skillTitle": "HTML"
        }
        ]
    }
]

arr.forEach(element => {
    let converted = DynamoDB.Converter.marshall(element)
    db.putItem({
        Item: converted,
        TableName: "app-table-dev"
    }, (err, data) => {
        if (err) console.error(err)
        else
            console.log(`Done ${element.id} ${element.entity}`)
    })
})