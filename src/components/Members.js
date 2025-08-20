import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "./Members.css";

const eboard = [
  {
    role: "President",
    name: "Matt Kahn",
    email: "mjk366@cornell.edu",
    year: "2026",
    major: "Applied Economics and Management",
    minors: "",
    involvement: "Startups",
    hobbies: "Weightlifting, Cold Plunges, Reading, Running, and Guitar",
    image: "headshots/MattKahn-Headshot.jpg",
    style: {objectPosition: "center 35%"},
  },
  { role: "VP Recruitment", name: "Dillon Gordon", email: "dkg38@cornell.edu", year: "2026", major: "Nutrition Science/Applied Exercise Science", involvement: "Research at Berry Lab", hobbies: "Running, Weight Lifting, Hiking, Cooking", image: "headshots/DillonGordon-Headshot.jpeg", style: {objectPosition: "center 45%"} },
  { role: "VP NME", name: "Brij Garg", email: "bg473@cornell.edu", year: "2028", major: "Biometry and Statistics", involvement: "Vice President of Big Red Yoga, RA", hobbies: "Basketball, Stand Up Comedy, Public Speaking", image: "headshots/BrijGarg-Headshot.png", style:{objectFit: "contain",  objectPosition: "center bottom", backgroundColor: "rgb(245, 248, 251)", width: "100%", height: "100%"}},
  { role: "VP Prof. Events", name: "Sadie Schnierow", email: "sbs328@cornell.edu", year: "2028", major: "Statistical Science", involvement: "Creme de Cornell, On Tap", hobbies: "Baking, Dance, Crafting", image: "headshots/SadieSchnierow-Headshot.jpeg", style: {objectPosition: "center 35%"} },
  { role: "VP Finance", name: "Noel Blackwell", email: "bwb79@cornell.edu", year: "2028", major: "Economics", involvement: "Social Fraternity, Cornell Capital Club", hobbies: "Golf, F1, Traveling, Reading, Classical Music", image: "headshots/NoelBlackwell-Headshot.jpeg", style: {objectPosition: "center 25%"} },
  { role: "VP Marketing", name: "Samantha Vaca", email: "sv492@cornell.edu", year: "2027", major: "Computer Science/Artificial Intelligence & Business", involvement: "Cornell Data Science, Cornell Filmmaking Society", hobbies: "Computer Animation, Creative Writing, Piano", image: "headshots/SamanthaVaca-Headshot.jpeg", style: {objectPosition: "center 45%"} },
  { role: "VP SBC", name: "Mihir Kulshreshtha", email: "mk2664@cornell.edu", year: "2028", major: "Computer Science/Artificial Intelligence & Statistics", involvement: "Cornell Data science, Cornell Bhangra, ACSU", hobbies: "Love to workout and run, Listen to Drake or Punjabi music, Hang out with friends", image: "headshots/MihirKulshreshtha-Headshot.jpeg", style: {objectPosition: "center 50%"} },
  { role: "VP Brotherhood", name: "Finn Clancy", email: "fac49@cornell.edu", year: "", major: "", involvement: "", hobbies: "", image: "headshots/default-icon.jpg", style: {objectPosition: "center 10%"}},
  { role: "VP Prof. Connects", name: "Hongjin Fang", email: "hf355@cornell.edu", year: "", major: "", involvement: "", hobbies: "", image: "headshots/HongjinFang-Headshot.jpg", style: {objectPosition: "center 20%"} },
  { role: "VP Philanthropy", name: "Shannon Lin", email: "sl3454@cornell.edu", year: "2028", major: "Computer Science/Business", involvement: "Big Red Hacks, Women in Computing", hobbies: "Skiing, Music, Crocheting, Swim", image: "headshots/ShannonLin-Headshot.JPG", style: {objectPosition: "center 40%"} },
];

const brotherhood = [
  {
    className: "Zeta Class",
    members: [
      { name: "Ellie Park", email: "egp39@cornell.edu", year: "2026", major: "AEM/Fashion", involvement: "Cornell Fashion Collective", hobbies: "Fashion Design, Thrifting, Cooking, Spikeball", image: "headshots/ElliePark-Headshot.jpeg", style: {objectPosition: "center 70%"} },
    ],
  },
  {
    className: "Eta Class",
    members: [
      {name: "Matt Kahn", email: "mjk366@cornell.edu", year: "2026", major: "Applied Economics and Management", minors: "", involvement: "Startups", hobbies: "Weightlifting, Cold Plunges, Reading, Running, and Guitar", image: "headshots/MattKahn-Headshot.jpg", style: {objectPosition: "center 35%"}},
      { name: "Ava Grace Sannino", email: "acs329@cornell.edu", year: "2026", major: "Viticulture & Enology/Business", involvement: "Sailing, CALS Ambassadors, Big Red Yoga, Splash", hobbies: "Wine Making, Cooking, Baking, Knitting, Lifting, Yoga", image: "headshots/AvaGraceSannino-Headshot.jpeg", style: {objectPosition: "center 10%"} },
    ],
  },
  {
    className: "Theta Class",
    members: [
      {name: "Ena Kovac", email: "ehk75@cornell.edu", year: "2026", major: "Computer Science/Artificial Intelligence", involvement: "FGI, ORIE Research, Study Abroad, SWE", hobbies: "Running, Hiking, Snowboarding, Coffee, Traveling", image: "headshots/EnaKovac-Headshot.jpeg", style: {objectPosition: "center 35%"}},
      {name: "Luis Henrique Hermann", email: "lch88@cornell.edu", year: "2026", major: "Economics/Business/Real Estate/Entrepreneurship", involvement: "Cornell Global Business Club", hobbies: "Golf, Soccer, Volleyball, F1, Gaming", image: "headshots/LuisHenriqueHermann-Headshot.jpeg", style: {objectPosition: "center 30%"} },
      {name: "Samuel Iradukunda", email: "is336@cornell.edu", year: "2026", major: "Agricultural and Information Science/Business", involvement: "Mushroom Club, Cornell Cru, WCC", hobbies: "The Outdoors, Traveling, Music, Religion, Photography", image: "headshots/SamuelIradukunda-Headshot.jpeg", style: {objectPosition: "center 70%"} },
      {name: "Samantha Chang", email: "sjc333@cornell.edu", year: "2026", major: "Chemical Engineering/Business", involvement: "Social Sorority, Cornell Concrete Canoe, Theta Tau, SWE", hobbies: "Baking, Fitness, Socializing", image: "headshots/SamanthaChang-Headshot.jpeg", style: {objectPosition: "center 70%"} },
    ],
  },
  {
    className: "Iota Class",
    members: [
      {name: "Katie Perlitz", email: "kap256@cornell.edu", year: "2026", major: "Information Science, Systems, and Technology/Business", involvement: "Big Red Sports Network, Women’s Club Basketball, Women’s Club Lacrosse, Social Sorority, Film Club", hobbies: "Sports graphic design, Running, Lifting, Podcasts, Skiing, Web Development", image: "headshots/KatiePerlitz-Headshot.jpeg", style: {objectPosition: "center 25%"}},
      {name: "Tamara Kasikovic", email: "tk648@cornell.edu", year: "2027", major: "Computer Science and Statistics", involvement: "Student Agencies, Cornell Data Science, Cornell Center for Teaching Innovation, Paragon Global Investments", hobbies: "Volleyball, Exploring cities, Lacrosse, Concerts", image: "headshots/TamaraKasikovic-Headshot.jpeg", style: {objectPosition: "center 10%"} },
      {name: "Valeria Enciso", email: "ve37@cornell.edu", year: "2026", major: "Operations Research (ORIE) major/Data Science", involvement: "Cornell Business Analytics, Cornell International Students Association, Academic Excellence Workshop Facilitator", hobbies: "Watching movies, Cooking, Working out, Coffee", image: "headshots/ValeriaEnciso-Headshot.jpeg", style: {objectPosition: "center 70%"} },
      {name: "Liesel Wong", email: "lyw8@cornell.edu", year: "2026", major: "Computer Science", involvement: "CUSD, BigRedHacks, Cornell AAIV", hobbies: "Pickleball, Rock Climbing Embroidery, Yapping", image: "headshots/LieselWong-Headshot.jpeg", style: {objectPosition: "center 40%"} },
      {name: "Dillon Gordon", email: "dkg38@cornell.edu", year: "2026", major: "Nutrition Science/Applied Exercise Science", involvement: "Research at Berry Lab", hobbies: "Running, Weight Lifting, Hiking, Cooking", image: "headshots/DillonGordon-Headshot.jpeg", style: {objectPosition: "center 45%"} },
      {name: "Aaron Zhu", email: "az394@cornell.edu", year: "2026", major: "Economics/Computer Science and Entrepreneurship", involvement: "Social Enterprise Group at Cornell, Cornell Chamber Music, Cornell Spikeball Club", hobbies: "Violin, Guitar, Basketball, Poker", image: "headshots/AaronZhu-Headshot.jpeg", style: {objectPosition: "center 45%"} },
    ],
  },
    {
    className: "Kappa Class",
    members: [
      {name: "Shannon Lin", email: "sl3454@cornell.edu", year: "2028", major: "Computer Science/Business", involvement: "Big Red Hacks, Women in Computing", hobbies: "Skiing, Music, Crocheting, Swim", image: "headshots/ShannonLin-Headshot.JPG", style: {objectPosition: "center 40%"} },
      {name: "Ten Takeda", email: "tt585@cornell.edu", year: "2026", major: "Business Management", involvement: " eLab 2024/25 Cohort", hobbies: "Fitness, Soccer, Travelling, Fashion", image: "headshots/TenTakeda-Headshot.jpeg", extra: "Currently Abroad", style: {objectPosition: "center 30%"} },
      {name: "Ezana Kavuma", email: "ekk62@cornell.edu", year: "2028", major: "Computer Science/Economics", involvement: "Enterprise in Cornell, Alpha Fund Finance", hobbies: "Personal venture, Gym, Chess", image: "headshots/EzanaKavuma-Headshot.jpeg", style: {objectPosition: "center 40%"} },
      {name: "Kyan Rosenthal", email: "kr568@cornell.edu", year: "2028", major: "Hotel Administration", involvement: "Hotel Ezra Cornell, Social Fraternity, Statler Hotel", hobbies: "Volleyball, Hiking, Spikeball, Tennis", image: "headshots/KyanRosenthal-Headshot.jpeg", style: {objectPosition: "center 30%"} },
      {name: "Sadie Schnierow", email: "sbs328@cornell.edu", year: "2028", major: "Statistical Science", involvement: "Creme de Cornell, On Tap", hobbies: "Baking, Dance, Crafting", image: "headshots/SadieSchnierow-Headshot.jpeg", style: {objectPosition: "center 35%"} },
      {name: "Colin O'Brien", email: "cao82@cornell.edu", year: "2027", major: "ILR/Entrepreneurship & Business", involvement: "Hockey", hobbies: "Travel, Cars, Sports", image: "headshots/ColinOBrien-Headshot.jpg", style:{objectFit: "contain",  objectPosition: "center bottom", backgroundColor: "rgb(255, 255, 255)", width: "100%", height: "100%"} },
      {name: "Samantha Vaca", email: "sv492@cornell.edu", year: "2027", major: "Computer Science/Artificial Intelligence & Business", involvement: "Cornell Data Science, Cornell Filmmaking Society", hobbies: "Computer Animation, Creative Writing, Piano", image: "headshots/SamanthaVaca-Headshot.jpeg", style: {objectPosition: "center 45%"} },
      {name: "Cion Kim", email: "ck758@cornell.edu", year: "2027", major: "Mechanical Engineering and Computer Science", involvement: "Cornell Electric Vehicles, Space System Design Studio, Student Assembly, Social Enterprise at Cornell, International Student Union", hobbies: "Doing engineering projects, Musicals, Golfing", image: "headshots/CionKim-Headshot.jpeg", style: {objectPosition: "center 50%"} },
      {name: "Anisha Roy", email: "ar2429@cornell.edu", year: "2027", major: "Biomedical Engineering", involvement: "Cornell Bhangra, Engineering World Health, Globemed", hobbies: "Hiking, Coffee, Photography, Dance", image: "headshots/AnishaRoy-Headshot.jpg", style: {objectPosition: "center 30%"} },
      {name: "Polly Parsons", email: "prp66@cornell.edu", year: "2027", major: "AEM/Entrepreneurship", involvement: "Varsity Field Hockey, Dyson Student Ambassador", hobbies: "Rock Climbing, Breakdancing, Art, Camping, Hack-A-Thons, Water Sports", image: "headshots/PollyParsons-Headshot.jpeg", extra: "Currently Abroad", style: {objectPosition: "center 45%"} },
      {name: "Alexander Zhang", email: "abz4@cornell.edu", year: "2027", major: "Physics & Economics/Computer Science", involvement: "Cornell Speech and Debate, International Students Association, Cornell Sustainable Design", hobbies: "Basketball, Poetry, Journaling, Walking", image: "headshots/AlexanderZhang-Headshot.jpg", style: {objectPosition: "center 0%"} },
    ],
  },
];

const alumni = [
  { name: "Dylan Seale", email: "dms484@cornell.edu", year: "2025", major: "AEM", involvement: "Student Agencies, Ski Club, Skateboarding Club", hobbies: "Skateboarding, Skiing", image: "headshots/DylanSeale-Headshot.jpeg", style: {objectPosition: "center 50%"} },
  { name: "Jack Lowe", email: "jrl373@cornell.edu", year: "2025", major: "Human Biology, Health, and Society", involvement: "Social Fraternity, PATCH", hobbies: "3D Printing, Camping, Med Tech", image: "headshots/JackLowe-Headshot.jpeg", style: {objectPosition: "center 50%"} },
  { name: "Conrad Hamilton", email: "clh279@cornell.edu", year: "2025", major: "AEM", involvement: "Orientation Leader, Cornell Tradition, Social Fraternity", hobbies: "Surfing, Free Diving, Skateboard", image: "headshots/ConradHamilton-Headshot.jpeg", style: {objectPosition: "center 20%"} },
  { name: "Lara Kulkarni", email: "lk427@cornell.edu", year: "2025", major: "Computer Science/Entrepreneurship", involvement: "Woman in Computing", hobbies: "Traveling, Music, Photography, Reading, Flute, Rowing", image: "headshots/LaraKulkarni-Headshot.jpeg", style: {objectPosition: "center 50%"} },
  { name: "Jailene Sinchi", email: "jes559@cornell.edu", year: "2025", major: "Biology and Society/Psychology and Spanish", involvement: "Rho Psi Eta, Cornell Red Cross", hobbies: "Running, Reading", image: "headshots/JaileneSinchi-Headshot.jpeg", style: {objectPosition: "center 70%"} },
  { name: "Margaux Rawson", email: "mar435@cornell.edu", year: "2025", major: "Communication/Business", involvement: "Track, SAAC", hobbies: "Baking, Karaoke, Painting", image: "headshots/MargauxRawson-Headshot.jpeg", style: {objectPosition: "center 70%"} },
  { name: "Maria Guzman", email: "mg2422@cornell.edu", year: "2025", major: "AEM/Information Science", involvement: "SWIB, Social Sorority", hobbies: "Tennis, Skiing", image: "headshots/MariaGuzman-Headshot.jpeg", style: {objectPosition: "center 15%"} },
  { name: "Kaitlyn Clarke", email: "kjc245@cornell.edu", year: "2025", major: "Policy Analysis and Management/Business and Law", involvement: "Social Sorority", hobbies: "Outdoor excursions, Jazz clubs, Peanut butter, Running, Snowboarding", image: "headshots/KaitlynClarke-Headshot.jpeg", style: {objectPosition: "center 0%"} },
  { name: "Charli Stewart", email: "cks74@cornell.edu", year: "2025", major: "Animal Science", involvement: "Track, Dairy Science Club, Intergroup Dialogue Project", hobbies: "Baking, Etch-A-Sketch, Making Cartoon Characters, DIY Projects", image: "headshots/CharliStewart-Headshot.jpeg", style: {objectPosition: "center 30%"} },
  { name: "Madelyn Packer", email: "mmp234@cornell.edu", year: "2025", major: "Human Biology, Health & Society/Business, Health and Classics", involvement: "Track, PATCH, Women of Color in Athletics", hobbies: "Traveling, Creating Media & Graphics, Food Photography, Music", image: "headshots/MadelynPacker-Headshot.jpeg", style: {objectPosition: "center 35%"} },
  { name: "Annesh Ghosh Dastidar", email: "ag835@cornell.edu", year: "2025", major: "Computer Science and Operations Research", involvement: "CU Solar Boat, Cornell FinTech Club", hobbies: "Badminton, Chess, Soccer", image: "headshots/AnneshGhoshDastidar-Headshot.jpeg", style: {objectPosition: "center 40%"} },
  { name: "Monica Lee", email: "myl42@cornell.edu", year: "2025", major: "Hotel Administration/Information Science", involvement: "Leading Women of Tomorrow, HEC, TEDxCornell", hobbies: "Reading, Writing Screenplays, Product Designing, Cooking, Pilates", image: "headshots/MonicaLee-Headshot.jpeg", style: {objectPosition: "center 30%"} },
  { name: "Jack Lagerstrom", email: "jel348@cornell.edu", year: "2025", major: "AEM/Real Estate", involvement: "Men’s Ice Hockey, Real Estate Club", hobbies: "Investing, Fitness, Technology, Cars, Music", image: "headshots/JackLagerstrom-Headshot.jpeg", style:{objectFit: "contain",  objectPosition: "center bottom", backgroundColor: "rgb(202, 195, 192)", width: "100%", height: "100%"} },
];

function MemberCard({
  role,
  name,
  email,
  year,
  major,
  minors,
  involvement,
  hobbies,
  image,
  extra,
  showRole = false,
  style,
}) {
  return (
    <article className="m-card">
      <div className="m-card-media">
        <img src={image} style={style} alt={name} loading="lazy" />
      </div>
      <div className="m-card-body">
        {showRole && (
          <p className="m-role">
            <strong>{role}</strong>
          </p>
        )}
        {extra && (
          <p className="member-extra">
            {extra}
          </p>
        )}
        <p className="m-name"><strong>{name}</strong></p>
        <p className="m-email-line">{email}</p>
        <p className="m-line"><span>Year:</span> {year}</p>
        <p className="m-line"><span>Major/Minor:</span> {major}{minors ? `; ${minors}` : ""}</p>
        <p className="m-line"><span>Involvements:</span> {involvement}</p>
        <p className="m-line"><span>Hobbies:</span> {hobbies}</p>
        <a className="m-btn" href={`mailto:${email}`}>Contact</a>
      </div>
    </article>
  );
}

export default function Members() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  return (
    <div className="members-page">

      {/* HERO */}
      <section className="m-hero">
        <div className="m-hero-clip">
          <img src="images/IMG_3070.jpg" alt="Members hero" className="m-hero-img" />
          <div className="m-hero-content">
            <h1>Our Members</h1>
            <p>Get to know all of our wonderful members!</p>
          </div>
          <svg className="m-hero-outline" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline points="-1,85 50,100 101,85" fill="none" stroke="#d62828" strokeWidth="35" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </section>

      <main className="m-container">
        {/* E-BOARD */}
        <h2 className="m-section-title">E-Board</h2>
        <div className="m-card-grid">
          {eboard.map((m, i) => (
            <MemberCard key={`e-${i}`} {...m} showRole />
          ))}
        </div>

        <hr className="m-divider" />

        {/* BROTHERHOOD */}
        <h2 className="m-section-title">Brotherhood</h2>
        {brotherhood.map((group, gi) => (
          <section className="m-class-block" key={gi}>
            <h3 className="m-class-title">{group.className}</h3>
            <div className="m-card-grid">
              {group.members.map((m, i) => (
                <MemberCard key={`${group.className}-${i}`} {...m} />
              ))}
            </div>
          </section>
        ))}

        <hr className="m-divider" />

        {/* ALUMNI */}
        <h2 className="m-section-title">Alumni</h2>
        <div className="m-card-grid">
          {alumni.map((m, i) => (
            <MemberCard key={`a-${i}`} {...m} />
          ))}
        </div>
      </main>
    </div>
  );
}
