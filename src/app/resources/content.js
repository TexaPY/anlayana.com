import { InlineCode } from "@/once-ui/components";
import { display } from "./config";
import { title } from "process";

const person = {
  firstName: "Texa",
  lastName: "Mido",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Anlayana.com Owner",
  avatar: "/images/avatar.jpg",
  texapp: "/images/texa.jpg",
  midopp: "/images/mido.jpg",
  location: "Europe/Istanbul", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Türkçe"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to Anlayana.com Newsletter</>,
  description: (
    <>You can subscribe for new projects and updates on existing projects.</>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "Mido GitHub",
    icon: "github",
    link: "https://github.com/Mid0aria",
  },
  {
    name: "Texa GitHub",
    icon: "github",
    link: "https://github.com/TexaPY",
  },

  {
    name: "Email",
    icon: "email",
    link: "mailto:texapy@proton.me",
  },
];

const texasocial = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts

  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/TexaPY",
  },

  {
    name: "Email",
    icon: "email",
    link: "mailto:texapy@proton.me",
  },
];

const midosocial = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "Mido GitHub",
    icon: "github",
    link: "https://github.com/Mid0aria",
  },

  {
    name: "Email",
    icon: "email",
    link: "mailto:midomail@sexmail.com",
  },
];

const home = {
  label: "Home",
  title: `Anlayana.com`,
  description: `Development and design projects by Anlayana.com`,
  headline: <>Anlayana.com Development. </>,
  subline: (
    <>
      a <InlineCode>MİDO YAZARSIN BURAYI</InlineCode> a
    </>
  ),
};

const about = {
  label: "About",
  title: "About Us",
  description: `Meet Texa or Mido`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/anlayanademe/30min",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: <>ekle mido</>,
  },
  work: {
    display: true, // set to false to hide this section
    title: "Bisiler ekle iste",
    experiences: [
      {
        company: "yaz projeleri",
        timeframe: "2018 - 2022",
        role: "Ekle  bisiler",
        achievements: [<>burayıda yaz mido</>],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "görünmüyo zaten",
        description: <>valla görünmüyo</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Buraya da işte hizmet verilecek dilleri ekleyiver",
        description: <>Ondan iste mido</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const repos = {
  label: "Repositories",
  title: "Texa & Mido Github Repositories",
  description: ``,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "Our Projects",
  description: `Design and dev projects by Anlayana.com`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const texa = {
  label: "Texa",
  title: "About Texa",
  description: `Meet Texa, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },

  intro: {
    display: true,
    title: "Introduction",
    description: <>Aposun Yeri</>,
  },

  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Karel Electronics",
        timeframe: "2023 - 2023",
        role: "Intern",
        achievements: [
          <>
            I did my internship in the radar electronic warfare and intelligence
            department at Karel defense industry production center.
          </>,
          <>
            During my internship, I learned how to inspect PCB boards using
            X-ray, how to test PCBs, how to perform SMD assembly on PCBs, and
            how to carry out mechanical assembly.
          </>,
        ],
        images: [],
      },

      {
        company: "Discord",
        timeframe: "2020 - Present",
        role: "Active Bot Developer",
        achievements: [<>Buraya işte ne yaptıkalrını yaz</>],
        images: [
          // baba git buraya resim yerine botlar için sayfa aç koy buraya
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Zero Bot",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },

  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Database",
        description: <>Firebase, MongoDB, MySQL </>,
      },
      {
        title: "Languages",
        description: (
          <>JavaScript, TypeScript, Python, C+, CSS 3, HTML 5, Markdown </>
        ),
      },
      {
        title: "Systems",
        description: (
          <>Android, Windows, Kali Linux, Debian, Ubuntu, Raspberry Pi OS</>
        ),
      },
      {
        title: "SBC - Single Board Computers",
        description: (
          <>Arduino, STM, Raspberry Pi, Nvidia Jetson, LattePanda Sigma</>
        ),
      },
    ],
  },
};

const mido = {
  label: "Mido",
  title: "About Mido",
  description: `Meet Mido, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },

  intro: {
    display: true,
    title: "Introduction",
    description: <>Midosun Yeri</>,
  },

  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "",
        timeframe: "",
        role: "",
        achievements: [<>a</>, <>a</>],
        images: [],
      },

      {
        company: "Discord",
        timeframe: "2017 - Present",
        role: "Active Bot Developer",
        achievements: [<>Buraya işte ne yaptıkalrını yaz</>],
        images: [
          // baba git buraya resim yerine botlar için sayfa aç koy buraya
          {
            src: "/images/projects/project-01/?-01.jpg",
            alt: "Zero Bot",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Discord",
        timeframe: "2017 - Present",
        role: "Active SelfBot Developer",
        achievements: [<>OwO Farm Bot Stable</>],
        images: [
          // baba git buraya resim yerine botlar için sayfa aç koy buraya
          {
            src: "/images/projects/project-01/sex.jpg",
            alt: "OwO Farm Bot Stable",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },

  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Database",
        description: <>MySQL, MongoDB, SQLITE </>,
      },
      {
        title: "Languages",
        description: (
          <>Java, JavaScript, Python, C#, CSS 3, HTML 5, Markdown </>
        ),
      },
      {
        title: "Systems",
        description: (
          <>Android, Windows, Kali Linux, Debian, Ubuntu, Raspberry Pi OS</>
        ),
      },
      {
        title: "SBC - Single Board Computers",
        description: (
          <>Arduino, STM, Raspberry Pi, Nvidia Jetson, MVP DMA Card</>
        ),
      },
    ],
  },
};

const servers = {
  label: "Our Servers",
  title: "Anlayana.com Servers",
  description: `Collection by ${person.firstName} & ${person.lastName}`,
  // Images from https://pexels.com
  images: [],
};

export {
  person,
  midosocial,
  texasocial,
  social,
  texa,
  mido,
  newsletter,
  home,
  about,
  repos,
  work,
  servers,
};
