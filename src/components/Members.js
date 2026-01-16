import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "./Members.css";
//import { Helmet } from "react-helmet-async";
//import { useLocation } from "react-router-dom";

const eboard = [
  {
    role: "President",
    name: "Sadie Schnierow",
    email: "sbs328@cornell.edu",
    year: "2028",
    major: "Information Science/Business Minor",
    minors: "",
    involvement: "Créme de Cornell, Social Sorority, On Tap",
    hobbies: "Food, Design, Jazz",
    image: "headshots-fall2025/SadieSchnierow-Headshot.jpg",
    style: {objectPosition: "center 35%"},
  },
  { role: "VP Recruitment", name: "Krish Patel", email: "kdp57@cornell.edu", year: "2028", major: "Finance/Entrepreneurship & Real Estate", involvement: "South Asian Business Association, Cornell Real Estate Club, Society for India, Sitara @ Cornell, Cornell Poker Club", hobbies: "Traveling, Fishing, Pickleball/Basketball, Tampa Bay Buccaneers, Poker/Blackjack, Real Estate", image: "headshots/KrishPatel-Headshot.png", style: {objectPosition: "center 35%"} },
  { role: "VP NME", name: "Pradhi Pakkeraki", email: "sp2362@cornell.edu", year: "2027", major: "Computer Science/Data Science", involvement: "Cornell Speech & Debate, Armada, Engineers Without Borders, Cornell Sitara", hobbies: "Cooking, Cars, Gardening, AgriTech", image: "headshots-fall2025/PradhiPakkerakari.png", style:{objectPosition: "center 30%"}},
  { role: "VP NME", name: "Julius Behner", email: "jpb385@cornell.edu", year: "2029", major: "ECE or CS", involvement: "Hall Council, Independent Projects", hobbies: "Reading, Coding, Debate, Practical Jokes", image: "headshots/JuliusBehner-Headshot.jpg", style: {objectPosition: "center 35%"} },
  { role: "VP Professional Events", name: "Alix Martini", email: "ahm258@cornell.edu", year: "2028", major: "Biomedical Engineering & Entrepreneurship", involvement: "Cornell DEBUT, International Students Association, Triathlon Club, Big Red Sports Network", hobbies: "Sailing, Running, Cooking, Yogurt Bowls, Hiking, Matcha, Swimming", image: "headshots/default-icon.jpg", style: {objectPosition: "center 35%"} },
  { role: "VP Finance", name: "Noel Blackwell", email: "bwb79@cornell.edu", year: "2028", major: "Economics", involvement: "Social Fraternity, Capital Club", hobbies: "Golf, Music, Reading", image: "headshots-fall2025/NoelBlackwell-Headshot.jpg", style: {objectPosition: "center 55%"} },
  { role: "VP Marketing", name: "Samantha Vaca", email: "sv492@cornell.edu", year: "2027", major: "Computer Science/Artificial Intelligence & Business", involvement: "Cornell Data Science, Cornell Filmmaking Society", hobbies: "Computer Animation, Creative Writing, Piano & Guitar", image: "headshots-fall2025/SamanthaVaca-Headshot.jpeg", style: {objectPosition: "center 35%"} },
  { role: "VP SBC", name: "Matt Kahn", email: "mjk366@cornell.edu", year: "2026", major: "AEM", involvement: "ENT is a religion.", hobbies: "Weightlifting, Cold Plunges, Reading, Running, and Guitar (and Entrepreneurship)", image: "headshots-fall2025/MatthewKahn-Headshot.jpeg", style: {objectPosition: "center 35%"}},
  { role: "VP Brotherhood", name: "Jad Alsouss", email: "ja895@cornell.edu", year: "2029", major: "AEM", involvement: "Cornell Pickleball Club", hobbies: "UFC, Pickleball, Travis Scott, Cooking/Grilling", image: "headshots/JadAlsouss-Headshot.JPG", style: {objectPosition: "center 35%"} },
  { role: "VP Professional Connects", name: "Diya Sheth", email: "ds2457@cornell.edu", year: "2026", major: "Mechanical Engineering & Entrepreneurship", involvement: "Cornell Assistive Technologies, Startup Consulting at Cornell, Society of Women Engineers", hobbies: "Swimming, Traveling, Robotics, Cafe Hopping", image: "headshots/DiyaSheth-Headshot.png", style: {objectPosition: "center 35%"} },
  { role: "VP Philanthropy", name: "Mahin Hardaway", email: "mh2584@cornell.edu", year: "2028", major: "Hotel Administration & Hospitality", involvement: "Mosaic Hospitality Association, Diverse Leaders for Tomorrow, Cornell Rock Climbing Club", hobbies: "Baking, Running, Computer Science, Social Consulting", image: "headshots-fall2025/MahinHardaway-Headshot.jpg", style: {objectPosition: "center 30%"} },
  { role: "Social Media Chair", name: "Brooke Wilcox", email: "bmw252@cornell.edu", year: "2028", major: "ILR", involvement: "Cornell Fashion Collective, Alpha Xi Delta", hobbies: "Running, Skiing, Baking, Music, Driving", image: "headshots/BrookeWilcox-Headshot.jpeg", style: {objectPosition: "center 35%"} },
  { role: "Website Coordinators", name: "Neha Patil", email: "nhp36@cornell.edu", year: "2028", major: "Computer Science, Business", involvement: "Cornell Business Analytics, South Asian Business Association, Engineers Without Borders, Pi Beta Phi", hobbies: "DJing, Cooking, Listening to Rap & R&B", image: "headshots-fall2025/NehaPatil-Headshot.png", style:{objectPosition: "center 30%"}},
  { role: "Website Coordinators", name: "Shannon Lin", email: "sl3454@cornell.edu", year: "2028", major: "Computer Science/Business", involvement: "Cornell Assistive Technologies, BigRed\\Hacks,  Club Swim, Cornell Sun, Curious Cardinals Representative", hobbies: "Gourmet dining, crocheting, ski, gardening, robotic fabrication, travel, accessibility", image: "headshots-fall2025/ShannonLin-Headshot.jpeg", style: {objectPosition: "center 40%"} },
  { role: "Director of Alumni Relations", name: "Kyan Rosenthal", email: "kr568@cornell.edu", year: "2028", major: "Hospitality Administration/Entrepreneurship", involvement: "Hotel Ezra Cornell, Social fraternity, Individual startup project, Ivy League Nordic Society, AHLA", hobbies: "Traveling to every national park, Spikeball, Volleyball, Country Music", image: "headshots-fall2025/KyanRosenthal-Headshot.jpg", style: {objectPosition: "center 25%"} },
  { role: "Sponsorships Coordinator", name: "Finn Clancy", email: "fac49@cornell.edu", year: "2027", major: "Biology & Society/Entrepreneurship", involvement: "ENT, Reis Tennis Center, Biotech off Campus Job", hobbies: "Tennis, Traveling, Weightlifting, Cooking, and Collecting Coins", image: "headshots-fall2025/FinnClancy-Headshot.jpg", style:{objectPosition: "center 30%"}},
];

const brotherhood = [
  {
    className: "Zeta Class",
    members: [
      { name: "Ellie Park", email: "egp39@cornell.edu", year: "2026", major: "AEM/Fashion", involvement: "Cornell Fashion Collective, Alpha Xi Delta", hobbies: "Fashion Design, Spikeball, Tennis, Jazz Music", image: "headshots-fall2025/ElliePark-Headshot.JPG", style: {objectPosition: "center 50%"} },
    ],
  },
  {
    className: "Eta Class",
    members: [
      {name: "Matt Kahn", email: "mjk366@cornell.edu", year: "2026",  major: "AEM", minors: "", involvement: "ENT is a religion.", hobbies: "Weightlifting, Cold Plunges, Reading, Running, and Guitar (and Entrepreneurship)", image: "headshots-fall2025/MatthewKahn-Headshot.jpeg", style: {objectPosition: "center 35%"}},
      { name: "Ava Grace Sannino", email: "acs329@cornell.edu", year: "2026", major: "Viticulture & Enology/Applied Economics & Management and Food Science", involvement: "Big Red Yoga President, CUVEC Secretary, CU Cuvée Blind Wine Tasting Society, Cornell Tradition Fellow, Varsity Sailing, CALS Ambassador, Statler Hotel Wine Stewardess, Christian Union Worship Lead", hobbies: "Guitar, Sailing, and Making Wine", image: "headshots-fall2025/AvaGraceSannino-Headshot.jpeg", style: {objectPosition: "center 35%"} },
    ],
  },
  {
    className: "Theta Class",
    members: [
      {name: "Ena Kovac", email: "ehk75@cornell.edu", year: "2026", major: "Computer Science/Artificial Intelligence", involvement: "FGI, ORIE Research, Study Abroad, SWE", hobbies: "Running, Hiking, Snowboarding, Coffee, Traveling", image: "headshots/EnaKovac-Headshot.jpeg", style: {objectPosition: "center 35%"}},
      {name: "Luis Henrique Hermann", email: "lch88@cornell.edu", year: "2026", major: "Economics and Business", involvement: "Cornell Global Business", hobbies: "Golf, Soccer, Volleyball, F1, Gaming", image: "headshots/LuisHenriqueHermann-Headshot.jpeg", style: {objectPosition: "center 30%"} },
      {name: "Samuel Iradukunda", email: "is336@cornell.edu", year: "2026", major: "Agricultural Sciences/Business & Global Development", involvement: "Cru Cornell, Mushroom Club, We Care for Children, and More!", hobbies: "Hiking and Entrepreneurship ", image: "headshots-fall2025/SamuelIradukunda-Headshot.jpeg", style: {objectPosition: "center 25%"} },
      {name: "Samantha Chang", email: "sjc333@cornell.edu", year: "2026", major: "Chemical Engineering", involvement: "Alpha Xi Delta, Research at the Hybrid Body Lab", hobbies: "Beauty, Fashion, Fitness & Baking!", image: "headshots/SamanthaChang-Headshot.jpeg", style: {objectPosition: "center 70%"} },
      {name: "Andria Cao", email: "ac2926@cornell.edu", year: "2027", major: "Hotel Administration/Fashion Studies", involvement: "Grub Ventures, Medium Design Collective", hobbies: "Hiking, Hot Sauce, Pottery, Fashion", image: "headshots-fall2025/AndriaCao-Headshot.JPG", style: {objectPosition: "center 20%"} },
    ],
  },
  {
    className: "Iota Class",
    members: [
      {name: "Katie Perlitz", email: "kap256@cornell.edu", year: "2026", major: "Information Science, Systems, and Technology", involvement: "Social Sorority, Cornell Women's Club Lacrosse and Club Basketball, Big Red Sports Network", hobbies: "Fitness/Hyrox, Graphic Design, Sports Media, Frontend Development, Coffee Shops, Podcasts", image: "headshots-fall2025/KatiePerlitz-Headshot.jpg", style: {objectPosition: "center 25%"}},
      {name: "Tamara Kasikovic", email: "tk648@cornell.edu", year: "2027", major: "Computer Science and Statistics", involvement: "Cornell Data Science, Student Agencies", hobbies: "Matcha, Concerts, Beach Volleyball", image: "headshots-fall2025/TamaraKasikovic-Headshot.JPG", style: {objectPosition: "center 10%"} },
      {name: "Valeria Enciso", email: "ve37@cornell.edu", year: "2026", major: "Operations Research Engineering", involvement: "Cornell Business Analytics, Academic Excellence Workshop Facilitator, Teaching Assistant, International Students Association", hobbies: "Cooking, International travel, Working out, Running, Watching TV, Perfumes, Flower Arrangements", image: "headshots-fall2025/ValeriaEnciso-Headshot.jpg", style: {objectPosition: "center 30%"} },
      {name: "Liesel Wong", email: "lyw8@cornell.edu", year: "2026", major: "Computer Science", involvement: "Cornell University Sustainable Design, BigRed//Hacks, AAIV", hobbies: "Embroidery, Rock Climbing, and Skiing", image: "headshots-fall2025/LieselWong-Headshot.jpg", style: {objectPosition: "center 40%"} },
      {name: "Dillon Gordon", email: "dkg38@cornell.edu", year: "2026", major: "Nutritional Science & Applied Exercise Science", involvement: "Research under Dr. Dan Berry, Personal Training with CFC", hobbies: "Social media/Content creation, Reading, Endurance Sports, Weight lifting, Cooking, Eating", image: "headshots-fall2025/DillonGordon-Headshot.jpg", style: {objectPosition: "center 30%"} },
      {name: "Andy Marous", email: "acm337@cornell.edu", year: "2026", major: "Computer Science", involvement: "Interfraternity Council, part-time Software Engineer", hobbies: "Literally anything to do with being outdoors, house music, distributed systems & systems programming", image: "headshots-fall2025/AndyMarous-Headshot.jpeg", style: {objectPosition: "center 50%"}},
      {name: "Aaron Zhu", email: "az394@cornell.edu", year: "2026", major: "Economics/Computer Science", involvement: "SEGC", hobbies: "Music, Spikeball, Basketball, Soccer", image: "headshots-fall2025/AaronZhu-Headshot.jpeg", style: {objectPosition: "center 55%"} },
    ],
  },
    {
    className: "Kappa Class",
    members: [
      {name: "Shannon Lin", email: "sl3454@cornell.edu", year: "2028", major: "Computer Science/Business", involvement: "Cornell Assistive Technologies, BigRed\\Hacks,  Club Swim, Cornell Sun, Curious Cardinals Representative", hobbies: "Gourmet dining, crocheting, ski, gardening, robotic fabrication, travel, accessibility", image: "headshots-fall2025/ShannonLin-Headshot.jpeg", style: {objectPosition: "center 40%"} },
      {name: "Ten Takeda", email: "tt585@cornell.edu", year: "2026", major: "Business Management", involvement: " eLab 2024/25 Cohort", hobbies: "Fitness, Soccer, Travelling, Fashion", image: "headshots/TenTakeda-Headshot.jpeg", extra: "Currently Abroad", style: {objectPosition: "center 30%"} },
      {name: "Ezana Kavuma", email: "ekk62@cornell.edu", year: "2028", major: "Information Science & Economics/Business", involvement: "Alpha Fund, eLabs Accelerator", hobbies: "Music, Economics, Entrepreneurship, VC, ", image: "headshots-fall2025/EzanaKavuma-Headshot.jpeg", style: {objectPosition: "center 40%"} },
      {name: "Kyan Rosenthal", email: "kr568@cornell.edu", year: "2028", major: "Hospitality Administration/Entrepreneurship", involvement: "Hotel Ezra Cornell, Social fraternity, Individual startup project, Ivy League Nordic Society, AHLA", hobbies: "Traveling to every national park, Spikeball, Volleyball, Country Music", image: "headshots-fall2025/KyanRosenthal-Headshot.jpg", style: {objectPosition: "center 25%"} },
      {name: "Sadie Schnierow", email: "sbs328@cornell.edu", year: "2028", major: "Information Science/Business Minor", involvement: "Créme de Cornell, Social Sorority, On Tap", hobbies: "Food, Design, Jazz", image: "headshots-fall2025/SadieSchnierow-Headshot.jpg", style: {objectPosition: "center 35%"} },
      {name: "Colin O'Brien", email: "cao82@cornell.edu", year: "2027", major: "ILR/Entrepreneurship & Business", involvement: "Hockey, Social Fraternity", hobbies: "Piano, Hockey, Cars, Travel, F1, Gym, VC, B2B SaaS", image: "headshots-fall2025/ColinOBrien-Headshot.jpg", style:{objectFit: "contain",  objectPosition: "center bottom", backgroundColor: "rgb(53, 53, 53)", width: "100%", height: "100%"} },
      {name: "Samantha Vaca", email: "sv492@cornell.edu", year: "2027", major: "Computer Science/Artificial Intelligence & Business", involvement: "Cornell Data Science, Cornell Filmmaking Society", hobbies: "Computer Animation, Creative Writing, Piano & Guitar", image: "headshots-fall2025/SamanthaVaca-Headshot.jpeg", style: {objectPosition: "center 35%"} },
      {name: "Cion Kim", email: "ck758@cornell.edu", year: "2027", major: "Mechanical Engineering", involvement: "Cornell Electric Vehicles, Student Assembly", hobbies: "Bridging enginering and entrepreneurship", image: "headshots-fall2025/CionKim-Headshot.jpeg", style: {objectPosition: "center 30%"} },
      {name: "Anisha Roy", email: "ar2429@cornell.edu", year: "2027", major: "Biomedical Engineering", involvement: "Cornell Bhangra, Engineering World Health", hobbies: "Hiking, Dance, Trying new restaurants", image: "headshots-fall2025/AnishaRoy-Headshot.jpeg", extra: "Inactive For the Semester",style: {objectPosition: "center 10%"} },
      {name: "Polly Parsons", email: "prp66@cornell.edu", year: "2027", major: "AEM/Entrepreneurship", involvement: "Varsity Field Hockey, Dyson Student Ambassador", hobbies: "Rock Climbing, Breakdancing, Art, Camping, Hack-A-Thons, Water Sports", image: "headshots/PollyParsons-Headshot.jpeg", extra: "Currently Abroad", style: {objectPosition: "center 45%"} },
      {name: "Alexander Zhang", email: "abz4@cornell.edu", year: "2027", major: "ORIE/Business", involvement: "SEGC, Cornell Speech and Debate, ISA", hobbies: "Basketball, History, Cooking", image: "headshots-fall2025/AlexanderZhang-Headshot.png", style: {objectPosition: "center 0%"} },
      {name: "Noel Blackwell", email: "bwb79@cornell.edu", year: "2028", major: "Economics", involvement: "Social Fraternity, Capital Club", hobbies: "Golf, Music, Reading", image: "headshots-fall2025/NoelBlackwell-Headshot.jpg", style: {objectPosition: "center 55%"} },
      {name: "Cali Bernier", email: "cb927@cornell.edu", year: "2027", major: "Operations Research and Information Engineering/Business", involvement: "Alpha Phi", hobbies: "Surfing, hiking", image: "headshots-fall2025/CaliBernier-Headshot.jpeg", style: {objectPosition: "center 50%"} },
      {name: "Mihir Kulshreshtha", email: "mk2664@cornell.edu", year: "2028", major: "Computer Science/AI & Statistics", involvement: "Cornell Data Science, Cornell Bhangra", hobbies: "Dancing (Bhangra), Playing basketball and spikeball, Programming, Hanging out with friends", image: "headshots-fall2025/MihirKulshreshtha-Headshot.jpg", style: {objectPosition: "center 35%"} },
      {name: "Anika Sukumar", email: "as3567@cornell.edu", year: "2027", major: "Design & Environmental Analysis/Business, Fashion", involvement: "Women's Track and Field team, WOCA", hobbies: "Thrifting, any kind of art, reading, working out, eating good food", image: "headshots-fall2025/AnikaSukumar-Headshot.jpg", style: {objectPosition: "center 40%"} },
      {name: "Abraham Ailemen", email: "aea228@cornell.edu", year: "2026", major: "Biological Sciences", involvement: "Varsity Track and Field, Run Your City, Nigerian Student Association, Men of Color in Athletics", hobbies: "Frolicking", image: "headshots-fall2025/AbrahamAilemen-Headshot.jpeg", style: {objectPosition: "center 20%"} },
    ],
  },
  {
    className: "Lambda Class",
    members: [
      {name: "Noor Dewood", email: "nnd26@cornell.edu", year: "2028", major: "Chemical Engineering", involvement: "ChemE Car, Laidlaw Program, ISA", hobbies: "Cooking, quilling, astronomy, and pilates", image: "headshots-fall2025/NoorAbdulla-Headshot.jpg", style: {objectPosition: "center 35%"} },
      {name: "Mahin Hardaway", email: "mh2584@cornell.edu", year: "2028", major: "Hotel Administration & Hospitality", involvement: "Mosaic Hospitality Association, Diverse Leaders for Tomorrow, Cornell Rock Climbing Club", hobbies: "Baking, Running, Computer Science, Social Consulting", image: "headshots-fall2025/MahinHardaway-Headshot.jpg", style: {objectPosition: "center 30%"} },
      {name: "Finn Clancy", email: "fac49@cornell.edu", year: "2027", major: "Biology & Society/Entrepreneurship", involvement: "ENT, Reis Tennis Center, Biotech off Campus Job", hobbies: "Tennis, Traveling, Weightlifting, Cooking, and Collecting Coins", image: "headshots-fall2025/FinnClancy-Headshot.jpg", style: {objectPosition: "center 30%"}},
      {name: "Marcus Lotufo", email: "mdl274@cornell.edu", year: "2027", major: "Mechanical Engineering", involvement: "CUBMD, Cornell Maker Club", hobbies: "Guitar, Spikeball", image: "headshots-fall2025/MarcusLotufo-Headshot.jpg", style: {objectPosition: "center 20%"}},
      {name: "Hongjin Fang", email: "hf355@cornell.edu", year: "2028", major: "Biological Engineering/Computer Science", involvement: "IM soccer and Baskeball, Sabuncu Lab", hobbies: "Guitar, Cooking, Fishing, Golfing, Sports", image: "headshots-fall2025/HongjinFang-Headshot.jpeg", style: {objectPosition: "center 40%"} },
      {name: "Brij Garg", email: "bg473@cornell.edu", year: "2028", major: "Biometry and Statistics", involvement: "Big Red Yoga, Residential Advisor", hobbies: "Basketball, Being an Influencer", image: "headshots-fall2025/BrijGarg-Headshot.png", style:{objectPosition: "center 35%"}},
      {name: "Henny Schminke", email: "hps43@cornell.edu", year: "2028", major: "Biological sciences/Business", involvement: "Varsity Cross Country and Track & Field", hobbies: "Running, Sailing, Spending time with family", image: "headshots-fall2025/HennySchminke-Headshot.jpeg", style:{objectPosition: "center 30%"}},
      {name: "Pradhi Pakkerakari", email: "sp2362@cornell.edu", year: "2027", major: "Computer Science/Data Science", involvement: "Cornell Speech & Debate, Armada, Engineers Without Borders, Cornell Sitara", hobbies: "Cooking, Cars, Gardening, AgriTech", image: "headshots-fall2025/PradhiPakkerakari.png", style:{objectPosition: "center 30%"}},
      {name: "Mac Dorward", email: "mmd274@cornell.edu", year: "2027", major: "Economics", involvement: "Football, Christian Union, FCA, SAAC", hobbies: "UFC, Kunekune Pigs, Markets", image: "headshots-fall2025/MacDorward-Headshot.jpeg", style:{objectPosition: "center 30%"}},
      {name: "Sebastian Dominguez", email: "wd273@cornell.edu", year: "2028", major: "Computer Science/Entrepreneurship", involvement: "EWB Cornell", hobbies: "Travelling, Basketball, Golf, Coding", image: "headshots-fall2025/SebastianDominguez-Headshot.JPG", style:{objectPosition: "center 30%"}},
      {name: "Neha Patil", email: "nhp36@cornell.edu", year: "2028", major: "Computer Science, Business", involvement: "Cornell Business Analytics, South Asian Business Association, Engineers Without Borders, Pi Beta Phi", hobbies: "DJing, Cooking, Listening to Rap & R&B", image: "headshots-fall2025/NehaPatil-Headshot.png", style:{objectPosition: "center 30%"}},
    ],
  },
  {
    className: "Mu Class",
    members: [
      {name: "Krish Patel", email: "kdp57@cornell.edu", year: "2028", major: "Finance/Entrepreneurship & Real Estate", involvement: "South Asian Business Association, Cornell Real Estate Club, Society for India, Sitara @ Cornell, Cornell Poker Club", hobbies: "Traveling, Fishing, Pickleball/Basketball, Tampa Bay Buccaneers, Poker/Blackjack, Real Estate", image: "headshots/KrishPatel-Headshot.png", style: {objectPosition: "center 35%"} },
      {name: "Kate Sahin", email: "khs78@cornell.edu", year: "2028", major: "HBHS/Fiber Science Minor", involvement: "Grub Ventures", hobbies: "Running, Podcasts, Thrifting", image: "headshots/KateSahin-Headshot.jpg", style: {objectPosition: "center 35%"} },
      {name: "Mariko Mita", email: "mm3445@cornell.edu", year: "2028", major: "Hotel Administration", involvement: "Hospitality Sales and Marketing Association International, Hotel Ezra Cornell, Society for Women in Business, Singapore Student Association, Japan US Association", hobbies: "Rhythmic Gymnastics, Film Photography, Formula 1", image: "headshots/MarikoMita-Headshot.jpg", style: {objectPosition: "center 35%"} },
      {name: "Julius Behner", email: "jpb385@cornell.edu", year: "2029", major: "ECE or CS", involvement: "Hall Council, Independent Projects", hobbies: "Reading, Coding, Debate, Practical Jokes", image: "headshots/JuliusBehner-Headshot.jpg", style: {objectPosition: "center 35%"} },
      {name: "Brooke Wilcox", email: "bmw252@cornell.edu", year: "2028", major: "ILR", involvement: "Cornell Fashion Collective, Alpha Xi Delta", hobbies: "Running, Skiing, Baking, Music, Driving", image: "headshots/BrookeWilcox-Headshot.jpeg", style: {objectPosition: "center 35%"} },
      {name: "Jad Alsouss", email: "ja895@cornell.edu", year: "2029", major: "AEM", involvement: "Cornell Pickleball Club", hobbies: "UFC, Pickleball, Travis Scott, Cooking/Grilling", image: "headshots/JadAlsouss-Headshot.JPG", style: {objectPosition: "center 35%"} },
      {name: "Melissa Chowdhury", email: "mc3237@cornell.edu", year: "2028", major: "AEM", involvement: "eLab, Entrepreneurship Club", hobbies: "Cooking, Traveling, Anything Adventurous", image: "headshots/MelissaChowdhury-Headshot.jpeg", style: {objectPosition: "center 35%"} },
      {name: "Kate Stiens", email: "ks2354@cornell.edu", year: "2027", major: "Fashion Design", involvement: "Cornell Fashion Collective, Cornell Fashion Industry Network, Cornell Outdoor Odyssey, Kappa Alpha Theta", hobbies: "Fashion, Running, Cooking, Photography, Art", image: "headshots/KateStiens-Headshot.JPG", style: {objectPosition: "center 35%"} },
      {name: "Juliet Crane", email: "jlc565@cornell.edu", year: "2028", major: "Computer Science/East Asian Studies", involvement: "Digital Tech & Innovation Project Team, Cornell Symphony Orchestra, Claude Builders Club, Brass Club, Cornell Club Women's Ice Hockey", hobbies: "Experimental Oatmeal Recipes, Japanese, Ninja Creami, French Horn Karaoke, Frozen Yogurt, Ice Hockey, Google Reviewing, Painting", image: "headshots/JulietCrane-Headshot.JPG", style: {objectPosition: "center 35%"} },
      {name: "Diya Sheth", email: "ds2457@cornell.edu", year: "2026", major: "Mechanical Engineering & Entrepreneurship", involvement: "Cornell Assistive Technologies, Startup Consulting at Cornell, Society of Women Engineers", hobbies: "Swimming, Traveling, Robotics, Cafe Hopping", image: "headshots/DiyaSheth-Headshot.png", style: {objectPosition: "center 35%"} },
      {name: "Tanishka Jape", email: "tj343@cornell.edu", year: "2028", major: "Biological Sciences", involvement: "(n/a - will get back to you)", hobbies: "ITF Taekwon-Do, Hiking for a View, Talking about London", image: "headshots/TJ-Headshot.jpeg", style: {objectPosition: "center 35%"} },
      {name: "Stephen D'Ambrosio", email: "sjd256@cornell.edu", year: "2028", major: "Industrial & Labor Relations", involvement: "Residential Advisor, Scheinman Conflict Resolution Club", hobbies: "Reading, Meditation, Distance Running, Content Creation, Calisthenics", image: "headshots/StephenD'Ambrosio-Headshot.JPG", style: {objectPosition: "center 35%"} },
      {name: "Alix Martini", email: "ahm258@cornell.edu", year: "2028", major: "Biomedical Engineering & Entrepreneurship", involvement: "Cornell DEBUT, International Students Association, Triathlon Club, Big Red Sports Network", hobbies: "Sailing, Running, Cooking, Yogurt Bowls, Hiking, Matcha, Swimming", image: "headshots/default-icon.jpg", style: {objectPosition: "center 35%"} },
      {name: "Ewan Moss", email: "ejm353@cornell.edu", year: "2028", major: "AEM Major concentration in Entrepreneurship, Music Minor", involvement: "Cornell United Football Club, Outdoor Odyssey, Cornell M&A, Cornell Wind Symphony, Cornell Jazz Ensemble", hobbies: "Music, Nature, Gym, F1, Golf, Skiing", image: "headshots/EwanMoss-Headshot.jpeg", style: {objectPosition: "center 35%"} },
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
  //const { pathname } = useLocation();
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

  //const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  return (
    <div className="members-page">
      {/*<Helmet key={pathname}>
        <title>Members — ENT</title>
        <meta
          name="description"
          content="Meet the members of Epsilon Nu Tau — a diverse community of student entrepreneurs, innovators, and future leaders shaping tomorrow’s ventures."
        />
      </Helmet>*/}


      {/* HERO */}
      <section className="members-hero">
        <img
          src="group-pics/ENTGroups-64.jpeg"
          alt="Members hero"
          className="members-hero-img"
        />

        <div className="members-hero-content">
          <h1>BROTHERS</h1>
          <p>Get to know all of our wonderful members</p>
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
