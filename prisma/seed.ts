import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Obrišemo postojeće podatke (idempotent seed)
  // Prvo properties (zbog foreign key), pa users, pa news
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();
  await prisma.news.deleteMany();

  // Kreiramo jednog usera (vlasnika svih 50 nekretnina)
  const user = await prisma.user.create({
    data: {
      email: "aleksandar@e-seo.info",
      password: "password", // u realnosti hash!
      name: "ESEO Real Estate Agent",
    },
  });

  // Niz 50 nekretnina sa realnim podacima
  const properties: Prisma.PropertyCreateManyInput[] = [
    {
      name: "Modern Apartment Belgrade",
      price: 95000,
      area: 65.5,
      address: "Zvezdara, Belgrade",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Studio Near City Center",
      price: 72000,
      area: 38.0,
      address: "Vračar, Belgrade",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Family House with Garden",
      price: 180000,
      area: 145.0,
      address: "Novi Sad, Liman",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Luxury Penthouse",
      price: 320000,
      area: 180.0,
      address: "Dorćol, Belgrade",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      promoted: true,
      ownerId: user.id,
    },
    {
      name: "Small Cottage by the River",
      price: 85000,
      area: 85.0,
      address: "Sremska Mitrovica",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Office Space Downtown",
      price: 150000,
      area: 120.0,
      address: "Belgrade Center",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Apartment with Garage",
      price: 105000,
      area: 72.5,
      address: "Novi Beograd, Block 45",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "New Building Flat",
      price: 99000,
      area: 68.0,
      address: "Niš, Medijana",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Duplex Apartment",
      price: 130000,
      area: 95.0,
      address: "Subotica, Center",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Old Town House",
      price: 250000,
      area: 165.0,
      address: "Knez Mihailova, Belgrade",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Countryside Farm",
      price: 70000,
      area: 110.0,
      address: "Valjevo",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Vacation Apartment",
      price: 95000,
      area: 55.0,
      address: "Zlatibor",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Mountain Cabin",
      price: 87000,
      area: 75.0,
      address: "Tara National Park",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Seaside Villa",
      price: 410000,
      area: 220.0,
      address: "Budva, Montenegro",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      promoted: true,
      ownerId: user.id,
    },
    {
      name: "Student Apartment",
      price: 58000,
      area: 32.0,
      address: "Novi Sad, Telep",
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Loft Apartment",
      price: 112000,
      area: 88.0,
      address: "Dorćol, Belgrade",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Luxury Office",
      price: 295000,
      area: 185.0,
      address: "Belgrade Waterfront",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      promoted: true,
      ownerId: user.id,
    },
    {
      name: "Garage Unit",
      price: 18000,
      area: 25.0,
      address: "Block 70, New Belgrade",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Industrial Warehouse",
      price: 340000,
      area: 450.0,
      address: "Kragujevac",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
      promoted: true,
      ownerId: user.id,
    },
    {
      name: "Retail Space",
      price: 160000,
      area: 130.0,
      address: "Niš Center",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Lake House",
      price: 210000,
      area: 155.0,
      address: "Perućac Lake",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Apartment with View",
      price: 125000,
      area: 78.5,
      address: "Kalemegdan Area",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Suburban Family House",
      price: 145000,
      area: 135.0,
      address: "Pančevo",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "New Construction Flat",
      price: 89000,
      area: 62.0,
      address: "Zemun",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Renovated Apartment",
      price: 103000,
      area: 70.0,
      address: "Kragujevac Center",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Commercial Building",
      price: 500000,
      area: 380.0,
      address: "Novi Beograd",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      promoted: true,
      ownerId: user.id,
    },
    {
      name: "Small Studio",
      price: 55000,
      area: 35.0,
      address: "Niš",
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "House with Pool",
      price: 275000,
      area: 195.0,
      address: "Zlatibor Area",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      promoted: true,
      ownerId: user.id,
    },
    {
      name: "Country House",
      price: 99000,
      area: 115.0,
      address: "Aranđelovac",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Modern Duplex",
      price: 140000,
      area: 102.0,
      address: "Novi Sad",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Villa with Garden",
      price: 260000,
      area: 210.0,
      address: "Belgrade Suburbs",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      promoted: true,
      ownerId: user.id,
    },
    {
      name: "Studio Apartment",
      price: 64000,
      area: 42.0,
      address: "Vračar",
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Office for Rent",
      price: 120000,
      area: 95.0,
      address: "Dorćol",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "House with Garage",
      price: 155000,
      area: 140.0,
      address: "Novi Sad, Liman 4",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Apartment Near Park",
      price: 91000,
      area: 59.5,
      address: "Tašmajdan",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Cottage Retreat",
      price: 86000,
      area: 82.0,
      address: "Fruška Gora",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Downtown Loft",
      price: 115000,
      area: 85.0,
      address: "Knez Mihailova",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Family Duplex",
      price: 139000,
      area: 98.0,
      address: "Čačak",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Riverside Apartment",
      price: 118000,
      area: 73.0,
      address: "Savski Venac",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Farmhouse",
      price: 95000,
      area: 125.0,
      address: "Leskovac",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Office Floor",
      price: 210000,
      area: 160.0,
      address: "Belgrade Center",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Renovated House",
      price: 178000,
      area: 148.0,
      address: "Subotica",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Luxury Villa",
      price: 430000,
      area: 280.0,
      address: "Dedinje",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      promoted: true,
      ownerId: user.id,
    },
    {
      name: "Small Flat",
      price: 69000,
      area: 48.0,
      address: "Niš, Palilula",
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Business Space",
      price: 145000,
      area: 118.0,
      address: "Kraljevo",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "City Apartment",
      price: 97000,
      area: 66.0,
      address: "Kragujevac",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "House for Renovation",
      price: 60000,
      area: 92.0,
      address: "Valjevo",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "New Build Loft",
      price: 109000,
      area: 76.0,
      address: "Dorćol",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Beach Apartment",
      price: 190000,
      area: 88.0,
      address: "Herceg Novi",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Large Family Home",
      price: 215000,
      area: 175.0,
      address: "Novi Sad, Petrovaradin",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
    {
      name: "Downtown Apartment",
      price: 98000,
      area: 64.0,
      address: "Belgrade Center",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ownerId: user.id,
    },
  ];

  // Insert svih 50
  await prisma.property.createMany({ data: properties });

  // Kreiramo 10 vesti
  const news: Prisma.NewsCreateManyInput[] = [
    {
      title: "Novi Trendovi u Nekretninama 2025",
      description:
        "Tržište nekretnina doživljava značajne promene u 2025. godini. Stručnjaci predviđaju porast interesa za održive gradnje i energetski efikasne objekte. Investitori sve više traže nekretnine sa solarnim panelima i modernim sistemima za upravljanje energijom.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    },
    {
      title: "Beograd - Najtraženiji Grad za Investicije",
      description:
        "Prema najnovijim analizama, Beograd se našao među top 5 gradova u regionu po broju investicija u nekretnine. Razlog je kombinacija pristupačnih cena, dobre infrastrukture i rastućeg turističkog sektora.",
      image:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
    },
    {
      title: "Kako Pravilno Odabrati Prvu Nekretninu",
      description:
        "Kupovina prve nekretnine je važan korak. Ključni faktori uključuju lokaciju, budžet, buduću vrednost i potrebe domaćinstva. Stručnjaci savetuju da se posveti dovoljno vremena istraživanju i da se konsultuje sa profesionalcima pre donošenja finalne odluke.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    },
    {
      title: "Cene Stanova Rastu u Novom Beogradu",
      description:
        "Novi Beograd beleži stabilan rast cena stanova tokom poslednje godine. Glavni razlozi su nove infrastrukturne projekte, otvaranje novih komercijalnih objekata i poboljšana povezanost sa centrom grada.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    },
    {
      title: "Zeleni Krediti za Energetske Renovacije",
      description:
        "Nove mogućnosti finansiranja za renovacije koje podižu energetsku efikasnost domova. Vlasti uvode povoljne kredite sa niskim kamatnim stopama za investicije u izolaciju, solarnu energiju i moderne sistema grejanja.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    },
    {
      title: "Ekskluzivne Nekretnine u Dedinju",
      description:
        "Dedinje i dalje ostaje jedno od najprestižnijih beogradskih naselja. Nove luksuzne vile kombinuju tradicionalnu arhitekturu sa modernim funkcionalnostima, privlačeći domaće i strane investitore.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    },
    {
      title: "Budućnost Gradnje: Pametni Domovi",
      description:
        "Tehnologija ulazi u domove kroz pametne sisteme upravljanja. Automatizacija osvetljenja, grejanja, sigurnosnih sistema i domaćih aparata postaje standard u novim objektima.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    },
    {
      title: "Izdavanje Nekretnina - Profitabilna Investicija",
      description:
        "Izdavanje nekretnina ostaje stabilna investiciona opcija. Sa pravilnim odabirom lokacije i tipa nekretnine, godišnji prinos može dostići 6-8%. Važno je voditi računa o održavanju i pravovremenim renovacijama.",
      image:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
    },
    {
      title: "Novi Sad - Rastući Tržište Nekretnina",
      description:
        "Novi Sad doživljava značajan rast u sektoru nekretnina zahvaljujući razvoju IT industrije i infrastrukturnim projektima. Mladi profesionalci sve više biraju ovaj grad za život, što pokreće potražnju za stanovima.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    },
    {
      title: "Pravni Aspekti Kupovine Nekretnine",
      description:
        "Pre kupovine nekretnine, važno je proveriti sve pravne aspekte. To uključuje proveru katastarskih podataka, postojanja tereta, prava puta i dozvole za gradnju. Pravna konsultacija može sprečiti buduće probleme.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    },
  ];

  // Insert svih 10 vesti
  await prisma.news.createMany({ data: news });
}

main()
  .then(() => console.log("✅ Seed completed with 50 properties and 10 news"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
